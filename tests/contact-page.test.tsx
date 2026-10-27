import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ContactPage from "@/app/(default)/contact/page";
import { contact } from "@/content/pages";
import { site } from "@/config/site";

afterEach(cleanup);

describe("Trang Contact", () => {
  it("có đúng 1 h1 và các bước tiếp nhận", () => {
    const { container } = render(<ContactPage />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(screen.getByRole("heading", { name: contact.process.title })).toBeTruthy();
    for (const s of contact.process.steps) {
      expect(screen.getByRole("heading", { name: s.title })).toBeTruthy();
      expect(container.textContent).toContain(s.text);
    }
  });

  it("hiển thị địa chỉ và form", () => {
    const { container } = render(<ContactPage />);
    expect(container.textContent).toContain(site.address);
    expect(container.querySelector("form")).not.toBeNull();
  });
});
