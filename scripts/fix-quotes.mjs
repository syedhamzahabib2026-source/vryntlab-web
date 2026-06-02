/**
 * One-shot fix: escape any bare " characters that appear INSIDE double-quoted
 * TypeScript string literals in brand-knowledge.ts.
 * Run once with: node scripts/fix-quotes.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const FILE = new URL("../src/lib/brand-knowledge.ts", import.meta.url).pathname
  .replace(/^\/([A-Z]:)/, "$1"); // strip leading / on Windows paths

let src = readFileSync(FILE, "utf8");
const lines = src.split("\n");
let changed = 0;

const fixed = lines.map((line, idx) => {
  let result = "";
  let inDQ = false; // inside a double-quoted string
  let inSQ = false; // inside a single-quoted string
  let i = 0;

  while (i < line.length) {
    const ch = line[i];

    // Handle backslash escape — skip the next character
    if (ch === "\\") {
      result += ch + (line[i + 1] ?? "");
      i += 2;
      continue;
    }

    if (ch === '"') {
      if (!inSQ) {
        // Toggle double-quote string state
        inDQ = !inDQ;
        result += ch;
      } else {
        // Inside a single-quoted string — bare " is fine
        result += ch;
      }
    } else if (ch === '"') {
      // This case is identical to ch === '"' — already handled above
      result += ch;
    } else if (ch === "'") {
      if (!inDQ) {
        inSQ = !inSQ;
        result += ch;
      } else {
        result += ch;
      }
    } else {
      result += ch;
    }
    i++;
  }

  if (result !== line) {
    changed++;
    console.log(`  Line ${idx + 1}: ${result.trim().slice(0, 90)}`);
  }
  return result;
});

writeFileSync(FILE, fixed.join("\n"), "utf8");
console.log(`\nDone. ${changed} line(s) changed.`);
