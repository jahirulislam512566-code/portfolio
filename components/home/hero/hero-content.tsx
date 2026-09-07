"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { HeroBadge } from "./hero-badge";
import { HeroActions } from "./hero-actions";
import { GradientText } from "@/components/common/gradient-text";
import { Typewriter } from "@/components/animations/typewriter";

import { heroData } from "@/data/hero";
import { siteConfig } from "@/config/site.config";

interface HeroContentProps {
  className?: string;
  alignment?: "center" | "left";
  showBadge?: boolean;
  showTypewriter?: boolean;
  showDescription?: boolean;
}

const containerVariants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const

,
    },
  },
};

export function HeroContent({
  className,
  alignment = "center",
  showBadge = true,
  showTypewriter = true,
  showDescription = true,
}: HeroContentProps) {
  const isCentered = alignment === "center";

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(
        "flex w-full min-w-0 flex-col",
        "space-y-4 sm:space-y-5 md:space-y-6",
        isCentered
          ? "items-center text-center"
          : "items-start text-left",
        className
      )}
    >
      {/* =========================================================
          BADGE
      ========================================================= */}
      {showBadge && (
        <motion.div
          variants={itemVariants}
          className="flex w-full justify-center"
        >
          <div className="max-w-full">
            <HeroBadge />
          </div>
        </motion.div>
      )}

      {/* =========================================================
          MAIN HEADING
      ========================================================= */}
      <motion.div
        variants={itemVariants}
        className="w-full min-w-0 space-y-3 sm:space-y-4"
      >
        <h1
          className={cn(
            "mx-auto w-full",
            "font-bold tracking-tight",
            "leading-[1.08]",
            "text-[2.25rem]",
            "sm:text-5xl",
            "md:text-6xl",
            "lg:text-7xl",
            "xl:text-8xl",
            "break-words",
            isCentered ? "text-center" : "text-left"
          )}
        >
          <span>{heroData.greeting || "Hi, I'm"} </span>

          <GradientText
            from="from-purple-600"
            to="to-pink-600"
            className="inline"
          >
            {siteConfig.author.name}
          </GradientText>
        </h1>

        {/* Subtitle */}
        {heroData.subtitle && (
          <p
            className={cn(
              "mx-auto w-full max-w-2xl",
              "text-sm sm:text-base md:text-lg",
              "leading-relaxed",
              "text-muted-foreground",
              isCentered ? "text-center" : "text-left"
            )}
          >
            {heroData.subtitle}
          </p>
        )}
      </motion.div>

      {/* =========================================================
          TYPEWRITER
      ========================================================= */}
      {showTypewriter &&
        heroData.typewriterTexts?.length > 0 && (
          <motion.div
            variants={itemVariants}
            className={cn(
              "w-full min-w-0",
              "space-y-1",
              isCentered ? "text-center" : "text-left"
            )}
          >
            <div
              className={cn(
                "flex min-h-9 w-full items-center",
                "text-lg font-semibold",
                "sm:min-h-10 sm:text-xl",
                "md:min-h-12 md:text-2xl",
                "lg:text-3xl",
                isCentered
                  ? "justify-center"
                  : "justify-start"
              )}
            >
              <Typewriter
                texts={heroData.typewriterTexts}
                speed={80}
                delay={2000}
                className="max-w-full text-primary"
                cursorClassName="text-primary"
              />
            </div>

            {heroData.rolePrefix && (
              <p
                className={cn(
                  "text-xs sm:text-sm",
                  "leading-relaxed",
                  "text-muted-foreground/60",
                  isCentered ? "text-center" : "text-left"
                )}
              >
                {heroData.rolePrefix}
              </p>
            )}
          </motion.div>
        )}

      {/* =========================================================
          DESCRIPTION
      ========================================================= */}
      {showDescription && heroData.description && (
        <motion.div
          variants={itemVariants}
          className="w-full"
        >
          <p
            className={cn(
              "mx-auto w-full max-w-2xl",
              "text-sm sm:text-base md:text-lg",
              "leading-7 sm:leading-8",
              "text-muted-foreground",
              isCentered ? "text-center" : "text-left"
            )}
          >
            {heroData.description}
          </p>
        </motion.div>
      )}

      {/* =========================================================
          ACTIONS
      ========================================================= */}
      <motion.div
        variants={itemVariants}
        className={cn(
          "w-full pt-1 sm:pt-2",
          isCentered
            ? "flex justify-center"
            : "flex justify-start"
        )}
      >
        <HeroActions />
      </motion.div>
    </motion.div>
  );
}