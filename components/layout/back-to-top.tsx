"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackToTopProps {
  className?: string;
  threshold?: number;
  position?: "bottom-right" | "bottom-left" | "bottom-center";
  showAfter?: number;
}

export function BackToTop({
  className,
  threshold = 300,
  position = "bottom-right",
  showAfter = 300,
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const toggleVisibility = () => {
      const scrolled = document.documentElement.scrollTop;
      const shouldShow = scrolled > threshold;
      
      // Delay showing the button to avoid flash
      if (shouldShow) {
        timeoutId = setTimeout(() => {
          setIsVisible(true);
        }, showAfter);
      } else {
        clearTimeout(timeoutId);
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      clearTimeout(timeoutId);
    };
  }, [threshold, showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const positionClasses = {
    "bottom-right": "bottom-8 right-8",
    "bottom-left": "bottom-8 left-8",
    "bottom-center": "bottom-8 left-1/2 -translate-x-1/2",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed z-50",
            positionClasses[position],
            className
          )}
        >
          <Button
            size="icon"
            className="rounded-full shadow-lg hover:shadow-xl transition-shadow"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}