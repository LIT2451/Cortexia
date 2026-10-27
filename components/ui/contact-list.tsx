import { site, type SiteConfig } from "@/config/site";
import { contactItems, type ContactItem } from "@/lib/contact";

const ICONS: Record<ContactItem["kind"], string> = {
  address:
    "M8 0a6 6 0 0 0-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 0 0-6-6Zm0 8.5A2.5 2.5 0 1 1 8 3.5a2.5 2.5 0 0 1 0 5Z",
  email:
    "M1 3h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm.8 2v.3L8 9l6.2-3.7V5L8 8.7 1.8 5Z",
  phone:
    "M3.6 1.2 5.8 3.4a1 1 0 0 1 0 1.4L4.6 6a9.4 9.4 0 0 0 5.4 5.4l1.2-1.2a1 1 0 0 1 1.4 0l2.2 2.2a1 1 0 0 1 0 1.4l-1.2 1.2C10 16 0 6 1 2.4l1.2-1.2a1 1 0 0 1 1.4 0Z",
  taxId:
    "M3 0h7l4 4v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1Zm2 7v1.5h6V7H5Zm0 3v1.5h6V10H5Z",
};

export default function ContactList({ cfg = site, className = "" }: { cfg?: SiteConfig; className?: string }) {
  const items = contactItems(cfg);

  return (
    <ul className={`space-y-3 text-sm ${className}`}>
      {items.map((item) => (
        <li key={item.kind} data-kind={item.kind} className="flex items-start gap-3">
          <svg
            className="mt-0.5 shrink-0 fill-indigo-500"
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 16 16"
            aria-hidden="true"
            data-icon={item.kind}
          >
            <path d={ICONS[item.kind]} />
          </svg>
          <span>
            <span className="block font-medium text-gray-200" data-label>
              {item.label}
            </span>
            {item.href ? (
              <a className="text-indigo-200/65 transition hover:text-indigo-500" href={item.href}>
                {item.value}
              </a>
            ) : (
              <span className="text-indigo-200/65">{item.value}</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
