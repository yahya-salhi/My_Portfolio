import { Suspense, lazy, useRef, useState } from "react";

import ChatbotButton from "./ChatbotButton";

/* ==========================================================================
   ChatbotWidget
   Eager container that owns the open/close state and the launcher ref,
   and lazy-loads the heavier ChatbotPanel. The button stays eager so the
   entry point is always present; the panel (Framer Motion + chat logic)
   only loads on first open.
   ========================================================================== */

const ChatbotPanel = lazy(() => import("./ChatbotPanel"));

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const launcherRef = useRef(null);

  const toggle = () => setOpen((o) => !o);
  const close = () => setOpen(false);

  return (
    <>
      <Suspense fallback={null}>
        <ChatbotPanel open={open} onClose={close} launcherRef={launcherRef} />
      </Suspense>
      <ChatbotButton
        open={open}
        onToggle={toggle}
        buttonRef={launcherRef}
      />
    </>
  );
};

export default ChatbotWidget;
