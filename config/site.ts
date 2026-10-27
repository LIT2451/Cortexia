// Brand information lives here only; changing a value applies to every page.
export type SiteConfig = {
  name: "Cortexia";
  domain: "digitalcortexia.com";
  url: "https://digitalcortexia.com";
  address: string;
  email: string; // empty string hides the item
  phone: string; // display format, e.g. "+84 9xx xxx xxx"
  taxId: string;
  /** Related companies shown in the footer with their tax IDs. */
  relatedCompanies: { name: string; taxId: string }[];
};

export const site: SiteConfig = {
  name: "Cortexia",
  domain: "digitalcortexia.com",
  url: "https://digitalcortexia.com",
  address: "Tầng 6, tòa C, 22 Thành Công, Ba Đình, Hà Nội",
  email: "founder@digitalcortexia.com",
  phone: "0886 966 092",
  taxId: "0111644930",
  relatedCompanies: [{ name: "Synthiq", taxId: "5600362025" }],
};

export type NavHref = "/" | "/about" | "/services" | "/portfolio" | "/contact";

export const navLinks: { href: NavHref; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];
