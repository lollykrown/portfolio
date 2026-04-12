'use client';

import { track } from "@/lib/analytics";

export function useAnalytics() {
  if (!window.gtag) return;
  return {
    trackFormSubmission: (email) =>
      track("Contact Form Submitted", { email: email  }),
    trackSignupStarted: () =>
      track("Signup Started", { method: "email" }),

    trackSignupCompleted: (userId) =>
      track("Signup Completed", { user_id: userId }),

    trackPaymentInitiated: (plan) =>
      track("Payment Initiated", { plan }),

    trackPaymentSuccess: (value) =>
      track("Payment Success", { value }),
  };
}