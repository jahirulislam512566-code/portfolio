"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number; // 0-1, higher = more parallax
  direction?: "up" | "down";
  offset?: number;
}

export function Parallax({
  children,
  className,
  speed = 0.5,
  direction = "up",
  offset = 200,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [offset * speed, -offset * speed] : [-offset * speed, offset * speed]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}