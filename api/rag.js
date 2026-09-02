/**
 * Runtime RAG helpers for the /api/chat function.
 * Loads the committed, precomputed index (api/rag/index.js), embeds the user's
 * query via OpenRouter, and returns the top-k most similar chunks as context.
 * Retrieval failures degrade gracefully to an empty context — they never break chat.
 */
import index from "./rag/index.js";

const EMBEDDING_MODEL = "text-embedding-3-small";
const EMBEDDING_URL = "https://openrouter.ai/api/v1/embeddings";
const EMBED_TIMEOUT_MS = 8000;
const TOP_K = 5;

async function embedQuery(text, apiKey) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), EMBED_TIMEOUT_MS);
  try {
    const response = await fetch(EMBEDDING_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model: EMBEDDING_MODEL, input: text }),
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error("embedding_failed");
    }
    const data = await response.json();
    return data.data[0]?.embedding || null;
  } finally {
    clearTimeout(timeout);
  }
}

function cosineSimilarity(a, b) {
  if (!a || !b || a.length !== b.length) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function formatContext(chunks) {
  return chunks.map((c) => `[${c.source}]\n${c.content}`).join("\n\n---\n\n");
}

/**
 * Retrieve top-k chunks most relevant to the given query.
 * @param {string} query - the text to search by
 * @param {string} apiKey - OpenRouter API key
 * @returns {Promise<string>} a formatted context block (may be empty)
 */
export async function retrieveContext(query, apiKey, topK = TOP_K) {
  try {
    const queryVector = await embedQuery(query, apiKey);
    if (!queryVector) return "";

    const scored = index.chunks
      .map((c) => ({ c, score: cosineSimilarity(queryVector, c.vector) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    return formatContext(scored.map((s) => s.c));
  } catch {
    return "";
  }
}
