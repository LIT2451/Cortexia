import Image from "next/image";
import type { CaseStudy } from "@/content/digital";
import SectionHeading, { type SectionHeadingProps } from "./section-heading";
import Spotlight from "./spotlight";

export type CaseStudiesProps = SectionHeadingProps & { items: CaseStudy[] };

// Spotlight card from the template's workflows block; the image is shown only when the case has one.
const spotlightCard =
  "group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100";

export default function CaseStudies({ eyebrow, title, text, items }: CaseStudiesProps) {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <SectionHeading eyebrow={eyebrow} title={title} text={text} />
          <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
            {items.map((c) => (
              <article key={c.slug} id={c.slug} className={spotlightCard}>
                <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                  {c.image && (
                    <div className="relative z-10 aspect-[16/9] overflow-hidden">
                      <Image className="h-full w-full object-cover" src={c.image.src} alt={c.image.alt} width={640} height={360} />
                    </div>
                  )}
                  <div className="relative z-10 p-6">
                    <p className="mb-3 inline-block rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal">
                      <span className="bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                        {c.industry}
                      </span>
                    </p>
                    <h3 className="mb-2 font-nacelle text-[1rem] font-semibold text-gray-200">{c.name}</h3>
                    <p className="mb-4 text-indigo-200/65">{c.summary}</p>
                    <dl className="mb-4 grid grid-cols-2 gap-3">
                      {c.results.map((r) => (
                        <div key={r.label} className="flex flex-col-reverse">
                          <dt className="text-xs text-indigo-200/65">{r.label}</dt>
                          <dd className="font-nacelle text-xl font-semibold text-indigo-400">{r.metric}</dd>
                        </div>
                      ))}
                    </dl>
                    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                      {c.technologies.map((t) => (
                        <li key={t} className="rounded-full bg-gray-800/60 px-2.5 py-0.5 text-xs text-gray-300">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </Spotlight>
        </div>
      </div>
    </section>
  );
}
