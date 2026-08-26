"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { unitedKingdomFlag as UnitedKingdomFlag, vietnamFlag as VietnamFlag } from "@/assets/svg";
import { LOCALE_COOKIE_NAME, LOCALES, type Locale } from "@/lib/i18n/locale.constants";
import styles from "./header.module.scss";

const LOCALE_LABELS: Record<Locale, { Flag: () => React.JSX.Element; text: string }> = {
  vi: { Flag: VietnamFlag, text: "VI" },
  en: { Flag: UnitedKingdomFlag, text: "EN" },
};

const LOCALE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSelect(locale: Locale) {
    if (locale === currentLocale) return;
    document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE_SECONDS}`;
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className={styles.languageSwitcher} aria-busy={isPending}>
      {LOCALES.map((locale) => (
        <button
          key={locale}
          type="button"
          className={`${styles.languageOption} ${
            locale === currentLocale ? styles.languageOptionActive : ""
          }`}
          onClick={() => handleSelect(locale)}
        >
          <span className={styles.languageFlag} aria-hidden="true">
            {LOCALE_LABELS[locale].Flag()}
          </span>
          {LOCALE_LABELS[locale].text}
        </button>
      ))}
    </div>
  );
}
