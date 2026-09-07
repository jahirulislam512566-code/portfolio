"use client";

import { useState, useEffect, useCallback } from "react";

interface UseActiveSectionOptions {
  sections: string[];
  threshold?: number;
  rootMargin?: string;
}

export function useActiveSection({
  sections,
  threshold = 0.5,
  rootMargin = "-20% 0px -20% 0px",
}: UseActiveSectionOptions) {
  const [activeSection, setActiveSection] = useState<string>(sections[0] || "");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id && sections.includes(id)) {
            setActiveSection(id);
          }
        }
      });
    },
    [sections]
  );

  useEffect(() => {
    if (!isHydrated) return;

    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (!element) return;

      const observer = new IntersectionObserver(handleIntersection, {
        threshold,
        rootMargin,
      });

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
    };
  }, [sections, threshold, rootMargin, handleIntersection, isHydrated]);

  return { activeSection, isHydrated };
}