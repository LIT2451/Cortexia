import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { EMAIL_RE, FIELD_ORDER, firstInvalidField, validateContact } from "@/lib/validate-contact";

// Strings mixing empty, whitespace-only, unicode and arbitrary text.
const text = fc.oneof(
  fc.constant(""),
  fc.string({ unit: fc.constantFrom(" ", "\t", "\n", " ", "　") }),
  fc.string({ unit: "grapheme" }),
  fc.string(),
);

const local = fc.stringMatching(/^[a-z0-9._%+-]{1,10}$/);
const domain = fc.stringMatching(/^[a-z0-9-]{1,10}$/);
const validEmail = fc.tuple(local, domain, fc.constantFrom("com", "vn", "io")).map(([l, d, t]) => `${l}@${d}.${t}`);
const email = fc.oneof(
  validEmail,
  text,
  validEmail.map((e) => e.replace("@", "")), // missing @
  validEmail.map((e) => e.replace(/\.[a-z]+$/, "")), // missing TLD
  validEmail.map((e) => ` ${e}`), // whitespace inside the value
  fc.emailAddress(),
);

const input = fc.record({ name: text, phone: text, email, service: text, message: text });

describe("P2: Validation form liên hệ", () => {
  it("lỗi đúng khi và chỉ khi trường bắt buộc trống hoặc email sai; focus ô lỗi đầu tiên", () => {
    fc.assert(
      fc.property(input, (x) => {
        const errors = validateContact(x);

        expect("name" in errors).toBe(x.name.trim() === "");
        expect("message" in errors).toBe(x.message.trim() === "");
        expect("email" in errors).toBe(x.email.trim() === "" || !EMAIL_RE.test(x.email));
        expect(Object.keys(errors).every((k) => k !== "phone" && k !== "service")).toBe(true);

        expect(firstInvalidField(errors)).toBe(FIELD_ORDER.find((f) => f in errors));
      }),
      { numRuns: 100 },
    );
  });

  it("phone và service không bao giờ gây lỗi", () => {
    fc.assert(
      fc.property(text, text, (phone, service) => {
        const errors = validateContact({ name: "Jane", email: "jane@example.com", message: "Hi", phone, service });
        expect(errors).toEqual({});
      }),
      { numRuns: 100 },
    );
  });
});
