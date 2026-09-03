/**
 * Unit tests for the /api/chat request logic.
 *
 * The seam is the `deps` object passed to createHandler/run. Tests inject
 * in-memory adapters so the happy path runs with zero network calls — no
 * live OpenRouter, no live embeddings. The same run() the production
 * handler uses is exercised here.
 *
 * Run: node --test api/chat.test.js
 */
import assert from "node:assert/strict";
import test from "node:test";

import {
  createHandler,
  createDefaultDeps,
  run,
  sanitizeMessages,
  isRateLimited,
} from "./chat.js";

/** Build a minimal Web-style Request object (enough of the surface we use). */
function makeRequest({ method = "POST", body, headers = {} } = {}) {
  return {
    method,
    headers: new Headers(headers),
    async json() {
      return JSON.parse(body);
    },
  };
}

/** In-memory dependency set — the "other half" of the seam that tests inject. */
function createTestDeps(overrides = {}) {
  const calls = { rag: 0, complete: 0, limit: 0 };
  return {
    calls,
    apiKey: "test-key",
    rateLimiter: () => {
      calls.limit += 1;
      return false;
    },
    bodyParser: (req) => req.json(),
    sanitizer: (messages) => sanitizeMessages(messages),
    ragRetriever: async () => {
      calls.rag += 1;
      return "retrieved context";
    },
    aiCompleter: async ({ messages, context }) => {
      calls.complete += 1;
      return `${messages[messages.length - 1].content} → answered`;
    },
    ...overrides,
  };
}

test("happy path returns completion and wires deps", async () => {
  const deps = createTestDeps();
  const handler = createHandler(deps);

  const res = await handler.fetch(
    makeRequest({
      body: JSON.stringify({ messages: [{ role: "user", content: "Who is Yahya?" }] }),
    })
  );

  assert.equal(res.status, 200);
  const data = await res.json();
  assert.equal(data.content, "Who is Yahya? → answered");
  assert.equal(deps.calls.rag, 1);
  assert.equal(deps.calls.complete, 1);
  assert.equal(deps.calls.limit, 1);
});

test("rate limiter blocks with 429", async () => {
  const deps = createTestDeps({ rateLimiter: () => true });
  const res = await run(
    makeRequest({ body: JSON.stringify({ messages: [{ role: "user", content: "hi" }] }) }),
    deps
  );
  assert.equal(res.status, 429);
  const data = await res.json();
  assert.equal(data.error, "rate_limited");
  assert.equal(deps.calls.complete, 0);
});

test("invalid JSON body returns 400 and never calls the AI", async () => {
  const deps = createTestDeps({
    bodyParser: async () => {
      throw new Error("bad json");
    },
  });
  const res = await run(makeRequest({ body: "{" }), deps);
  assert.equal(res.status, 400);
  assert.equal(deps.calls.complete, 0);
});

test("invalid messages returns 400 and never calls the AI", async () => {
  const deps = createTestDeps();
  const res = await run(
    makeRequest({ body: JSON.stringify({ messages: [] }) }),
    deps
  );
  assert.equal(res.status, 400);
  assert.equal(deps.calls.rag, 0);
  assert.equal(deps.calls.complete, 0);
});

test("upstream completer failure surfaces as chat_unavailable 502", async () => {
  const deps = createTestDeps({
    aiCompleter: async () => {
      throw new Error("upstream_error");
    },
  });
  const handler = createHandler(deps);
  const res = await handler.fetch(
    makeRequest({ body: JSON.stringify({ messages: [{ role: "user", content: "hi" }] }) })
  );
  assert.equal(res.status, 502);
  const data = await res.json();
  assert.equal(data.error, "chat_unavailable");
});

test("method_not_allowed for GET", async () => {
  const deps = createTestDeps();
  const handler = createHandler(deps);
  const res = await handler.fetch(makeRequest({ method: "GET", body: "{}" }));
  assert.equal(res.status, 405);
  assert.equal(deps.calls.complete, 0);
});

test("OPTIONS preflight returns 200", async () => {
  const handler = createHandler(createTestDeps());
  const res = await handler.fetch(makeRequest({ method: "OPTIONS", body: "{}" }));
  assert.equal(res.status, 200);
});

test("missing API key in deps → 500 chat_unavailable", async () => {
  const deps = createTestDeps({ apiKey: "" });
  const handler = createHandler(deps);
  const res = await handler.fetch(
    makeRequest({ body: JSON.stringify({ messages: [{ role: "user", content: "hi" }] }) })
  );
  assert.equal(res.status, 500);
  const data = await res.json();
  assert.equal(data.error, "chat_unavailable");
});

test("sanitizeMessages trims, bounds, and flattens", () => {
  const clean = sanitizeMessages([
    { role: "system", content: "ignored" },
    { role: "user", content: "Hello" },
    { role: "user", content: "" },
    { role: "assistant", content: "Hi" },
  ]);
  assert.deepEqual(clean, [
    { role: "user", content: "Hello" },
    { role: "assistant", content: "Hi" },
  ]);
});

test("sanitizeMessages throws on empty input", () => {
  assert.throws(() => sanitizeMessages([]), /missing_messages/);
  assert.throws(() => sanitizeMessages(undefined), /missing_messages/);
});

test("isRateLimited returns false within budget and true over it", () => {
  const ip = `test-${Date.now()}`;
  // RATE_LIMIT.max is 30; the first 30 hits stay under, the 31st trips.
  let limited = false;
  for (let i = 0; i < 30; i += 1) limited = isRateLimited(ip);
  assert.equal(limited, false);
  assert.equal(isRateLimited(ip), true);
});
