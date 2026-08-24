'use client';

import { type CSSProperties, type ReactNode } from 'react';
import { useScrollReveal } from './use-scroll-reveal';
import { type ScrollRevealConfig, SCROLL_REVEAL_DEFAULTS } from './types';
import styles from './scroll-reveal.module.scss';

export interface ScrollRevealProps extends ScrollRevealConfig {
  readonly children: ReactNode;
}

/**
 * ScrollReveal - hiệu ứng "xuất hiện khi cuộn" dựa trên IntersectionObserver.
 * Hỗ trợ nhiều hướng (fadeIn, slideFromLeft/Right/Top/Bottom), stagger cho children
 * (class .stagger-1 → .stagger-4), và tôn trọng prefers-reduced-motion.
 */
export function ScrollReveal({
  children,
  direction = SCROLL_REVEAL_DEFAULTS.DIRECTION,
  duration = SCROLL_REVEAL_DEFAULTS.DURATION,
  delay = SCROLL_REVEAL_DEFAULTS.DELAY,
  threshold = SCROLL_REVEAL_DEFAULTS.THRESHOLD,
  triggerOnce = SCROLL_REVEAL_DEFAULTS.TRIGGER_ONCE,
  className = SCROLL_REVEAL_DEFAULTS.CLASS_NAME
}: ScrollRevealProps) {
  const { elementRef, isVisible } = useScrollReveal({
    threshold,
    triggerOnce,
    delay
  });

  const directionClass = styles[direction] || styles.fadeIn || '';
  const visibilityClass = isVisible ? styles.visible : styles.hidden;
  const animationClass = `${directionClass} ${visibilityClass}`.trim();

  const inlineStyles: CSSProperties = {
    '--duration': `${duration}s`,
    '--delay': `${delay}ms`
  } as CSSProperties;

  const finalClassName = [
    styles.scrollReveal,
    animationClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={elementRef} className={finalClassName} style={inlineStyles}>
      {children}
    </div>
  );
}
