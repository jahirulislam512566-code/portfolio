"use client";

import { SectionHeading } from "@/components/common/section-heading";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ServicesHeaderProps {
  className?: string;
  serviceCount?: number;
}

export function ServicesHeader({ className, serviceCount = 0 }: ServicesHeaderProps) {
  return (
    <div className={cn("text-center", className)}>
      <SectionHeading 
        title="What I Do" 
        subtitle="Services I offer to help bring your ideas to life"
        className="mb-4"
      />
      <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
        I provide comprehensive development services tailored to your needs. 
        From design to deployment, I can help you build exceptional digital experiences.
      </p>
      {serviceCount > 0 && (
        <div className="flex items-center justify-center gap-4">
          <Badge variant="outline" className="px-4 py-2">
            {serviceCount}+ Services
          </Badge>
          <Badge variant="outline" className="px-4 py-2 bg-green-500/10 text-green-500 border-green-500/20">
            Available for Hire
          </Badge>
        </div>
      )}
    </div>
  );
}