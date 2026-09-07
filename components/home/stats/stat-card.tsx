// components/stats/stat-card.tsx
"use client";

import { motion, useInView, useSpring, useTransform, Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  value: string | number;
  label: string;
  suffix?: string;
  prefix?: string;
  delay?: number;
  className?: string;
  icon?: React.ReactNode;
  iconColor?: string;
  variant?: 'default' | 'gradient' | 'outlined' | 'glass';
  animateValue?: boolean;
  duration?: number;
  description?: string;
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
}

// ✅ Animation variants with proper typing
const cardVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      type: "spring" as const,
      stiffness: 200,
      damping: 25,
    }
  },
  hover: {
    y: -4,
    boxShadow: "0 12px 40px -12px rgba(0,0,0,0.15)",
    transition: { duration: 0.2 }
  }
};

const iconVariants: Variants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
    },
  },
};

const valueVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring" as const
    },
  },
};

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

const trendVariants: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export function StatCard({
  value,
  label,
  suffix = "",
  prefix = "",
  delay = 0,
  className,
  icon,
  iconColor = "text-primary",
  variant = 'default',
  animateValue = true,
  duration = 2,
  description,
  trend,
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState<string | number>(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Parse numeric value for counting animation
  const numericValue = typeof value === "string" 
    ? parseInt(value.replace(/[^0-9]/g, "")) 
    : value;
  const isNumeric = !isNaN(numericValue) && numericValue > 0;

  // ✅ Use spring with proper configuration
  const count = useSpring(0, {
    stiffness: 100,
    damping: 30,
    duration: duration * 1000,
  });

  const roundedCount = useTransform(count, (latest) => Math.round(latest));

  // ✅ Animate count when in view
  useEffect(() => {
    if (isInView && isNumeric && animateValue && !hasAnimated) {
      count.set(numericValue);
      setHasAnimated(true);
    }
  }, [isInView, isNumeric, animateValue, numericValue, count, hasAnimated]);

  // ✅ Subscribe to roundedCount changes
  useEffect(() => {
    if (!isNumeric || !animateValue) {
      setDisplayValue(value);
      return;
    }

    const unsubscribe = roundedCount.on("change", (v) => {
      setDisplayValue(v);
    });

    // ✅ If already in view, set the final value
    if (isInView && hasAnimated) {
      // The subscription will handle updates
    }

    return () => {
      unsubscribe?.();
    };
  }, [roundedCount, isNumeric, animateValue, value, isInView, hasAnimated]);

  // ✅ Handle non-numeric values
  useEffect(() => {
    if (!isNumeric || !animateValue) {
      setDisplayValue(value);
    }
  }, [value, isNumeric, animateValue]);

  // Variant styles
  const variantStyles = {
    default: "bg-background border border-border/50 hover:border-primary/30",
    gradient: "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-primary/20 hover:border-primary/40",
    outlined: "border-2 border-primary/20 hover:border-primary/40 bg-transparent",
    glass: "bg-background/50 backdrop-blur-sm border border-white/10 hover:border-primary/30",
  };

  // ✅ Get display value
  const getDisplayValue = () => {
    if (isNumeric && animateValue) {
      return displayValue;
    }
    return value;
  };

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      whileHover="hover"
      variants={cardVariants}
      className={cn(
        "group rounded-lg p-6 text-center transition-all duration-300 relative",
        variantStyles[variant],
        className
      )}
      role="article"
      aria-label={`${label}: ${value}`}
    >
      {/* Icon */}
      {icon && (
        <motion.div 
          className={cn("mb-3 transition-colors", iconColor)}
          variants={iconVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: delay + 0.1 }}
        >
          {icon}
        </motion.div>
      )}

      {/* Value */}
      <motion.div 
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1"
        variants={valueVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: delay + 0.1 }}
      >
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {prefix}
          {getDisplayValue()}
          {suffix}
        </span>
      </motion.div>

      {/* Label */}
      <motion.p 
        className="text-sm font-medium text-muted-foreground"
        variants={fadeInVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: delay + 0.2 }}
      >
        {label}
      </motion.p>

      {/* Description */}
      {description && (
        <motion.p 
          className="text-xs text-muted-foreground/60 mt-1"
          variants={fadeInVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: delay + 0.25 }}
        >
          {description}
        </motion.p>
      )}

      {/* Trend Indicator */}
      {trend && (
        <motion.div 
          className="mt-3 flex items-center justify-center gap-1"
          variants={trendVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: delay + 0.3 }}
        >
          <span className={cn(
            "text-xs font-medium",
            trend.positive ? "text-green-500" : "text-red-500"
          )}>
            {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-muted-foreground/60">
            {trend.label}
          </span>
        </motion.div>
      )}

      {/* Hover Glow Effect */}
      {variant === 'glass' && (
        <div className={cn(
          "absolute inset-0 rounded-lg",
          "bg-gradient-to-r from-purple-500/5 to-pink-500/5",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-300 pointer-events-none"
        )} />
      )}
    </motion.div>
  );
}