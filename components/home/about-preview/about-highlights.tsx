"use client";

import { motion, useInView } from "framer-motion";
import {
  Award,
  Briefcase,
  Users,
  Code2,
} from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { heroData } from "@/data/hero";

interface HighlightItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  description?: string;
  trend?: {
    value: number;
    label: string;
    positive: boolean;
  };
  color?: string;
}

interface AboutHighlightsProps {
  className?: string;
  columns?: 2 | 3 | 4;
  variant?: "default" | "glass" | "minimal";
  showDescriptions?: boolean;
  animateOnce?: boolean;
}

export function AboutHighlights({
  className,
  columns = 2,
  variant = "default",
  showDescriptions = true,
  animateOnce = true,
}: AboutHighlightsProps) {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once: animateOnce,
    amount: 0.15,
  });

  /*
   * ---------------------------------------------------------
   * Highlights data
   * ---------------------------------------------------------
   */

  const stats = heroData?.stats ?? [];

  const highlights: HighlightItem[] = [
    {
      icon: <Briefcase className="h-5 w-5" />,
      label: "Experience",
      value: stats[0]?.value
        ? `${stats[0].value}+ Years`
        : "5+ Years",
      description: stats[0]?.description ?? "Professional experience",
      color: "text-blue-500",
      trend: stats[0]?.trend,
    },
    {
      icon: <Code2 className="h-5 w-5" />,
      label: "Projects",
      value: stats[1]?.value
        ? `${stats[1].value}+`
        : "50+",
      description: stats[1]?.description ?? "Completed projects",
      color: "text-purple-500",
      trend: stats[1]?.trend,
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Clients",
      value: stats[2]?.value
        ? `${stats[2].value}+`
        : "30+",
      description: stats[2]?.description ?? "Happy clients",
      color: "text-emerald-500",
      trend: stats[2]?.trend,
    },
    {
      icon: <Award className="h-5 w-5" />,
      label: "Awards",
      value: stats[3]?.value
        ? String(stats[3].value)
        : "5",
      description: stats[3]?.description ?? "Industry recognition",
      color: "text-amber-500",
      trend: stats[3]?.trend,
    },
  ];

  /*
   * ---------------------------------------------------------
   * Grid configuration
   * ---------------------------------------------------------
   */

  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  /*
   * ---------------------------------------------------------
   * Card variants
   * ---------------------------------------------------------
   */

  const variantStyles = {
    default:
      "border border-border/50 bg-background hover:border-primary/30",

    glass:
      "border border-border/40 bg-background/60 backdrop-blur-md hover:border-primary/30",

    minimal:
      "border border-transparent bg-transparent hover:bg-accent/50",
  };

  /*
   * ---------------------------------------------------------
   * Animation
   * ---------------------------------------------------------
   */

  const containerVariants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 16,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut" as const
      },
    },
  };

  /*
   * ---------------------------------------------------------
   * Render
   * ---------------------------------------------------------
   */

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={cn(
        "grid w-full gap-4 sm:gap-5 lg:gap-6",
        gridCols[columns],
        className
      )}
    >
      {highlights.map((item, index) => (
        <motion.article
          key={`${item.label}-${index}`}
          variants={itemVariants}
          whileHover={{
            y: -4,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "group relative w-full rounded-2xl p-5 sm:p-6",
            "transition-colors duration-300",
            "min-w-0",
            variantStyles[variant]
          )}
          aria-label={`${item.label}: ${item.value}`}
        >
          {/* Hover glow */}
          {variant === "glass" && (
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                -z-0
                rounded-2xl
                bg-gradient-to-br
                from-purple-500/5
                via-transparent
                to-pink-500/5
                opacity-0
                transition-opacity
                duration-300
                group-hover:opacity-100
              "
              aria-hidden="true"
            />
          )}

          {/* Card content */}
          <div className="relative z-10 text-center">
            {/* Icon */}
            <div
              className={cn(
                "mx-auto mb-4 flex h-11 w-11",
                "items-center justify-center rounded-xl",
                "bg-primary/10",
                "transition-all duration-300",
                "group-hover:bg-primary group-hover:scale-105",
                item.color ?? "text-primary"
              )}
            >
              <span className="transition-colors group-hover:text-primary-foreground">
                {item.icon}
              </span>
            </div>

            {/* Value */}
            <p
              className="
                text-2xl
                font-bold
                tracking-tight
                sm:text-3xl
                bg-gradient-to-r
                from-purple-600
                to-pink-600
                bg-clip-text
                text-transparent
              "
            >
              {item.value}
            </p>

            {/* Label */}
            <p className="mt-1 text-sm font-semibold text-foreground">
              {item.label}
            </p>

            {/* Description */}
            {showDescriptions && item.description && (
              <p className="mx-auto mt-1 max-w-[220px] text-xs leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            )}

            {/* Trend */}
            {item.trend && (
              <div className="mt-3 flex items-center justify-center gap-1.5">
                <span
                  className={cn(
                    "text-xs font-semibold",
                    item.trend.positive
                      ? "text-emerald-500"
                      : "text-red-500"
                  )}
                >
                  {item.trend.positive ? "↑" : "↓"}{" "}
                  {Math.abs(item.trend.value)}%
                </span>

                <span className="text-xs text-muted-foreground/60">
                  {item.trend.label}
                </span>
              </div>
            )}
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}