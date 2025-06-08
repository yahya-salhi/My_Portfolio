import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  About,
  Contact,
  Experience,
  Education,
  Feedbacks,
  GitHubStats,
  Hero,
  Navbar,
  Skills,
  SkillsSimple,
  Works,
} from "./components";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  console.log("App rendering, isMobile:", isMobile);

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <Toaster position="top-right" />
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        {/* Use simple Skills component on mobile for guaranteed visibility */}
        {isMobile ? <SkillsSimple /> : <Skills />}
        <Experience />
        <Education />
        <Works />
        <GitHubStats />
        <Feedbacks />
        <Contact />
      </div>
    </BrowserRouter>
  );
}

export default App;
