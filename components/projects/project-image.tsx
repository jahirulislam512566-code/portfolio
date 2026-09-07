"use client";

import { Project } from "@/types/project";
import { Folder, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectImageProps {
  project: Project;
  className?: string;
}

export function ProjectImage({ project, className }: ProjectImageProps) {
  const imageUrl = project.image || project.images?.[0];

  return (
    <div className={cn(
      "w-full overflow-hidden bg-muted relative group",
      className
    )}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500/10 to-pink-500/10">
          <Folder className="h-12 w-12 text-muted-foreground/50" />
        </div>
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Image Count Badge */}
      {project.images && project.images.length > 1 && (
        <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs">
          +{project.images.length - 1} more
        </div>
      )}
    </div>
  );
}