// Trích văn bản nội dung của 5 trang Site cũ (DVTechnic) ra tests/fixtures/legacy-text.json.
// Dùng làm chuẩn so khớp cho Requirement 1.2: Site mới phải giữ mọi tiêu đề, đoạn văn
// và danh sách dịch vụ của Site cũ, chỉ đổi tên thương hiệu.
// Phần thuộc Requirement 8 (số liệu, case study, lời chứng thực) bị loại bỏ.
//
// Chạy: node scripts/extract-legacy.mjs

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = join(root, "tests", "fixtures", "legacy-text.json");

// Trang mới → file HTML cũ, cùng các vùng [comment bắt đầu, comment kết thúc) cần bỏ.
const PAGES = {
  home: {
    file: "index.html",
    exclude: [["<!-- Counter / Metric Highlights Section -->", "<!-- Service Section Three-->"]],
  },
  about: {
    file: "about.html",
    exclude: [["<!-- Performance Metrics Counter Section -->", "<!-- Mission & Core Values Section -->"]],
  },
  services: {
    file: "services.html",
    exclude: [["<!-- Flagship Production Deployments (OpenClaw & Hermes) -->", "<!-- Engagement Models Section -->"]],
  },
  portfolio: {
    file: "portfolio.html",
    exclude: [
      ["<!-- Operational Metrics Bar -->", "<!-- Main Portfolio Section -->"],
      ["<!-- Flagship Spotlight Showcase -->", "<!-- Section Header & Filter Tabs -->"],
      ["<!-- Categorized Case Studies Grid -->", "<!-- Call to Action Banner -->"],
    ],
  },
  // Thẻ liên hệ chứa địa chỉ, email, điện thoại, mã số thuế của DVTechnic:
  // Site mới lấy các mục này từ config/site.ts (Requirement 2.3, 2.5, 2.7).
  contact: {
    file: "contact.html",
    exclude: [["<!-- Contact Information Cards -->", "<!-- Contact Form Section -->"]],
  },
};

// Chuỗi không được còn trong fixture (Requirement 2.1, 8.5).
const FORBIDDEN = [/dvtechnic/i, /openclaw/i, /hermes/i, /\bCDR\b/];

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", mdash: "—", ndash: "–", copy: "©", middot: "·" };

function decode(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === "#") {
      const code = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return String.fromCodePoint(code);
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

function toText(html) {
  return decode(html.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

// Đổi thương hiệu. "CDR" viết đầy đủ thành "call detail record" để giữ nghĩa
// mà vẫn đáp ứng Requirement 8.5 (không còn chuỗi "CDR").
function rebrand(s) {
  return s.replace(/DVTechnic/gi, "Cortexia").replace(/\bCDR\b/g, "call detail record");
}

function cut(html, start, end, file) {
  const i = html.indexOf(start);
  const j = i < 0 ? -1 : html.indexOf(end, i + start.length);
  if (i < 0 || j < 0) throw new Error(`${file}: không tìm thấy vùng loại bỏ "${start}" … "${end}"`);
  return html.slice(0, i) + html.slice(j);
}

function extractPage({ file, exclude }) {
  const path = join(root, file);
  if (!existsSync(path)) {
    throw new Error(`Không tìm thấy ${file}. Site cũ đã bị xoá; fixture hiện có trong tests/fixtures/legacy-text.json vẫn dùng được.`);
  }
  let html = readFileSync(path, "utf8");

  // Bỏ phần không phải nội dung trang.
  html = html
    .replace(/<!--(?![\s\S]*?-->)/g, "")
    .replace(/<head[\s\S]*?<\/head>/i, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<ul[^>]*class="[^"]*breadcumb-nav[^"]*"[\s\S]*?<\/ul>/gi, "");
  for (const [start, end] of exclude) html = cut(html, start, end, file);
  html = html.replace(/<!--[\s\S]*?-->/g, "");

  const texts = [];
  // Tiêu đề h1–h3 và đoạn văn.
  for (const m of html.matchAll(/<(h[1-3]|p)\b[^>]*>([\s\S]*?)<\/\1>/gi)) texts.push(m[2]);
  // Mục danh sách chỉ chứa nội dung inline (danh sách dịch vụ, tính năng).
  for (const m of html.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)) {
    if (!/<(p|div|h[1-6]|ul|ol|li)\b/i.test(m[1])) texts.push(m[1]);
  }

  const seen = new Set();
  const result = [];
  for (const raw of texts) {
    const t = rebrand(toText(raw));
    // Bỏ chuỗi rỗng và chuỗi không có chữ cái (dấu phân cách, số liệu thuần).
    if (!/\p{L}/u.test(t) || seen.has(t)) continue;
    seen.add(t);
    result.push(t);
  }
  return result;
}

function main() {
  const out = {};
  for (const [page, cfg] of Object.entries(PAGES)) {
    const texts = extractPage(cfg);
    if (texts.length === 0) throw new Error(`${cfg.file}: không trích được văn bản nào`);
    const bad = texts.filter((t) => FORBIDDEN.some((re) => re.test(t)));
    if (bad.length) throw new Error(`${cfg.file}: còn chuỗi cấm:\n  ${bad.join("\n  ")}`);
    out[page] = texts;
  }
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, JSON.stringify(out, null, 2) + "\n");
  for (const [page, texts] of Object.entries(out)) console.log(`${page}: ${texts.length} chuỗi`);
  console.log(`Đã ghi ${outFile}`);
}

try {
  main();
} catch (err) {
  console.error(`extract-legacy: ${err.message}`);
  process.exit(1);
}
