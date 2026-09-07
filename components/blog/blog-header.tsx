"use client";

import { Calendar, Clock, PenSquare } from "lucide-react";

import { SectionHeading } from "@/components/common/section-heading";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BlogHeaderProps {
  className?: string;
  totalPosts?: number;
  totalCategories?: number;
}

export function BlogHeader({
  className,
  totalPosts = 0,
  totalCategories = 0,
}: BlogHeaderProps) {
  return (
    <header
      className={cn(
        "mx-auto w-full max-w-3xl text-center",
        className
      )}
    >
      {/* Heading */}
      <SectionHeading
        title="Blog"
        subtitle="Thoughts, tutorials, and insights on web development"
        className="mb-4"
      />

      {/* Description */}
      <p
        className="
          mx-auto
          max-w-2xl
          text-sm
          leading-6
          text-muted-foreground
          sm:text-base
          sm:leading-7
        "
      >
        Welcome to my blog where I share my knowledge,
        experiences, and thoughts on web development,
        programming, and technology.
      </p>

      {/* Statistics */}
      {totalPosts > 0 && (
        <div
          className="
            mt-6
            flex
            w-full
            flex-wrap
            items-center
            justify-center
            gap-2
            sm:gap-3
          "
          aria-label="Blog statistics"
        >
          {/* Articles */}
          <Badge
            variant="outline"
            className="
              inline-flex
              h-9
              gap-2
              rounded-full
              px-3
              text-xs
              font-medium
              sm:px-4
              sm:text-sm
            "
          >
            <PenSquare
              className="h-3.5 w-3.5 sm:h-4 sm:w-4"
              aria-hidden="true"
            />

            <span>
              {totalPosts}{" "}
              {totalPosts === 1
                ? "Article"
                : "Articles"}
            </span>
          </Badge>

          {/* Categories */}
          <Badge
            variant="outline"
            className="
              inline-flex
              h-9
              gap-2
              rounded-full
              px-3
              text-xs
              font-medium
              sm:px-4
              sm:text-sm
            "
          >
            <Calendar
              className="h-3.5 w-3.5 sm:h-4 sm:w-4"
              aria-hidden="true"
            />

            <span>
              {totalCategories}{" "}
              {totalCategories === 1
                ? "Category"
                : "Categories"}
            </span>
          </Badge>

          {/* Updates */}
          <Badge
            variant="outline"
            className="
              inline-flex
              h-9
              gap-2
              rounded-full
              border-blue-500/20
              bg-blue-500/10
              px-3
              text-xs
              font-medium
              text-blue-500
              sm:px-4
              sm:text-sm
            "
          >
            <Clock
              className="h-3.5 w-3.5 sm:h-4 sm:w-4"
              aria-hidden="true"
            />

            <span>Weekly Updates</span>
          </Badge>
        </div>
      )}
    </header>
  );
}