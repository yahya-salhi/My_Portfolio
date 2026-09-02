import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import ChatMessage from "./ChatMessage";
import { useChat } from "./useChat";

/* ==========================================================================
   ChatbotPanel
   The lazy-loaded chat dialog.
   - Desktop: 380x500 glass corner popover (bottom-right, above launcher).
   - Mobile (≤ sm): full-screen overlay.
   - role="dialog" + aria-modal + Escape / outside-click to close.
   - Focus lands on the textarea on open; returns to the launcher on close.
   - Welcome message + 2-3 suggestion chips before the first real message.
   ========================================================================== */

const WELCOME =
  "Hi, I'm Yahya's AI assistant. Ask me about his experience, skills, or projects.";

const SUGGESTIONS = [
  "What are your main skills?",
  "Tell me about JobPilot",
  "How can I contact Yahya?",
];

const ChevronCloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

const SendIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
  </svg>
);

const ChatbotPanel = ({ open, onClose, launcherRef }) => {
  const reduced = useReducedMotion();
  const panelRef = useRef(null);
  const inputRef = useRef(null);

  const {
    messages,
    input,
    setInput,
    send,
    retry,
    stop,
    isLoading,
    error,
    hasHistory,
  } = useChat();

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      launcherRef.current?.focus();
    }
  }, [open, launcherRef]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        if (isLoading) stop();
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, isLoading, stop]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        if (isLoading) stop();
        onClose();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, onClose, isLoading, stop]);

  useEffect(() => {
    if (!open || isLoading) return;
    const list = panelRef.current?.querySelector("[data-chat-scroll]");
    if (list) list.scrollTop = list.scrollHeight;
  }, [open, messages, isLoading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLoading) return;
    send();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!isLoading) send();
    }
  };

  const autoResize = (element) => {
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  const suggestionsVisible = !hasHistory && !isLoading;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="chatbot-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Chat with Yahya's AI assistant"
          aria-describedby="chatbot-panel-scroll"
          initial={{ opacity: 0, y: reduced ? 0 : 24, scale: reduced ? 1 : 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: reduced ? 0 : 24, scale: reduced ? 1 : 0.98 }}
          transition={{ duration: reduced ? 0 : 0.2, ease: "easeOut" }}
          className="fixed bottom-24 right-6 z-50 flex h-[min(500px,calc(100vh-7rem))] w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-border-light bg-bg-secondary text-text-primary shadow-lg
                   max-sm:inset-0 max-sm:h-[100dvh] max-sm:w-full max-sm:max-w-none max-sm:rounded-none max-sm:border-0"
        >
          <div className="flex items-center justify-between border-b border-border bg-bg-glass px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="accent-dot h-2 w-2 rounded-full" aria-hidden="true" />
              <p className="text-sm font-semibold text-text-primary">
                Ask Yahya's assistant
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (isLoading) stop();
                onClose();
              }}
              aria-label="Close chatbot"
              className="flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-bg-glass-hover hover:text-text-primary"
            >
              <ChevronCloseIcon />
            </button>
          </div>

          <div
            id="chatbot-panel-scroll"
            data-chat-scroll
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            aria-live="polite"
            aria-atomic="false"
          >
            {!hasHistory && (
              <div className="mb-2 space-y-3">
                <ChatMessage role="assistant" content={WELCOME} />
                {suggestionsVisible && (
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        className="inline-flex min-h-8 items-center rounded-full border border-border-light bg-bg-glass px-3 py-1.5 text-xs text-text-secondary transition-colors hover:border-accent-primary hover:text-text-primary"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {messages.map((m) => (
              <ChatMessage key={m.id} role={m.role} content={m.content} />
            ))}

            {isLoading && <ChatMessage typing />}

            {error && (
              <ChatMessage
                role="assistant"
                content="Something went wrong. Please try again."
                isError
                onRetry={retry}
              />
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 border-t border-border bg-bg-glass px-3 py-3"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                autoResize(event.target);
              }}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Ask me anything…"
              aria-label="Message the assistant"
              className="max-h-32 flex-1 resize-none rounded-lg border border-border bg-bg-glass px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/40"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label={isLoading ? "Stop generating" : "Send message"}
              onClick={(event) => {
                if (isLoading) {
                  event.preventDefault();
                  stop();
                }
              }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-primary text-text-primary shadow-glow transition-colors hover:bg-accent-tertiary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <span className="h-3 w-3 rounded-sm border-2 border-text-primary border-t-transparent" />
              ) : (
                <SendIcon />
              )}
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

ChatbotPanel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  launcherRef: PropTypes.shape({ current: PropTypes.any }),
};

export default ChatbotPanel;
