"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  as?: "div" | "section" | "article" | "main";
  id?: string;
}

export function Container({
  children,
  className,
  size = "lg",
  as: Component = "div",
  id,
}: ContainerProps) {
  const sizeClasses = {
    sm: "max-w-3xl",
    md: "max-w-4xl",
    lg: "max-w-5xl",
    xl: "max-w-6xl",
    full: "max-w-full",
  };

  return (
    <Component
      id={id}
      className={cn(
        "mx-auto w-full px-4 sm:px-6",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Component>
  );
}