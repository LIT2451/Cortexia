import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";

// Icon cropped from Logo/: the full logo's wordmark is dark navy and unreadable on the dark theme,
// so the name is rendered as text next to the icon.
export default function Logo() {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center gap-2" aria-label={`${site.name} home`}>
      <Image src="/images/logo/cortexia-logo.png" alt={`${site.name} logo`} width={32} height={32} priority />
      <span className="font-nacelle text-lg font-semibold text-gray-200">{site.name}</span>
    </Link>
  );
}
