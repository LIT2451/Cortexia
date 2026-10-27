import { eyebrowLine, eyebrowText, gradientText } from "./styles";

/** `text` may hold several paragraphs. */
export type SectionHeadingProps = { eyebrow?: string; title: string; text?: string | string[] };

/** Centered h2 block used at the top of most sections. */
export default function SectionHeading({ eyebrow, title, text }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl pb-12 text-center md:pb-16">
      {eyebrow && (
        <div className={eyebrowLine}>
          <span className={eyebrowText}>{eyebrow}</span>
        </div>
      )}
      <h2 className={`${gradientText} pb-4 text-3xl md:text-4xl`}>{title}</h2>
      {(Array.isArray(text) ? text : text ? [text] : []).map((p) => (
        <p key={p} className="text-lg text-indigo-200/65 [&+p]:mt-4">
          {p}
        </p>
      ))}
    </div>
  );
}
