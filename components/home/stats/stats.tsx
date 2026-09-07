// components/stats/stats.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { StatCard } from "./stat-card";
import { cn } from "@/lib/utils";
import { heroData } from "@/data/hero";
import { useRef } from "react";

interface StatsProps {
  className?: string;
  columns?: 2 | 3 | 4;
  variant?: "default" | "glass" | "gradient" | "minimal";
  showBackground?: boolean;
  animateOnce?: boolean;
  title?: string;
  description?: string;
  showTitle?: boolean;
}

// ✅ Animation variants with proper typing
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
      staggerChildren: 0.1,
    },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "spring" as const,
      stiffness: 200,
      damping: 25,
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    },
  },
};

const footerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.4,
    },
  },
};

// ✅ Default stats data with all required properties
interface StatItem {
  value: string;
  label: string;
  suffix: string;
  prefix?: string;
  icon?: React.ReactNode;
  iconColor?: string;
  description?: string;
  trend?: {
    value: number;
    label: string;
    positive: boolean;
  };
}

const defaultStats: StatItem[] = [
  { value: "5+", label: "Years Experience", suffix: "" },
  { value: "50+", label: "Projects Completed", suffix: "" },
  { value: "30+", label: "Happy Clients", suffix: "" },
  { value: "20+", label: "Technologies", suffix: "" },
];

export function Stats({ 
  className, 
  columns = 4,
  variant = "default",
  showBackground = true,
  animateOnce = true,
  title = "By the Numbers",
  description = "A track record of success and growth",
  showTitle = false,
}: StatsProps) {
  const ref = useRef<HTMLDivElement>(null);

  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  const variantStyles = {
    default: "bg-muted/30",
    glass: "bg-background/50 backdrop-blur-sm border border-border/50",
    gradient: "bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5",
    minimal: "bg-transparent",
  };

  // ✅ Safely get stats data with proper type checking
  const getStatsData = (): StatItem[] => {
    if (heroData?.stats && Array.isArray(heroData.stats) && heroData.stats.length > 0) {
      return heroData.stats.map((stat: any) => ({
        value: stat.value ?? "0",
        label: stat.label ?? "Metric",
        suffix: stat.suffix ?? "",
        // ✅ Only include optional properties if they exist
        ...(stat.prefix && { prefix: stat.prefix }),
        ...(stat.icon && { icon: stat.icon }),
        ...(stat.iconColor && { iconColor: stat.iconColor }),
        ...(stat.description && { description: stat.description }),
        ...(stat.trend && { trend: stat.trend }),
      }));
    }
    return defaultStats;
  };

  const statsData = getStatsData();

  // ✅ Determine StatCard variant
  const getCardVariant = () => {
    if (variant === "glass") return "glass";
    if (variant === "gradient") return "gradient";
    if (variant === "minimal") return "outlined";
    return "default";
  };

  const cardVariant = getCardVariant();

  return (
    <section 
      className={cn(
        "py-12 md:py-16 lg:py-20 transition-colors duration-300",
        showBackground ? variantStyles[variant] : "bg-transparent",
        className
      )}
      aria-label="Statistics"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Title Section */}
        {showTitle && (title || description) && (
          <motion.div
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: animateOnce }}
            className="text-center mb-8 md:mb-12"
          >
            {title && (
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
                {description}
              </p>
            )}
          </motion.div>
        )}

        {/* Stats Grid */}
        <motion.div
          ref={ref}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: animateOnce, amount: 0.1 }}
          variants={containerVariants}
          className={cn(
            "grid gap-4 md:gap-6",
            gridCols[columns]
          )}
        >
          {statsData.map((stat, index) => {
            // ✅ Ensure all required props are passed with proper fallbacks
            return (
              <motion.div
                key={stat.label || index}
                variants={childVariants}
                className="h-full"
              >
                <StatCard
                  value={stat.value}
                  label={stat.label}
                  suffix={stat.suffix || ""}
                  prefix={stat.prefix || ""}
                  delay={index * 0.1}
                  icon={stat.icon}
                  iconColor={stat.iconColor || "text-primary"}
                  variant={cardVariant}
                  description={stat.description}
                  trend={stat.trend}
                  animateValue={true}
                  duration={2}
                  className="h-full"
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer text */}
        {statsData.length > 0 && (
          <motion.div
            variants={footerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: animateOnce }}
            className="mt-8 text-center"
          >
            <p className="text-xs text-muted-foreground/60">
              {statsData.length} key metrics
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}