"use client";

import { useState } from "react";
import styles from "./motto.module.scss";

export type PillarKey = "compassion" | "wisdom" | "courage";

export interface PillarData {
  key: PillarKey;
  name: string;
  fullName: string;
  definitionLabel: string;
  definition: string;
  meaningLabel: string;
  meaning: string;
}

export function MottoPillars({ pillars }: { pillars: [PillarData, PillarData, PillarData] }) {
  const [activeIndex, setActiveIndex] = useState<0 | 1 | 2>(0);
  const active = pillars[activeIndex];

  return (
    <div className={styles.pillars}>
      <div className={styles.pillarTabs} role="tablist" aria-orientation="vertical">
        {pillars.map((pillar, index) => (
          <button
            key={pillar.key}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            className={`${styles.pillarTab} ${styles[`pillarTab_${pillar.key}`]} ${
              index === activeIndex ? styles.pillarTabActive : ""
            }`}
            onClick={() => setActiveIndex(index as 0 | 1 | 2)}
          >
            {pillar.name} <span className={styles.pillarTabDescription}>({pillar.fullName})</span>
          </button>
        ))}
      </div>

      <div role="tabpanel" className={`${styles.pillarPanel} ${styles[`pillarPanel_${active.key}`]}`}>
        <h2 className={styles.pillarPanelTitle}>{active.fullName}</h2>
        <p className={styles.pillarPanelText}>
          <strong>{active.definitionLabel}:</strong> {active.definition}
        </p>
        <p className={styles.pillarPanelText}>
          <strong>{active.meaningLabel}:</strong> {active.meaning}
        </p>
      </div>
    </div>
  );
}
