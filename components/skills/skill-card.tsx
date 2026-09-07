// components/skills/skill-card.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skill } from "@/types/skill";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Star, Sparkles, Calendar, Award } from "lucide-react";

interface SkillCardProps {
  skill: Skill;
  index?: number;
  className?: string;
  showLevel?: boolean;
  variant?: 'default' | 'compact' | 'expanded';
  showTooltip?: boolean;
}

// ✅ Animation variants with proper typing
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,

      stiffness: 200,
      damping: 25,
    },
  },
  hover: {
    y: -4,
    boxShadow: "0 12px 40px -12px rgba(0,0,0,0.15)",
    transition: { duration: 0.2 },
  },
};

// ✅ Level helpers
const LEVEL_COLORS = {
  expert: "from-emerald-500 via-emerald-400 to-green-500",
  advanced: "from-blue-500 via-blue-400 to-cyan-500",
  intermediate: "from-amber-500 via-amber-400 to-orange-500",
  beginner: "from-muted-foreground/50 via-muted-foreground/30 to-muted-foreground/50",
} as const;

const LEVEL_BADGES = {
  expert: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  advanced: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  intermediate: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  beginner: "bg-muted/50 text-muted-foreground",
} as const;

const LEVEL_LABELS = {
  expert: "Expert",
  advanced: "Advanced",
  intermediate: "Intermediate",
  beginner: "Beginner",
} as const;

type LevelKey = keyof typeof LEVEL_LABELS;

function getLevelKey(level: number): LevelKey {
  if (level >= 80) return "expert";
  if (level >= 60) return "advanced";
  if (level >= 40) return "intermediate";
  return "beginner";
}

function getLevelColor(level: number): string {
  return LEVEL_COLORS[getLevelKey(level)];
}

function getLevelBadge(level: number): string {
  return LEVEL_BADGES[getLevelKey(level)];
}

function getLevelLabel(level: number): string {
  return LEVEL_LABELS[getLevelKey(level)];
}

