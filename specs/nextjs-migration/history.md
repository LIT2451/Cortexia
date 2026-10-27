# Nhật ký thực thi: nextjs-migration

## 1.1 Trích văn bản Site cũ làm fixture trước khi thay đổi — HOÀN THÀNH

- Thời gian: 2026-10-27 10:39
- File đã đổi: `scripts/extract-legacy.mjs`, `tests/fixtures/legacy-text.json`
- Kiểm chứng: `node scripts/extract-legacy.mjs && node -e "const j=require(\"./tests/fixtures/legacy-text.json\");const k=[\"home\",\"about\",\"services\",\"portfolio\",\"contact\"];if(!k.every(x=>Array.isArray(j[x])&&j[x].length))process.exit(1);if(/dvtechnic|openclaw|hermes|\\bCDR\\b/i.test(JSON.stringify(j)))process.exit(1)"` → exit 0 (Đã ghi /Users/duongquangluan/Desktop/AWS_27/cortexia/tests/fixtures/legacy-text.json) [spec-done tự chạy lại]
- Requirements: 1.2
- Commit: `spec(nextjs-migration): 1.1 Trích văn bản Site cũ làm fixture trước…`
- Ghi chú: Bỏ khối số liệu/case study (Req 8) và thẻ liên hệ cũ của DVTechnic; đổi CDR thành 'call detail record' để đáp ứng 8.5
