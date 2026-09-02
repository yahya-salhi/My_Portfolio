import PropTypes from "prop-types";

/* ==========================================================================
   ChatMessage
   Renders a single message bubble. One component, two roles:
   - user:      right-aligned, purple-tinted bubble (--color-accent-primary / 20%)
   - assistant: left-aligned glass bubble
   Also renders the typing dots indicator and the inline (bot-style) error
   bubble with a retry action for failed requests (F-17).
   ========================================================================== */

const bubbleClasses = {
  user: "bg-accent-primary/20 text-text-primary",
  assistant: "bg-bg-glass border border-border text-text-primary",
};

const TypingDots = () => (
  <span
    className="inline-flex items-center gap-1"
    role="status"
    aria-label="Assistant is typing"
  >
    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-text-secondary" />
    <span
      className="typing-dot h-1.5 w-1.5 rounded-full bg-text-secondary"
      style={{ animationDelay: "0.15s" }}
    />
    <span
      className="typing-dot h-1.5 w-1.5 rounded-full bg-text-secondary"
      style={{ animationDelay: "0.3s" }}
    />
  </span>
);

const ChatMessage = ({ role, content, typing, isError, onRetry }) => {
  if (typing) {
    return (
      <div className="flex justify-start">
        <div
          className={`max-w-[85%] rounded-2xl rounded-bl-sm px-4 py-3 ${bubbleClasses.assistant}`}
        >
          <TypingDots />
        </div>
      </div>
    );
  }

  const isRight = role === "user";
  const bubble = isError ? bubbleClasses.assistant : bubbleClasses[role];

  return (
    <div className={`flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isRight ? "rounded-br-sm" : "rounded-bl-sm"
        } ${bubble}`}
      >
        {content}
        {isError && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-3 inline-flex min-h-8 items-center justify-center rounded-md border border-border-light bg-bg-glass px-3 py-1.5 text-xs font-semibold text-text-primary transition-colors hover:border-accent-primary hover:shadow-glow"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  role: PropTypes.oneOf(["user", "assistant"]),
  content: PropTypes.string,
  typing: PropTypes.bool,
  isError: PropTypes.bool,
  onRetry: PropTypes.func,
};

export default ChatMessage;
