import { pageMetadata } from "@/lib/metadata";
import { home } from "@/content/pages";
import { stats, testimonials } from "@/content/digital";
import PageIllustration from "@/components/sections/page-illustration";
import PageHero from "@/components/sections/page-hero";
import Stats from "@/components/sections/stats";
import FeatureGrid from "@/components/sections/feature-grid";
import Testimonials from "@/components/sections/testimonials";
import Cta from "@/components/sections/cta";

export const metadata = pageMetadata({ path: "/", ...home.meta });

export default function Home() {
  const { hero, services, whyUs, techStack } = home;
  return (
    <>
      <PageIllustration />
      <PageHero title={hero.titleLines} text={hero.text} primary={hero.primary} secondary={hero.secondary} />
      <Stats items={stats} />
      <FeatureGrid {...services} />
      <FeatureGrid eyebrow={whyUs.eyebrow} title={whyUs.title} text={whyUs.text} items={whyUs.items} link={whyUs.link} />
      <FeatureGrid
        eyebrow={techStack.eyebrow}
        title={techStack.title}
        text={techStack.text}
        items={techStack.items.map((title) => ({ title }))}
      />
      <Testimonials eyebrow="Client Voices" title="What Our Clients Say" items={testimonials} />
      <Cta {...home.cta} />
    </>
  );
}
