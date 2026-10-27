import { pageMetadata } from "@/lib/metadata";
import { about } from "@/content/pages";
import PageIllustration from "@/components/sections/page-illustration";
import PageHero from "@/components/sections/page-hero";
import FeatureGrid from "@/components/sections/feature-grid";
import Cta from "@/components/sections/cta";

export const metadata = pageMetadata({ path: "/about", ...about.meta });

// Stats and testimonials appear on Home only, so About does not repeat them.
export default function About() {
  const { hero, whoWeAre, values, lifecycle } = about;
  return (
    <>
      <PageIllustration multiple />
      <PageHero eyebrow={hero.eyebrow} title={hero.title} text={hero.text} />
      <FeatureGrid
        eyebrow={whoWeAre.eyebrow}
        title={whoWeAre.title}
        text={whoWeAre.paragraphs}
        items={whoWeAre.items}
        columns={4}
      />
      <FeatureGrid {...values} columns={4} />
      <FeatureGrid
        eyebrow={lifecycle.eyebrow}
        title={lifecycle.title}
        text={lifecycle.text}
        items={lifecycle.steps}
        columns={4}
      />
      <Cta {...about.cta} />
    </>
  );
}
