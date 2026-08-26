import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@repo/ui/scroll-reveal/scroll-reveal";
import { PATH_URL } from "@/config/path";
import { STUDY_NAV_MENU, TRAINING_NAV_MENU } from "@/config/nav-menu";
import { getCurrentLocale, getDictionary } from "@/lib/i18n/get-dictionary";
import logoGdptVn from "@/assets/images/logo.png";
import { HeaderMegaMenu } from "./header-mega-menu";
import { HeaderMobileMenu } from "./header-mobile-menu";
import { LanguageSwitcher } from "./language-switcher";
import styles from "./header.module.scss";

const REVEAL_DURATION_SECONDS = 0.35;
const REVEAL_STAGE_STEP_MS = 100;

const REVEAL_DELAY_MS = {
  LOGO: 0,
  HOME: REVEAL_STAGE_STEP_MS,
  STUDY: REVEAL_STAGE_STEP_MS * 2,
  TRAINING_AND_POST: REVEAL_STAGE_STEP_MS * 3,
  YOUTH_DIVISION: REVEAL_STAGE_STEP_MS * 4,
} as const;

export async function Header() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <ScrollReveal direction="fromLeft" duration={REVEAL_DURATION_SECONDS} delay={REVEAL_DELAY_MS.LOGO}>
          <Link href={PATH_URL.ROOT} className={styles.logoLink}>
            <Image src={logoGdptVn} alt="GĐPT Việt Nam" className={styles.logo} priority />
          </Link>
        </ScrollReveal>

        <nav className={styles.nav}>
          <ScrollReveal
            direction="fromTop"
            duration={REVEAL_DURATION_SECONDS}
            delay={REVEAL_DELAY_MS.HOME}
          >
            <Link href={PATH_URL.ROOT} className={`${styles.text} ${styles.navLabelLink}`}>
              {dict.header.home}
            </Link>
          </ScrollReveal>
          <ScrollReveal
            direction="fromBottom"
            duration={REVEAL_DURATION_SECONDS}
            delay={REVEAL_DELAY_MS.STUDY}
          >
            <HeaderMegaMenu menu={STUDY_NAV_MENU} label={dict.header["buddhist-studies"]} />
          </ScrollReveal>
          <ScrollReveal
            direction="fromTop"
            duration={REVEAL_DURATION_SECONDS}
            delay={REVEAL_DELAY_MS.TRAINING_AND_POST}
          >
            <HeaderMegaMenu menu={TRAINING_NAV_MENU} label={dict.header.training} />
          </ScrollReveal>
          <ScrollReveal
            direction="fromBottom"
            duration={REVEAL_DURATION_SECONDS}
            delay={REVEAL_DELAY_MS.YOUTH_DIVISION}
          >
            <Link href={PATH_URL.YOUTH_DIVISION} className={`${styles.text} ${styles.navLabelLink}`}>
              {dict.header["division-activities"]}
            </Link>
          </ScrollReveal>
        </nav>

        <div className={styles.actions}>
          <ScrollReveal
            direction="fromTop"
            duration={REVEAL_DURATION_SECONDS}
            delay={REVEAL_DELAY_MS.HOME}
          >
            <LanguageSwitcher currentLocale={locale} />
          </ScrollReveal>
          <ScrollReveal
            direction="fromBottom"
            duration={REVEAL_DURATION_SECONDS}
            delay={REVEAL_DELAY_MS.TRAINING_AND_POST}
          >
            <Link href={PATH_URL.POST_ARTICLE} className={styles.btnPrimary}>
              {dict.header.post}
            </Link>
          </ScrollReveal>
        </div>

        <HeaderMobileMenu
          dict={dict}
          studyMenu={STUDY_NAV_MENU}
          trainingMenu={TRAINING_NAV_MENU}
          locale={locale}
        />
      </div>
    </header>
  );
}
