import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "privacy-consent-dismissed";

const ConsentBanner = () => {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable — do not show banner
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // best-effort
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ y: reduced ? 0 : 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: reduced ? 0 : 24, opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.25, ease: "easeOut" }}
          className="fixed bottom-0 inset-x-0 z-50 flex justify-center px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <div className="flex w-full max-w-2xl flex-col gap-3 rounded-xl border border-border-light bg-bg-secondary p-4 shadow-lg sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <p className="text-sm leading-relaxed text-text-secondary">
              This site stores GitHub stats locally in your browser. No tracking
              cookies are used.{" "}
              <a
                href="/#/privacy"
                className="font-medium text-text-accent underline underline-offset-2 transition-colors hover:text-accent-secondary"
              >
                Privacy policy
              </a>
            </p>
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex shrink-0 items-center justify-center rounded-lg border border-border-light bg-bg-glass px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent-primary hover:text-accent-primary"
            >
              Got it
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConsentBanner;
