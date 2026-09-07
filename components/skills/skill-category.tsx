// components/skills/skill-category.tsx
"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { SkillCard } from "./skill-card";
import { Skill, SkillGroup } from "@/types/skill";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SkillCategoryProps {
  category: SkillGroup;
  skills: Skill[];
  className?: string;
  variant?: 'default' | 'compact' | 'expanded';
  columns?: 2 | 3 | 4;
  collapsible?: boolean;
  defaultExpanded?: boolean;
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

      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { 
      duration: 0.3, 
      ease: "easeOut" as const

    },
  },
};

const gridVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const

    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.25,
      ease: "easeInOut" as const

    },
  },
};

// ✅ Category style configuration
interface CategoryStyle {
  icon: string;
  color: string;
  gradient: string;
  bgColor: string;
}

const categoryStyles: Record<string, CategoryStyle> = {
  'Frontend': {
    icon: '🎨',
    color: 'text-blue-500',
    gradient: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
  },
  'Backend': {
    icon: '⚙️',
    color: 'text-emerald-500',
    gradient: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
  },
  'Tools': {
    icon: '🔧',
    color: 'text-purple-500',
    gradient: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
  },
  'DevOps': {
    icon: '🚀',
    color: 'text-indigo-500',
    gradient: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-500/10',
  },
  'Design': {
    icon: '🎨',
    color: 'text-rose-500',
    gradient: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-500/10',
  },
  'Database': {
    icon: '🗄️',
    color: 'text-amber-500',
    gradient: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
  },
  'Testing': {
    icon: '🧪',
    color: 'text-cyan-500',
    gradient: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-cyan-500/10',
  },
  'Security': {
    icon: '🔒',
    color: 'text-red-500',
    gradient: 'from-red-500 to-orange-500',
    bgColor: 'bg-red-500/10',
  },
  'Mobile': {
    icon: '📱',
    color: 'text-sky-500',
    gradient: 'from-sky-500 to-blue-500',
    bgColor: 'bg-sky-500/10',
  },
  'Cloud': {
    icon: '☁️',
    color: 'text-slate-500',
    gradient: 'from-slate-500 to-gray-500',
    bgColor: 'bg-slate-500/10',
  },
  'AI/ML': {
    icon: '🤖',
    color: 'text-violet-500',
    gradient: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-500/10',
  },
};

const defaultStyle: CategoryStyle = {
  icon: '📚',
  color: 'text-muted-foreground',
  gradient: 'from-muted-foreground/50 to-muted-foreground/30',
  bgColor: 'bg-muted/50',
};

export function SkillCategory({ 
  category, 
  skills, 
  className,
  variant = 'default',
  columns = 3,
  collapsible = false,
  defaultExpanded = true
}: SkillCategoryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // Grid columns configuration
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  // Get category style
  const categoryStyle = categoryStyles[category.label] || defaultStyle;

  // Determine card variant
  const cardVariant = variant === 'compact' ? 'compact' : variant === 'expanded' ? 'expanded' : 'default';

  // Skill count
  const skillCount = skills.length;

  // Calculate mastery percentage (skills with level >= 70)
  const masteredCount = skills.filter(s => s.level && s.level >= 70).length;
  const masteryPercentage = skillCount > 0 ? Math.round((masteredCount / skillCount) * 100) : 0;

  // ✅ Toggle handler
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className={cn("space-y-4", className)}
    >
      {/* Category Header */}
      <motion.div 
        variants={headerVariants}
        className="flex items-center justify-between group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={cn(
            "h-10 w-10 rounded-lg flex items-center justify-center text-xl shrink-0",
            categoryStyle.bgColor,
            categoryStyle.color
          )}>
            {categoryStyle.icon}
          </div>
          <div className="min-w-0">
            <h3 className="text-lg md:text-xl font-bold flex items-center gap-2 flex-wrap">
              {category.label}
              <span className="text-sm font-normal text-muted-foreground">
                ({skillCount} skill{skillCount !== 1 ? 's' : ''})
              </span>
            </h3>
            {category.description && (
              <p className="text-sm text-muted-foreground hidden md:block truncate">
                {category.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Progress indicator */}
          {skillCount > 0 && (
            <div className="hidden sm:flex items-center gap-2">
              <div className="h-1.5 w-20 rounded-full bg-muted overflow-hidden">
                <motion.div 
                  className={cn(
                    "h-full rounded-full bg-gradient-to-r",
                    categoryStyle.gradient
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${masteryPercentage}%` }}
                  transition={{ 
                    duration: 1, 
                    ease: "easeOut" as const,

                    delay: 0.3 
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {masteryPercentage}%
              </span>
            </div>
          )}

          {/* Collapsible toggle */}
          {collapsible && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggle}
              className="p-1.5 rounded-md hover:bg-accent transition-colors"
              aria-label={isExpanded ? "Collapse category" : "Expand category"}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Category description (mobile) */}
      {category.description && (
        <p className="text-sm text-muted-foreground md:hidden">
          {category.description}
        </p>
      )}

      {/* Skills Grid with AnimatePresence */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <div className={cn(
              "grid gap-3 md:gap-4 pt-2",
              gridCols[columns]
            )}>
              {skills.map((skill, index) => (
                <SkillCard 
                  key={skill.id} 
                  skill={skill} 
                  index={index}
                  variant={cardVariant}
                  showLevel={variant !== 'compact'}
                  className={cn(
                    variant === 'compact' && "p-2",
                    variant === 'expanded' && "hover:shadow-xl"
                  )}
                />
              ))}
            </div>

            {/* Empty state */}
            {skills.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">No skills in this category yet.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}