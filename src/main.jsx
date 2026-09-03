import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import App from "./App.jsx";
import "./index.css";

const app = (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

createRoot(document.getElementById("root")).render(
  import.meta.env.DEV ? <StrictMode>{app}</StrictMode> : app
);
