"use client";

import { useRef, useState, type FormEvent } from "react";
import { contact } from "@/content/pages";
import { site } from "@/config/site";
import {
  firstInvalidField,
  validateContact,
  type ContactErrors,
  type ContactInput,
  type RequiredField,
} from "@/lib/validate-contact";
import { btnPrimary, focusRing } from "@/components/sections/styles";

const empty: ContactInput = { name: "", phone: "", email: "", service: "", message: "" };

export const THANK_YOU = `Thank you for contacting ${site.name}! Our team will reach out to you within 24 hours.`;

const inputClass = `form-input w-full ${focusRing}`;

/** Static-site form: validates in the browser, shows a thank-you notice, sends nothing over the network. */
export default function ContactForm() {
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sent, setSent] = useState(false);
  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  } satisfies Record<RequiredField, unknown>;

  const set = (key: keyof ContactInput) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setSent(false);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    const first = firstInvalidField(found);
    if (first) {
      setSent(false);
      refs[first].current?.focus();
      return;
    }
    setValues(empty);
    setSent(true);
  };

  // Props linking a required field to its error message.
  const a11y = (key: RequiredField) => ({
    id: key,
    name: key,
    "aria-required": true,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });

  const errorText = (key: RequiredField) =>
    errors[key] && (
      <p id={`${key}-error`} className="mt-1 text-sm text-red-400">
        {errors[key]}
      </p>
    );

  const labelClass = "mb-1 block text-sm font-medium text-indigo-200/65";

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span className="text-red-500">*</span>
          </label>
          <input
            ref={refs.name}
            type="text"
            autoComplete="name"
            className={inputClass}
            placeholder="Your Name *"
            value={values.name}
            onChange={set("name")}
            {...a11y("name")}
          />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder="Phone Number"
            value={values.phone}
            onChange={set("phone")}
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>
          Business Email <span className="text-red-500">*</span>
        </label>
        <input
          ref={refs.email}
          type="email"
          autoComplete="email"
          className={inputClass}
          placeholder="Business Email *"
          value={values.email}
          onChange={set("email")}
          {...a11y("email")}
        />
        {errorText("email")}
      </div>
      <div>
        <label htmlFor="service" className={labelClass}>
          {contact.form.servicePlaceholder}
        </label>
        <select id="service" name="service" className={`form-select w-full ${focusRing}`} value={values.service} onChange={set("service")}>
          <option value="">{contact.form.servicePlaceholder}</option>
          {contact.form.serviceOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          ref={refs.message}
          rows={6}
          className={`form-textarea w-full ${focusRing}`}
          placeholder="Describe your project requirements, scope, or timeline..."
          value={values.message}
          onChange={set("message")}
          {...a11y("message")}
        />
        {errorText("message")}
      </div>
      <button type="submit" className={`${btnPrimary} w-full`}>
        {contact.form.submit}
      </button>
      <div role="status" aria-live="polite">
        {sent && <p className="rounded-lg bg-indigo-500/15 px-4 py-3 text-center text-indigo-200">{THANK_YOU}</p>}
      </div>
    </form>
  );
}
