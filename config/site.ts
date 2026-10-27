// Brand information lives here only; changing a value applies to every page.
export type SiteConfig = {
  name: "Cortexia";
  domain: "digitalcortexia.com";
  url: "https://digitalcortexia.com";
  address: string;
  email: string; // empty string hides the item
  phone: string; // display format, e.g. "+84 9xx xxx xxx"
  taxId: string;
};

export const site: SiteConfig = {
  name: "Cortexia",
  domain: "digitalcortexia.com",
  url: "https://digitalcortexia.com",
  address: "Tầng 6, tòa C, 22 Thành Công, Ba Đình, Hà Nội",
  // SAMPLE contact details: replace email and phone with the real ones before going live.
  email: "contact@digitalcortexia.com",
  phone: "+84 24 3200 6688",
  taxId: "",
};

export type NavHref = "/" | "/about" | "/services" | "/portfolio" | "/contact";

export const navLinks: { href: NavHref; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];
