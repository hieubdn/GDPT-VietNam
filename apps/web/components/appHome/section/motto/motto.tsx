import Image from "next/image";
import { ScrollReveal } from "@repo/ui/scroll-reveal/scroll-reveal";
import { getCurrentLocale, getDictionary } from "@/lib/i18n/get-dictionary";
import emblem from "@/assets/images/ChamNgonGDPT.png";
import { MottoPillars } from "./motto-pillars";
import styles from "./motto.module.scss";

const REVEAL_DURATION_SECONDS = 0.5;
const REVEAL_DELAY_MS = {
  HERO: 0,
  PILLARS: 100,
  RELATIONSHIP: 200,
} as const;

export async function Motto() {
  const locale = await getCurrentLocale();
  const { motto } = getDictionary(locale);

  return (
    <section className={styles.motto}>
      <div className={styles.hero}>
        <ScrollReveal direction="fromLeft" duration={REVEAL_DURATION_SECONDS} delay={REVEAL_DELAY_MS.HERO}>
          <Image src={emblem} alt={motto.emblemAlt} className={styles.heroImage} priority />
        </ScrollReveal>

        <ScrollReveal direction="fromRight" duration={REVEAL_DURATION_SECONDS} delay={REVEAL_DELAY_MS.HERO}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>{motto.title}</h1>
            <p className={`subtitle ${styles.origin}`}>{motto.origin}</p>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal direction="fromBottom" duration={REVEAL_DURATION_SECONDS} delay={REVEAL_DELAY_MS.PILLARS}>
        <MottoPillars
          pillars={[
            { key: "compassion", ...motto.compassion },
            { key: "wisdom", ...motto.wisdom },
            { key: "courage", ...motto.courage },
          ]}
        />
      </ScrollReveal>

      <ScrollReveal direction="fromBottom" duration={REVEAL_DURATION_SECONDS} delay={REVEAL_DELAY_MS.RELATIONSHIP}>
        <div className={styles.relationship}>
          <p className={styles.relationshipIntro}>{motto.relationship.intro}</p>
          <ul className={styles.relationshipList}>
            {motto.relationship.points.map((point, index) => (
              <li key={point} className={styles.relationshipItem}>
                <span className={styles.relationshipMarker} aria-hidden="true">
                  {index + 1}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </section>
  );
}
