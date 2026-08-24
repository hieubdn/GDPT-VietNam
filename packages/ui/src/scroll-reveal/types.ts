export type ScrollRevealDirection =
  | 'fadeIn'
  | 'slideFromLeft'
  | 'slideFromRight'
  | 'slideFromTop'
  | 'slideFromBottom';

export interface ScrollRevealConfig {
  readonly direction?: ScrollRevealDirection;
  readonly duration?: number;
  readonly delay?: number;
  readonly threshold?: number;
  readonly triggerOnce?: boolean;
  readonly className?: string;
}

export const SCROLL_REVEAL_DEFAULTS = {
  DIRECTION: 'fadeIn' as const,
  DURATION: 0.6,
  DELAY: 0,
  THRESHOLD: 0.1,
  TRIGGER_ONCE: true,
  CLASS_NAME: ''
} as const;
