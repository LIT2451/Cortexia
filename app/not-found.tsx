import Link from "next/link";
import PageIllustration from "@/components/page-illustration";

export const metadata = {
  title: "Page Not Found - Cortexia",
};

export default function NotFound() {
  return (
    <main className="relative flex grow flex-col">
      <PageIllustration />
      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="py-24 text-center md:py-32">
            <p className="pb-3 font-nacelle text-6xl font-semibold text-indigo-400">404</p>
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl">
              Page not found
            </h1>
            <p className="mx-auto mb-8 max-w-xl text-lg text-indigo-200/65">
              The page you are looking for does not exist or has been moved.
            </p>
            <Link
              href="/"
              className="btn group bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
