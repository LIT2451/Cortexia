import { pageMetadata } from "@/lib/metadata";
import { about } from "@/content/pages";
import { stats, testimonials } from "@/content/digital";
import PageIllustration from "@/components/sections/page-illustration";
import PageHero from "@/components/sections/page-hero";
import Stats from "@/components/sections/stats";
import FeatureGrid from "@/components/sections/feature-grid";
import Testimonials from "@/components/sections/testimonials";
import Cta from "@/components/sections/cta";

export const metadata = pageMetadata({ path: "/about", ...about.meta });

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
      <Stats items={stats} />
      <FeatureGrid {...values} columns={4} />
      <FeatureGrid
        eyebrow={lifecycle.eyebrow}
        title={lifecycle.title}
        text={lifecycle.text}
        items={lifecycle.steps}
        columns={4}
      />
      <Testimonials eyebrow="Client Voices" title="What Our Clients Say" items={testimonials} />
      <Cta {...about.cta} />
    </>
  );
}
