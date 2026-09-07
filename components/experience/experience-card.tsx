"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Experience } from "@/types/experience";
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle,
  ExternalLink,
  Building,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ExperienceCardProps {
  experience: Experience;
  index?: number;
  className?: string;
}

export function ExperienceCard({ 
  experience, 
  index = 0, 
  className 
}: ExperienceCardProps) {
  const isEven = index % 2 === 0;

  // ✅ Format date helper
  const formatDate = (date: string | Date | undefined): string => {
    if (!date) return "";
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  // ✅ Get date range string
  const getDateRange = (): string => {
    const start = formatDate(experience.startDate);
    if (experience.isCurrent) {
      return `${start} - Present`;
    }
    const end = formatDate(experience.endDate);
    return `${start} - ${end}`;
  };

  // ✅ Format location type for display
  const formatLocationType = (type: string): string => {
    const map: Record<string, string> = {
      'remote': 'Remote',
      'hybrid': 'Hybrid',
      'on-site': 'On-site'
    };
    return map[type] || type;
  };

  // ✅ Format employment type for display
  const formatEmploymentType = (type: string): string => {
    const map: Record<string, string> = {
      'full-time': 'Full Time',
      'part-time': 'Part Time',
      'contract': 'Contract',
      'freelance': 'Freelance',
      'internship': 'Internship',
      'volunteer': 'Volunteer'
    };
    return map[type] || type;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        "relative",
        "md:flex md:items-center",
        isEven ? "md:flex-row" : "md:flex-row-reverse",
        className
      )}
    >
      {/* Timeline Dot */}
      <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform -translate-x-1/2 z-10 hidden md:flex" />

      {/* Content */}
      <div className={cn(
        "ml-12 md:ml-0 md:w-1/2",
        isEven ? "md:pr-12" : "md:pl-12"
      )}>
        <motion.div
          whileHover={{
            y: -4,
            transition: { duration: 0.3, ease: "easeOut" as const

 } // ✅ Fixed
          }}
        >
          <Card className={cn(
            "hover:shadow-xl transition-all hover:border-primary/50",
            experience.isCurrent && "border-l-4 border-l-green-500"
          )}>
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-lg">{experience.position}</h3>
                    {experience.isCurrent && (
                      <Badge className="bg-green-500 text-white">Current</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Building className="h-3.5 w-3.5" />
                    <span>{experience.company}</span>
                    {experience.companyWebsite && (
                      <a 
                        href={experience.companyWebsite} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                  <Badge variant="outline" className="text-xs">
                    {formatEmploymentType(experience.employmentType)}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {formatLocationType(experience.locationType)}
                  </Badge>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {getDateRange()} {/* ✅ Use formatted date */}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {experience.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {experience.industry}
                </span>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm text-muted-foreground">
                {experience.description}
              </p>

              {/* Achievements */}
              {experience.achievements && experience.achievements.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Key Achievements</h4>
                  <ul className="space-y-1.5">
                    {experience.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              {experience.technologies && experience.technologies.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              {experience.links && experience.links.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {experience.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      {link.label}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Empty spacer for even/odd layout */}
      <div className="hidden md:block md:w-1/2" />
    </motion.div>
  );
}