"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlogCategoryProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  className?: string;
}

export function BlogCategory({
  categories,
  selectedCategory,
  onSelectCategory,
  className,
}: BlogCategoryProps) {
  if (!categories.length) {
    return null;
  }

  return (
    <div
      role="group"
      aria-label="Blog categories"
      className={cn(
        "flex w-full min-w-0 flex-wrap items-center gap-2",
        className
      )}
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category;

        const label =
          category.toLowerCase() === "all"
            ? "All"
            : category;

        return (
          <Button
            key={category}
            type="button"
            variant={isSelected ? "default" : "outline"}
            size="sm"
            aria-pressed={isSelected}
            onClick={() => onSelectCategory(category)}
            className={cn(
              "max-w-full shrink-0 rounded-full",
              "px-4 text-sm font-medium",
              "transition-all duration-200",
              "focus-visible:ring-2 focus-visible:ring-ring",
              "focus-visible:ring-offset-2",
              isSelected && "shadow-sm"
            )}
          >
            <span className="max-w-[180px] truncate sm:max-w-none">
              {label}
            </span>
          </Button>
        );
      })}
    </div>
  );
}