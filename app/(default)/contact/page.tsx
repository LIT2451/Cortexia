import { pageMetadata } from "@/lib/metadata";
import { contact } from "@/content/pages";
import PageIllustration from "@/components/sections/page-illustration";
import PageHero from "@/components/sections/page-hero";
import FeatureGrid from "@/components/sections/feature-grid";
import SectionHeading from "@/components/sections/section-heading";
import ContactList from "@/components/ui/contact-list";
import ContactForm from "@/components/contact-form";
import { card } from "@/components/sections/styles";

export const metadata = pageMetadata({ path: "/contact", ...contact.meta });

export default function Contact() {
  const { hero, process, form } = contact;
  return (
    <>
      <PageIllustration multiple />
      <PageHero eyebrow={hero.eyebrow} title={hero.title} text={hero.text} />
      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 pb-12 md:grid-cols-[1fr_2fr] md:pb-20">
            <aside className={card} aria-labelledby="contact-info">
              <div className="relative">
                <h2 id="contact-info" className="mb-4 font-nacelle text-xl font-semibold text-gray-200">
                  Contact Information
                </h2>
                <ContactList className="space-y-3 text-indigo-200/65" />
              </div>
            </aside>
            <div className={card}>
              <div className="relative">
                <SectionHeading eyebrow={form.eyebrow} title={form.title} text={form.text} />
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      <FeatureGrid title={process.title} items={process.steps} />
    </>
  );
}
