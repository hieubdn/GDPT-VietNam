'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_THRESHOLD = 0.1;
const DEFAULT_ROOT_MARGIN = '0px';
const DEFAULT_DELAY = 0;

export interface UseScrollRevealOptions {
  readonly threshold?: number;
  readonly rootMargin?: string;
  readonly triggerOnce?: boolean;
  readonly delay?: number;
}

export interface UseScrollRevealReturn {
  readonly elementRef: React.RefObject<HTMLDivElement | null>;
  readonly isVisible: boolean;
}

/**
 * Theo dõi phần tử bằng IntersectionObserver để kích hoạt hiệu ứng khi cuộn vào viewport.
 * Có fallback hiện phần tử ngay nếu trình duyệt không hỗ trợ IntersectionObserver hoặc khởi tạo lỗi,
 * để tránh nội dung bị kẹt ẩn vĩnh viễn.
 */
export const useScrollReveal = (options: UseScrollRevealOptions = {}): UseScrollRevealReturn => {
  const {
    threshold = DEFAULT_THRESHOLD,
    rootMargin = DEFAULT_ROOT_MARGIN,
    triggerOnce = false,
    delay = DEFAULT_DELAY
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (!entry?.isIntersecting) {
      if (!triggerOnce && !hasAnimated) {
        setIsVisible(false);
      }
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const showElement = () => {
      setIsVisible(true);
      if (triggerOnce) {
        setHasAnimated(true);
      }
    };

    if (delay > 0) {
      timeoutRef.current = setTimeout(showElement, delay);
    } else {
      showElement();
    }
  }, [triggerOnce, hasAnimated, delay]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const element = elementRef.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver is not supported, showing element immediately');
      setIsVisible(true);
      return;
    }

    let observer: IntersectionObserver | null = null;

    try {
      observer = new IntersectionObserver(handleIntersection, {
        threshold,
        rootMargin
      });

      observer.observe(element);
    } catch (error) {
      console.error('Error initializing IntersectionObserver:', error);
      setIsVisible(true);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [handleIntersection, threshold, rootMargin]);

  return { elementRef, isVisible };
};
