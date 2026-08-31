import { Suspense, lazy } from "react";
import Hero from "./Hero";
import Navbar from "./Navbar";
import About from "./About";
import SectionFallback from "./SectionFallback";

const lazySection = (factory) => {
  const Component = lazy(factory);
  const Wrapped = (props) => (
    <Suspense fallback={<SectionFallback />}>
      <Component {...props} />
    </Suspense>
  );
  Wrapped.displayName = `LazySection(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};

const Skills = lazySection(() => import("./Skills"));
const Experience = lazySection(() => import("./Experience"));
const Education = lazySection(() => import("./Education"));
const Works = lazySection(() => import("./Works"));
const GitHubStats = lazySection(() => import("./GitHubStats"));
const Feedbacks = lazySection(() => import("./Feedbacks"));
const Contact = lazySection(() => import("./Contact"));

export {
  Hero,
  Navbar,
  About,
  Skills,
  Experience,
  Education,
  Works,
  GitHubStats,
  Feedbacks,
  Contact,
};
