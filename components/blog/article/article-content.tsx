// components/blog/article/article-content.tsx
"use client";

import type { ComponentPropsWithoutRef } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";
import {
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";

import { cn } from "@/lib/utils";

interface ArticleContentProps {
  content: string;
  className?: string;
}

type CodeProps = ComponentPropsWithoutRef<"code"> & {
  inline?: boolean;
};

export function ArticleContent({
  content,
  className,
}: ArticleContentProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.1,
        ease: "easeOut",
      }}
      className={cn(
        /*
         * Base article typography
         */
        "w-full min-w-0 max-w-none",

        /*
         * Mobile typography
         */
        "prose prose-base",

        /*
         * Tablet / desktop typography
         */
        "sm:prose-lg",

        /*
         * Dark mode
         */
        "dark:prose-invert",

        /*
         * Responsive prose width
         */
        "prose-p:max-w-none",
        "prose-headings:max-w-none",

        /*
         * Paragraphs
         */
        "prose-p:leading-7",
        "sm:prose-p:leading-8",

        /*
         * Headings
         */
        "prose-headings:font-bold",
        "prose-headings:tracking-tight",
        "prose-h1:text-3xl",
        "prose-h1:leading-tight",
        "sm:prose-h1:text-4xl",
        "lg:prose-h1:text-5xl",

        "prose-h2:mt-10",
        "prose-h2:text-2xl",
        "sm:prose-h2:text-3xl",

        "prose-h3:mt-8",
        "prose-h3:text-xl",
        "sm:prose-h3:text-2xl",

        /*
         * Links
         */
        "prose-a:text-primary",
        "prose-a:no-underline",
        "prose-a:transition-colors",
        "hover:prose-a:underline",

        /*
         * Strong text
         */
        "prose-strong:text-foreground",

        /*
         * Lists
         */
        "prose-li:leading-7",
        "prose-ul:my-6",
        "prose-ol:my-6",

        /*
         * Blockquotes
         */
        "prose-blockquote:border-primary",
        "prose-blockquote:text-muted-foreground",

        /*
         * Inline code
         */
        "prose-code:rounded-md",
        "prose-code:bg-muted",
        "prose-code:px-1.5",
        "prose-code:py-0.5",
        "prose-code:text-[0.9em]",
        "prose-code:font-medium",
        "prose-code:text-foreground",

        /*
         * Prevent inline code from adding backticks.
         */
        "prose-code:before:content-none",
        "prose-code:after:content-none",

        /*
         * Tables
         */
        "prose-table:w-full",
        "prose-th:text-left",
        "prose-th:font-semibold",
        "prose-td:align-top",

        /*
         * Images
         */
        "prose-img:my-8",
        "prose-img:rounded-xl",
        "prose-img:shadow-lg",

        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          /*
           * --------------------------------------------------
           * Code blocks
           * --------------------------------------------------
           */
          code({
            inline,
            className: codeClassName,
            children,
            ...props
          }: CodeProps) {
            const match =
              /language-([\w+-]+)/.exec(
                codeClassName ?? ""
              );

            const code = String(children).replace(
              /\n$/,
              ""
            );

            if (!inline && match) {
              // ✅ FIXED: Define custom style as a proper CSSProperties object
              const customStyle: React.CSSProperties = {
                margin: 0,
                minWidth: "max-content",
                padding: "1rem",
                fontSize: "0.875rem",
                lineHeight: "1.7",
                background: "transparent",
              };

              // ✅ FIXED: Code tag props as proper CSSProperties
              const codeTagStyle: React.CSSProperties = {
                fontFamily: "var(--font-mono, monospace)",
              };

              // ✅ FIXED: Use type assertion for the theme
              // The vscDarkPlus theme needs to be cast to the expected type
              const themeStyle = vscDarkPlus as any;

              return (
                <div
                  className="
                    my-6
                    w-full
                    min-w-0
                    overflow-hidden
                    rounded-xl
                    border
                    border-border/60
                    bg-[#1e1e1e]
                    shadow-sm
                  "
                >
                  <div
                    className="
                      overflow-x-auto
                      overscroll-x-contain
                    "
                  >
                    <SyntaxHighlighter
                      style={themeStyle}
                      language={match[1]}
                      PreTag="div"
                      wrapLongLines={false}
                      customStyle={customStyle}
                      codeTagProps={{
                        style: codeTagStyle,
                      }}
                      {...props}
                    >
                      {code}
                    </SyntaxHighlighter>
                  </div>
                </div>
              );
            }

            return (
              <code
                className={cn(
                  "break-words",
                  codeClassName
                )}
                {...props}
              >
                {children}
              </code>
            );
          },

          /*
           * --------------------------------------------------
           * Images
           * --------------------------------------------------
           */
          img({
            src,
            alt,
            title,
          }: ComponentPropsWithoutRef<"img">) {
            if (!src) {
              return null;
            }

            return (
              <figure className="my-8 w-full min-w-0">
                <img
                  src={src}
                  alt={alt ?? ""}
                  title={title}
                  loading="lazy"
                  decoding="async"
                  className="
                    block
                    h-auto
                    w-full
                    max-w-full
                    rounded-xl
                    border
                    border-border/50
                    object-cover
                    shadow-lg
                  "
                />

                {alt && (
                  <figcaption
                    className="
                      mt-3
                      text-center
                      text-sm
                      leading-6
                      text-muted-foreground
                    "
                  >
                    {alt}
                  </figcaption>
                )}
              </figure>
            );
          },

          /*
           * --------------------------------------------------
           * Links
           * --------------------------------------------------
           */
          a({
            href,
            children,
            title,
          }: ComponentPropsWithoutRef<"a">) {
            const isExternal =
              href?.startsWith("http://") ||
              href?.startsWith("https://");

            return (
              <a
                href={href}
                title={title}
                target={
                  isExternal ? "_blank" : undefined
                }
                rel={
                  isExternal
                    ? "noopener noreferrer"
                    : undefined
                }
                className="
                  font-medium
                  text-primary
                  underline-offset-4
                  transition-colors
                  hover:underline
                "
              >
                {children}
              </a>
            );
          },

          /*
           * --------------------------------------------------
           * Blockquote
           * --------------------------------------------------
           */
          blockquote({ children }) {
            return (
              <blockquote
                className="
                  my-8
                  rounded-r-xl
                  border-l-4
                  border-primary
                  bg-muted/40
                  px-5
                  py-4
                  not-italic
                  text-muted-foreground
                  sm:px-6
                "
              >
                {children}
              </blockquote>
            );
          },

          /*
           * --------------------------------------------------
           * Horizontal rule
           * --------------------------------------------------
           */
          hr() {
            return (
              <hr
                className="
                  my-10
                  border-border/70
                  sm:my-12
                "
              />
            );
          },

          /*
           * --------------------------------------------------
           * Tables
           * --------------------------------------------------
           */
          table({ children }) {
            return (
              <div
                className="
                  my-8
                  w-full
                  min-w-0
                  overflow-x-auto
                  rounded-xl
                  border
                  border-border/60
                "
              >
                <table
                  className="
                    m-0
                    min-w-[600px]
                    w-full
                  "
                >
                  {children}
                </table>
              </div>
            );
          },

          /*
           * --------------------------------------------------
           * Table head
           * --------------------------------------------------
           */
          th({ children }) {
            return (
              <th
                className="
                  whitespace-nowrap
                  bg-muted/50
                  px-4
                  py-3
                  text-left
                  text-sm
                  font-semibold
                  text-foreground
                "
              >
                {children}
              </th>
            );
          },

          /*
           * --------------------------------------------------
           * Table cells
           * --------------------------------------------------
           */
          td({ children }) {
            return (
              <td
                className="
                  px-4
                  py-3
                  text-sm
                  leading-6
                "
              >
                {children}
              </td>
            );
          },

          /*
           * --------------------------------------------------
           * Paragraph
           * --------------------------------------------------
           */
          p({ children }) {
            return (
              <p
                className="
                  break-words
                  leading-7
                  sm:leading-8
                "
              >
                {children}
              </p>
            );
          },

          /*
           * --------------------------------------------------
           * Lists
           * --------------------------------------------------
           */
          ul({ children }) {
            return (
              <ul
                className="
                  my-6
                  space-y-2
                "
              >
                {children}
              </ul>
            );
          },

          ol({ children }) {
            return (
              <ol
                className="
                  my-6
                  space-y-2
                "
              >
                {children}
              </ol>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </motion.article>
  );
}