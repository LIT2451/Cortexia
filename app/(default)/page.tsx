import { pageMetadata } from "@/lib/metadata";
import { home } from "@/content/pages";
import { testimonials } from "@/content/digital";
import PageIllustration from "@/components/sections/page-illustration";
import PageHero from "@/components/sections/page-hero";
import FeatureGrid from "@/components/sections/feature-grid";
import Testimonials from "@/components/sections/testimonials";
import Cta from "@/components/sections/cta";

export const metadata = pageMetadata({ path: "/", ...home.meta });

export default function Home() {
  return (
    <>
      <PageIllustration />
      <PageHero title={home.hero.titleLines} text={home.hero.text} primary={home.hero.primary} secondary={home.hero.secondary} />
      <FeatureGrid {...home.services} />
      <Testimonials title="What Our Clients Say" items={testimonials} />
      <Cta {...home.cta} />
    </>
  );
}
