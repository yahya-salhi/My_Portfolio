#!/usr/bin/env node
import { readFileSync } from "fs";
import { spawnSync } from "child_process";
import path from "path";

let input = {};
try {
  input = JSON.parse(readFileSync(0, "utf8"));
} catch {
  process.exit(0);
}

const filePath = input.file_path || input.path || "";
const ext = path.extname(filePath);
if (!/\.(jsx?|tsx?)$/.test(ext) || !filePath.includes("src")) {
  process.exit(0);
}

const result = spawnSync("npm", ["run", "lint"], {
  cwd: process.cwd(),
  shell: true,
  encoding: "utf8",
});

if (result.status !== 0) {
  console.error("[portfolio-hook] lint reported issues after edit.");
}

process.exit(0);
