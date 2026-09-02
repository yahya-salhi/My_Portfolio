import { useCallback, useRef, useState } from "react";

/* ==========================================================================
   useChat
   Owns the chatbot conversation state and the fetch to /api/chat.
   Non-streaming: the Edge Function returns the full response in one shot.
   React state only — no persistence (per project rules).
   ========================================================================== */

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const hasHistory = messages.length > 0;

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsLoading(false);
  }, []);

  const send = useCallback(
    async (rawText) => {
      const text = (rawText ?? input).trim();
      if (!text || isLoading) return;

      const userMessage = { id: `user-${Date.now()}`, role: "user", content: text };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setError(null);
      setIsLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMessage].map(({ role, content }) => ({
              role,
              content,
            })),
          }),
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`chat_error_${res.status}`);
        }

        const data = await res.json();
        const content =
          typeof data?.content === "string" && data.content.trim()
            ? data.content
            : "Hmm, I didn't get a usable answer back. Could you try again?";

        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            role: "assistant",
            content,
          },
        ]);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err);
      } finally {
        if (abortRef.current === controller) abortRef.current = null;
        setIsLoading(false);
      }
    },
    [input, isLoading, messages]
  );

  const retry = useCallback(() => {
    if (error) {
      setError(null);
      send(messages[messages.length - 1]?.content ?? "");
    }
  }, [error, send, messages]);

  return { messages, input, setInput, send, retry, stop, isLoading, error, hasHistory };
};
