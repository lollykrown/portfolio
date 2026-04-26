'use server';
import { headers } from 'next/headers';
import { ratelimit } from '@/lib/limiter';
import { contactSchema, newsletterSchema } from '@/lib/validation';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactForm(data) {
  const {
    name: n,
    email: em,
    budget: b,
    message: m,
    token,
    website,
  } = JSON.parse(data);

  if (website) {
    return { error: 'Spam detected' };
  }
  if (!n) {
    return { error: 'Name is required' };
  }

  if (!em) {
    return { error: 'Email is required' };
  }

  if (!m) {
    return { error: 'Message is required' };
  }

  const ip = (await headers()).get('x-forwarded-for') ?? 'anonymous';

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return { error: 'Too many requests' };
  }
  // 🤖 CAPTCHA (Turnstile)
  if (!token) {
    return { error: 'Missing CAPTCHA' };
  }

  const verifyRes = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token.toString(),
      }),
    },
  );

  const verifyData = await verifyRes.json();

  if (!verifyData.success) {
    return { error: 'CAPTCHA failed' };
  }

  const raw = {
    name: n,
    email: em,
    budget: b ? b : '',
    message: m,
  };
  const parsed = contactSchema.safeParse(raw);

  console.log('Parsed form data:', parsed);

  if (!parsed.success) {
    return { error: 'Invalid form data' };
  }

  const { name, email, budget, message } = parsed.data;
  console.log('Validated form data:', { name, email, budget, message });

  const gg = await resend.emails.send({
    from: 'Contact Form  <onboarding@contact.lollykrown.xyz>',
    to: 'admin@lollykrown.xyz',
    subject: `New contact form message from ${name}`,
    replyTo: email,
    // templateId:'efafe3e3-1ddb-4073-911d-d6a2685fe391',
    // dynamicTemplateData: {
    //   name,
    //   email,
    //   budget,
    //   message,
    // },
    html: `
        <div style="font-family: Arial;">

          <h2>New Message</h2>

          <p><strong>Name: </strong> ${name}</p>
          <p><strong>Email: </strong> ${email}</p>
          ${budget ? `<p><strong>Budget: </strong> ${budget}</p>` : ''}

          <p><strong>Message: </strong> ${message}</p>
          <br/>
          <p style="font-size:12px; color:#888;">This email was sent from the contact form on lollykrown.xyz</p>
        </div>
        `,
  });

  console.log('Email send response:', gg);

  if (gg.error) {
    return { error: 'Failed to send email' };
  }

  return { success: true };
}
export async function subscribeNewsletter(raw) {
  const parsed = newsletterSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors.email?.[0] };
  }

  const { email, website } = parsed.data;

  // 🛑 spam protection
  if (website) {
    return { error: 'Spam detected' };
  }

  try {
    const { data, error } = await resend.contacts.create({
      email,
      unsubscribed: false,
    });
    console.log('data', data, 'error', error);
    return { success: true };
  } catch (e) {
    return { error: "You're already subscribed or something went wrong" };
  }
}
