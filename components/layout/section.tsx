"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "muted" | "gradient" | "dark";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  as?: "section" | "div" | "article";
  animate?: boolean;
  animationDelay?: number;
}

export function Section({
  children,
  className,
  id,
  variant = "default",
  padding = "lg",
  as: Component = "section",
  animate = false,
  animationDelay = 0,
}: SectionProps) {
  const variantClasses = {
    default: "bg-background",
    muted: "bg-muted/30",
    gradient: "bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5",
    dark: "bg-foreground/5",
  };

  const paddingClasses = {
    none: "py-0",
    sm: "py-8",
    md: "py-12",
    lg: "py-20",
    xl: "py-28",
  };

  const content = (
    <Component
      id={id}
      className={cn(
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </Component>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: animationDelay, duration: 0.6 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}