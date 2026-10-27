import Image from "next/image";
import Link from "next/link";
import SectionHeading, { type SectionHeadingProps } from "./section-heading";
import { card, cardBase, focusRing } from "./styles";
import type { ContentImage } from "./types";

export type FeatureItem = {
  title: string;
  text?: string;
  /** Shown 16:9 at the top of the card, replacing the icon. */
  image?: ContentImage;
  /** Step number such as "01", shown instead of the icon. */
  step?: string;
  badge?: string;
  bullets?: string[];
};

export type FeatureGridProps = SectionHeadingProps & {
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
  link?: { label: string; href: string };
};

const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" };

export default function FeatureGrid({ eyebrow, title, text, items, columns = 3, link }: FeatureGridProps) {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1] md:py-20">
          <SectionHeading eyebrow={eyebrow} title={title} text={text} />
          <div className={`grid gap-6 sm:grid-cols-2 ${cols[columns]}`}>
            {items.map((item) => (
              <article key={item.title} className={item.image ? cardBase : card} data-aos="fade-up">
                {item.image && (
                  <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
                    <Image className="h-full w-full object-cover" src={item.image.src} alt={item.image.alt} width={640} height={360} />
                  </div>
                )}
                <div className={item.image ? "relative p-6" : "relative"}>
                  {item.image ? null : item.step ? (
                    <p className="mb-3 font-nacelle text-2xl font-semibold text-indigo-500" aria-hidden="true">
                      {item.step}
                    </p>
                  ) : (
                    <svg className="mb-3 fill-indigo-500" xmlns="http://www.w3.org/2000/svg" width={24} height={24} aria-hidden="true">
                      <path d="M0 0h14v17H0V0Zm2 2v13h10V2H2Z" />
                      <path fillOpacity=".48" d="m16.295 5.393 7.528 2.034-4.436 16.412L5.87 20.185l.522-1.93 11.585 3.132 3.392-12.55-5.597-1.514.522-1.93Z" />
                    </svg>
                  )}
                  {item.badge && (
                    <span className="mb-2 inline-block rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-xs font-medium text-indigo-300">
                      {item.badge}
                    </span>
                  )}
                  <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">{item.title}</h3>
                  {item.text && <p className="text-indigo-200/65">{item.text}</p>}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.bullets.map((b) => (
                        <li key={b} className="rounded-full bg-gray-800/60 px-2.5 py-0.5 text-xs text-gray-300">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
          {link && (
            <div className="mt-10 text-center">
              <Link className={`inline-flex items-center text-indigo-400 hover:text-indigo-300 ${focusRing}`} href={link.href}>
                {link.label}
                <span className="ml-1" aria-hidden="true">
                  -&gt;
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
