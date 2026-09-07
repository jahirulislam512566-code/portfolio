"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GridProps {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "sm" | "md" | "lg" | "xl";
  as?: "div" | "section" | "article";
}

export function Grid({
  children,
  className,
  cols = 3,
  gap = "md",
  as: Component = "div",
}: GridProps) {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
  };

  const gapClasses = {
    sm: "gap-3",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-12",
  };

  return (
    <Component
      className={cn(
        "grid",
        colClasses[cols],
        gapClasses[gap],
        className
      )}
    >
      {children}
    </Component>
  );
}