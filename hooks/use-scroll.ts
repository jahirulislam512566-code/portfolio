"use client";

import { useState, useEffect, useCallback } from "react";

interface UseScrollOptions {
  threshold?: number;
  element?: React.RefObject<HTMLElement> | null;
}

export function useScroll({ threshold = 0, element = null }: UseScrollOptions = {}) {
  const [scrollY, setScrollY] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const target = element?.current || window;
    const currentScrollY = "scrollY" in target ? target.scrollY : target.scrollTop || 0;
    const currentScrollX = "scrollX" in target ? target.scrollX : target.scrollLeft || 0;

    setScrollY(currentScrollY);
    setScrollX(currentScrollX);

    // Determine scroll direction
    if (currentScrollY > lastScrollY) {
      setScrollDirection("down");
    } else if (currentScrollY < lastScrollY) {
      setScrollDirection("up");
    }

    // Check if scrolled past threshold
    setIsScrolled(currentScrollY > threshold);
    setLastScrollY(currentScrollY);
  }, [lastScrollY, threshold, element]);

  useEffect(() => {
    const target = element?.current || window;
    
    // Use requestAnimationFrame for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    if ("addEventListener" in target) {
      target.addEventListener("scroll", throttledHandleScroll, { passive: true });
    }

    // Initial call
    handleScroll();

    return () => {
      if ("removeEventListener" in target) {
        target.removeEventListener("scroll", throttledHandleScroll);
      }
    };
  }, [handleScroll, element]);

  return { scrollY, scrollX, scrollDirection, isScrolled };
}