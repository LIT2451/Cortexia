#!/usr/bin/env node
// Post-build checks for the static export (Node built-ins only).
// Usage: node scripts/check-build.mjs [outDir=out] [--root <sourceRoot>]
// Prints every problem found and exits 1, or exits 0 when the build is clean.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { FORBIDDEN } from "./forbidden-names.mjs";

const ORIGIN = "https://digitalcortexia.com";
const ROUTES = ["/", "/about", "/services", "/portfolio", "/contact"];
const PAGES = ["index.html", "about.html", "services.html", "portfolio.html", "contact.html", "404.html"];
const SOURCE_DIRS = ["app", "components", "config", "content", "lib", "public"];
// File names of the template's sample media.
const SAMPLE_MEDIA = /\.(mp4|webm|mov)$|testimonial-\d|workflow-0\d|features\.png|hero-image|avatar/i;
const TEXT_EXT = new Set([".html", ".txt", ".xml", ".js", ".css", ".json", ".svg", ".ts", ".tsx", ".mjs", ".md", ""]);

function parseArgs(argv) {
  const args = { out: "out", root: process.cwd() };
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--root") args.root = argv[++i];
    else rest.push(argv[i]);
  }
  if (rest[0]) args.out = rest[0];
  return { out: resolve(args.out), root: resolve(args.root) };
}

function walk(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) files.push(...walk(p));
    else files.push(p);
  }
  return files;
}

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

/** Map an internal URL to a file in out/, or null if nothing serves it. */
function resolveUrl(out, fromFile, url) {
  let path = decode(url).split("#")[0].split("?")[0];
  if (path === "") return fromFile;
  try {
    path = decodeURIComponent(path);
  } catch {
    return null;
  }
  const abs = path.startsWith("/") ? join(out, path) : join(dirname(fromFile), path);
  const candidates = [abs, `${abs}.html`, join(abs, "index.html")];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile()) ?? null;
}

const isInternal = (u) => !/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(u) || u.startsWith(ORIGIN + "/");

function attr(tag, name) {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return m ? decode(m[1] ?? m[2] ?? m[3] ?? "") : undefined;
}

function metaContent(html, key) {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    if (attr(tag, "property") === key || attr(tag, "name") === key) return attr(tag, "content");
  }
  return undefined;
}

