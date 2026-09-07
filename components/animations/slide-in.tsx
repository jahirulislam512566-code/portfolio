"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SlideInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "left" | "right" | "up" | "down";
  distance?: number;
  once?: boolean;
  amount?: number;
}

export function SlideIn({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = "left",
  distance = 60,
  once = true,
  amount = 0.1,
  ...props
}: SlideInProps) {
  const getDirection = () => {
    switch (direction) {
      case "left":
        return { x: -distance };
      case "right":
        return { x: distance };
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      default:
        return { x: -distance };
    }
  };

  const directionOffset = getDirection();

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}