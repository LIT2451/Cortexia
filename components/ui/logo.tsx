import Link from "next/link";
import { site } from "@/config/site";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center gap-2" aria-label={`${site.name} home`}>
      <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32" aria-hidden="true">
        <defs>
          <linearGradient id="logo-c" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#818CF8" />
            <stop offset="1" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="url(#logo-c)" />
        <path
          d="M21.5 11.2A7 7 0 1 0 21.5 20.8"
          fill="none"
          stroke="#fff"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-nacelle text-lg font-semibold text-gray-200">{site.name}</span>
    </Link>
  );
}
