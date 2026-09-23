import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";



function hasFileWithExtension(directory, extension) {
  if (!existsSync(directory)) return false;
  return readdirSync(directory, { recursive: true }).some((entry) =>
    typeof entry === "string" && entry.endsWith(extension)
  );
}

const root = process.cwd();
const folder = existsSync(path.join(root, "hostpoint-upload")) ? "hostpoint-upload" : "out";
const deployDir = path.join(root, folder);
const required = [
  "index.html",
  "404.html",
  "account/index.html",
  "reset-password/index.html",
  "klykgo-logo.jpg",
  "klykgo-logo-mark.jpg",
  "robots.txt",
  "sitemap.xml",
  ".htaccess"
];

const missing = required.filter((file) => !existsSync(path.join(deployDir, file)));
if (missing.length) {
  console.error(`Missing production files in ${folder}:`);
  for (const file of missing) console.error(` - ${file}`);
  process.exit(1);
}

const index = readFileSync(path.join(deployDir, "index.html"), "utf8");
if (index.includes("ariankapllanaj.github.io/klykgo.ch")) {
  console.error("GitHub Pages URL is still present in the production homepage.");
  process.exit(1);
}

const chunksDir = path.join(deployDir, "_next", "static", "chunks");
const cssDir = path.join(deployDir, "_next", "static", "css");
if (!hasFileWithExtension(chunksDir, ".js")) {
  console.error("No Next.js JavaScript chunks were found. Interactive controls will not work.");
  process.exit(1);
}
if (!hasFileWithExtension(cssDir, ".css")) {
  console.error("No Next.js CSS bundle was found.");
  process.exit(1);
}
if (!index.includes('/_next/static/chunks/')) {
  console.error("The homepage does not reference the Next.js JavaScript chunks.");
  process.exit(1);
}

console.log(`Production check passed for ${folder}/.`);
console.log("Interactive JavaScript chunks and CSS bundles are present.");
