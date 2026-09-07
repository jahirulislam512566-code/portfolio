"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { StatusBadge } from "@/components/common/status-badge";
import { GradientText } from "@/components/common/gradient-text";
import { ProjectMeta } from "../project-meta";
import { ProjectTechStack } from "../project-tech-stack";
import { ProjectLinks } from "../project-links";
import { cn } from "@/lib/utils";

interface CaseStudyHeroProps {
  project: Project;
  className?: string;
}

export function CaseStudyHero({ project, className }: CaseStudyHeroProps) {
  return (
    <div className={cn("relative py-12 md:py-20", className)}>
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl" />
        {project.image && (
          <div 
            className="absolute inset-0 opacity-10 bg-cover bg-center blur-2xl"
            style={{ backgroundImage: `url(${project.image})` }}
          />
        )}
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Status Badge */}
          <div className="mb-6">
            <StatusBadge status={project.status} />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {project.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-6">
            {project.description}
          </p>

          {/* Long Description */}
          {project.longDescription && (
            <p className="text-muted-foreground mb-8">
              {project.longDescription}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <ProjectMeta project={project} />
          </div>

          {/* Tech Stack */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Technologies</h3>
              <ProjectTechStack technologies={project.technologies} limit={10} />
            </div>
          )}

          {/* Links */}
          <ProjectLinks project={project} />
        </motion.div>
      </div>
    </div>
  );
}