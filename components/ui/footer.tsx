import Link from "next/link";
import Image from "next/image";
import Logo from "./logo";
import ContactList from "./contact-list";
import FooterIllustration from "@/public/images/footer-illustration.svg";
import { navLinks, site } from "@/config/site";

const services = [
  "Custom Software Engineering",
  "Offshore Dedicated Teams (ODC)",
  "Telecom & Network Solutions",
  "Mobile Application Engineering",
  "Cloud Infrastructure & DevOps",
  "Software Maintenance & Security",
];

const linkClass =
  "text-indigo-200/65 transition hover:text-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400";

export default function Footer() {
  return (
    <footer>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Footer illustration */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -translate-x-1/2"
          aria-hidden="true"
        >
          <Image className="max-w-none" src={FooterIllustration} width={1076} height={378} alt="" />
        </div>
        <div className="grid grid-cols-1 gap-10 py-8 sm:grid-cols-2 md:py-12 lg:grid-cols-[1.2fr_1fr_1.4fr_1.6fr] lg:gap-12">
          {/* Branding */}
          <div className="space-y-3">
            <Logo />
            <p className="text-sm text-indigo-200/65">
              &copy; {new Date().getFullYear()} {site.name}
            </p>
            {site.relatedCompanies.map((c) => (
              <p key={c.name} className="text-sm text-indigo-200/65">
                {c.name} – Tax ID: {c.taxId}
              </p>
            ))}
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-200">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link className={linkClass} href={l.href}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-200">Services</h3>
            <ul className="space-y-2 text-sm">
              {services.map((s) => (
                <li key={s}>
                  <Link className={linkClass} href="/services">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-200">Contact Us</h3>
            <ContactList />
          </div>
        </div>
      </div>
    </footer>
  );
}
