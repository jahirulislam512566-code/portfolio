"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  texts: string[];
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  cursorClassName?: string;
  loop?: boolean;
}

export function Typewriter({
  texts,
  className,
  speed = 50,
  delay = 2000,
  cursor = true,
  cursorClassName = "inline-block w-0.5 h-6 bg-primary ml-1 animate-pulse",
  loop = true,
}: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsPaused(false);
    }, delay);

    if (isPaused) {
      return () => clearTimeout(timeout);
    }

    const currentFullText = texts[currentTextIndex];

    if (isDeleting) {
      if (currentText.length === 0) {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        setIsPaused(true);
        return;
      }

      setCurrentText(currentText.slice(0, -1));
    } else {
      if (currentText.length === currentFullText.length) {
        if (loop || currentTextIndex < texts.length - 1) {
          setIsPaused(true);
          setTimeout(() => {
            setIsDeleting(true);
          }, delay);
        }
        return;
      }

      setCurrentText(currentFullText.slice(0, currentText.length + 1));
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, speed, delay, loop]);

  useEffect(() => {
    const timeout = setTimeout(() => {}, speed);
    return () => clearTimeout(timeout);
  }, [currentText, speed]);

  return (
    <span className={cn("inline-flex items-center", className)}>
      {currentText}
      {cursor && (
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className={cursorClassName}
        />
      )}
    </span>
  );
}