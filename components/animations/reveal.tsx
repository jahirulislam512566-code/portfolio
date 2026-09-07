"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface RevealProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "left" | "right" | "up" | "down";
  once?: boolean;
  amount?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  direction = "left",
  once = true,
  amount = 0.1,
  ...props
}: RevealProps) {
  const getDirection = () => {
    switch (direction) {
      case "left":
        return { x: "-100%" };
      case "right":
        return { x: "100%" };
      case "up":
        return { y: "-100%" };
      case "down":
        return { y: "100%" };
      default:
        return { x: "-100%" };
    }
  };

  const directionOffset = getDirection();

  return (
    <motion.div className={cn("relative overflow-hidden", className)} {...props}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, amount }}
        transition={{
          duration: duration * 0.5,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-primary"
        initial={{ ...directionOffset }}
        whileInView={{ x: 0, y: 0 }}
        viewport={{ once, amount }}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      />
    </motion.div>
  );
}