// lib/consent.js

export const getConsent = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("cookie_consent");
};

export const setConsent = (value) => {
  localStorage.setItem("cookie_consent", value);
};