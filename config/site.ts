// Brand information lives here only; changing a value applies to every page.
export type SiteConfig = {
  name: "Cortexia";
  domain: "digitalcortexia.com";
  url: "https://digitalcortexia.com";
  address: string;
  email: string; // empty until a real address is available
  phone: string; // display format, e.g. "+84 9xx xxx xxx"
  taxId: string;
};

export const site: SiteConfig = {
  name: "Cortexia",
  domain: "digitalcortexia.com",
  url: "https://digitalcortexia.com",
  address: "Tầng 6, tòa C, 22 Thành Công, Ba Đình, Hà Nội",
  email: "",
  phone: "",
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
