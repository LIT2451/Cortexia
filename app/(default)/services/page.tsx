import { pageMetadata } from "@/lib/metadata";
import { serviceList, services } from "@/content/pages";
import { serviceCases } from "@/content/digital";
import PageIllustration from "@/components/sections/page-illustration";
import PageHero from "@/components/sections/page-hero";
import ServiceList from "@/components/sections/service-list";
import CaseStudies from "@/components/sections/case-studies";
import FeatureGrid from "@/components/sections/feature-grid";
import Cta from "@/components/sections/cta";

export const metadata = pageMetadata({ path: "/services", ...services.meta });

export default function Services() {
  const { hero, intro, cases, engagement } = services;
  return (
    <>
      <PageIllustration multiple />
      <PageHero eyebrow={hero.eyebrow} title={hero.title} text={hero.text} />
      <ServiceList {...intro} items={serviceList} />
      <CaseStudies {...cases} items={serviceCases} />
      <FeatureGrid eyebrow={engagement.eyebrow} title={engagement.title} items={engagement.models} />
      <Cta {...services.cta} />
    </>
  );
}
