import { describe, expect, it } from "vitest";
import { navLinks, site } from "@/config/site";
import { contactItems } from "@/lib/contact";

describe("config/site", () => {
  it("để trống email, phone, taxId ở bản đầu (2.7)", () => {
    expect(site.email).toBe("");
    expect(site.phone).toBe("");
    expect(site.taxId).toBe("");
  });

  it("navLinks có đúng 5 URL (4.1, 4.2)", () => {
    expect(navLinks.map((l) => l.href)).toEqual(["/", "/about", "/services", "/portfolio", "/contact"]);
  });
});

describe("contactItems", () => {
  it("chỉ còn địa chỉ với cấu hình mặc định (2.5)", () => {
    expect(contactItems(site).map((i) => i.kind)).toEqual(["address"]);
  });

  it("sinh mailto: và tel: khi có giá trị (2.6)", () => {
    const items = contactItems({ ...site, email: "hi@example.com", phone: "+84 912 345 678", taxId: "  " });
    expect(items.find((i) => i.kind === "email")?.href).toBe("mailto:hi@example.com");
    expect(items.find((i) => i.kind === "phone")?.href).toBe("tel:+84912345678");
    expect(items.some((i) => i.kind === "taxId")).toBe(false);
  });
});
