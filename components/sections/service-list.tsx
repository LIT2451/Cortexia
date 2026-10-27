import Image from "next/image";
import SectionHeading, { type SectionHeadingProps } from "./section-heading";
import { cardBase } from "./styles";

export type ServiceItem = {
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
  /** Content image: alt must describe the service. */
  image: { src: string; alt: string };
};

export default function ServiceList({ eyebrow, title, text, items }: SectionHeadingProps & { items: ServiceItem[] }) {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1] md:py-20">
          <SectionHeading eyebrow={eyebrow} title={title} text={text} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((s) => (
              <article key={s.slug} id={s.slug} className={cardBase} data-aos="fade-up">
                <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
                  <Image className="h-full w-full object-cover" src={s.image.src} alt={s.image.alt} width={640} height={360} />
                </div>
                <div className="relative p-6">
                  <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">{s.title}</h3>
                  <p className="mb-4 text-indigo-200/65">{s.summary}</p>
                  <ul className="flex flex-wrap gap-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="rounded-full bg-gray-800/60 px-2.5 py-0.5 text-xs text-gray-300">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
