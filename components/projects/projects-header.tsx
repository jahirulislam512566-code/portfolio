"use client";

import { SectionHeading } from "@/components/common/section-heading";
import { Badge } from "@/components/ui/badge";
import { Folder, Code2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectsHeaderProps {
  className?: string;
  totalProjects?: number;
}

export function ProjectsHeader({ className, totalProjects = 0 }: ProjectsHeaderProps) {
  return (
    <div className={cn("text-center", className)}>
      <SectionHeading 
        title="Projects" 
        subtitle="Here are some of the projects I've worked on"
        className="mb-4"
      />
      <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
        A collection of my work spanning web development, AI applications, 
        and design projects. Each project showcases different skills and technologies.
      </p>
      {totalProjects > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Badge variant="outline" className="px-4 py-2 gap-2">
            <Folder className="h-4 w-4" />
            {totalProjects} Projects
          </Badge>
          <Badge variant="outline" className="px-4 py-2 gap-2">
            <Code2 className="h-4 w-4" />
            React & Next.js
          </Badge>
          <Badge variant="outline" className="px-4 py-2 gap-2 bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle className="h-4 w-4" />
            Production Ready
          </Badge>
        </div>
      )}
    </div>
  );
}