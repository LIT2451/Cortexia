import { describe, expect, it } from "vitest";
import { firstInvalidField, validateContact, type ContactInput } from "@/lib/validate-contact";

const valid: ContactInput = {
  name: "Jane",
  phone: "",
  email: "jane@example.com",
  service: "",
  message: "Hello",
};

describe("validateContact", () => {
  it("form hợp lệ không có lỗi", () => {
    expect(validateContact(valid)).toEqual({});
    expect(firstInvalidField({})).toBeUndefined();
  });

  it("thiếu trường bắt buộc hoặc email sai thì báo lỗi", () => {
    const errors = validateContact({ ...valid, name: "  ", email: "not-an-email", message: "" });
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name"]);
  });

  it("focus theo thứ tự name → email → message", () => {
    expect(firstInvalidField(validateContact({ ...valid, email: "", message: "" }))).toBe("email");
    expect(firstInvalidField(validateContact({ ...valid, message: "" }))).toBe("message");
  });
});
