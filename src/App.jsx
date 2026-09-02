import { Toaster } from "react-hot-toast";
import {
  About,
  Contact,
  Education,
  Experience,
  GitHubStats,
  Hero,
  Navbar,
  Skills,
  Works,
} from "./components";
import ChatbotWidget from "./components/chatbot/ChatbotWidget";

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
      <Contact />
      <ChatbotWidget />
    </main>
  );
}

export default App;
