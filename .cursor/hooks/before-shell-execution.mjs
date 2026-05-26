#!/usr/bin/env node
import { readFileSync } from "fs";

const allow = () => {
  console.log(JSON.stringify({ permission: "allow" }));
  process.exit(0);
};

let input = {};
try {
  const raw = readFileSync(0, "utf8");
  if (raw && raw.trim()) {
    input = JSON.parse(raw);
  }
} catch {
  allow();
}

const command = input.command || "";

const denyPatterns = [
  /git\s+push\s+.*--force/i,
  /git\s+push\s+-f\b/i,
  /git\s+reset\s+--hard/i,
  /git\s+add\s+[^&]*\.env\b/i,
  /git\s+commit[^&]*\.env/i,
];

for (const pattern of denyPatterns) {
  if (pattern.test(command)) {
    console.log(
      JSON.stringify({
        permission: "deny",
        user_message:
          "Blocked: destructive git or staging .env. See WORKFLOW.md.",
        agent_message:
          "Hook blocked shell command. Do not retry without user approval.",
      })
    );
    process.exit(0);
  }
}

if (/npm\s+run\s+deploy\b/i.test(command)) {
  console.log(
    JSON.stringify({
      permission: "ask",
      user_message:
        'Deploy needs explicit "approve deploy" in chat before running.',
      agent_message: "Confirm the user approved deploy in this session.",
    })
  );
  process.exit(0);
}

allow();
