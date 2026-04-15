// lib/validations.ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  budget: z.string().min(2).or(z.literal('')).optional(),
  // .transform((val) => val || undefined),
  message: z.string().min(10),
});

export const newsletterSchema = z.object({
  email: z.string().email("Valid email required"),
  website: z.string().optional(), // honeypot
});