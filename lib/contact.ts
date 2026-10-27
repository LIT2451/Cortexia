import type { SiteConfig } from "@/config/site";

export type ContactItem = {
  kind: "address" | "email" | "phone" | "taxId";
  label: string;
  value: string;
  href?: string;
};

const LABELS: Record<ContactItem["kind"], string> = {
  address: "Address",
  email: "Email",
  phone: "Phone",
  taxId: "Tax ID",
};

// Returns only the filled-in contact fields; empty or whitespace-only values are hidden.
export function contactItems(cfg: SiteConfig): ContactItem[] {
  const items: ContactItem[] = [];
  const add = (kind: ContactItem["kind"], value: string, href?: (v: string) => string) => {
    if (value.trim() === "") return;
    items.push({ kind, label: LABELS[kind], value, ...(href ? { href: href(value) } : {}) });
  };

  add("address", cfg.address);
  add("email", cfg.email, (v) => `mailto:${v}`);
  add("phone", cfg.phone, (v) => `tel:${v.replace(/[^\d+]/g, "")}`);
  add("taxId", cfg.taxId);
  return items;
}
