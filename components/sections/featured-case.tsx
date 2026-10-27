import type { CaseStudy } from "@/content/digital";
import { card, gradientText } from "./styles";

/** Large single case study; the old site rendered its name as an h2. */
export default function FeaturedCase({ item }: { item: CaseStudy }) {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <article id={item.slug} className={`${card} mb-12 p-8 md:mb-20 md:p-12`} data-aos="fade-up">
          <div className="relative grid gap-8 md:grid-cols-2">
            <div>
              <p className="mb-3 inline-block rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal">
                <span className="bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                  {item.industry}
                </span>
              </p>
              <h2 className={`${gradientText} pb-4 text-2xl md:text-3xl`}>{item.name}</h2>
              <p className="mb-6 text-indigo-200/65">{item.summary}</p>
              <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                {item.technologies.map((t) => (
                  <li key={t} className="rounded-full bg-gray-800/60 px-2.5 py-0.5 text-xs text-gray-300">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <dl className="grid content-center gap-6 sm:grid-cols-3 md:grid-cols-1">
              {item.results.map((r) => (
                <div key={r.label} className="flex flex-col-reverse">
                  <dt className="text-sm text-indigo-200/65">{r.label}</dt>
                  <dd className="font-nacelle text-3xl font-semibold text-indigo-400">{r.metric}</dd>
                </div>
              ))}
            </dl>
          </div>
        </article>
      </div>
    </section>
  );
}
