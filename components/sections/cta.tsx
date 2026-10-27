import Image from "next/image";
import Link from "next/link";
import BlurredShape from "@/public/images/blurred-shape.svg";
import type { Cta as CtaData } from "@/content/pages";
import { btnPrimary, gradientText } from "./styles";

export default function Cta({ title, text, label, href }: CtaData) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-24 ml-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <Image className="max-w-none" src={BlurredShape} width={760} height={668} alt="" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-linear-to-r from-transparent via-gray-800/50 py-12 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className={`${gradientText} pb-4 text-3xl md:text-4xl`} data-aos="fade-up">
              {title}
            </h2>
            <p className="mb-8 text-lg text-indigo-200/65" data-aos="fade-up" data-aos-delay={200}>
              {text}
            </p>
            <div data-aos="fade-up" data-aos-delay={400}>
              <Link className={`${btnPrimary} w-full sm:w-auto`} href={href}>
                <span className="relative inline-flex items-center">
                  {label}
                  <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                    -&gt;
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
