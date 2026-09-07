"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CaseStudyOverviewProps {
  project: Project;
  className?: string;
}

export function CaseStudyOverview({ project, className }: CaseStudyOverviewProps) {
  const stats = [
    { label: "Duration", value: project.startDate && project.endDate 
      ? `${new Date(project.startDate).getFullYear()} - ${new Date(project.endDate).getFullYear()}`
      : project.date ? new Date(project.date).getFullYear() : "N/A" },
    { label: "Role", value: project.role || "Full-Stack Developer" },
    { label: "Team", value: project.teamSize ? `${project.teamSize} members` : "Individual" },
    { label: "Client", value: project.client || "N/A" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={cn("py-12", className)}
    >
      <div className="container max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Description */}
          <Card className="md:col-span-2">
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </CardContent>
          </Card>

          {/* Stats */}
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-lg font-semibold mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
}