"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowRight,
  User,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/types/blog";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  className?: string;
}

export function BlogCard({
  post,
  index = 0,
  className,
}: BlogCardProps) {
  const readingTime =
    post.readingTime ||
    Math.max(
      1,
      Math.ceil(
        post.content
          .trim()
          .split(/\s+/)
          .filter(Boolean).length / 200
      )
    );

  const publishedDate = new Date(post.publishedDate);

  const formattedDate = publishedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.06, 0.3),
        ease: "easeOut" as const

,
      }}
      className={cn("w-full min-w-0", className)}
    >
      <Card
        className="
          group
          relative
          flex
          h-full
          min-w-0
          flex-col
          overflow-hidden
          rounded-2xl
          border-border/60
          bg-card
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-primary/40
          hover:shadow-xl
        "
      >
        {/* -------------------------------------------------
            Cover Image
        -------------------------------------------------- */}
        {post.coverImage && (
          <Link
            href={`/blog/${post.slug}`}
            className="block w-full shrink-0"
            aria-label={`Read ${post.title}`}
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt || post.title}
                fill
                sizes="
                  (max-width: 639px) 100vw,
                  (max-width: 1023px) 50vw,
                  33vw
                "
                className="
                  object-cover
                  transition-transform
                  duration-500
                  ease-out
                  group-hover:scale-105
                "
              />

              {/* Image overlay */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/20
                  via-transparent
                  to-transparent
                  opacity-0
                  transition-opacity
                  duration-300
                  group-hover:opacity-100
                "
              />
            </div>
          </Link>
        )}

        {/* -------------------------------------------------
            Header
        -------------------------------------------------- */}
        <CardHeader className="min-w-0 space-y-3 p-5 sm:p-6">
          {/* Category + Date */}
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-2 text-xs text-muted-foreground">
            <Badge
              variant="secondary"
              className="max-w-full truncate text-xs font-medium"
            >
              {post.category}
            </Badge>

            <span
              aria-hidden="true"
              className="text-muted-foreground/50"
            >
              •
            </span>

            <time
              dateTime={publishedDate.toISOString()}
              className="flex min-w-0 items-center gap-1 whitespace-nowrap"
            >
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span>{formattedDate}</span>
            </time>
          </div>

          {/* Title */}
          <CardTitle
            className="
              min-w-0
              text-lg
              font-semibold
              leading-snug
              tracking-tight
              sm:text-xl
            "
          >
            <Link
              href={`/blog/${post.slug}`}
              className="
                line-clamp-2
                transition-colors
                duration-200
                hover:text-primary
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
                focus-visible:ring-offset-2
              "
            >
              {post.title}
            </Link>
          </CardTitle>

          {/* Excerpt */}
          {post.excerpt && (
            <CardDescription
              className="
                line-clamp-3
                min-w-0
                text-sm
                leading-6
              "
            >
              {post.excerpt}
            </CardDescription>
          )}
        </CardHeader>

        {/* -------------------------------------------------
            Content
        -------------------------------------------------- */}
        <CardContent
          className="
            mt-auto
            min-w-0
            space-y-4
            px-5
            pb-5
            sm:px-6
            sm:pb-6
          "
        >
          {/* Author + Reading Time */}
          <div
            className="
              flex
              min-w-0
              flex-wrap
              items-center
              justify-between
              gap-3
              text-xs
              text-muted-foreground
            "
          >
            {/* Author */}
            <div className="flex min-w-0 items-center gap-2">
              <div
                className="
                  relative
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  bg-muted
                "
              >
                {post.author?.image ? (
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>

              <span className="min-w-0 truncate font-medium text-foreground">
                {post.author?.name || "Author"}
              </span>
            </div>

            {/* Reading time */}
            <span className="flex shrink-0 items-center gap-1 whitespace-nowrap">
              <Clock className="h-3.5 w-3.5" />
              {readingTime} min read
            </span>
          </div>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex min-w-0 flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="max-w-[140px] truncate text-xs font-normal"
                >
                  {tag}
                </Badge>
              ))}

              {post.tags.length > 3 && (
                <Badge
                  variant="outline"
                  className="shrink-0 text-xs font-normal"
                >
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Read Article */}
          <Link
            href={`/blog/${post.slug}`}
            className="
              inline-flex
              items-center
              gap-1.5
              text-sm
              font-medium
              text-primary
              transition-colors
              hover:text-primary/80
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-ring
              focus-visible:ring-offset-2
            "
          >
            <span>Read Article</span>

            <ArrowRight
              className="
                h-4
                w-4
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
            />
          </Link>
        </CardContent>
      </Card>
    </motion.article>
  );
}