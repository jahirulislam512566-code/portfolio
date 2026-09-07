"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProjectTechStackProps {
  technologies: string[];
  limit?: number;
  className?: string;
}

export function ProjectTechStack({
  technologies,
  limit = 5,
  className,
}: ProjectTechStackProps) {
  if (!technologies || technologies.length === 0) return null;

  const displayed = technologies.slice(0, limit);
  const remaining = technologies.length - limit;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {displayed.map((tech) => (
        <Badge key={tech} variant="secondary" className="text-xs">
          {tech}
        </Badge>
      ))}
      {remaining > 0 && (
        <Badge variant="secondary" className="text-xs">
          +{remaining}
        </Badge>
      )}
    </div>
  );
}