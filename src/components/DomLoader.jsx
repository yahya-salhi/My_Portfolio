/** Loading UI for React.lazy — must NOT use R3F/drei (outside Canvas). */
const DomLoader = () => (
  <div
    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
    aria-hidden
  >
    <span className="canvas-loader" />
    <p className="text-secondary text-sm font-medium mt-10">Loading 3D scene…</p>
  </div>
);

export default DomLoader;
