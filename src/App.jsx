import { useState, useEffect } from "react";
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
import ConsentBanner from "./components/ConsentBanner";
import Footer from "./components/Footer";
import Privacy from "./components/Privacy";

function App() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const isPrivacy = hash === "#/privacy";

  return (
    <main className="relative z-0 bg-primary">
      <Toaster position="top-right" />
      {isPrivacy ? (
        <Privacy />
      ) : (
        <>
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Education />
          <Works />
          <GitHubStats />
          <Contact />
        </>
      )}
      <Footer />
      <ConsentBanner />
      <ChatbotWidget />
    </main>
  );
}

export default App;
