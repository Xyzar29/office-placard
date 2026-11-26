// Office Artifacts: The One-Line Placard Contest
// Writes a single museum placard line for an ordinary office object
// treated as an ancient artifact, to $MAKEFUN_OUTPUT_DIR/entry.txt.

import { chmodSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Printer, c. 2007. Plastic, toner, spite. Ritual object of the open-plan tribe; fed paper and prayer daily, it answered only in error codes, and was worshipped anyway.";

// Self-check against the kit gate: 1 to 180 characters, a single line,
// and not only white space. Fail loudly instead of writing an invalid entry.
if (LINE.length < 1 || LINE.length > 180) {
  throw new Error(`placard is ${LINE.length} characters, must be 1-180`);
}
if (LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error("placard must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

// Clear only the directory's contents, never the directory itself
// (the grader mounts it; removing it causes EPERM).
mkdirSync(outDir, { recursive: true });
for (const entry of readdirSync(outDir)) {
  rmSync(join(outDir, entry), { recursive: true, force: true });
}

writeFileSync(join(outDir, "entry.txt"), LINE + "\n", {
  encoding: "utf8",
  mode: 0o644,
});
// Enforce 0644 explicitly: the process umask may otherwise strip bits.
chmodSync(join(outDir, "entry.txt"), 0o644);
