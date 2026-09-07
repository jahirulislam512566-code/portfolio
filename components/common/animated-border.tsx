import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedBorderProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "gradient";
}

export function AnimatedBorder({
  children,
  className,
  variant = "gradient",
}: AnimatedBorderProps) {
  const borderStyles = {
    primary: "border border-primary",
    secondary: "border border-secondary",
    gradient:
      "border border-transparent bg-gradient-to-r from-purple-600 to-pink-600",
  };

  return (
    <div
      className={cn(
        "relative w-fit max-w-full shrink-0 rounded-lg p-[2px]",
        className
      )}
    >
      {/* Animated / gradient border layer */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 rounded-lg",
          borderStyles[variant]
        )}
      />

      {/* Content */}
      <div className="relative w-fit max-w-full rounded-lg bg-background p-4">
        {children}
      </div>
    </div>
  );
}