export function SkillCard({ 
  skill, 
  index = 0, 
  className, 
  showLevel = true,
  variant = 'default',
  showTooltip = true
}: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // ✅ Calculate delay based on index
  const delay = Math.min(index * 0.05, 0.5);

  // ✅ Safe access to skill properties
  const hasLevel = skill.level !== undefined && skill.level !== null;
  const hasDescription = skill.description && skill.description.length > 0;
  const hasTags = skill.tags && skill.tags.length > 0;
  const hasYears = skill.yearsOfExperience && skill.yearsOfExperience > 0;
  const hasProjects = skill.projectsCompleted && skill.projectsCompleted > 0;

  // ✅ Compact variant
  if (variant === 'compact') {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        whileHover="hover"
        variants={cardVariants}
        transition={{ delay }}
        className="group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className={cn(
          "hover:border-primary/50 transition-all duration-300",
          className
        )}>
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold truncate flex items-center gap-1.5">
                  {skill.icon && (
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">
                      {skill.icon}
                    </span>
                  )}
                  {skill.name}
                </h4>
                {showLevel && hasLevel && (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden max-w-[60px]">
                      <div 
                        className={cn(
                          "h-full rounded-full bg-gradient-to-r transition-all duration-1000",
                          getLevelColor(skill.level!)
                        )}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium">
                      {skill.level}%
                    </span>
                  </div>
                )}
              </div>
              {skill.isFeatured && (
                <Star className="h-3 w-3 text-amber-500 fill-amber-500 flex-shrink-0" />
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // ✅ Expanded variant
  if (variant === 'expanded') {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        whileHover="hover"
        variants={cardVariants}
        transition={{ delay }}
        className="group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className={cn(
          "hover:border-primary/50 transition-all duration-300 overflow-hidden",
          className
        )}>
          <CardContent className="p-6">
            {/* Gradient top bar */}
            {hasLevel && (
              <div className={cn(
                "h-1 w-full rounded-t-lg bg-gradient-to-r",
                getLevelColor(skill.level!)
              )} />
            )}
            
            <div className="mt-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {skill.icon && (
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {skill.icon}
                      </span>
                    )}
                    <h4 className="text-lg font-bold truncate">{skill.name}</h4>
                    {skill.isFeatured && (
                      <Sparkles className="h-4 w-4 text-amber-500 flex-shrink-0" />
                    )}
                  </div>
                  
                  {skill.category && (
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {skill.category}
                    </Badge>
                  )}
                </div>
                
                {showLevel && hasLevel && (
                  <div className="ml-3 flex flex-col items-end">
                    <Badge className={cn("text-xs", getLevelBadge(skill.level!))}>
                      {getLevelLabel(skill.level!)}
                    </Badge>
                    <span className="text-sm font-bold text-primary mt-1">
                      {skill.level}%
                    </span>
                  </div>
                )}
              </div>

              {hasDescription && (
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {skill.description}
                </p>
              )}

              {/* Progress bar */}
              {showLevel && hasLevel && (
                <div className="mt-3">
                  <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                    <motion.div 
                      className={cn(
                        "h-full rounded-full bg-gradient-to-r",
                        getLevelColor(skill.level!)
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ 
                        duration: 1, 
                        ease: "easeOut" as const,

                        delay: 0.3 
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <span className="text-[10px] text-muted-foreground/50">Beginner</span>
                    <span className="text-[10px] text-muted-foreground/50">Expert</span>
                  </div>
                </div>
              )}

              {/* Additional info */}
              {(hasYears || hasProjects) && (
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  {hasYears && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {skill.yearsOfExperience}+ years
                    </span>
                  )}
                  {hasProjects && (
                    <span className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      {skill.projectsCompleted} projects
                    </span>
                  )}
                </div>
              )}

              {/* Tags */}
              {hasTags && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {skill.tags!.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-[10px]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // ✅ Default variant
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      transition={{ delay }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className={cn(
              "hover:shadow-lg transition-all hover:border-primary/50 cursor-default",
              className
            )}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {skill.icon && (
                        <span className="text-muted-foreground group-hover:text-primary transition-colors">
                          {skill.icon}
                        </span>
                      )}
                      <h4 className="font-semibold truncate">{skill.name}</h4>
                      {skill.isFeatured && (
                        <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 flex-shrink-0" />
                      )}
                    </div>
                    
                    {skill.category && (
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {skill.category}
                      </Badge>
                    )}
                  </div>
                  
                  {showLevel && hasLevel && (
                    <div className="ml-3 flex flex-col items-end">
                      <span className="text-sm font-medium text-primary">
                        {skill.level}%
                      </span>
                      <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div 
                          className={cn(
                            "h-full rounded-full bg-gradient-to-r",
                            getLevelColor(skill.level!)
                          )}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ 
                            duration: 0.8, 
                            ease: "easeOut" as const,

                            delay: 0.2 
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {hasDescription && (
                  <p className="text-sm text-muted-foreground mt-1 truncate">
                    {skill.description}
                  </p>
                )}

                {hasYears && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{skill.yearsOfExperience}+ years</span>
                  </div>
                )}

                {hasTags && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {skill.tags!.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                    {skill.tags!.length > 3 && (
                      <Badge variant="outline" className="text-[10px]">
                        +{skill.tags!.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TooltipTrigger>
          {showTooltip && hasDescription && (
            <TooltipContent side="top" className="max-w-xs">
              <p>{skill.description}</p>
              {hasYears && (
                <p className="text-xs text-muted-foreground mt-1">
                  {skill.yearsOfExperience}+ years of experience
                </p>
              )}
              {hasLevel && (
                <p className="text-xs text-muted-foreground mt-1">
                  Proficiency: {getLevelLabel(skill.level!)}
                </p>
              )}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
}