import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const uploadDir = path.join(root, "hostpoint-upload");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

const result = spawnSync(npmCommand, ["run", "build"], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "production" }
});

if (result.status !== 0) process.exit(result.status ?? 1);

const indexPath = path.join(outDir, "index.html");
if (!existsSync(indexPath)) {
  console.error("Hostpoint build failed: out/index.html was not generated.");
  process.exit(1);
}

const html = readFileSync(indexPath, "utf8");
if (html.includes("ariankapllanaj.github.io/klykgo.ch")) {
  console.error("Hostpoint build failed: GitHub Pages production URL is still present in the generated homepage.");
  process.exit(1);
}

rmSync(uploadDir, { recursive: true, force: true });
mkdirSync(uploadDir, { recursive: true });
cpSync(outDir, uploadDir, { recursive: true });

console.log("\nHostpoint package created successfully:");
console.log(`  ${uploadDir}`);
console.log("Upload the CONTENTS of hostpoint-upload/ to the Hostpoint document root for klykgo.ch.");
