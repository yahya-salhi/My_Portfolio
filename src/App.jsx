import { lazy, Suspense, useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { About, Hero, Navbar } from "./components";
import SectionFallback from "./components/SectionFallback";

const Skills = lazy(() => import("./components/Skills"));
const SkillsSimple = lazy(() => import("./components/SkillsSimple"));
const Experience = lazy(() => import("./components/Experience"));
const Education = lazy(() => import("./components/Education"));
const Works = lazy(() => import("./components/Works"));
const GitHubStats = lazy(() => import("./components/GitHubStats"));
const Feedbacks = lazy(() => import("./components/Feedbacks"));
const Contact = lazy(() => import("./components/Contact"));

const LazySection = ({ children }) => (
  <Suspense fallback={<SectionFallback />}>{children}</Suspense>
);

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <main className="relative z-0 bg-primary">
      <Toaster position="top-right" />
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <About />
      <LazySection>
        {isMobile ? <SkillsSimple /> : <Skills />}
      </LazySection>
      <LazySection>
        <Experience />
      </LazySection>
      <LazySection>
        <Education />
      </LazySection>
      <LazySection>
        <Works />
      </LazySection>
      <LazySection>
        <GitHubStats />
      </LazySection>
      <LazySection>
        <Feedbacks />
      </LazySection>
      <LazySection>
        <Contact />
      </LazySection>
    </main>
  );
}

export default App;
