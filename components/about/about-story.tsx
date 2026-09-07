// components/about/about-story.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  MapPin,
  LucideIcon,
} from "lucide-react";
import { aboutData } from "@/data/about";
import { cn } from "@/lib/utils";
import { ReactNode, useRef } from "react";

interface TimelineItem {
  year: number | string;
  title: string;
  description: string;
  icon?: ReactNode;
  location?: string;
}

interface AboutStoryProps {
  className?: string;
  variant?: "default" | "compact" | "expanded";
}

// ✅ Animation variants with proper typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 22,
    },
  },
};

// ✅ Helper to safely get timeline items
function getTimelineItems(): TimelineItem[] {
  const defaultTimeline: TimelineItem[] = [
    {
      year: 2018,
      title: "Started Coding",
      description: "Began my journey into web development",
      icon: <GraduationCap className="h-4 w-4" />,
    },
    {
      year: 2019,
      title: "First Professional Role",
      description: "Joined a startup as a Junior Developer",
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      year: 2020,
      title: "Full-Stack Developer",
      description: "Transitioned to full-stack development",
      icon: <Award className="h-4 w-4" />,
    },
    {
      year: 2022,
      title: "Senior Developer",
      description: "Became a senior developer at a tech company",
      icon: <Sparkles className="h-4 w-4" />,
    },
  ];

  if (!aboutData?.journey || aboutData.journey.length === 0) {
    return defaultTimeline;
  }

  return aboutData.journey.map((item) => ({
    year: item.year,
    title: item.title,
    description: item.description,
    // icon: item.icon ?? <Briefcase className="h-4 w-4" />,
    // location: item.location,
  }));
}

export function AboutStory({
  className,
  variant = "default",
}: AboutStoryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const timelineItems = getTimelineItems();

  // ======================
  // Compact Variant
  // ======================
  if (variant === "compact") {
    return (
      <section className={cn("py-8 md:py-12", className)}>
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            ref={ref}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
            className="mx-auto max-w-4xl space-y-4"
          >
            {timelineItems.map((item, index) => (
              <motion.div 
                key={`compact-${item.year}-${index}`} // ✅ Better key
                variants={itemVariants}
              >
                <Card className="transition-all hover:border-primary/50 hover:shadow-md">
                  <CardContent className="flex items-center gap-4 p-4">
                    <Badge variant="outline" className="shrink-0">
                      {item.year}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    {item.icon && (
                      <div className="text-primary shrink-0">{item.icon}</div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  // ======================
  // Expanded Variant
  // ======================
  if (variant === "expanded") {
    return (
      <section className={cn("py-16 md:py-20 lg:py-24", className)}>
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
              My{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Journey
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
              Here&apos;s a timeline of my professional journey and key milestones.
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mx-auto mt-4 h-0.5 w-16 origin-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
            />
          </motion.div>

          {/* Timeline */}
          <motion.div
            ref={ref}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
            className="relative mx-auto max-w-4xl"
          >
            {/* Vertical line */}
            <div className="absolute bottom-0 left-6 top-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-purple-600 via-pink-500 to-purple-600 md:left-1/2" />

            {timelineItems.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={`expanded-${item.year}-${index}`} // ✅ Better key
                  variants={itemVariants}
                  className={cn(
                    "relative mb-10 flex flex-col items-start gap-4 md:flex-row md:gap-8",
                    !isEven && "md:flex-row-reverse"
                  )}
                >
                  {/* Timeline dot with year */}
                  <div className="absolute left-6 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-background bg-gradient-to-r from-purple-600 to-pink-600 text-xs font-bold text-white shadow-md md:left-1/2">
                    {item.year}
                  </div>

                  {/* Content card */}
                  <div
                    className={cn(
                      "ml-16 w-full md:ml-0 md:w-1/2",
                      isEven ? "md:pr-12 md:text-right" : "md:pl-12"
                    )}
                  >
                    <Card className="transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl">
                      <CardContent className="p-6">
                        <div
                          className={cn(
                            "mb-2 flex items-center gap-3",
                            isEven && "md:flex-row-reverse md:justify-end"
                          )}
                        >
                          {item.icon && (
                            <div className="rounded-full bg-primary/10 p-2 text-primary">
                              {item.icon}
                            </div>
                          )}
                          <h4 className="text-lg font-bold">{item.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                        {item.location && (
                          <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground/70">
                            <MapPin className="h-3 w-3" />
                            {item.location}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    );
  }

  // ======================
  // Default Variant
  // ======================
  return (
    <section className={cn("bg-muted/30 py-12 md:py-16 lg:py-20", className)}>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h3 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">
              My{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Journey
              </span>
            </h3>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Here&apos;s a timeline of my professional journey and key milestones.
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mx-auto mt-3 h-0.5 w-16 origin-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
            />
          </motion.div>

          {/* Timeline */}
          <motion.div
            ref={ref}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
            className="relative"
          >
            {/* Vertical line */}
            <div className="absolute bottom-0 left-4 top-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-purple-600 via-pink-500 to-purple-600 md:left-1/2" />

            {timelineItems.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={`default-${item.year}-${index}`} // ✅ Better key
                  variants={itemVariants}
                  className={cn(
                    "relative mb-8 flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-8",
                    !isEven && "md:flex-row-reverse"
                  )}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-background bg-gradient-to-r from-purple-600 to-pink-600 shadow-md md:left-1/2" />

                  {/* Content */}
                  <div
                    className={cn(
                      "ml-12 w-full md:ml-0 md:w-1/2",
                      isEven ? "md:pr-8 md:text-right" : "md:pl-8"
                    )}
                  >
                    <Card className="transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
                      <CardContent className="p-5">
                        <div className="mb-2 flex items-center gap-3">
                          <Badge
                            variant="outline"
                            className="shrink-0 border-purple-600/20 bg-gradient-to-r from-purple-600/10 to-pink-600/10"
                          >
                            {item.year}
                          </Badge>
                          <h4 className="font-semibold">{item.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}