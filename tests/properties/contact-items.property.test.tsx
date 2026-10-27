import { cleanup, render } from "@testing-library/react";
import fc from "fast-check";
import { afterEach, describe, expect, it } from "vitest";
import ContactList from "@/components/ui/contact-list";
import { site, type SiteConfig } from "@/config/site";
import { contactItems } from "@/lib/contact";

afterEach(cleanup);

const KINDS = ["email", "phone", "taxId"] as const;
const LABELS = { email: "Email", phone: "Phone", taxId: "Tax ID" } as const;

const whitespace = fc.stringMatching(/^[ \t\n\r ]+$/);
const field = (valid: fc.Arbitrary<string>) => fc.oneof(fc.constant(""), whitespace, valid);

const validPhone = fc
  .array(fc.stringMatching(/^[0-9]{2,4}$/), { minLength: 2, maxLength: 4 })
  .chain((groups) =>
    fc.tuple(fc.constantFrom("", "+", "+84 "), fc.constantFrom(" ", "-", ".")).map(
      ([prefix, sep]) => prefix + groups.join(sep),
    ),
  );

const config: fc.Arbitrary<SiteConfig> = fc.record({
  email: field(fc.emailAddress()),
  phone: field(validPhone),
  taxId: field(fc.stringMatching(/^[0-9]{10}$/)),
}).map((v) => ({ ...site, ...v }));

describe("P1: Hiển thị mục liên hệ theo cấu hình", () => {
  it("contactItems và ContactList chỉ chứa mục có giá trị", () => {
    fc.assert(
      fc.property(config, (cfg) => {
        const items = contactItems(cfg);
        const { container, unmount } = render(<ContactList cfg={cfg} />);
        const labels = Array.from(container.querySelectorAll("[data-label]")).map((el) => el.textContent);

        for (const k of KINDS) {
          const present = cfg[k].trim() !== "";
          expect(items.some((i) => i.kind === k)).toBe(present);
          expect(container.querySelector(`li[data-kind="${k}"]`) !== null).toBe(present);
          expect(container.querySelector(`svg[data-icon="${k}"]`) !== null).toBe(present);
          expect(labels.includes(LABELS[k])).toBe(present);
        }

        const email = items.find((i) => i.kind === "email");
        if (email) expect(email.href).toBe("mailto:" + cfg.email);

        const phone = items.find((i) => i.kind === "phone");
        if (phone) expect(phone.href).toMatch(/^tel:[0-9+]+$/);

        unmount();
      }),
      { numRuns: 100 },
    );
  });
});
