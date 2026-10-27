import type { Stat } from "@/content/digital";
import { gradientText } from "./styles";

export default function Stats({ items }: { items: Stat[] }) {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <dl className="grid grid-cols-2 gap-6 border-y border-gray-800 py-10 text-center md:grid-cols-4">
          {items.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-1" data-aos="fade-up">
              <dt className="text-sm text-indigo-200/65">{s.label}</dt>
              <dd className={`${gradientText} text-3xl md:text-4xl`}>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
