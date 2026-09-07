import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  from?: string;
  to?: string;
}

export function GradientText({ 
  children, 
  className,
  from = "from-purple-600",
  to = "to-pink-600"
}: GradientTextProps) {
  return (
    <span
      className={cn(
        `bg-gradient-to-r ${from} ${to} bg-clip-text text-transparent`,
        className
      )}
    >
      {children}
    </span>
  );
}