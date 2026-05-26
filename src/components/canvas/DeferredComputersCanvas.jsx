import { useEffect, useState } from "react";
import LazyComputersCanvas from "./LazyComputersCanvas";

const MOBILE_MQ = "(max-width: 768px)";

/**
 * 3D loads only on user request (saves ~1MB JS parse + GLTF on Lighthouse).
 * Skipped on mobile.
 */
const DeferredComputersCanvas = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.matchMedia(MOBILE_MQ).matches);
  }, []);

  if (isMobile) {
    return null;
  }

  if (!shouldLoad) {
    return (
      <button
        type="button"
        onClick={() => setShouldLoad(true)}
        className="absolute bottom-28 left-1/2 z-10 -translate-x-1/2 rounded-xl border border-secondary/40 bg-tertiary/90 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-[#915EFF] hover:bg-[#915EFF]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#915EFF]"
        aria-label="Load interactive 3D computer model"
      >
        View 3D workspace
      </button>
    );
  }

  return <LazyComputersCanvas />;
};

export default DeferredComputersCanvas;
