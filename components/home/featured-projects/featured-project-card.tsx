"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "@/components/common/external-link";
import { StatusBadge } from "@/components/common/status-badge";
import { Project } from "@/types/project";
import { 
  FolderIcon, 
  GithubIcon,
  ExternalLinkIcon,
  StarIcon,
} from "@/components/icons";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

interface FeaturedProjectCardProps {
  project: Project;
  index: number;
  className?: string;
  variant?: 'default' | 'compact' | 'expanded';
  showStats?: boolean;
}

export function FeaturedProjectCard({ 
  project, 
  index, 
  className,
  variant = 'default',
  showStats = true
}: FeaturedProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isHovered, setIsHovered] = useState(false);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const



,
        stiffness: 200,
        damping: 25,
        delay: index * 0.1,
      },
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 60px -12px rgba(0,0,0,0.15)",
      transition: { duration: 0.3, ease: "easeOut" as const

 },
    },
  };

  // Get featured badge
  const getFeaturedBadge = () => {
    if (project.featured) {
      return (
        <Badge variant="default" className="absolute top-3 left-3 gap-1 bg-gradient-to-r from-purple-600 to-pink-600">
          <StarIcon size={12} />
          Featured
        </Badge>
      );
    }
    return null;
  };

  // ✅ Safe access to metrics
  const hasMetrics = project.metrics && project.metrics.length > 0;
  
  // Find star metric if it exists (look for 'stars' or '⭐' or similar)
  const starMetric = project.metrics?.find(m => 
    m.label.toLowerCase().includes('star') || 
    m.icon === 'star' ||
    m.label.toLowerCase().includes('github')
  );
  const starCount = starMetric?.value || 0;

  // Format metric value for display
  const formatMetricValue = (value: string | number) => {
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return value;
  };

  // Get status for StatusBadge
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'planned': return 'info';
      case 'maintaining': return 'primary';
      case 'archived': return 'secondary';
      default: return 'default';
    }
  };

  // Compact variant
  if (variant === 'compact') {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={cardVariants}
        whileHover="hover"
        className={cn("h-full", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className="h-full overflow-hidden group hover:border-primary/50 transition-all duration-300 flex flex-col bg-background/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base truncate flex items-center gap-2">
                  {project.title}
                  {project.featured && (
                    <StarIcon size={14} className="text-amber-500 flex-shrink-0" />
                  )}
                </CardTitle>
                <CardDescription className="mt-1 line-clamp-2 text-xs">
                  {project.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-end space-y-3 pt-0">
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-[10px] px-2 py-0.5">
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 3 && (
                <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
                  +{project.technologies.length - 3}
                </Badge>
              )}
            </div>
            {(project.github || project.demo) && (
              <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                {project.github && (
                  <ExternalLink href={project.github} className="text-xs flex items-center gap-1 hover:text-primary transition-colors">
                    <GithubIcon size={14} />
                    Code
                  </ExternalLink>
                )}
                {project.demo && (
                  <ExternalLink href={project.demo} className="text-xs flex items-center gap-1 hover:text-primary transition-colors">
                    <Globe size={14} />
                    Demo
                  </ExternalLink>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Expanded variant
  if (variant === 'expanded') {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={cardVariants}
        whileHover="hover"
        className={cn("h-full", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className="h-full overflow-hidden group hover:border-primary/50 transition-all duration-300 flex flex-col">
          {/* Image Section */}
          <div className="aspect-video w-full overflow-hidden bg-muted relative">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                <FolderIcon size={48} className="text-muted-foreground/50" />
              </div>
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              <StatusBadge status={getStatusVariant(project.status)} />
            </div>

            {/* Featured Badge */}
            {getFeaturedBadge()}

            {/* View Project Button - appears on hover */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {project.demo && (
                <Button variant="default" size="sm" asChild className="gap-2 shadow-lg">
                  <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLinkIcon size={14} />
                    View Project
                  </Link>
                </Button>
              )}
            </motion.div>
          </div>

          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-xl truncate">{project.title}</CardTitle>
                <CardDescription className="mt-2 line-clamp-3">
                  {project.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col justify-end space-y-4">
            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 5).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 5 && (
                <Badge variant="secondary" className="text-xs">
                  +{project.technologies.length - 5}
                </Badge>
              )}
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 pt-3 border-t border-border/50">
              {project.github && (
                <ExternalLink 
                  href={project.github} 
                  className="text-sm flex items-center gap-1.5 hover:text-primary transition-colors group/link"
                >
                  <GithubIcon size={16} className="transition-transform group-hover/link:scale-110" />
                  Source Code
                </ExternalLink>
              )}
              {project.demo && (
                <ExternalLink 
                  href={project.demo} 
                  className="text-sm flex items-center gap-1.5 hover:text-primary transition-colors group/link"
                >
                  <Globe size={16} className="transition-transform group-hover/link:scale-110" />
                  Live Demo
                </ExternalLink>
              )}
              {!project.github && !project.demo && (
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <FolderIcon size={16} />
                  Coming soon
                </span>
              )}
            </div>

            {/* Stats - ✅ Using metrics */}
            {showStats && hasMetrics && (
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-2">
                {project.metrics!.slice(0, 3).map((metric, idx) => (
                  <span key={idx} className="flex items-center gap-1">
                    {metric.icon && <span>{metric.icon}</span>}
                    {formatMetricValue(metric.value)}
                    {metric.label && (
                      <span className="text-muted-foreground/60">
                        {metric.label}
                      </span>
                    )}
                  </span>
                ))}
                {project.metrics!.length > 3 && (
                  <span className="text-muted-foreground/60">
                    +{project.metrics!.length - 3} more
                  </span>
                )}
                {project.featured && (
                  <Badge variant="outline" className="text-[10px] gap-1 border-amber-500/30 text-amber-600 dark:text-amber-400">
                    <StarIcon size={10} />
                    Featured
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover="hover"
      className={cn("h-full", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="h-full overflow-hidden group hover:border-primary/50 transition-all duration-300 flex flex-col">
        {/* Image Section */}
        <div className="aspect-video w-full overflow-hidden bg-muted relative">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500/10 to-pink-500/10">
              <FolderIcon size={48} className="text-muted-foreground/50" />
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <StatusBadge status={getStatusVariant(project.status)} />
          </div>

          {/* Featured Badge */}
          {getFeaturedBadge()}
        </div>

        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg truncate flex items-center gap-2">
                {project.title}
                {project.featured && (
                  <StarIcon size={14} className="text-amber-500 flex-shrink-0" />
                )}
              </CardTitle>
              <CardDescription className="mt-1 line-clamp-2">
                {project.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-end space-y-4">
          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 pt-3 border-t border-border/50">
            {project.github && (
              <ExternalLink 
                href={project.github} 
                className="text-sm flex items-center gap-1.5 hover:text-primary transition-colors group/link"
              >
                <GithubIcon size={16} className="transition-transform group-hover/link:scale-110" />
                Code
              </ExternalLink>
            )}
            {project.demo && (
              <ExternalLink 
                href={project.demo} 
                className="text-sm flex items-center gap-1.5 hover:text-primary transition-colors group/link"
              >
                <Globe size={16} className="transition-transform group-hover/link:scale-110" />
                Demo
              </ExternalLink>
            )}
            {!project.github && !project.demo && (
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <FolderIcon size={16} />
                Coming soon
              </span>
            )}
          </div>

          {/* Stats - ✅ Using metrics */}
          {showStats && hasMetrics && (
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              {project.metrics!.slice(0, 2).map((metric, idx) => (
                <span key={idx} className="flex items-center gap-1">
                  {metric.icon && <span>{metric.icon}</span>}
                  {formatMetricValue(metric.value)}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}