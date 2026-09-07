// components/skills/skills-header.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { SectionHeading } from "@/components/common/section-heading";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRef, ReactNode } from "react";
import { Code, Sparkles, TrendingUp, Award, Layers, LucideIcon } from "lucide-react";

interface SkillsHeaderProps {
  className?: string;
  totalSkills?: number;
  categories?: number;
  showStats?: boolean;
  variant?: 'default' | 'minimal' | 'compact';
}

// ✅ Animation variants with proper typing
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,

      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: "easeOut" as const

    },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,

      stiffness: 300,
      damping: 25,
      delay: 0.2,
    },
  },
};

// ✅ Stats data with proper typing
interface StatItem {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  textColor: string;
}

const stats: StatItem[] = [
  {
    label: "Technologies",
    value: 0, // Will be replaced with actual value
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    label: "Categories",
    value: 0,
    icon: Layers,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  {
    label: "Learning",
    value: "Always",
    icon: TrendingUp,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
];

export function SkillsHeader({ 
  className, 
  totalSkills = 0,
  categories = 0,
  showStats = true,
  variant = 'default'
}: SkillsHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);

  // ✅ Update stats with actual values
  const updatedStats = stats.map(stat => {
    if (stat.label === "Technologies") {
      return { ...stat, value: totalSkills };
    }
    if (stat.label === "Categories") {
      return { ...stat, value: categories };
    }
    return stat;
  });

  // ✅ Minimal variant
  if (variant === 'minimal') {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        className={cn("text-center", className)}
      >
        <SectionHeading 
          title="Skills" 
          subtitle="Technologies I work with"
          className="mb-2"
          // ✅ Remove alignment prop if not supported
        />
        {showStats && totalSkills > 0 && (
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mt-2">
            <Badge variant="outline" className="px-3 py-1 text-xs">
              {totalSkills} Skills
            </Badge>
            {categories > 0 && (
              <Badge variant="outline" className="px-3 py-1 text-xs">
                {categories} Categories
              </Badge>
            )}
          </motion.div>
        )}
      </motion.div>
    );
  }

  // ✅ Compact variant
  if (variant === 'compact') {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        className={cn("text-center", className)}
      >
        <SectionHeading 
          title="Skills & Technologies" 
          subtitle="Technologies I work with and specialize in"
          className="mb-3"
        />
        {showStats && (
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 flex-wrap">
            <Badge variant="outline" className="px-3 py-1.5 text-sm gap-1.5">
              <Code className="h-3.5 w-3.5" />
              {totalSkills} Technologies
            </Badge>
            <Badge variant="outline" className="px-3 py-1.5 text-sm gap-1.5 bg-green-500/10 text-green-500 border-green-500/20">
              <Sparkles className="h-3.5 w-3.5" />
              Continuously Learning
            </Badge>
          </motion.div>
        )}
      </motion.div>
    );
  }

  // ✅ Default variant
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className={cn("text-center", className)}
    >
      <SectionHeading 
        title="Skills & Technologies" 
        subtitle="Technologies I work with and specialize in"
        className="mb-6"
      />

      {showStats && (
        <motion.div 
          variants={containerVariants}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          {updatedStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={badgeVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                custom={index}
              >
                <Badge 
                  variant="outline" 
                  className={cn(
                    "px-4 py-2 text-sm gap-2 transition-all duration-300",
                    "hover:shadow-md hover:border-primary/30",
                    stat.bgColor,
                    stat.textColor
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {stat.value} {stat.label}
                </Badge>
              </motion.div>
            );
          })}

          {/* ✅ Learning badge with sparkle */}
          <motion.div
            variants={badgeVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            custom={3}
          >
            <Badge 
              className="px-4 py-2 text-sm gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 hover:shadow-md transition-all duration-300"
            >
              <Sparkles className="h-4 w-4" />
              Continuously Learning
            </Badge>
          </motion.div>

          {/* ✅ Award badge for mastery */}
          {totalSkills > 20 && (
            <motion.div
              variants={badgeVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              custom={4}
            >
              <Badge 
                className="px-4 py-2 text-sm gap-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 hover:shadow-md transition-all duration-300"
              >
                <Award className="h-4 w-4" />
                {totalSkills}+ Skills
              </Badge>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}