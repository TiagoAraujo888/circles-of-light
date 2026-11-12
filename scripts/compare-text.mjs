import fs from "node:fs";
import path from "node:path";

const deployDir = process.argv[2] || "/workspace/circles-of-light-deploy/en";
const builtDir = process.argv[3] || path.join(process.cwd(), "_site/en");

const pages = [
  "index.html",
  "circle.html",
  "reflect.html",
  "about.html",
  "questions.html",
  "contact.html",
  "thanks.html",
  "privacy.html",
];

function visibleText(html) {
  let s = html;
  s = s.replace(/<!--[\s\S]*?-->/g, " ");
  s = s.replace(/<script[\s\S]*?<\/script>/gi, " ");
  s = s.replace(/<style[\s\S]*?<\/style>/gi, " ");
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<\/(p|div|li|h1|h2|h3|h4|section|article|header|footer|nav|figure|aside|blockquote|tr|dt|dd|summary|label|button|option|figcaption)>/gi, "\n");
  s = s.replace(/<[^>]+>/g, " ");
  s = s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
  s = s.replace(/[ \t]+\n/g, "\n").replace(/\n[ \t]+/g, "\n");
  s = s.replace(/[ \t]{2,}/g, " ");
  s = s.replace(/\n{3,}/g, "\n\n");
  return s.trim();
}

function words(s) {
  return s.split(/\s+/).filter(Boolean);
}

let anyDiff = false;
for (const page of pages) {
  const aPath = path.join(deployDir, page);
  const bPath = path.join(builtDir, page);
  const a = visibleText(fs.readFileSync(aPath, "utf8"));
  const b = visibleText(fs.readFileSync(bPath, "utf8"));
  if (a === b) {
    console.log(`OK  ${page}`);
    continue;
  }
  anyDiff = true;
  console.log(`DIFF  ${page}`);
  const aw = a.split("\n");
  const bw = b.split("\n");
  const max = Math.max(aw.length, bw.length);
  let shown = 0;
  for (let i = 0; i < max && shown < 40; i++) {
    if ((aw[i] || "") !== (bw[i] || "")) {
      console.log(`  line ${i + 1}`);
      console.log(`    deploy: ${JSON.stringify(aw[i] || "")}`);
      console.log(`    built:  ${JSON.stringify(bw[i] || "")}`);
      shown++;
    }
  }
  if (a.replace(/\s+/g, " ") === b.replace(/\s+/g, " ")) {
    console.log("  (same words if all whitespace is collapsed)");
  } else {
    const A = new Set(words(a));
    const B = new Set(words(b));
    const onlyA = [...A].filter((w) => !B.has(w));
    const onlyB = [...B].filter((w) => !A.has(w));
    if (onlyA.length) console.log("  only in deploy:", onlyA.slice(0, 30).join(" | "));
    if (onlyB.length) console.log("  only in built:", onlyB.slice(0, 30).join(" | "));
  }
}

process.exit(anyDiff ? 1 : 0);
