import Link from "next/link";
import { btnPrimary, btnSecondary, eyebrowLine, eyebrowText, gradientText } from "./styles";

export type HeroAction = { label: string; href: string };

export type PageHeroProps = {
  eyebrow?: string;
  /** One string, or several lines rendered with line breaks inside the same h1. */
  title: string | string[];
  text?: string;
  primary?: HeroAction;
  secondary?: HeroAction;
};

/** Top of every page: holds the page's only h1. */
export default function PageHero({ eyebrow, title, text, primary, secondary }: PageHeroProps) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center md:pb-20">
            {eyebrow && (
              <div className={eyebrowLine} data-aos="fade-up">
                <span className={eyebrowText}>{eyebrow}</span>
              </div>
            )}
            <h1 className={`${gradientText} pb-5 text-4xl md:text-5xl`} data-aos="fade-up">
              {lines.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br className="max-lg:hidden" />}
                  {i > 0 && " "}
                  {line}
                </span>
              ))}
            </h1>
            <div className="mx-auto max-w-3xl">
              {text && (
                <p className="mb-8 text-xl text-indigo-200/65" data-aos="fade-up" data-aos-delay={200}>
                  {text}
                </p>
              )}
              {(primary || secondary) && (
                <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                  {primary && (
                    <div data-aos="fade-up" data-aos-delay={400}>
                      <Link className={`${btnPrimary} mb-4 w-full sm:mb-0 sm:w-auto`} href={primary.href}>
                        <span className="relative inline-flex items-center">
                          {primary.label}
                          <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                            -&gt;
                          </span>
                        </span>
                      </Link>
                    </div>
                  )}
                  {secondary && (
                    <div data-aos="fade-up" data-aos-delay={600}>
                      <Link className={`${btnSecondary} w-full sm:ml-4 sm:w-auto`} href={secondary.href}>
                        {secondary.label}
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
