#!/usr/bin/env node
import { readFileSync } from "fs";

let input = {};
try {
  input = JSON.parse(readFileSync(0, "utf8"));
} catch {
  process.exit(0);
}

const prompt = input.prompt || input.text || "";
const secretPatterns = [
  /VITE_EMAILJS_[A-Z_]+\s*=\s*\S+/,
  /\.env\s+contents/i,
  /service_[a-z0-9]+.*template_/i,
];

for (const pattern of secretPatterns) {
  if (pattern.test(prompt)) {
    console.error(
      "[portfolio-hook] Warning: prompt may contain secrets. Redact before sending."
    );
    break;
  }
}

process.exit(0);
