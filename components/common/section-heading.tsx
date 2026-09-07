import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  alignment?: "center" | "left" | "right"; // ✅ Add this
  children?: ReactNode;
}

export function SectionHeading({ 
  title, 
  subtitle, 
  className,
  alignment = "center", // ✅ Default to center
  children 
}: SectionHeadingProps) {
  const alignmentClasses = {
    center: "text-center",
    left: "text-left",
    right: "text-right",
  };

  const subtitleAlignment = {
    center: "mx-auto",
    left: "ml-0",
    right: "mr-0",
  };

  return (
    <div className={cn("space-y-2", alignmentClasses[alignment], className)}>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "max-w-2xl text-muted-foreground text-lg",
          subtitleAlignment[alignment]
        )}>
          {subtitle}
        </p>
      )}
      {children && (
        <div className={cn(
          "mt-4",
          alignment === "center" && "flex justify-center",
          alignment === "left" && "flex justify-start",
          alignment === "right" && "flex justify-end"
        )}>
          {children}
        </div>
      )}
    </div>
  );
}