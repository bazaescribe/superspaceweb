import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
  localeCookie: { name: "superspace-locale", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" },
});