export function checkBuild({ out, root }) {
  const errors = [];
  const err = (file, msg) => errors.push(`${file}: ${msg}`);

  if (!existsSync(out)) return [`${out}: thư mục build không tồn tại`];
  const files = walk(out);
  const rel = (f) => relative(out, f) || ".";

  // Pages
  for (const page of PAGES) {
    const file = join(out, page);
    if (!existsSync(file)) {
      err(page, "thiếu file");
      continue;
    }
    const html = readFileSync(file, "utf8");
    const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] ?? "";
    if (attr(htmlTag, "lang") !== "en") err(page, 'thiếu lang="en" trên <html>');
    const h1 = (html.match(/<h1[\s>]/gi) ?? []).length;
    if (h1 !== 1) err(page, `có ${h1} thẻ h1 (cần đúng 1)`);
    if (!/<title>[^<]+<\/title>/i.test(html)) err(page, "thiếu <title>");

    const isRoute = page !== "404.html";
    if (isRoute) {
      if (!metaContent(html, "description")) err(page, "thiếu meta description");
      for (const key of ["og:type", "og:url", "og:title", "og:description", "og:image"]) {
        const v = metaContent(html, key);
        if (!v) err(page, `thiếu ${key}`);
        else if ((key === "og:url" || key === "og:image") && !v.startsWith(ORIGIN))
          err(page, `${key} không tuyệt đối trên ${ORIGIN}: ${v}`);
      }
      const canonical = (html.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/i) ?? [])[0];
      const href = canonical && attr(canonical, "href");
      if (!href) err(page, "thiếu canonical");
      else if (!href.startsWith(ORIGIN)) err(page, `canonical không tuyệt đối trên ${ORIGIN}: ${href}`);
      if (!/<a\b[^>]*href=["']\/contact["']/i.test(html)) err(page, "không có liên kết tới /contact");
    } else if (!/<a\b[^>]*href=["']\/["']/i.test(html)) {
      err(page, "trang 404 thiếu liên kết về /");
    }
  }

  // Every HTML file: internal references, alerts, image alt
  for (const file of files.filter((f) => f.endsWith(".html"))) {
    const html = readFileSync(file, "utf8");
    if (/\balert\(/.test(html)) err(rel(file), "có lời gọi alert(");
    for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
      if (attr(tag, "alt") === undefined) err(rel(file), `<img> thiếu alt: ${tag.slice(0, 80)}`);
    }
    for (const tag of html.match(/<[a-z][^>]*>/gi) ?? []) {
      const urls = [];
      for (const name of ["href", "src"]) {
        const v = attr(tag, name);
        if (v !== undefined) urls.push(v);
      }
      for (const name of ["srcset", "imagesrcset"]) {
        const v = attr(tag, name);
        if (v) urls.push(...v.split(",").map((part) => part.trim().split(/\s+/)[0]).filter(Boolean));
      }
      for (const u of urls) {
        if (!isInternal(u)) continue;
        const local = u.startsWith(ORIGIN) ? u.slice(ORIGIN.length) : u;
        if (!resolveUrl(out, file, local)) err(rel(file), `tài nguyên nội bộ không tồn tại: ${u}`);
      }
    }
  }

  // CSS url(...) references (fonts, images)
  for (const file of files.filter((f) => f.endsWith(".css"))) {
    const css = readFileSync(file, "utf8");
    for (const m of css.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
      const u = m[1];
      if (u.startsWith("data:") || !isInternal(u)) continue;
      if (!resolveUrl(out, file, u)) err(rel(file), `tài nguyên trong CSS không tồn tại: ${u}`);
    }
  }

  // Template sample media
  for (const file of files) {
    if (SAMPLE_MEDIA.test(rel(file))) err(rel(file), "file ảnh/video mẫu của Template");
  }

  // Forbidden names in the build output and in the source tree
  const sources = SOURCE_DIRS.map((d) => join(root, d))
    .filter((d) => existsSync(d))
    .flatMap(walk);
  for (const file of [...files, ...sources]) {
    if (!TEXT_EXT.has(extname(file))) continue;
    const text = readFileSync(file, "utf8");
    for (const [re, label] of FORBIDDEN) {
      if (re.test(text)) err(file.startsWith(out) ? rel(file) : relative(root, file), `chứa chuỗi cấm "${label}"`);
    }
  }

  // sitemap, robots, CNAME, icon
  const sitemap = join(out, "sitemap.xml");
  if (!existsSync(sitemap)) err("sitemap.xml", "thiếu file");
  else {
    const locs = [...readFileSync(sitemap, "utf8").matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]).sort();
    const expected = ROUTES.map((r) => (r === "/" ? ORIGIN : ORIGIN + r)).sort();
    if (JSON.stringify(locs) !== JSON.stringify(expected))
      err("sitemap.xml", `URL không khớp. Có: ${locs.join(", ")}. Cần: ${expected.join(", ")}`);
  }
  const robots = join(out, "robots.txt");
  if (!existsSync(robots)) err("robots.txt", "thiếu file");
  else if (!readFileSync(robots, "utf8").includes(`Sitemap: ${ORIGIN}/sitemap.xml`))
    err("robots.txt", `thiếu dòng "Sitemap: ${ORIGIN}/sitemap.xml"`);
  const cname = join(out, "CNAME");
  if (!existsSync(cname)) err("CNAME", "thiếu file");
  else if (readFileSync(cname, "utf8").trim() !== "digitalcortexia.com") err("CNAME", "nội dung khác digitalcortexia.com");
  if (!existsSync(join(out, "icon.svg"))) err("icon.svg", "thiếu favicon");

  return errors;
}

const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(new URL(import.meta.url).pathname);
if (isMain) {
  const opts = parseArgs(process.argv.slice(2));
  const errors = checkBuild(opts);
  if (errors.length > 0) {
    console.error(`check-build: ${errors.length} lỗi`);
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  console.log(`check-build: OK (${relative(process.cwd(), opts.out) || opts.out})`);
}
