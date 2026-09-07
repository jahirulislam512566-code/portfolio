// components/skills/technology-card.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useState, ReactNode } from "react";
import { Star, Sparkles, CheckCircle } from "lucide-react";

interface TechnologyCardProps {
  name: string;
  icon?: ReactNode;
  category?: string;
  level?: number;
  className?: string;
  index?: number;
  variant?: 'default' | 'compact' | 'expanded';
  showLevel?: boolean;
  isFeatured?: boolean;
  isMastered?: boolean;
  description?: string;
  yearsOfExperience?: number;
}

// ✅ Animation variants with proper typing
const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
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

export function TechnologyCard({
  name,
  icon,
  category,
  level,
  className,
  index = 0,
  variant = 'default',
  showLevel = true,
  isFeatured = false,
  isMastered = false,
  description,
  yearsOfExperience,
}: TechnologyCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Get level color with gradient
  const getLevelColor = (level: number) => {
    if (level >= 80) return "from-emerald-500 via-emerald-400 to-green-500";
    if (level >= 60) return "from-blue-500 via-blue-400 to-cyan-500";
    if (level >= 40) return "from-amber-500 via-amber-400 to-orange-500";
    return "from-muted-foreground/50 via-muted-foreground/30 to-muted-foreground/50";
  };

  // Get level label
  const getLevelLabel = (level: number) => {
    if (level >= 80) return "Expert";
    if (level >= 60) return "Advanced";
    if (level >= 40) return "Intermediate";
    return "Beginner";
  };

  // Get badge color based on level
  const getLevelBadge = (level: number) => {
    if (level >= 80) return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    if (level >= 60) return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    if (level >= 40) return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    return "bg-muted/50 text-muted-foreground";
  };

  // ✅ Add delay based on index
  const getDelay = (index: number) => {
    return Math.min(index * 0.03, 0.5);
  };

  // ✅ Compact variant
  if (variant === 'compact') {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        whileHover="hover"
        variants={cardVariants}
        transition={{ delay: getDelay(index) }}
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
              {icon && (
                <span className="text-xl group-hover:scale-110 transition-transform">
                  {icon}
                </span>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate">{name}</h4>
                {showLevel && level && (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden max-w-[40px]">
                      <motion.div 
                        className={cn(
                          "h-full rounded-full bg-gradient-to-r",
                          getLevelColor(level)
                        )}
                        initial={{ width: 0 }}
                        animate={{ width: `${level}%` }}
                        transition={{ 
                          duration: 0.8, 
                          ease: "easeOut" as const,

                          delay: 0.2 
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {level}%
                    </span>
                  </div>
                )}
              </div>
              {isFeatured && (
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
              )}
              {isMastered && (
                <CheckCircle className="h-3 w-3 text-emerald-500" />
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
        transition={{ delay: getDelay(index) }}
        className="group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className={cn(
          "hover:border-primary/50 transition-all duration-300 overflow-hidden",
          className
        )}>
          {/* Gradient top bar */}
          {level && (
            <div className={cn(
              "h-1 w-full bg-gradient-to-r",
              getLevelColor(level)
            )} />
          )}
          
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              {icon && (
                <div className="text-3xl group-hover:scale-110 transition-transform group-hover:rotate-3">
                  {icon}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-base">{name}</h4>
                  {isFeatured && (
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  )}
                  {isMastered && (
                    <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-600">
                      Mastered
                    </Badge>
                  )}
                </div>
                
                {category && (
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {category}
                  </Badge>
                )}
                
                {description && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {description}
                  </p>
                )}

                {showLevel && level && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Proficiency</span>
                      <Badge className={cn("text-xs", getLevelBadge(level))}>
                        {getLevelLabel(level)}
                      </Badge>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <motion.div 
                        className={cn(
                          "h-full rounded-full bg-gradient-to-r",
                          getLevelColor(level)
                        )}
                        initial={{ width: 0 }}
                        animate={{ width: `${level}%` }}
                        transition={{ 
                          duration: 1, 
                          ease: "easeOut" as const,

                          delay: 0.3 
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-0.5">
                      <span className="text-[10px] text-muted-foreground/50">0%</span>
                      <span className="text-[10px] text-muted-foreground/50">{level}%</span>
                      <span className="text-[10px] text-muted-foreground/50">100%</span>
                    </div>
                  </div>
                )}

                {yearsOfExperience && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    {yearsOfExperience}+ years of experience
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // ✅ Default variant with Tooltip
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={cardVariants}
            transition={{ delay: getDelay(index) }}
            className="group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Card className={cn(
              "hover:shadow-lg transition-all hover:border-primary/50 text-center",
              className
            )}>
              <CardContent className="p-4">
                {icon && (
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform group-hover:rotate-3">
                    {icon}
                  </div>
                )}
                <h4 className="font-medium text-sm flex items-center justify-center gap-1.5">
                  {name}
                  {isFeatured && (
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                  )}
                  {isMastered && (
                    <CheckCircle className="h-3 w-3 text-emerald-500" />
                  )}
                </h4>
                
                {category && (
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {category}
                  </Badge>
                )}
                
                {showLevel && level && (
                  <div className="mt-2">
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div 
                        className={cn(
                          "h-full rounded-full bg-gradient-to-r",
                          getLevelColor(level)
                        )}
                        initial={{ width: 0 }}
                        animate={{ width: `${level}%` }}
                        transition={{ 
                          duration: 0.8, 
                          ease: "easeOut" as const,

                          delay: 0.2 
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{level}%</span>
                      <Badge className={cn("text-[10px]", getLevelBadge(level))}>
                        {getLevelLabel(level)}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TooltipTrigger>
        {description && (
          <TooltipContent side="top" className="max-w-xs">
            <p>{description}</p>
            {yearsOfExperience && (
              <p className="text-xs text-muted-foreground mt-1">
                {yearsOfExperience}+ years of experience
              </p>
            )}
            {level && (
              <p className="text-xs text-muted-foreground mt-1">
                Proficiency: {getLevelLabel(level)}
              </p>
            )}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}