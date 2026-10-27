import { pageMetadata } from "@/lib/metadata";
import { portfolio } from "@/content/pages";
import { featuredCase, portfolioCases } from "@/content/digital";
import PageIllustration from "@/components/sections/page-illustration";
import PageHero from "@/components/sections/page-hero";
import FeaturedCase from "@/components/sections/featured-case";
import CaseStudies from "@/components/sections/case-studies";
import Cta from "@/components/sections/cta";

export const metadata = pageMetadata({ path: "/portfolio", ...portfolio.meta });

export default function Portfolio() {
  const { hero, cases } = portfolio;
  return (
    <>
      <PageIllustration multiple />
      <PageHero eyebrow={hero.eyebrow} title={hero.title} text={hero.text} />
      <FeaturedCase item={featuredCase} />
      <CaseStudies {...cases} items={portfolioCases} />
      <Cta {...portfolio.cta} />
    </>
  );
}
