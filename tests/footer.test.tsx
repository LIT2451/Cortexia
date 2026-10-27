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

  it("mọi href thuộc 5 URL nội bộ (4.2)", () => {
    const { container } = render(<Footer />);
    const hrefs = Array.from(container.querySelectorAll("a")).map((a) => a.getAttribute("href"));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const h of hrefs) expect(URLS).toContain(h);
  });

  it("không còn chữ của Template", () => {
    const { container } = render(<Footer />);
    expect(container.innerHTML).not.toMatch(/cruip/i);
  });
});
