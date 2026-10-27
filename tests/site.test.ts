import { describe, expect, it } from "vitest";
import { navLinks, site } from "@/config/site";
import { contactItems } from "@/lib/contact";

describe("config/site", () => {
  it("có email, phone, MST của Cortexia", () => {
    expect(site.email).toBe("founder@digitalcortexia.com");
    expect(site.phone).toBe("0886 966 092");
    expect(site.taxId).toBe("0111644930");
  });

  it("navLinks có đúng 5 URL (4.1, 4.2)", () => {
    expect(navLinks.map((l) => l.href)).toEqual(["/", "/about", "/services", "/portfolio", "/contact"]);
  });
});

describe("contactItems", () => {
  it("cấu hình mặc định có địa chỉ, email, phone, MST", () => {
    const items = contactItems(site);
    expect(items.map((i) => i.kind)).toEqual(["address", "email", "phone", "taxId"]);
    expect(items.find((i) => i.kind === "email")?.href).toBe("mailto:founder@digitalcortexia.com");
    expect(items.find((i) => i.kind === "phone")?.href).toBe("tel:0886966092");
    expect(items.find((i) => i.kind === "taxId")?.value).toBe("0111644930");
  });

  it("sinh mailto: và tel: khi có giá trị (2.6)", () => {
    const items = contactItems({ ...site, email: "hi@example.com", phone: "+84 912 345 678", taxId: "  " });
    expect(items.find((i) => i.kind === "email")?.href).toBe("mailto:hi@example.com");
    expect(items.find((i) => i.kind === "phone")?.href).toBe("tel:+84912345678");
    expect(items.some((i) => i.kind === "taxId")).toBe(false);
  });
});
