import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Footer from "@/components/ui/footer";

afterEach(cleanup);

const URLS = ["/", "/about", "/services", "/portfolio", "/contact"];

describe("Footer", () => {
  it("hiển thị địa chỉ Cortexia (2.3)", () => {
    render(<Footer />);
    expect(screen.getByText("Tầng 6, tòa C, 22 Thành Công, Ba Đình, Hà Nội")).toBeTruthy();
  });

  it("có Logo Cortexia (2.2)", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Cortexia home" })).toBeTruthy();
  });

  it("mọi href thuộc 5 URL nội bộ, ngoài link mailto:/tel: liên hệ (4.2)", () => {
    const { container } = render(<Footer />);
    const hrefs = Array.from(container.querySelectorAll("a")).map((a) => a.getAttribute("href")!);
    expect(hrefs.length).toBeGreaterThan(0);
    for (const h of hrefs.filter((h) => !/^(mailto|tel):/.test(h))) expect(URLS).toContain(h);
  });

  it("hiển thị email và số điện thoại mẫu kèm link", () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('a[href="mailto:contact@digitalcortexia.com"]')?.textContent).toBe("contact@digitalcortexia.com");
    expect(container.querySelector('a[href="tel:+842432006688"]')?.textContent).toBe("+84 24 3200 6688");
  });

  it("không còn chữ của Template", () => {
    const { container } = render(<Footer />);
    expect(container.innerHTML).not.toMatch(/cruip/i);
  });
});
