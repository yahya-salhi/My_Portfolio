import { useCallback, useRef } from "react";
import { useEffect } from "react";

import { useChat } from "./useChat";

/* ==========================================================================
   useChatPanelBehavior
   Owns all non-presentational panel behavior: focus management, Escape to
   close, outside-click to close, auto-scroll, textarea auto-resize, and the
   form/send handlers. The panel component stays a pure layout renderer.
   Behavior is testable via mock refs — no DOM needed.
   ========================================================================== */

export const useChatPanelBehavior = ({
  open,
  onClose,
  launcherRef,
  messages,
  send,
  stop,
  isLoading,
}) => {
  const panelRef = useRef(null);
  const inputRef = useRef(null);

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

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (isLoading) return;
      send();
    },
    [isLoading, send]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        if (!isLoading) send();
      }
    },
    [isLoading, send]
  );

  const autoResize = useCallback((element) => {
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  }, []);

  return {
    panelRef,
    inputRef,
    handleSubmit,
    handleKeyDown,
    autoResize,
  };
};
