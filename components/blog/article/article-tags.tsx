"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ArticleTagsProps {
  tags: string[];
  className?: string;
}

/**
 * Convert a tag into a URL-safe slug.
 *
 * Example:
 * "Web Development" -> "web-development"
 * "Next.js 16"      -> "next-js-16"
 */
function createTagSlug(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ArticleTags({
  tags,
  className,
}: ArticleTagsProps) {
  if (!Array.isArray(tags) || tags.length === 0) {
    return null;
  }

  const uniqueTags = Array.from(
    new Set(
      tags
        .map((tag) => tag?.trim())
        .filter(Boolean)
    )
  );

  if (uniqueTags.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="article-tags-heading"
      className={cn(
        "w-full min-w-0 space-y-3",
        className
      )}
    >
      <h2
        id="article-tags-heading"
        className="text-sm font-semibold tracking-tight"
      >
        Tags
      </h2>

      <div
        className="
          flex
          w-full
          min-w-0
          flex-wrap
          gap-2
        "
      >
        {uniqueTags.map((tag) => {
          const slug = createTagSlug(tag);

          if (!slug) {
            return null;
          }

          return (
            <Link
              key={tag}
              href={`/blog/tag/${slug}`}
              className="max-w-full shrink-0"
              aria-label={`View articles tagged ${tag}`}
            >
              <Badge
                variant="secondary"
                className="
                  max-w-full
                  cursor-pointer
                  rounded-full
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-primary
                  hover:text-primary-foreground
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-ring
                  focus-visible:ring-offset-2
                "
              >
                <span className="truncate">
                  #{tag}
                </span>
              </Badge>
            </Link>
          );
        })}
      </div>
    </section>
  );
}