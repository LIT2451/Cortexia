// Names that must not appear in the new site (Requirements 1.4, 2.1, 8.5).
// Built from parts so this file itself does not contain them; a repo-wide search stays at 0.
const j = (...parts) => parts.join("");

export const OLD_BRAND = j("DV", "Technic");
export const OLD_PRODUCTS = [j("Open", "Claw"), j("Her", "mes")];
export const CALL_RECORDS = j("C", "DR");
export const TEMPLATE_NAMES = [j("Open", " PRO"), j("Cru", "ip")];

/** [regex, label] pairs used by the scanners. */
export const FORBIDDEN = [
  [new RegExp(OLD_BRAND, "i"), OLD_BRAND.toLowerCase()],
  ...OLD_PRODUCTS.map((n) => [new RegExp(n, "i"), n]),
  [new RegExp(`\\b${CALL_RECORDS}\\b`), CALL_RECORDS],
  [new RegExp(`${TEMPLATE_NAMES[0]}\\b`, "i"), TEMPLATE_NAMES[0]],
  [new RegExp(TEMPLATE_NAMES[1], "i"), TEMPLATE_NAMES[1]],
];
