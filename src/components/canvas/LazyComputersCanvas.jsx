import { lazy, Suspense } from "react";
import DomLoader from "../DomLoader";

const ComputersCanvas = lazy(() => import("./Computers"));

const LazyComputersCanvas = () => (
  <Suspense fallback={<DomLoader />}>
    <ComputersCanvas />
  </Suspense>
);

export default LazyComputersCanvas;
