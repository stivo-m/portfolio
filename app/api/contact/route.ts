import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/content";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.info("Contact form submission", { name, email, message });
    return NextResponse.json({ ok: true, mode: "log" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL ?? site.email,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: message,
  });

  return NextResponse.json({ ok: true });
}
