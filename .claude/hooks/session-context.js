#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function readIfExists(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8").trim();
  } catch {
    return null;
  }
}

const claudeDir = path.join(__dirname, "..");
const context = readIfExists(path.join(claudeDir, "PROJECT_CONTEXT.md"));
const rule = readIfExists(path.join(claudeDir, "rule.md"));

const sections = [];
if (context) {
  sections.push(
    "# .claude/PROJECT_CONTEXT.md — repo knowledge (read before writing any code)\n\n" + context
  );
}
if (rule) {
  sections.push(
    "# .claude/rule.md — mandatory coding rules (must follow exactly)\n\n" + rule
  );
}

if (sections.length > 0) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "SessionStart",
        additionalContext: sections.join("\n\n---\n\n"),
      },
    })
  );
}
