import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import fg from "fast-glob";

const START = "<!-- LH-BUTTONS:START -->";
const END   = "<!-- LH-BUTTONS:END -->";
const HASH_PREFIX = "<!-- LH-BUTTONS:HASH=";

const [,, templateChangedArg, ...changedFromDiff] = process.argv;
const TEMPLATE_CHANGED = String(templateChangedArg || "0") !== "0";

const template = fs.readFileSync("_includes/summary-buttons.md", "utf8");
const templateHash = crypto.createHash("sha1").update(template).digest("hex").slice(0,8);

function encodePathForSrc(relDir) {
  return relDir.replace(/\\/g, "/").split("/").map(encodeURIComponent).join("/");
}
function extractLangFromFilename(filePath) {
  const base = path.basename(filePath);
  const m = base.match(/^summary\.([a-z]{2})\.md$/i);
  return m ? m[1].toLowerCase() : "en";
}
function currentBlockHash(block) {
  const i = block.indexOf(HASH_PREFIX);
  if (i === -1) return null;
  const tail = block.slice(i + HASH_PREFIX.length);
  const j = tail.indexOf("-->");
  if (j === -1) return null;
  return tail.slice(0, j).trim();
}
function inject(md, html) {
  const re = new RegExp(`(${START})([\\s\\S]*?)(${END})`, "m");
  if (!re.test(md)) return null;
  return md.replace(re, `$1\n${html.trim()}\n$3`);
}
function renderTemplate(dirRel, lang) {
  const summarySrc = encodePathForSrc(dirRel);
  const html = template
    .replaceAll("{{SUMMARY_SRC}}", summarySrc)
    .replaceAll("{{LANG}}", lang);
  return `${HASH_PREFIX}${templateHash} -->\n${html}`;
}
function targets() {
  if (!TEMPLATE_CHANGED && changedFromDiff.length > 0) {
    return changedFromDiff.filter(f => f && f.endsWith(".md"));
  }
  return fg.sync(["content/**/summary*.md"], { dot: false });
}

const files = targets();
let updated = 0;

for (const file of files) {
  const raw = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
  if (!raw) continue;

  const idxStart = raw.indexOf(START);
  const idxEnd = raw.indexOf(END);
  if (idxStart === -1 || idxEnd === -1) continue;

  const block = raw.slice(idxStart, idxEnd);
  const existingHash = currentBlockHash(block);

  const dirRel = path.dirname(file).replace(/^content\//, "");
  const lang = extractLangFromFilename(file);
  const rendered = renderTemplate(dirRel, lang);

  if (existingHash === templateHash) continue;

  const next = inject(raw, rendered);
  if (next && next !== raw) {
    fs.writeFileSync(file, next, "utf8");
    updated++;
  }
}

console.log(updated > 0 ? `updated files: ${updated}` : "no updates needed");
