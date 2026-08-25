"use client";

import { useState } from "react";
import Link from "next/link";
import { PATH_URL } from "@/config/path";
import type { NavMenuConfig } from "@/config/nav-menu";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locale.constants";
import { LanguageSwitcher } from "./language-switcher";
import styles from "./header.module.scss";

interface HeaderMobileMenuProps {
  dict: Dictionary;
  studyMenu: NavMenuConfig;
  trainingMenu: NavMenuConfig;
  locale: Locale;
}

const MENU_TOGGLE_LABEL: Record<Locale, { open: string; close: string }> = {
  vi: { open: "Mở menu", close: "Đóng menu" },
  en: { open: "Open menu", close: "Close menu" },
};

function MobileMegaMenu({ menu, onNavigate }: { menu: NavMenuConfig; onNavigate: () => void }) {
  return (
    <>
      {menu.categories.map((category) => (
        <details key={category.label} className={styles.mobileSubAccordion}>
          <summary>{category.label}</summary>
          {category.items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={styles.mobileSubLink}
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          ))}
        </details>
      ))}
    </>
  );
}

export function HeaderMobileMenu({ dict, studyMenu, trainingMenu, locale }: HeaderMobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.mobileMenuRoot}>
      <button
        type="button"
        className={`${styles.mobileMenuToggle} ${isOpen ? styles.mobileMenuToggleOpen : ""}`}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        aria-label={isOpen ? MENU_TOGGLE_LABEL[locale].close : MENU_TOGGLE_LABEL[locale].open}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>

      {isOpen && (
        <div id="mobile-menu-panel" className={styles.mobileMenu}>
          <Link href={PATH_URL.ROOT} className={styles.mobileNavLink} onClick={() => setIsOpen(false)}>
            {dict.header.home}
          </Link>

          <details className={styles.mobileAccordion}>
            <summary>{dict.header["buddhist-studies"]}</summary>
            <MobileMegaMenu menu={studyMenu} onNavigate={() => setIsOpen(false)} />
          </details>

          <details className={styles.mobileAccordion}>
            <summary>{dict.header.training}</summary>
            <MobileMegaMenu menu={trainingMenu} onNavigate={() => setIsOpen(false)} />
          </details>

          <Link
            href={PATH_URL.YOUTH_DIVISION}
            className={styles.mobileNavLink}
            onClick={() => setIsOpen(false)}
          >
            {dict.header["division-activities"]}
          </Link>

          <div className={styles.mobileActions}>
            <LanguageSwitcher currentLocale={locale} />
            <Link
              href={PATH_URL.POST_ARTICLE}
              className={styles.btnPrimary}
              onClick={() => setIsOpen(false)}
            >
              {dict.header.post}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
