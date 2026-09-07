// components/common/card-wrapper.tsx
"use client";

import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'outlined';
  hover?: boolean;
}

export function CardWrapper({ 
  children, 
  className, 
  variant = 'default',
  hover = true 
}: CardWrapperProps) {
  const variants = {
    default: "bg-background border border-border/50",
    glass: "bg-background/50 backdrop-blur-sm border border-white/10",
    outlined: "border-2 border-border/30 bg-transparent",
  };

  return (
    <div className={cn(
      "rounded-lg p-6 transition-all duration-300",
      variants[variant],
      hover && "hover:shadow-lg hover:border-primary/30 hover:-translate-y-1",
      className
    )}>
      {children}
    </div>
  );
}