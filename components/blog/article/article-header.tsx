"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
} from "lucide-react";

import { BlogPost } from "@/types/blog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ArticleHeaderProps {
  post: BlogPost;
  className?: string;
}

export function ArticleHeader({
  post,
  className,
}: ArticleHeaderProps) {
  /*
   * ---------------------------------------------------------
   * Reading time
   * ---------------------------------------------------------
   */

  const wordCount = post.content
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
    <header
      className={cn(
        "relative w-full min-w-0 overflow-hidden",
        "border-b border-border/50",
        "py-10 sm:py-12 lg:py-16",
        className
      )}
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* Gradient */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-purple-500/5
            via-transparent
            to-pink-500/5
          "
        />

        {/* Cover image background */}
        {post.coverImage && (
          <div className="absolute inset-0">
            <Image
              src={post.coverImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="
                object-cover
                object-center
                opacity-[0.06]
                blur-2xl
                scale-110
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-background/80
              "
            />
          </div>
        )}
      </div>

      {/* Content container */}
      <div
        className="
          mx-auto
          w-full
          max-w-4xl
          min-w-0
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut" as const,
          }}
          className="
            w-full
            min-w-0
            space-y-5
            sm:space-y-6
          "
        >
          {/* Category */}
          <div>
            <Badge
              variant="secondary"
              className="
                max-w-full
                rounded-full
                px-3
                py-1
                text-xs
                font-medium
                sm:px-4
                sm:text-sm
              "
            >
              <span className="truncate">
                {post.category}
              </span>
            </Badge>
          </div>

          {/* Title */}
          <h1
            className="
              max-w-4xl
              break-words
              text-3xl
              font-bold
              leading-[1.12]
              tracking-tight
              text-foreground
              sm:text-4xl
              sm:leading-[1.1]
              lg:text-5xl
              xl:text-6xl
            "
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p
              className="
                max-w-3xl
                text-base
                leading-7
                text-muted-foreground
                sm:text-lg
                sm:leading-8
                lg:text-xl
              "
            >
              {post.excerpt}
            </p>
          )}

          {/* Metadata */}
          <div
            className="
              flex
              w-full
              min-w-0
              flex-wrap
              items-center
              gap-x-4
              gap-y-3
              pt-1
              text-sm
              text-muted-foreground
            "
          >
            {/* Author */}
            <div className="flex min-w-0 items-center gap-2.5">
              <div
                className="
                  relative
                  h-8
                  w-8
                  shrink-0
                  overflow-hidden
                  rounded-full
                  bg-muted
                  ring-1
                  ring-border/50
                "
              >
                {post.author?.image ? (
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-full
                      w-full
                      items-center
                      justify-center
                    "
                  >
                    <User
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>

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

            {/* Date */}
            <div
              className="
                flex
                shrink-0
                items-center
                gap-1.5
              "
            >
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
            <div
              className="
                flex
                shrink-0
                items-center
                gap-1.5
              "
            >
              <Clock
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
              />

              <span>
                {readingTime} min read
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}