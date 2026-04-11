'use server';
import { headers } from 'next/headers';
import { ratelimit } from '@/lib/limiter';
import { contactSchema } from '@/lib/validation';
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactForm(data) {
    const { name:n, email:em,budget:b, message:m, token, website } = JSON.parse(data);

    if (website) {
        throw new Error('Spam detected');
    }
    if (!n) {
    throw new Error('Name is required');
    }

    if (!em) {
    throw new Error('Email is required');
    }

    if (!b) {
    throw new Error('Message is required');
    }

  const ip = (await headers()).get('x-forwarded-for') ?? 'anonymous';

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    throw new Error('Too many requests');
  }
  // 🤖 CAPTCHA (Turnstile)
  if (!token) {
    throw new Error('Missing CAPTCHA');
  }

  const verifyRes = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token.toString(),
      }),
    }
  );

  const verifyData = await verifyRes.json();

  if (!verifyData.success) {
    throw new Error('CAPTCHA failed');
  }

  const raw = {
    name:n,
    email:em,
    budget:b,
    message:m
  };
  const parsed = contactSchema.safeParse(raw);

  console.log('Parsed form data:', parsed);

  if (!parsed.success) {
    throw new Error('Invalid form data');
  }

  const { name, email, budget,message } = parsed.data;
  console.log('Validated form data:', { name, email,budget, message });

    const gg = await resend.emails.send({
      from: 'Contact Form  <onboarding@contact.lollykrown.xyz>',
      to: 'joe_kayu@yahoo.com',
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
          <p><strong>Budget: </strong> ${budget}</p>

          <p><strong>Message: </strong> ${message}</p>
          <br/>
          <p style="font-size:12px; color:#888;">This email was sent from the contact form on lollykrown.xyz</p>
        </div>
        `
    });

    console.log('Email send response:', gg);

    if (gg.error) {
        throw new Error('Failed to send email');
    }

    return { success: true };

}
export async function newsletter(data) {
    const { name:n, email:em,budget:b, message:m, token, website } = JSON.parse(data);

    if (website) {
        throw new Error('Spam detected');
    }
    if (!n) {
    throw new Error('Name is required');
    }

    if (!em) {
    throw new Error('Email is required');
    }

    if (!b) {
    throw new Error('Message is required');
    }

  const ip = (await headers()).get('x-forwarded-for') ?? 'anonymous';

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    throw new Error('Too many requests');
  }
  // 🤖 CAPTCHA (Turnstile)
  if (!token) {
    throw new Error('Missing CAPTCHA');
  }

  const verifyRes = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token.toString(),
      }),
    }
  );

  const verifyData = await verifyRes.json();

  if (!verifyData.success) {
    throw new Error('CAPTCHA failed');
  }

  const raw = {
    name:n,
    email:em,
    budget:b,
    message:m
  };
  const parsed = contactSchema.safeParse(raw);

  console.log('Parsed form data:', parsed);

  if (!parsed.success) {
    throw new Error('Invalid form data');
  }

  const { name, email, budget,message } = parsed.data;
  console.log('Validated form data:', { name, email,budget, message });

    const gg = await resend.emails.send({
      from: 'Contact Form  <onboarding@contact.lollykrown.xyz>',
      to: 'joe_kayu@yahoo.com',
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
          <p><strong>Budget: </strong> ${budget}</p>

          <p><strong>Message: </strong> ${message}</p>
          <br/>
          <p style="font-size:12px; color:#888;">This email was sent from the contact form on lollykrown.xyz</p>
        </div>
        `
    });

    console.log('Email send response:', gg);

    if (gg.error) {
        throw new Error('Failed to send email');
    }

    return { success: true };

}

