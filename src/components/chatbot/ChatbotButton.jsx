import PropTypes from "prop-types";

/* ==========================================================================
   ChatbotButton
   The fixed, always-visible entry point for the chatbot widget.
   Eager-loaded (no lazy boundary) so it is present on first paint.
   - 56px circular button, bottom-right, primary gradient + glow pulse.
   - Toggles its icon (chat <-> close) from the controlled `open` prop.
   - Accessible label reflects open/close state; focus returns here on close.
   ========================================================================== */

const ChatIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="26"
    height="26"
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

const ChatbotButton = ({ open, onToggle, buttonRef }) => {
  const label = open ? "Close chatbot" : "Open chatbot";

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={onToggle}
      aria-label={label}
      aria-expanded={open}
      aria-controls="chatbot-panel"
      className="chatbot-launcher primary-gradient fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-text-primary shadow-glow transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      <span className="sr-only">{label}</span>
      {open ? <CloseIcon /> : <ChatIcon />}
    </button>
  );
};

ChatbotButton.propTypes = {
  open: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  buttonRef: PropTypes.shape({ current: PropTypes.any }),
};

export default ChatbotButton;
