"use client";

import { Project } from "@/types/project";
import { Calendar, Users, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectMetaProps {
  project: Project;
  compact?: boolean;
  className?: string;
}

export function ProjectMeta({ project, compact = false, className }: ProjectMetaProps) {
  const metaItems = [];

  if (project.date) {
    metaItems.push({
      icon: Calendar,
      label: typeof project.date === 'string' 
        ? new Date(project.date).getFullYear()
        : project.date.getFullYear(),
    });
  }

  if (project.teamSize) {
    metaItems.push({
      icon: Users,
      label: `${project.teamSize} ${project.teamSize === 1 ? 'person' : 'people'}`,
    });
  }

  if (project.role) {
    metaItems.push({
      icon: Briefcase,
      label: project.role,
    });
  }

  if (metaItems.length === 0) return null;

  return (
    <div className={cn(
      "flex flex-wrap items-center gap-3 text-sm text-muted-foreground",
      compact && "text-xs gap-2",
      className
    )}>
      {metaItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <span key={index} className="flex items-center gap-1">
            <Icon className={cn("h-3.5 w-3.5", compact && "h-3 w-3")} />
            <span>{item.label}</span>
          </span>
        );
      })}
    </div>
  );
}