import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { FORBIDDEN } from "../scripts/forbidden-names.mjs";
import { featuredCase, portfolioCases, serviceCases, stats, testimonials } from "@/content/digital";

const source = readFileSync(join(process.cwd(), "content/digital.ts"), "utf8");

describe("content/digital", () => {
  it("dòng đầu ghi chú NỘI DUNG MẪU (8.4)", () => {
    expect(source.split("\n")[0]).toContain("NỘI DUNG MẪU");
  });

  it("4 số liệu Digital, không dùng số liệu cũ (8.1)", () => {
    expect(stats).toHaveLength(4);
    const values = stats.map((s) => s.value);
    for (const old of ["10+", "150+", "50+"]) expect(values).not.toContain(old);
  });

  it("có lời chứng thực, mỗi mục chỉ có quote, role, companyType (8.3)", () => {
    // Site cũ không có khối lời chứng thực nào; giữ 3 mục mẫu cho khối Testimonials ở Home/About.
    expect(testimonials).toHaveLength(3);
    for (const t of testimonials) expect(Object.keys(t).sort()).toEqual(["companyType", "quote", "role"]);
  });

  it("không còn tên sản phẩm cũ và viết tắt bản ghi cuộc gọi (8.5)", () => {
    const all = JSON.stringify({ featuredCase, portfolioCases, serviceCases, testimonials, stats });
    for (const [re] of FORBIDDEN as [RegExp, string][]) expect(all).not.toMatch(re);
  });
});
