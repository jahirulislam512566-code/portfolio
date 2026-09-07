import {
  Calendar,
  Clock,
  Heart,
  User,
  Eye,
} from "lucide-react";

import { BlogPost } from "@/types/blog";
import { cn } from "@/lib/utils";

interface ArticleMetaProps {
  post: BlogPost;
  className?: string;
}

export function ArticleMeta({
  post,
  className,
}: ArticleMetaProps) {
  /*
   * ---------------------------------------------------------
   * Reading time
   * ---------------------------------------------------------
   */

  const wordCount =
    post.content
      ?.trim()
      .split(/\s+/)
      .filter(Boolean).length ?? 0;

  const readingTime =
    post.readingTime ||
    Math.max(1, Math.ceil(wordCount / 200));

  /*
   * ---------------------------------------------------------
   * Published date
   * ---------------------------------------------------------
   */

  const publishedDate = new Date(
    post.publishedDate
  );

  const formattedDate = Number.isNaN(
    publishedDate.getTime()
  )
    ? "Recently"
    : publishedDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

  /*
   * ---------------------------------------------------------
   * Render
   * ---------------------------------------------------------
   */

  return (
    <div
      className={cn(
        "w-full min-w-0",
        "border-y border-border/60",
        "py-4 sm:py-5",
        className
      )}
    >
      <div
        className="
          flex
          w-full
          min-w-0
          flex-wrap
          items-center
          gap-x-5
          gap-y-3
          text-sm
          text-muted-foreground
          sm:gap-x-6
        "
      >
        {/* Author */}
        <div className="flex min-w-0 items-center gap-2">
          <User
            className="h-4 w-4 shrink-0"
            aria-hidden="true"
          />

          <span
            className="
              max-w-[180px]
              truncate
              font-medium
              text-foreground
              sm:max-w-none
            "
          >
            {post.author?.name ?? "Author"}
          </span>
        </div>

        {/* Published date */}
        <div className="flex shrink-0 items-center gap-2">
          <Calendar
            className="h-4 w-4 shrink-0"
            aria-hidden="true"
          />

          <time
            dateTime={
              Number.isNaN(
                publishedDate.getTime()
              )
                ? undefined
                : publishedDate.toISOString()
            }
          >
            {formattedDate}
          </time>
        </div>

        {/* Reading time */}
        <div className="flex shrink-0 items-center gap-2">
          <Clock
            className="h-4 w-4 shrink-0"
            aria-hidden="true"
          />

          <span>{readingTime} min read</span>
        </div>

        {/* Views */}
        {post.views > 0 && (
          <div className="flex shrink-0 items-center gap-2">
            <Eye
              className="h-4 w-4 shrink-0"
              aria-hidden="true"
            />

            <span>
              {post.views.toLocaleString()} views
            </span>
          </div>
        )}

        {/* Likes */}
        {post.likes > 0 && (
          <div className="flex shrink-0 items-center gap-2">
            <Heart
              className="h-4 w-4 shrink-0"
              aria-hidden="true"
            />

            <span>
              {post.likes.toLocaleString()} likes
            </span>
          </div>
        )}
      </div>
    </div>
  );
}