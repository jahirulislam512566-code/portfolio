"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectImage } from "./project-image";
import { ProjectMeta } from "./project-meta";
import { ProjectTechStack } from "./project-tech-stack";
import { ProjectLinks } from "./project-links";
import { StatusBadge } from "@/components/common/status-badge";
import { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import { Calendar, Users } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index?: number;
  className?: string;
  variant?: "default" | "compact" | "featured";
}

export function ProjectCard({
  project,
  index = 0,
  className,
  variant = "default",
}: ProjectCardProps) {
  const isFeatured = variant === "featured" || project.featured;
  const isCompact = variant === "compact";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card className={cn(
        "h-full overflow-hidden group hover:shadow-xl transition-all hover:border-primary/50 flex flex-col",
        isFeatured && "border-primary/30 bg-gradient-to-br from-primary/5 to-transparent",
        className
      )}>
        {/* Project Image */}
        <ProjectImage 
          project={project} 
          className={isCompact ? "aspect-video" : "aspect-[16/9]"}
        />

        <CardHeader className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg truncate group-hover:text-primary transition-colors">
                <Link href={`/projects/${project.id}`}>
                  {project.title}
                </Link>
              </CardTitle>
              <CardDescription className="mt-1 line-clamp-2">
                {project.description}
              </CardDescription>
            </div>
            <StatusBadge status={project.status} />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Meta Info */}
          <ProjectMeta project={project} compact={isCompact} />

          {/* Tech Stack */}
          <ProjectTechStack 
            technologies={project.technologies} 
            limit={isCompact ? 3 : 5}
          />

          {/* Links */}
          <ProjectLinks project={project} />

          {/* Featured Badge */}
          {isFeatured && (
            <Badge className="absolute top-3 left-3 bg-primary/10 text-primary border-primary/20">
              Featured
            </Badge>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}