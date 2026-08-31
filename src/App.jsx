import { Toaster } from "react-hot-toast";
import {
  About,
  Contact,
  Education,
  Experience,
  Feedbacks,
  GitHubStats,
  Hero,
  Navbar,
  Skills,
  Works,
} from "./components";

function App() {
  return (
    <main className="relative z-0 bg-primary">
      <Toaster position="top-right" />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Works />
      <GitHubStats />
      <Feedbacks />
      <Contact />
    </main>
  );
}

export default App;
