import { spawnSync } from "node:child_process";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { OLD_BRAND } from "../scripts/forbidden-names.mjs";

const script = join(process.cwd(), "scripts/check-build.mjs");
const fixtures = join(process.cwd(), "tests/fixtures");

// --root points at the fixture itself so the source scan does not read the real repo.
function runDir(dir: string) {
  const r = spawnSync(process.execPath, [script, dir, "--root", dir], { encoding: "utf8" });
  return { code: r.status, output: r.stdout + r.stderr };
}
const run = (name: string) => runDir(join(fixtures, name));

// The bad fixture holds a placeholder instead of the old brand, so the repo stays free of it.
// Copy it to a temp dir and put the real name back before checking.
function runBad() {
  const dir = mkdtempSync(join(tmpdir(), "check-build-bad-"));
  try {
    cpSync(join(fixtures, "build-bad"), dir, { recursive: true });
    const index = join(dir, "index.html");
    writeFileSync(index, readFileSync(index, "utf8").replace("__OLD_BRAND__", OLD_BRAND));
    return runDir(dir);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

describe("scripts/check-build.mjs", () => {
  it("bản đúng thoát mã 0", () => {
    const r = run("build-good");
    expect(r.output).toContain("check-build: OK");
    expect(r.code).toBe(0);
  });

  it("bản lỗi thoát mã 1 và liệt kê từng lỗi", () => {
    const r = runBad();
    expect(r.code).toBe(1);
    expect(r.output).toContain("index.html: tài nguyên nội bộ không tồn tại: /images/missing.png");
    expect(r.output).toContain("index.html: có 2 thẻ h1 (cần đúng 1)");
    expect(r.output).toContain(`index.html: chứa chuỗi cấm "${OLD_BRAND.toLowerCase()}"`);
    expect(r.output).toContain("index.html: og:url không tuyệt đối trên https://digitalcortexia.com: /about");
  });

  it("báo lỗi khi một ảnh nội dung dùng ở nhiều vị trí hoặc hai file ảnh trùng nội dung", () => {
    const dir = mkdtempSync(join(tmpdir(), "check-build-dup-"));
    try {
      cpSync(join(fixtures, "build-good"), dir, { recursive: true });
      const jpg = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 1, 2, 3]);
      writeFileSync(join(dir, "images/a.jpg"), jpg);
      writeFileSync(join(dir, "images/b.jpg"), jpg);
      writeFileSync(join(dir, "images/c.jpg"), Buffer.from([0xff, 0xd8, 9]));
      const addImg = (page: string, src: string) => {
        const file = join(dir, page);
        writeFileSync(file, readFileSync(file, "utf8").replace("</body>", `<img src="${src}" alt="x"/></body>`));
      };
      addImg("index.html", "/images/a.jpg");
      addImg("services.html", "/images/a.jpg");
      addImg("about.html", "/images/c.jpg");
      addImg("about.html", "/images/c.jpg");
      const r = runDir(dir);
      expect(r.code).toBe(1);
      expect(r.output).toContain("/images/a.jpg: ảnh dùng 2 lần (index.html, services.html)");
      expect(r.output).toContain("/images/c.jpg: ảnh dùng 2 lần (about.html, about.html)");
      expect(r.output).toContain("images/a.jpg: trùng nội dung với images/b.jpg");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("thư mục không tồn tại thì thoát mã 1", () => {
    expect(run("does-not-exist").code).toBe(1);
  });
});
