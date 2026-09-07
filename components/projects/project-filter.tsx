"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectFilterProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ProjectFilter({
  label,
  options,
  value,
  onChange,
  className,
}: ProjectFilterProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="text-sm text-muted-foreground">{label}:</span>
      {options.map((option) => (
        <Button
          key={option}
          variant={value === option ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(option)}
          className={cn(
            "capitalize",
            value === option && "bg-primary text-primary-foreground"
          )}
        >
          {option === "all" ? "All" : option.replace("-", " ")}
        </Button>
      ))}
    </div>
  );
}