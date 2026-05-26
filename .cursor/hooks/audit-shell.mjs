#!/usr/bin/env node
import { readFileSync } from "fs";

let input = {};
try {
  input = JSON.parse(readFileSync(0, "utf8"));
} catch {
  process.exit(0);
}

const command = input.command || input.tool_input?.command || "";
if (/npm\s+run\s+(build|deploy|preview)\b/.test(command)) {
  console.error(`[portfolio-hook] Shell audit: ${command}`);
}

process.exit(0);
