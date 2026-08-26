import { ScrollReveal } from "@repo/ui/scroll-reveal/scroll-reveal";
import { getCurrentLocale, getDictionary } from "@/lib/i18n/get-dictionary";
import styles from "./purpose.module.scss";

const REVEAL_DURATION_SECONDS = 0.5;
const REVEAL_DELAY_MS = {
  TITLE: 0,
  QUOTE: 100,
  INTRO: 200,
  CARDS: 300,
} as const;

export async function Purpose() {
  const locale = await getCurrentLocale();
  const { purpose } = getDictionary(locale);

  return (
    <section className={styles.purpose}>
      <ScrollReveal
        direction="fromTop"
        duration={REVEAL_DURATION_SECONDS}
        delay={REVEAL_DELAY_MS.TITLE}
      >
        <h1 className={styles.title}>{purpose.title}</h1>
      </ScrollReveal>

      <ScrollReveal
        direction="fromBottom"
        duration={REVEAL_DURATION_SECONDS}
        delay={REVEAL_DELAY_MS.QUOTE}
      >
        <blockquote className={`subtitle ${styles.quote}`}>
          <span className={styles.quoteMark} aria-hidden="true">
            &ldquo;
          </span>
          {purpose.quote}
          <span className={styles.quoteMark} aria-hidden="true">
            &rdquo;
          </span>
        </blockquote>
      </ScrollReveal>

      <ScrollReveal
        direction="fromBottom"
        duration={REVEAL_DURATION_SECONDS}
        delay={REVEAL_DELAY_MS.INTRO}
      >
        <p className={styles.intro}>{purpose.intro}</p>
      </ScrollReveal>

      <div className={styles.grid}>
        <ScrollReveal
          direction="fromLeft"
          duration={REVEAL_DURATION_SECONDS}
          delay={REVEAL_DELAY_MS.CARDS}
        >
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardBadge}>1</span>
              <p className={styles.cardLabel}>{purpose.selfBenefit.label}</p>
              <p className={`subtitle ${styles.cardTitle}`}>({purpose.selfBenefit.title})</p>
            </div>

            <dl className={styles.cardBody}>
              <dt>{purpose.selfBenefit.audienceLabel}:</dt>
              <dd>{purpose.selfBenefit.audience}</dd>
              <dt>{purpose.selfBenefit.goalLabel}:</dt>
              <dd>{purpose.selfBenefit.goal}</dd>
            </dl>
          </article>
        </ScrollReveal>

        <ScrollReveal
          direction="fromRight"
          duration={REVEAL_DURATION_SECONDS}
          delay={REVEAL_DELAY_MS.CARDS}
        >
          <article className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardBadge}>2</span>
              <p className={styles.cardLabel}>{purpose.otherBenefit.label}</p>
              <p className={`subtitle ${styles.cardTitle}`}>({purpose.otherBenefit.title})</p>
            </div>

            <dl className={styles.cardBody}>
              <dt>{purpose.otherBenefit.dharmaLabel}:</dt>
              <dd>{purpose.otherBenefit.dharma}</dd>
              <dt>{purpose.otherBenefit.societyLabel}:</dt>
              <dd>{purpose.otherBenefit.society}</dd>
            </dl>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
