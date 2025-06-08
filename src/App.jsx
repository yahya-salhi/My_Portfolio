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
  Works,
} from "./components";

function App() {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <Toaster position="top-right" />
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Skills />
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
