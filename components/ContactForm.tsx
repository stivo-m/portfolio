"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    setStatus(response.ok ? "sent" : "error");
    if (response.ok) form.reset();
  }

  return (
    <form onSubmit={submit} className="rounded-[32px] bg-surface p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium">Name<input name="name" required className="mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none focus:border-accent" /></label>
        <label className="text-sm font-medium">Email<input name="email" type="email" required className="mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 outline-none focus:border-accent" /></label>
      </div>
      <label className="mt-4 block text-sm font-medium">Message<textarea name="message" required rows={7} className="mt-2 w-full resize-none rounded-2xl border border-line bg-white px-4 py-3 outline-none focus:border-accent" /></label>
      <button disabled={status === "sending"} className="mt-6 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60">
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
      {status === "sent" && <p className="mt-4 text-sm text-accent">Message sent. I&apos;ll reply soon.</p>}
      {status === "error" && <p className="mt-4 text-sm text-red-600">Something went wrong. Please email me directly.</p>}
    </form>
  );
}
