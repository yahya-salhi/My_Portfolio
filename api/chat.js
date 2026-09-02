/**
 * Vercel Edge Function — POST /api/chat
 *
 * Proxies GPT-4o (via OpenRouter) for the portfolio chatbot, with RAG retrieval
 * over a static in-repo vector index. Server-side only: the OpenRouter key is
 * read from the environment and never exposed to the client.
 *
 * Request body:  { messages: [{ role: "user"|"assistant", content: string }] }
 * Response:      { content: string }   (non-streaming, single full response)
 */
import { buildSystemPrompt } from "./prompts/system.js";
import { retrieveContext } from "./rag.js";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// Env-configurable, with safe defaults.
const MODEL = process.env.CHAT_MODEL || "openai/gpt-4o";
const API_KEY = process.env.OPENROUTER_API_KEY || "";

// Limits (per project rules: validate + bound every request).
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2000;
const MAX_TOTAL_CHARS = 8000;
const REQUEST_TIMEOUT_MS = 25000;

// Best-effort in-memory rate limit (local safeguard only — not durable across
// instances; production should layer a distributed limiter).
const RATE_LIMIT = { windowMs: 60000, max: 30 };
const ipHits = new Map();

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "no-store",
    },
  });
}

function sanitizeMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error("missing_messages");
  }
  const clean = [];
  let total = 0;
  for (const m of messages.slice(-MAX_MESSAGES)) {
    const role = m?.role;
    const content = typeof m?.content === "string" ? m.content : "";
    if (role !== "user" && role !== "assistant") continue;
    if (!content) continue;
    const trimmed = content.slice(0, MAX_MESSAGE_CHARS);
    total += trimmed.length;
    if (total > MAX_TOTAL_CHARS) break;
    clean.push({ role, content: trimmed });
  }
  if (clean.length === 0) {
    throw new Error("missing_messages");
  }
  return clean;
}

function isRateLimited(ip) {
  const now = Date.now();
  const entry = ipHits.get(ip) || { count: 0, reset: now + RATE_LIMIT.windowMs };
  if (now > entry.reset) {
    entry.count = 0;
    entry.reset = now + RATE_LIMIT.windowMs;
  }
  entry.count += 1;
  ipHits.set(ip, entry);
  // Opportunistically prune the map.
  if (ipHits.size > 10000) {
    for (const [k, v] of ipHits) {
      if (now > v.reset) ipHits.delete(k);
    }
  }
  return entry.count > RATE_LIMIT.max;
}

async function callOpenRouter(messages, context) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        "HTTP-Referer": "https://portfolio-yahya-salhi.com",
        "X-Title": "Yahya Salhi Portfolio Assistant",
      },
      body: JSON.stringify({
        model: MODEL,
        stream: false,
        messages: [
          { role: "system", content: buildSystemPrompt(context) },
          ...messages,
        ],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) throw new Error("rate_limited");
      if (status === 401 || status === 403) throw new Error("unauthorized");
      throw new Error("upstream_error");
    }

    const data = await response.json();
    const content =
      data?.choices?.[0]?.message?.content?.trim() || "";
    if (!content) throw new Error("empty_response");
    return content;
  } finally {
    clearTimeout(timeout);
  }
}

export default async function handler(req) {
  // CORS preflight.
  if (req.method === "OPTIONS") {
    return json({ ok: true });
  }
  if (req.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }
  if (!API_KEY) {
    return json({ error: "server_misconfigured" }, 500);
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    "unknown";
  if (isRateLimited(ip)) {
    return json({ error: "rate_limited" }, 429);
  }

  let messages;
  try {
    const body = await req.json();
    messages = sanitizeMessages(body?.messages);
  } catch (err) {
    if (err?.message === "missing_messages") {
      return json({ error: "invalid_request" }, 400);
    }
    return json({ error: "invalid_request" }, 400);
  }

  const query = messages[messages.length - 1].content;
  const context = await retrieveContext(query, API_KEY);

  try {
    const content = await callOpenRouter(messages, context);
    return json({ content });
  } catch (err) {
    const message = err?.message;
    if (message === "rate_limited") return json({ error: "rate_limited" }, 429);
    if (message === "unauthorized") {
      return json({ error: "chat_unavailable" }, 500);
    }
    if (message === "AbortError" || message === "empty_response" || message === "upstream_error") {
      return json({ error: "chat_unavailable" }, 502);
    }
    return json({ error: "chat_unavailable" }, 500);
  }
}
