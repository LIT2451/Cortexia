// Pure validation for the contact form (no DOM, no network).

export type ContactInput = { name: string; phone: string; email: string; service: string; message: string };
export type RequiredField = "name" | "email" | "message";
export type ContactErrors = Partial<Record<RequiredField, string>>;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Order in which invalid fields receive focus. */
export const FIELD_ORDER = ["name", "email", "message"] as const satisfies readonly RequiredField[];

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  if (input.name.trim() === "") errors.name = "Please enter your name.";
  if (input.email.trim() === "") errors.email = "Please enter your business email.";
  else if (!EMAIL_RE.test(input.email)) errors.email = "Please enter a valid email address.";
  if (input.message.trim() === "") errors.message = "Please enter a message.";
  return errors;
}

/** First field in FIELD_ORDER that has an error, or undefined when the form is valid. */
export function firstInvalidField(errors: ContactErrors): RequiredField | undefined {
  return FIELD_ORDER.find((f) => errors[f] !== undefined);
}
