"use client";

import { SectionHeading } from "@/components/common/section-heading";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExperienceHeaderProps {
  className?: string;
  totalYears?: number;
  totalCompanies?: number;
}

export function ExperienceHeader({ 
  className, 
  totalYears = 0, 
  totalCompanies = 0 
}: ExperienceHeaderProps) {
  return (
    <div className={cn("text-center", className)}>
      <SectionHeading 
        title="Work Experience" 
        subtitle="My professional journey and experience"
        className="mb-4"
      />
      <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
        With over {totalYears}+ years of professional experience across {totalCompanies} companies, 
        I've worked on a wide range of projects and technologies.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Badge variant="outline" className="px-4 py-2 gap-2">
          <Briefcase className="h-4 w-4" />
          {totalCompanies} Companies
        </Badge>
        <Badge variant="outline" className="px-4 py-2 gap-2">
          <Calendar className="h-4 w-4" />
          {totalYears}+ Years
        </Badge>
        <Badge variant="outline" className="px-4 py-2 gap-2 bg-green-500/10 text-green-500 border-green-500/20">
          <MapPin className="h-4 w-4" />
          Remote & On-site
        </Badge>
      </div>
    </div>
  );
}