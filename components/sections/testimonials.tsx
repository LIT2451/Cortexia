import type { Testimonial } from "@/content/digital";
import SectionHeading, { type SectionHeadingProps } from "./section-heading";
import { card } from "./styles";

export type TestimonialsProps = SectionHeadingProps & { items: Testimonial[] };

/** Quotes attributed only by role and company type, so no avatars or logos. */
export default function Testimonials({ eyebrow, title, text, items }: TestimonialsProps) {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1] md:py-20">
          <SectionHeading eyebrow={eyebrow} title={title} text={text} />
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((t) => (
              <figure key={t.quote} className={card} data-aos="fade-up">
                <blockquote className="relative mb-4 text-indigo-200/65 before:content-['“'] after:content-['”']">
                  {t.quote}
                </blockquote>
                <figcaption className="relative text-sm font-medium text-gray-200">
                  {t.role}
                  <span className="text-gray-700"> - </span>
                  <span className="text-indigo-200/65">{t.companyType}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
