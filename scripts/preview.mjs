import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const base = existsSync(path.join(root, "hostpoint-upload"))
  ? path.join(root, "hostpoint-upload")
  : path.join(root, "out");
const port = Number(process.env.PORT || 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8"
};

createServer((req, res) => {
  const raw = decodeURIComponent((req.url || "/").split("?")[0]);
  let requested = raw.replace(/^\/+/, "");
  let file = path.join(base, requested);

  if (!requested) file = path.join(base, "index.html");
  else if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, "index.html");
  else if (!existsSync(file) && !path.extname(file)) file = path.join(base, requested, "index.html");

  if (!existsSync(file)) file = path.join(base, "404.html");

  res.statusCode = file.endsWith("404.html") ? 404 : 200;
  res.setHeader("Content-Type", types[path.extname(file)] || "application/octet-stream");
  createReadStream(file).pipe(res);
}).listen(port, () => {
  console.log(`KLYKGO production preview: http://localhost:${port}`);
});
