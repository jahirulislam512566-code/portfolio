"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Link2,
  Share2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  TwitterIcon,
  LinkedinIcon,
  FacebookIcon,
  MailIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

interface ArticleShareProps {
  title: string;
  url: string;
  className?: string;
  variant?: "default" | "compact" | "expanded";
  showLabel?: boolean;
}

export function ArticleShare({
  title,
  url,
  className,
  variant = "default",
  showLabel = true,
}: ArticleShareProps) {
  const [copied, setCopied] = useState(false);

  /*
   * ---------------------------------------------------------
   * Share links
   * ---------------------------------------------------------
   */

  const shareLinks = useMemo(
    () => [
      {
        name: "Twitter",
        icon: TwitterIcon,
        href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(url)}`,
        hoverClass:
          "hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]",
      },
      {
        name: "LinkedIn",
        icon: LinkedinIcon,
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`,
        hoverClass:
          "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
      },
      {
        name: "Facebook",
        icon: FacebookIcon,
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
        hoverClass:
          "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
      },
      {
        name: "Email",
        icon: MailIcon,
        href: `mailto:?subject=${encodeURIComponent(
          title
        )}&body=${encodeURIComponent(
          `Check out this article: ${url}`
        )}`,
        hoverClass:
          "hover:bg-primary hover:text-primary-foreground hover:border-primary",
      },
    ],
    [title, url]
  );

  /*
   * ---------------------------------------------------------
   * Copy URL
   * ---------------------------------------------------------
   */

  const copyToClipboard = useCallback(async () => {
    try {
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea =
          document.createElement("textarea");

        textArea.value = url;
        textArea.setAttribute(
          "readonly",
          ""
        );

        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";

        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        document.execCommand("copy");

        document.body.removeChild(textArea);
      }

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (error) {
      console.error(
        "Failed to copy article URL:",
        error
      );
    }
  }, [url]);

  /*
   * ---------------------------------------------------------
   * Animation variants
   * ---------------------------------------------------------
   */

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut" as const

,
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.25,
        ease: "easeOut" as const

