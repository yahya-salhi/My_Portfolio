import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const app = <App />;

createRoot(document.getElementById("root")).render(
  import.meta.env.DEV ? <StrictMode>{app}</StrictMode> : app
);
