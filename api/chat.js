/**
 * Vercel Edge Function — POST /api/chat
 *
 * Proxies GPT-4o (via OpenRouter) for the portfolio chatbot, with RAG retrieval
 * over a static in-repo vector index. Server-side only: the OpenRouter key is
 * read from the environment and never exposed to the client.
 *
 * Request body:  { messages: [{ role: "user"|"assistant", content: string }] }
 * Response:      { content: string }   (non-streaming, single full response)
 *
 * Dependency seam: the handler is built by createHandler(deps). Production wires
 * the real OpenRouter/RAG adapters (createDefaultDeps); tests inject in-memory
 * fakes. The pure helpers (sanitizeMessages, isRateLimited, readBody,
 * callOpenRouter) are exported for direct testing.
 */
import { buildSystemPrompt } from "./prompts/system.js";
import { retrieveContext } from "./rag.js";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// Env-configurable, with safe defaults. `process` may be absent on an Edge
// runtime, so read defensively from globalThis.
const env = globalThis.process?.env || {};
const MODEL = env.CHAT_MODEL || "openai/gpt-4o";
const API_KEY = env.OPENROUTER_API_KEY || "";

// Limits (per project rules: validate + bound every request).
const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2000;
const MAX_TOTAL_CHARS = 8000;
const REQUEST_TIMEOUT_MS = 25000;

// Best-effort in-memory rate limit (local safeguard only — not durable across
// instances; production should layer a distributed limiter).
const RATE_LIMIT = { windowMs: 60000, max: 30 };
const ipHits = new Map();

/* --------------------------------------------------------------------------
   Pure helpers (exported for direct unit testing)
   -------------------------------------------------------------------------- */

export function json(data, status = 200) {
  const jsonBody = JSON.stringify(data);
  return new Response(jsonBody, {
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

// Vercel may call this as a Node serverless function (IncomingMessage) or an
// Edge function (Web Request). Normalize both so the request never depends on
// runtime-specific methods.
export function headerValue(req, name) {
  const key = name.toLowerCase();
  const headers = req.headers;
  if (!headers) return null;
  if (typeof headers.get === "function") return headers.get(name);
  const value = headers[key];
  return typeof value === "string" ? value : null;
}

export async function readBody(req) {
  if (typeof req.json === "function") return req.json();
  // Some frameworks pre-parse the body.
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === "string") return req.body ? JSON.parse(req.body) : {};
    return req.body;
  }
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  // Avoid Node-only Buffer; TextDecoder is available on both runtimes.
  const decoder = new TextDecoder();
  const raw = chunks
    .map((c) => (typeof c === "string" ? c : decoder.decode(c, { stream: true })))
    .join("");
  decoder.decode(); // flush
  return raw ? JSON.parse(raw) : {};
}

export function sanitizeMessages(messages) {
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

export function isRateLimited(ip) {
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

export async function callOpenRouter({ messages, context, externalSignal, apiKey = API_KEY, model = MODEL, url = OPENROUTER_URL }) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const onExternalAbort = () => controller.abort();
  if (externalSignal) {
    if (externalSignal.aborted) controller.abort();
    else externalSignal.addEventListener("abort", onExternalAbort);
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://portfolio-yahya-salhi.com",
        "X-Title": "Yahya Salhi Portfolio Assistant",
      },
      body: JSON.stringify({
        model,
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
    if (externalSignal) externalSignal.removeEventListener("abort", onExternalAbort);
  }
}

/* --------------------------------------------------------------------------
   Adapter wiring
   -------------------------------------------------------------------------- */

/** The production dependency set: real in-memory limiter + OpenRouter/RAG. */
export function createDefaultDeps() {
  return {
    apiKey: API_KEY,
    rateLimiter: (ip) => isRateLimited(ip),
    bodyParser: (req) => readBody(req),
    sanitizer: (messages) => sanitizeMessages(messages),
    ragRetriever: (query, apiKey) => retrieveContext(query, apiKey),
    aiCompleter: ({ messages, context, externalSignal, apiKey }) =>
      callOpenRouter({ messages, context, externalSignal, apiKey }),
  };
}

/* --------------------------------------------------------------------------
   Request orchestration
   -------------------------------------------------------------------------- */

function requireKey(apiKey) {
  if (!apiKey) {
    console.error("[chat] missing OPENROUTER_API_KEY");
    throw new Error("chat_unavailable");
  }
}

export async function run(req, deps = createDefaultDeps()) {
  const apiKey = deps.apiKey;
  const ip =
    headerValue(req, "x-forwarded-for")?.split(",")[0]?.trim() ||
    headerValue(req, "cf-connecting-ip") ||
    "unknown";
  if (deps.rateLimiter(ip)) {
    return json({ error: "rate_limited" }, 429);
  }

  let body;
  try {
    body = await deps.bodyParser(req);
  } catch (err) {
    return json({ error: "invalid_request" }, 400);
  }

  let messages;
  try {
    messages = deps.sanitizer(body?.messages);
  } catch (err) {
    return json({ error: "invalid_request" }, 400);
  }

  const query = messages[messages.length - 1].content;

  // Overall hard timeout so the invocation can never hang past its budget.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS + 5000);
  try {
    console.error("[chat] retrieving context…");
    const context = await deps.ragRetriever(query, apiKey);
    console.error("[chat] context retrieved len=" + String(context).length + "; calling OpenRouter…");
    const content = await deps.aiCompleter({
      messages,
      context,
      externalSignal: controller.signal,
      apiKey,
    });
    console.error("[chat] openrouter ok");
    return json({ content });
  } finally {
    clearTimeout(timer);
  }
}

// Vercel Functions support the Web-standard `fetch` export — a default object
// with an async `fetch(request)` method that receives a Web `Request` and
// returns a `Response`. This is the correct signature for Vercel's Node/Edge
// runtimes (a bare default function returning a `Response` is ignored on the
// Node runtime — Vercel warns "default export returned a Response" and drops it).
export function createHandler(deps = createDefaultDeps()) {
  return {
    async fetch(req) {
      // CORS preflight.
      if (req.method === "OPTIONS") {
        return json({ ok: true });
      }
      if (req.method !== "POST") {
        return json({ error: "method_not_allowed" }, 405);
      }

      try {
        requireKey(deps.apiKey);
        return await run(req, deps);
      } catch (err) {
        const message = err?.message;
        console.error("[chat] uncaught:", message);
        if (message === "rate_limited") return json({ error: "rate_limited" }, 429);
        if (message === "unauthorized") return json({ error: "chat_unavailable" }, 500);
        if (message === "AbortError" || message === "empty_response" || message === "upstream_error") {
          return json({ error: "chat_unavailable" }, 502);
        }
        return json({ error: "chat_unavailable" }, 500);
      }
    },
  };
}

export default createHandler();
