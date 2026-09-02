// Health probe. Uses Vercel's Web-standard `fetch` export so the Response is
// returned (a bare default function returning a Response is dropped on the
// Node runtime). Also confirms /api function routing end-to-end.
export default {
  async fetch() {
    return new Response(
      JSON.stringify({ ok: true, time: new Date().toISOString() }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  },
};
