export function useAnalytics() {
  const safeTrack = (event, data) => {
    if (typeof window === "undefined" || !window.gtag) return;
    track(event, data);
  };

  return {
    trackFormSubmission: (email) =>
      safeTrack("Contact Form Submitted", { email }),

    trackSignupStarted: () =>
      safeTrack("Signup Started", { method: "email" }),

    trackSignupCompleted: (userId) =>
      safeTrack("Signup Completed", { user_id: userId }),

    trackPaymentInitiated: (plan) =>
      safeTrack("Payment Initiated", { plan }),

    trackPaymentSuccess: (value) =>
      safeTrack("Payment Success", { value }),
  };
}