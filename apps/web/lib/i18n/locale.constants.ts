export type Locale = "vi" | "en";

export const DEFAULT_LOCALE: Locale = "vi";
export const LOCALE_COOKIE_NAME = "locale";
export const LOCALES: readonly Locale[] = ["vi", "en"];

export function isLocale(value: string | undefined): value is Locale {
  return value === "vi" || value === "en";
}
