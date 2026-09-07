"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/common/section-heading";
import { experienceData } from "@/data/experience";

import {
  Briefcase,
  Calendar,
  MapPin,
  ArrowRight,
  CheckCircle,
  Building,
  Clock,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface ExperiencePreviewProps {
  className?: string;
  limit?: number;
  variant?: "default" | "compact" | "expanded";
  showViewAll?: boolean;
  showTechnologies?: boolean;
  showAchievements?: boolean;
}

export function ExperiencePreview({
  className,
  limit = 2,
  variant = "default",
  showViewAll = true,
  showTechnologies = true,
  showAchievements = true,
}: ExperiencePreviewProps) {
  const displayedExperiences = experienceData.slice(
    0,
    Math.max(0, limit)
  );

  const isExpanded = variant === "expanded";

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const getEmploymentTypeVariant = (
    type?: string
  ): "default" | "secondary" | "outline" => {
    switch (type) {
      case "Full-time":
        return "default";

      case "Part-time":
      case "Internship":
        return "secondary";

      case "Contract":
      case "Freelance":
      default:
        return "outline";
    }
  };

  const getLocationTypeVariant = (
    type?: string
  ): "default" | "secondary" | "outline" => {
    switch (type) {
      case "Remote":
      case "On-site":
      case "Hybrid":
      default:
        return "outline";
    }
  };

  /* ============================================================
     COMPACT
  ============================================================ */

  if (variant === "compact") {
    return (
      <section
        id="experience-preview"
        className={cn(
          "w-full py-12 sm:py-16",
          className
        )}
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Experience"
            subtitle="My professional journey"
            alignment="center"
            className="mb-8"
          >
            {showViewAll && (
             <Button
  variant="outline"
  asChild
  className="mt-4 gap-2"
>
  <Link 
    href="/experience"
    className="inline-flex items-center gap-2"
  >
    <span className="leading-none bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">
      View All
    </span>
    <ArrowRight className="h-4 w-4 shrink-0 text-purple-600" />
  </Link>
</Button>
            )}
          </SectionHeading>

          <div className="mx-auto w-full max-w-4xl space-y-4">
            {displayedExperiences.map((exp, index) => (
              <ExperienceCompactCard
                key={exp.id}
                experience={exp}
                index={index}
                showTechnologies={showTechnologies}
                formatDate={formatDate}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ============================================================
     DEFAULT / EXPANDED
  ============================================================ */

  return (
    <section
      id="experience-preview"
      className={cn(
        "w-full py-14 sm:py-16 md:py-20",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Work Experience"
          subtitle="My professional journey and experience"
          alignment="center"
          className="mb-8 sm:mb-10 md:mb-12"
        >
          {showViewAll && (
           <Button
            variant="outline"
            asChild
            className="mt-4 gap-2"
          >
            <Link 
              href="/experience"
              className="inline-flex items-center gap-2"
            >
              <span className="leading-none bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">
                View All Experiences
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-purple-600" />
            </Link>
          </Button>
          )}
        </SectionHeading>

        {displayedExperiences.length > 0 ? (
          <div className="mx-auto w-full max-w-5xl space-y-5 sm:space-y-6">
            {displayedExperiences.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                index={index}
                isExpanded={isExpanded}
                showTechnologies={showTechnologies}
                showAchievements={showAchievements}
                formatDate={formatDate}
                getEmploymentTypeVariant={
                  getEmploymentTypeVariant
                }
                getLocationTypeVariant={
                  getLocationTypeVariant
                }
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-xl rounded-xl border border-dashed border-border p-8 text-center">
            <Briefcase className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />

            <p className="font-medium">
              No experience available
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Experience information will appear here.
            </p>
          </div>
        )}

        {displayedExperiences.length > 0 &&
          displayedExperiences.length <
            experienceData.length && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Showing {displayedExperiences.length} of{" "}
              {experienceData.length} experiences
            </p>
          )}
      </div>
    </section>
  );
}

/* ================================================================
   DEFAULT EXPERIENCE CARD
================================================================ */

interface ExperienceCardProps {
  experience: any;
  index: number;
  isExpanded: boolean;
  showTechnologies: boolean;
  showAchievements: boolean;
  formatDate: (date?: string) => string;
  getEmploymentTypeVariant: (
    type?: string
  ) => "default" | "secondary" | "outline";
  getLocationTypeVariant: (
    type?: string
  ) => "default" | "secondary" | "outline";
}

function ExperienceCard({
  experience: exp,
  index,
  isExpanded,
  showTechnologies,
  showAchievements,
  formatDate,
  getEmploymentTypeVariant,
  getLocationTypeVariant,
}: ExperienceCardProps) {
  const achievements = exp.achievements ?? [];
  const technologies = exp.technologies ?? [];

  const visibleAchievements = isExpanded
    ? achievements
    : achievements.slice(0, 2);

  const visibleTechnologies = isExpanded
    ? technologies.slice(0, 8)
    : technologies.slice(0, 5);

  const remainingTechnologies =
    technologies.length - visibleTechnologies.length;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 16,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.05,
      }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.08, 0.24),
        ease: "easeOut" as const

,
      }}
    >
      <Card
        className="
          group
          w-full
          overflow-hidden
          border-border/60
          bg-card
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-primary/40
          hover:shadow-lg
        "
      >
        <CardContent className="p-5 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            {/* Company */}
            <div className="flex min-w-0 items-start gap-4">
              <div
                className="
                  hidden
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-primary/10
                  text-primary
                  sm:flex
                "
              >
                <Building className="h-6 w-6" />
              </div>

              <div className="min-w-0">
                <h3 className="text-base font-semibold leading-tight sm:text-lg">
                  {exp.position}
                </h3>

                <p className="mt-1 font-medium text-muted-foreground">
                  {exp.company}
                </p>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground sm:text-sm">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />

                    <span>
                      {formatDate(exp.startDate)}{" "}
                      –{" "}
                      {exp.isCurrent
                        ? "Present"
                        : formatDate(exp.endDate)}
                    </span>
                  </span>

                  {exp.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span>{exp.location}</span>
                    </span>
                  )}

                  {exp.employmentType && (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 shrink-0" />
                      <span>{exp.employmentType}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="flex shrink-0 flex-wrap gap-2">
              {exp.employmentType && (
                <Badge
                  variant={getEmploymentTypeVariant(
                    exp.employmentType
                  )}
                >
                  {exp.employmentType}
                </Badge>
              )}

              {exp.locationType && (
                <Badge
                  variant={getLocationTypeVariant(
                    exp.locationType
                  )}
                >
                  {exp.locationType}
                </Badge>
              )}

              {exp.isCurrent && (
                <Badge
                  variant="outline"
                  className="
                    border-emerald-500/20
                    bg-emerald-500/10
                    text-emerald-600
                    dark:text-emerald-400
                  "
                >
                  Current
                </Badge>
              )}
            </div>
          </div>

          {/* Description */}
          {exp.description && (
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              {exp.description}
            </p>
          )}

          {/* Achievements */}
          {showAchievements &&
            visibleAchievements.length > 0 && (
              <div className="mt-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground/70">
                  Key achievements
                </p>

                <ul className="space-y-2">
                  {visibleAchievements.map(
                    (achievement: string, i: number) => (
                      <li
                        key={`${achievement}-${i}`}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <CheckCircle
                          className="
                            mt-0.5
                            h-4
                            w-4
                            shrink-0
                            text-primary
                          "
                        />

                        <span className="min-w-0 leading-5">
                          {achievement}
                        </span>
                      </li>
                    )
                  )}

                  {!isExpanded &&
                    achievements.length > 2 && (
                      <li className="pl-6 text-sm text-muted-foreground">
                        +{achievements.length - 2} more
                        achievements
                      </li>
                    )}
                </ul>
              </div>
            )}

          {/* Technologies */}
          {showTechnologies &&
            visibleTechnologies.length > 0 && (
              <div className="mt-5 border-t border-border/50 pt-5">
                <div className="flex flex-wrap gap-2">
                  {visibleTechnologies.map(
                    (technology: string) => (
                      <Badge
                        key={technology}
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {technology}
                      </Badge>
                    )
                  )}

                  {remainingTechnologies > 0 && (
                    <Badge
                      variant="secondary"
                      className="text-xs font-normal"
                    >
                      +{remainingTechnologies}
                    </Badge>
                  )}
                </div>
              </div>
            )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ================================================================
   COMPACT CARD
================================================================ */

interface ExperienceCompactCardProps {
  experience: any;
  index: number;
  showTechnologies: boolean;
  formatDate: (date?: string) => string;
}

function ExperienceCompactCard({
  experience: exp,
  index,
  showTechnologies,
  formatDate,
}: ExperienceCompactCardProps) {
  const technologies = exp.technologies ?? [];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.05,
      }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.08, 0.2),
      }}
    >
      <Card
        className="
          w-full
          border-border/60
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:border-primary/40
          hover:shadow-md
        "
      >
        <CardContent className="p-4 sm:p-5 md:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Briefcase className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <h4 className="truncate text-sm font-semibold">
                  {exp.position}
                </h4>

                <p className="truncate text-xs text-muted-foreground">
                  {exp.company}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />

              <span>
                {formatDate(exp.startDate)} –{" "}
                {exp.isCurrent
                  ? "Present"
                  : formatDate(exp.endDate)}
              </span>
            </div>
          </div>

          {showTechnologies &&
            technologies.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {technologies.slice(0, 3).map(
                  (technology: string) => (
                    <Badge
                      key={technology}
                      variant="secondary"
                      className="text-[10px]"
                    >
                      {technology}
                    </Badge>
                  )
                )}

                {technologies.length > 3 && (
                  <Badge
                    variant="secondary"
                    className="text-[10px]"
                  >
                    +{technologies.length - 3}
                  </Badge>
                )}
              </div>
            )}
        </CardContent>
      </Card>
    </motion.div>
  );
}