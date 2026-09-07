// components/home/hero/hero-actions.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  FolderIcon,
  MailIcon,
  DownloadIcon,
  ArrowRightIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/icons";

import { SocialIcon } from "@/components/common/social-icon";
import { siteConfig } from "@/config/site.config";


interface HeroActionsProps {
  className?: string;
  showSocial?: boolean;
  showResume?: boolean;
}

// ✅ Animation variants with proper typing
const containerVariants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,

      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut" as const

    },
  },
};

export function HeroActions({
  className,
  showSocial = true,
  showResume = true,
}: HeroActionsProps) {
  /**
   * Social links
   */
  const socialLinks = [
    {
      icon: GithubIcon,
      href: siteConfig.social?.github || "#",
      label: "GitHub",
      color:
        "hover:bg-[#24292f] hover:text-white dark:hover:bg-white dark:hover:text-[#24292f]",
    },
    {
      icon: LinkedinIcon,
      href: siteConfig.social?.linkedin || "#",
      label: "LinkedIn",
      color: "hover:bg-[#0A66C2] hover:text-white",
    },
    {
      icon: TwitterIcon,
      href: siteConfig.social?.twitter || "#",
      label: "Twitter",
      color: "hover:bg-[#1DA1F2] hover:text-white",
    },
  ].filter(
    (social) =>
      typeof social.href === "string" &&
      social.href.trim() !== "" &&
      social.href !== "#"
  );

  /**
   * Resume
   */
  const resumeHref = "/resume.pdf";

  return (
    <motion.div
      className={cn(
        "w-full max-w-xl mx-auto",
        "space-y-5 sm:space-y-6",
        className
      )}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* =========================================================
          PRIMARY ACTIONS
      ========================================================= */}
      <motion.div
        variants={itemVariants}
        className={cn(
          "flex w-full items-center justify-center",
          "flex-col sm:flex-row",
          "gap-3 sm:gap-4"
        )}
      >
        {/* View Projects */}
        <Button
          size="lg"
          asChild
          className={cn(
            "group w-full sm:w-auto",
            "min-w-0 sm:min-w-[160px]",
            "h-11 sm:h-12",
            "px-5 sm:px-6",
            "touch-manipulation",
            "bg-gradient-to-r from-purple-600 to-pink-600",
            "text-white",
            "border-0",
            "shadow-md",
            "hover:shadow-lg",
            "hover:from-purple-700 hover:to-pink-700",
            "transition-all duration-300",
            "focus-visible:ring-2",
            "focus-visible:ring-primary",
            "focus-visible:ring-offset-2"
          )}
        >
          <Link
            href="/projects"
            className="flex w-full items-center justify-center gap-2"
          >
            <FolderIcon
              size={18}
              aria-hidden="true"
              className="shrink-0 transition-transform duration-300 group-hover:scale-110"
            />

            <span className="whitespace-nowrap leading-none">
              View My Work
            </span>

            <ArrowRightIcon
              size={16}
              aria-hidden="true"
              className="shrink-0 transition-all duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Button>

        {/* Hire Me */}
        <Button
          size="lg"
          variant="outline"
          asChild
          className={cn(
            "group w-full sm:w-auto",
            "min-w-0 sm:min-w-[160px]",
            "h-11 sm:h-12",
            "px-5 sm:px-6",
            "touch-manipulation",
            "border-2",
            "bg-background/60",
            "backdrop-blur-sm",
            "hover:border-primary/50",
            "hover:bg-background",
            "transition-all duration-300",
            "focus-visible:ring-2",
            "focus-visible:ring-primary",
            "focus-visible:ring-offset-2"
          )}
        >
          <Link
            href="/contact"
            className="flex w-full items-center justify-center gap-2"
          >
            <MailIcon
              size={18}
              aria-hidden="true"
              className="shrink-0 transition-transform duration-300 group-hover:scale-110"
            />

            <span
              className={cn(
                "whitespace-nowrap leading-none font-medium",
                "bg-gradient-to-r from-purple-600 to-pink-600",
                "bg-clip-text text-transparent"
              )}
            >
              Hire Me
            </span>
          </Link>
        </Button>
      </motion.div>

      {/* =========================================================
          RESUME
      ========================================================= */}
      {showResume && (
        <motion.div
          variants={itemVariants}
          className="flex justify-center"
        >
          <Button
            variant="ghost"
            size="sm"
            asChild
            className={cn(
              "group h-auto px-3 py-2",
              "touch-manipulation",
              "text-muted-foreground",
              "hover:bg-muted/50",
              "transition-colors duration-200"
            )}
          >
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open resume in a new tab"
              className="inline-flex flex-col items-center gap-1"
            >
              <DownloadIcon
                size={16}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-200 group-hover:translate-y-0.5"
              />
              <span
                className={cn(
                  "font-medium leading-none text-sm",
                  "bg-gradient-to-r from-purple-600 to-pink-600",
                  "bg-clip-text text-transparent"
                )}
              >
                Download Resume
              </span>
            </a>
          </Button>
        </motion.div>
      )}

      {/* =========================================================
          SOCIAL LINKS
      ========================================================= */}
      {showSocial && socialLinks.length > 0 && (
        <motion.div
          variants={itemVariants}
          className={cn(
            "flex items-center justify-center",
            "gap-2 sm:gap-3",
            "pt-1 sm:pt-2"
          )}
        >
          {/* Desktop label */}
          <span className="hidden text-xs font-medium text-muted-foreground/70 sm:inline">
            Connect
          </span>

          {/* Separator */}
          <span
            aria-hidden="true"
            className="hidden h-4 w-px bg-border/60 sm:block"
          />

          {/* Social buttons */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <SocialIcon
                key={social.label}
                icon={social.icon}
                href={social.href}
                label={social.label}
                iconSize={18}
                className={cn(
                  "h-9 w-9 sm:h-10 sm:w-10",
                  "shrink-0",
                  "touch-manipulation",
                  "transition-all duration-200",
                  "hover:scale-105",
                  "active:scale-95",
                  "focus-visible:ring-2",
                  "focus-visible:ring-primary",
                  "focus-visible:ring-offset-2",
                  social.color
                )}
              />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}