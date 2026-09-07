"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Education } from "@/types/education";
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Award,
  ExternalLink,
  BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EducationCardProps {
  education: Education;
  index?: number;
  className?: string;
}

export function EducationCard({ 
  education, 
  index = 0, 
  className 
}: EducationCardProps) {
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
    const start = formatDate(education.startDate);
    if (education.isCurrent) {
      return `${start} - Present`;
    }
    const end = formatDate(education.endDate);
    return `${start} - ${end}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.5,
        ease: "easeOut" as const
      }}
      viewport={{ once: true }}
    >
      <motion.div
        whileHover={{
          y: -4,
          transition: { duration: 0.3, ease: "easeOut" as const

} // ✅ Fixed
        }}
      >
        <Card className={cn(
          "h-full hover:shadow-xl transition-all hover:border-primary/50",
          education.isCurrent && "border-l-4 border-l-green-500",
          className
        )}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 shrink-0 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold">{education.institution}</h3>
                  {education.isCurrent && (
                    <Badge className="bg-green-500 text-white shrink-0">In Progress</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {education.degree} in {education.field}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {getDateRange()} {/* ✅ Use formatted date */}
                  </span>
                  {education.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {education.location}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {education.gpa && (
              <div className="mt-3 flex items-center gap-2">
                <Award className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">GPA: {education.gpa}</span>
              </div>
            )}

            {education.description && (
              <p className="mt-3 text-sm text-muted-foreground">
                {education.description}
              </p>
            )}

            {education.achievements && education.achievements.length > 0 && (
              <div className="mt-3">
                <h4 className="text-sm font-medium mb-1.5">Achievements</h4>
                <ul className="space-y-1">
                  {education.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Award className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {education.courses && education.courses.length > 0 && (
              <div className="mt-3">
                <h4 className="text-sm font-medium mb-1.5 flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  Key Courses
                </h4>
                <div className="flex flex-wrap gap-2">
                  {education.courses.map((course) => (
                    <Badge key={course} variant="outline" className="text-xs">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {education.institutionWebsite && (
              <div className="mt-4 pt-4 border-t">
                <a
                  href={education.institutionWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  Visit Institution Website
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}