,
      },
    },
  };

  /*
   * ---------------------------------------------------------
   * Compact variant
   * ---------------------------------------------------------
   */

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex w-full min-w-0 items-center gap-1.5",
          className
        )}
      >
        {showLabel && (
          <span className="mr-1 shrink-0 text-xs text-muted-foreground">
            Share:
          </span>
        )}

        {shareLinks.map((link) => {
          const Icon = link.icon;

          return (
            <Button
              key={link.name}
              asChild
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 shrink-0 rounded-full",
                "transition-all duration-200",
                "hover:scale-110 active:scale-95",
                link.hoverClass
              )}
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Share on ${link.name}`}
              >
                <Icon
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </a>
            </Button>
          );
        })}

        {/* Copy */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={copyToClipboard}
          aria-label={
            copied
              ? "Link copied"
              : "Copy article link"
          }
          className="
            h-8
            w-8
            shrink-0
            rounded-full
            transition-all
            duration-200
            hover:scale-110
            active:scale-95
          "
        >
          {copied ? (
            <Check
              className="h-4 w-4"
              aria-hidden="true"
            />
          ) : (
            <Link2
              className="h-4 w-4"
              aria-hidden="true"
            />
          )}
        </Button>
      </div>
    );
  }

  /*
   * ---------------------------------------------------------
   * Expanded variant
   * ---------------------------------------------------------
   */

  if (variant === "expanded") {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={cn(
          "w-full min-w-0 space-y-5",
          className
        )}
      >
        {/* Heading */}
        {showLabel && (
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3"
          >
            <div
              aria-hidden="true"
              className="
                h-6
                w-0.5
                shrink-0
                rounded-full
                bg-gradient-to-b
                from-purple-600
                to-pink-600
              "
            />

            <h3 className="text-base font-semibold sm:text-lg">
              Share this article
            </h3>
          </motion.div>
        )}

        {/* Share buttons */}
        <motion.div
          variants={itemVariants}
          className="
            flex
            w-full
            min-w-0
            flex-wrap
            gap-2
            sm:gap-3
          "
        >
          {shareLinks.map((link) => {
            const Icon = link.icon;

            return (
              <motion.div
                key={link.name}
                variants={itemVariants}
                className="shrink-0"
              >
                <Button
                  asChild
                  variant="outline"
                  size="default"
                  className={cn(
                    "h-9 rounded-full gap-2 px-3 sm:h-10 sm:px-4",
                    "transition-all duration-200",
                    "hover:scale-105 active:scale-95",
                    link.hoverClass
                  )}
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Share on ${link.name}`}
                  >
                    <Icon
                      className="h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />

                    <span>{link.name}</span>
                  </a>
                </Button>
              </motion.div>
            );
          })}

          {/* Copy link */}
          <motion.div variants={itemVariants}>
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={copyToClipboard}
              className="
                h-9
                rounded-full
                gap-2
                px-3
                transition-all
                duration-200
                hover:scale-105
                active:scale-95
                sm:h-10
                sm:px-4
              "
            >
              {copied ? (
                <>
                  <Check
                    className="h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Link2
                    className="h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>Copy Link</span>
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>

        {/* Helper text */}
        <motion.p
          variants={itemVariants}
          className="
            text-xs
            leading-5
            text-muted-foreground
          "
        >
          Share this article with your network.
        </motion.p>

        {/* Copy feedback */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{
                opacity: 0,
                y: -4,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -4,
              }}
              className="
                flex
                items-center
                gap-2
                text-sm
                text-green-600
                dark:text-green-400
              "
              role="status"
              aria-live="polite"
            >
              <Check
                className="h-4 w-4"
                aria-hidden="true"
              />

              <span>
                Link copied to clipboard!
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  /*
   * ---------------------------------------------------------
   * Default variant
   * ---------------------------------------------------------
   */

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(
        "w-full min-w-0 space-y-4",
        className
      )}
    >
      {/* Label */}
      {showLabel && (
        <motion.p
          variants={itemVariants}
          className="
            flex
            items-center
            gap-2
            text-sm
            font-medium
          "
        >
          <Share2
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />

          <span>Share this article</span>
        </motion.p>
      )}

      {/* Buttons */}
      <motion.div
        variants={itemVariants}
        className="
          flex
          w-full
          min-w-0
          flex-wrap
          gap-2
        "
      >
        {shareLinks.map((link) => {
          const Icon = link.icon;

          return (
            <Button
              key={link.name}
              asChild
              variant="outline"
              size="sm"
              className={cn(
                "h-9 rounded-full gap-2 px-3",
                "transition-all duration-200",
                "hover:scale-105 active:scale-95",
                link.hoverClass
              )}
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Share on ${link.name}`}
              >
                <Icon
                  className="h-4 w-4 shrink-0"
                  aria-hidden="true"
                />

                <span>{link.name}</span>
              </a>
            </Button>
          );
        })}

        {/* Copy link */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="
            h-9
            rounded-full
            gap-2
            px-3
            transition-all
            duration-200
            hover:scale-105
            active:scale-95
          "
        >
          {copied ? (
            <>
              <Check
                className="h-4 w-4"
                aria-hidden="true"
              />

              <span>Copied!</span>
            </>
          ) : (
            <>
              <Link2
                className="h-4 w-4"
                aria-hidden="true"
              />

              <span>Copy Link</span>
            </>
          )}
        </Button>
      </motion.div>

      {/* Success feedback */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{
              opacity: 0,
              y: -4,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -4,
            }}
            role="status"
            aria-live="polite"
            className="
              flex
              items-center
              gap-2
              text-sm
              text-green-600
              dark:text-green-400
            "
          >
            <Check
              className="h-4 w-4 shrink-0"
              aria-hidden="true"
            />

            <span>Link copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}