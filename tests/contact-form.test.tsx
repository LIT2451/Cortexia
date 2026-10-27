import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ContactForm from "@/components/contact-form";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

const submit = () => fireEvent.click(screen.getByRole("button", { name: "Submit Inquiry" }));
const type = (label: RegExp | string, value: string) => fireEvent.change(screen.getByLabelText(label), { target: { value } });

describe("ContactForm", () => {
  it("có 5 trường, mỗi ô gắn đúng label", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/^Name/)).toHaveProperty("id", "name");
    expect(screen.getByLabelText("Phone Number")).toHaveProperty("id", "phone");
    expect(screen.getByLabelText(/^Business Email/)).toHaveProperty("id", "email");
    expect(screen.getByLabelText("Service Required")).toHaveProperty("id", "service");
    expect(screen.getByLabelText(/^Message/)).toHaveProperty("id", "message");
    expect(screen.getAllByRole("option")).toHaveLength(8);
    expect(screen.getByRole("option", { name: "AI & Process Automation" })).toBeTruthy();
  });

  it("gửi rỗng: lỗi cạnh ô, aria-invalid, focus vào Name", () => {
    render(<ContactForm />);
    submit();
    for (const [label, id] of [[/^Name/, "name"], [/^Business Email/, "email"], [/^Message/, "message"]] as const) {
      const field = screen.getByLabelText(label);
      expect(field.getAttribute("aria-invalid")).toBe("true");
      expect(field.getAttribute("aria-describedby")).toBe(`${id}-error`);
      expect(document.getElementById(`${id}-error`)?.textContent).not.toBe("");
    }
    expect(document.activeElement).toBe(screen.getByLabelText(/^Name/));
    expect(screen.getByRole("status").textContent).toBe("");
  });

  it("email sai: focus vào Business Email", () => {
    render(<ContactForm />);
    type(/^Name/, "Jane");
    type(/^Business Email/, "jane@example");
    type(/^Message/, "Hello");
    submit();
    expect(document.activeElement).toBe(screen.getByLabelText(/^Business Email/));
  });

  it("gửi hợp lệ: hiện câu cảm ơn, xoá form, không gọi alert", () => {
    const alert = vi.spyOn(window, "alert").mockImplementation(() => {});
    render(<ContactForm />);
    type(/^Name/, "Jane");
    type("Phone Number", "+84 123");
    type(/^Business Email/, "jane@example.com");
    fireEvent.change(screen.getByLabelText("Service Required"), { target: { value: "Cloud Migration & DevOps" } });
    type(/^Message/, "Hello");
    submit();

    expect(screen.getByRole("status").textContent).toBe(
      "Thank you for contacting Cortexia! Our team will reach out to you within 24 hours.",
    );
    for (const label of [/^Name/, /^Phone Number/, /^Business Email/, /^Service Required/, /^Message/]) {
      expect((screen.getByLabelText(label) as HTMLInputElement).value).toBe("");
    }
    expect(screen.getByLabelText(/^Name/).getAttribute("aria-invalid")).toBeNull();
    expect(alert).not.toHaveBeenCalled();
  });
});
