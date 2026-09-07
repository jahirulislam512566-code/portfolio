"use client";

import { motion } from "framer-motion";
import { StatusBadge } from "@/components/common/status-badge";
import { cn } from "@/lib/utils";
import { CheckCircle, Sparkles } from "lucide-react";

interface HeroBadgeProps {
  className?: string;
  showSparkle?: boolean;
  variant?: 'default' | 'compact' | 'expanded';
  status?: 'active' | 'available' | 'busy' | 'offline';
  label?: string;
}

export function HeroBadge({ 
  className,
  showSparkle = true,
  variant = 'default',
  status = 'active',
  label = 'Available for work'
}: HeroBadgeProps) {
  // ✅ Animation variants with proper typing
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
        staggerChildren: 0.1,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, delay: 0.1 }
    },
  };

  const sparkleVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -90 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" as const,

        delay: 0.2,
        type: "spring" as const



,
        stiffness: 300,
        damping: 20
      }
    },
  };

  // Get status badge variant
  const getStatusVariant = () => {
    switch (status) {
      case 'available':
      case 'active':
        return 'success';
      case 'busy':
        return 'warning';
      case 'offline':
        return 'secondary';
      default:
        return 'success';
    }
  };

  // Get status label
  const getStatusLabel = () => {
    switch (status) {
      case 'available':
      case 'active':
        return 'Available for work';
      case 'busy':
        return 'Currently busy';
      case 'offline':
        return 'Offline';
      default:
        return label;
    }
  };

  // ✅ Compact variant
  if (variant === 'compact') {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={cn("inline-flex items-center gap-2", className)}
      >
        <motion.div variants={badgeVariants}>
          <StatusBadge status={getStatusVariant()} />
        </motion.div>
        <motion.span
          variants={textVariants}
          className="text-xs font-medium text-muted-foreground"
        >
          {getStatusLabel()}
        </motion.span>
      </motion.div>
    );
  }

  // ✅ Expanded variant with extra details
  if (variant === 'expanded') {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={cn(
          "inline-flex items-center gap-4 rounded-full border border-border/50 bg-background/50 px-5 py-2.5 backdrop-blur-sm shadow-sm",
          className
        )}
      >
        <motion.div variants={badgeVariants}>
          <StatusBadge status={getStatusVariant()} />
        </motion.div>
        <motion.span
          variants={textVariants}
          className="text-sm font-medium"
        >
          {getStatusLabel()}
        </motion.span>
        {showSparkle && (
          <motion.div variants={sparkleVariants}>
            <Sparkles className="h-4 w-4 text-amber-500" />
          </motion.div>
        )}
        <motion.span
          variants={textVariants}
          className="text-xs text-muted-foreground/60 hidden sm:inline"
        >
          • Open to opportunities
        </motion.span>
      </motion.div>
    );
  }

  // ✅ Default variant
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn("inline-flex items-center gap-3", className)}
    >
      <motion.div variants={badgeVariants}>
        <StatusBadge status={getStatusVariant()} />
      </motion.div>
      <motion.span
        variants={textVariants}
        className="text-sm text-muted-foreground"
      >
        {getStatusLabel()}
      </motion.span>
      {showSparkle && (
        <motion.div variants={sparkleVariants}>
          <Sparkles className="h-3.5 w-3.5 text-amber-500/70" />
        </motion.div>
      )}
    </motion.div>
  );
}