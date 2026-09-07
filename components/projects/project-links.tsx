"use client";

import { Project } from "@/types/project";
import { ExternalLink } from "@/components/common/external-link";
import {  Globe, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectLinksProps {
  project: Project;
  className?: string;
}

export function ProjectLinks({ project, className }: ProjectLinksProps) {
  const links = [];

//   if (project.github) {
//     links.push({
//       label: "Code",
//       href: project.github,
//       icon: Github,
//     });
//   }

  if (project.demo) {
    links.push({
      label: "Live Demo",
      href: project.demo,
      icon: Globe,
    });
  }

  if (project.link && !project.demo) {
    links.push({
      label: "View Project",
      href: project.link,
      icon: FileText,
    });
  }

  if (links.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-4", className)}>
      {links.map((link, index) => {
        const Icon = link.icon;
        return (
          <ExternalLink
            key={index}
            href={link.href}
            className="flex items-center gap-1.5 text-sm"
          >
            <Icon className="h-4 w-4" />
            {link.label}
          </ExternalLink>
        );
      })}
    </div>
  );
}