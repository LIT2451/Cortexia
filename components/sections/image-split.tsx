import Image from "next/image";
import Link from "next/link";
import { eyebrowLine, eyebrowText, focusRing, gradientText } from "./styles";
import type { ContentImage } from "./types";

export type ImageSplitProps = {
  eyebrow?: string;
  title: string;
  text: string | string[];
  points?: string[];
  image: ContentImage;
  link?: { label: string; href: string };
  /** Put the image on the right on large screens. */
  reverse?: boolean;
};

/** Two-column block: image on one side, heading, copy, highlights and a link on the other. */
export default function ImageSplit({ eyebrow, title, text, points, image, link, reverse }: ImageSplitProps) {
  const paragraphs = Array.isArray(text) ? text : [text];
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 border-t py-12 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1] md:py-20 lg:grid-cols-2 lg:gap-16">
          <div className={`relative overflow-hidden rounded-2xl bg-gray-800 p-px ${reverse ? "lg:order-last" : ""}`} data-aos="fade-up">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[inherit]">
              <Image className="h-full w-full object-cover" src={image.src} alt={image.alt} width={800} height={600} />
            </div>
          </div>
          <div data-aos="fade-up" data-aos-delay={200}>
            {eyebrow && (
              <div className={eyebrowLine}>
                <span className={eyebrowText}>{eyebrow}</span>
              </div>
            )}
            <h2 className={`${gradientText} pb-4 text-3xl md:text-4xl`}>{title}</h2>
            {paragraphs.map((p) => (
              <p key={p} className="text-lg text-indigo-200/65 [&+p]:mt-4">
                {p}
              </p>
            ))}
            {points && points.length > 0 && (
              <ul className="mt-6 space-y-3">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-gray-300">
                    <svg className="mt-1 shrink-0 fill-indigo-500" xmlns="http://www.w3.org/2000/svg" width={12} height={9} aria-hidden="true">
                      <path d="M10.28.28 3.989 6.575 1.695 4.28A1 1 0 0 0 .28 5.695l3 3a1 1 0 0 0 1.414 0l7-7A1 1 0 0 0 10.28.28Z" />
                    </svg>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
            {link && (
              <Link className={`mt-8 inline-flex items-center text-indigo-400 hover:text-indigo-300 ${focusRing}`} href={link.href}>
                {link.label}
                <span className="ml-1" aria-hidden="true">
                  -&gt;
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
