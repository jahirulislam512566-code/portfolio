// components/skills/skills-preview.tsx
"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Code,
  Server,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/common/section-heading";
import { cn } from "@/lib/utils";

import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiLaravel,
  SiPhp,
  SiMysql,
  SiGit,
  SiGithub,
  SiVercel,
  SiFigma,
} from "react-icons/si";

/* =========================================================
   Types
========================================================= */

interface Skill {
  id: string;
  name: string;
  level: number;
  icon?: React.ReactNode;
}

interface SkillGroup {
  category: string;
  icon: React.ReactNode;
  description: string;
  gradient: string;
  iconGradient: string;
  skills: Skill[];
}

/* =========================================================
   Skills Data
========================================================= */

const skillsData: SkillGroup[] = [
  {
    category: "Frontend",
    description: "Modern interfaces and interactive experiences",
    icon: <Code className="h-5 w-5" />,
    gradient: "from-blue-500 via-cyan-500 to-sky-500",
    iconGradient: "from-blue-500/20 to-cyan-500/20",
    skills: [
      { id: "react", name: "React", level: 90, icon: <SiReact className="h-4 w-4" /> },
      { id: "nextjs", name: "Next.js", level: 85, icon: <SiNextdotjs className="h-4 w-4" /> },
      { id: "tailwind", name: "Tailwind CSS", level: 85, icon: <SiTailwindcss className="h-4 w-4" /> },
      { id: "javascript", name: "JavaScript", level: 88, icon: <SiJavascript className="h-4 w-4" /> },
      { id: "typescript", name: "TypeScript", level: 82, icon: <SiTypescript className="h-4 w-4" /> },
    ],
  },
  {
    category: "Backend",
    description: "Scalable APIs, databases and server architecture",
    icon: <Server className="h-5 w-5" />,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    iconGradient: "from-emerald-500/20 to-teal-500/20",
    skills: [
      { id: "laravel", name: "Laravel", level: 85, icon: <SiLaravel className="h-4 w-4" /> },
      { id: "php", name: "PHP", level: 80, icon: <SiPhp className="h-4 w-4" /> },
      { id: "mysql", name: "MySQL", level: 78, icon: <SiMysql className="h-4 w-4" /> },
      { id: "restapi", name: "REST API", level: 85, icon: <Code className="h-4 w-4" /> },
    ],
  },
  {
    category: "Tools",
    description: "Development workflow, deployment and design",
    icon: <Wrench className="h-5 w-5" />,
    gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
    iconGradient: "from-purple-500/20 to-pink-500/20",
    skills: [
      { id: "git", name: "Git", level: 85, icon: <SiGit className="h-4 w-4" /> },
      { id: "github", name: "GitHub", level: 85, icon: <SiGithub className="h-4 w-4" /> },
      { id: "vercel", name: "Vercel", level: 80, icon: <SiVercel className="h-4 w-4" /> },
      { id: "figma", name: "Figma", level: 75, icon: <SiFigma className="h-4 w-4" /> },
    ],
  },
];

/* =========================================================
   Props
========================================================= */

interface SkillsPreviewProps {
  className?: string;
  limit?: number;
  variant?: "default" | "compact" | "expanded";
  showLevels?: boolean;
  showCategories?: boolean;
  animateOnce?: boolean;
}

/* =========================================================
   Animation Variants - Fixed
========================================================= */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 180,
      damping: 20,
    },
  },
};

const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut" as const
    },
  },
};

const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const
    },
  },
};

const viewAllVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: 0.25,
      ease: "easeOut" as const
    },
  },
};

/* =========================================================
   Component
========================================================= */

export function SkillsPreview({
  className,
  limit = 12,
  variant = "default",
  showLevels = true,
  showCategories = true,
  animateOnce = true,
}: SkillsPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  /* -------------------------------------------------------
     Flatten skills
  ------------------------------------------------------- */

  const allSkills = useMemo(
    () =>
      skillsData.flatMap((group) =>
        group.skills.map((skill) => ({
          ...skill,
          category: group.category,
        }))
      ),
    []
  );

  const displayedSkills = showCategories
    ? allSkills
    : allSkills.slice(0, Math.max(0, limit));

  /* -------------------------------------------------------
     Helpers
  ------------------------------------------------------- */

  const getLevelGradient = (level: number) => {
    if (level >= 85) return "from-emerald-400 via-teal-400 to-cyan-400";
    if (level >= 75) return "from-blue-400 via-cyan-400 to-sky-400";
    if (level >= 60) return "from-amber-400 via-orange-400 to-yellow-400";
    return "from-muted-foreground/50 to-muted-foreground/30";
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Frontend: "from-blue-500 via-cyan-500 to-sky-500",
      Backend: "from-emerald-500 via-teal-500 to-cyan-500",
      Tools: "from-purple-500 via-fuchsia-500 to-pink-500",
    };
    return colors[category] ?? "from-primary to-primary/60";
  };

  /* =========================================================
     COMPACT VARIANT - Fixed
  ========================================================= */

  if (variant === "compact") {
    return (
      <section
        id="skills"
        className={cn(
          "relative w-full min-w-0 overflow-hidden",
          "py-10 sm:py-12",
          className
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Skills"
            subtitle="Technologies I work with"
            className="mb-7 sm:mb-8"
          />

          <motion.div
            ref={ref}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: animateOnce, amount: 0.12 }}
            variants={containerVariants}
            className="mx-auto flex w-full max-w-4xl flex-wrap justify-center gap-2"
          >
            {displayedSkills.slice(0, 8).map((skill, index) => (
              <motion.div
                key={skill.id || index}
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Badge
                  variant="outline"
                  className="flex max-w-full items-center gap-1.5 rounded-full border-border/60 bg-background/60 px-3 py-1.5 text-xs backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  {skill.icon}
                  <span className="truncate">{skill.name}</span>
                </Badge>
              </motion.div>
            ))}
            {displayedSkills.length > 8 && (
              <motion.div variants={itemVariants}>
                <Badge variant="secondary" className="rounded-full px-3 py-1.5 text-xs">
                  +{displayedSkills.length - 8} more
                </Badge>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  /* =========================================================
     EXPANDED VARIANT - Fixed
  ========================================================= */

  if (variant === "expanded") {
    return (
      <section
        id="skills"
        className={cn(
          "relative w-full min-w-0 overflow-hidden",
          "py-14 sm:py-18 lg:py-24",
          className
        )}
      >
        {/* Ambient gradients */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Skills & Technologies"
            subtitle="Technologies I work with and specialize in"
            className="mb-10 sm:mb-12 lg:mb-14"
          />

          <div className="mx-auto w-full max-w-5xl space-y-10 sm:space-y-12">
            {skillsData.map((group, groupIndex) => (
              <motion.div
                key={group.category}
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: animateOnce, amount: 0.15 }}
                custom={groupIndex}
                className="min-w-0"
              >
                {/* Category heading */}
                <div className="mb-5 flex min-w-0 items-center gap-3 sm:mb-6">
                  <div
                    className={cn(
                      "relative flex h-10 w-10 shrink-0",
                      "items-center justify-center",
                      "overflow-hidden rounded-xl",
                      "bg-gradient-to-br",
                      group.iconGradient
                    )}
                  >
                    <div
                      className={cn(
                        "absolute inset-0 opacity-30",
                        "bg-gradient-to-br",
                        group.gradient
                      )}
                    />
                    <span className="relative z-10">{group.icon}</span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-bold tracking-tight sm:text-xl">
                      {group.category}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground sm:text-sm">
                      {group.description}
                    </p>
                  </div>

                  <div className="ml-1 hidden h-px flex-1 bg-gradient-to-r from-border via-border/60 to-transparent sm:block" />
                </div>

                {/* Skill cards */}
                <div className="grid min-w-0 gap-4 sm:grid-cols-2">
                  {group.skills.map((skill, index) => {
                    const isHovered = hoveredSkill === skill.id;

                    return (
                      <motion.div
                        key={skill.id || index}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.45,
                          delay: index * 0.06,
                          ease: "easeOut" as const

                        }}
                        viewport={{ once: animateOnce }}
                        onMouseEnter={() => setHoveredSkill(skill.id)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className="group relative min-w-0"
                      >
                        {/* Hover glow */}
                        <motion.div
                          aria-hidden="true"
                          animate={{ opacity: isHovered ? 1 : 0 }}
                          transition={{ duration: 0.25 }}
                          className={cn(
                            "pointer-events-none",
                            "absolute -inset-px",
                            "rounded-2xl",
                            "bg-gradient-to-r",
                            group.gradient,
                            "opacity-0",
                            "blur-md"
                          )}
                        />

                        {/* Card */}
                        <div
                          className={cn(
                            "relative min-w-0 overflow-hidden",
                            "rounded-2xl border border-border/60",
                            "bg-background/70 p-4 shadow-sm",
                            "backdrop-blur-xl transition-all duration-300",
                            "group-hover:border-primary/20",
                            "group-hover:bg-background/90",
                            "group-hover:shadow-lg",
                            "sm:p-5"
                          )}
                        >
                          {/* Decorative gradient */}
                          <div
                            aria-hidden="true"
                            className={cn(
                              "pointer-events-none",
                              "absolute -right-8 -top-8",
                              "h-24 w-24 rounded-full",
                              "bg-gradient-to-br",
                              group.gradient,
                              "opacity-0 blur-2xl",
                              "transition-opacity duration-500",
                              "group-hover:opacity-20"
                            )}
                          />

                          {/* Header */}
                          <div className="relative z-10 mb-3 flex min-w-0 items-center justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-2.5">
                              <motion.span
                                animate={
                                  isHovered
                                    ? { rotate: [0, -8, 8, 0], scale: [1, 1.12, 1] }
                                    : { rotate: 0, scale: 1 }
                                }
                                transition={{ duration: 0.45 }}
                                className={cn(
                                  "flex h-8 w-8 shrink-0",
                                  "items-center justify-center",
                                  "rounded-lg bg-muted/70",
                                  "text-muted-foreground",
                                  "transition-colors duration-300",
                                  "group-hover:bg-primary/10",
                                  "group-hover:text-primary"
                                )}
                              >
                                {skill.icon}
                              </motion.span>
                              <span className="truncate text-sm font-semibold">
                                {skill.name}
                              </span>
                            </div>

                            {showLevels && (
                              <span
                                className={cn(
                                  "shrink-0 text-xs font-bold tabular-nums",
                                  "bg-gradient-to-r",
                                  group.gradient,
                                  "bg-clip-text text-transparent"
                                )}
                              >
                                {skill.level}%
                              </span>
                            )}
                          </div>

                          {/* Progress */}
                          <div className="relative z-10">
                            <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{
                                  duration: 1.1,
                                  delay: 0.15 + index * 0.05,
                                  ease: "easeOut" as const

                                }}
                                viewport={{ once: animateOnce }}
                                className={cn(
                                  "relative h-full rounded-full",
                                  "bg-gradient-to-r",
                                  getLevelGradient(skill.level)
                                )}
                              >
                                <motion.div
                                  animate={{ x: ["-100%", "200%"] }}
                                  transition={{
                                    duration: 1.8,
                                    repeat: Infinity,
                                    repeatDelay: 2.5,
                                    ease: "easeInOut" as const

,
                                  }}
                                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                />
                              </motion.div>
                            </div>

                            <div className="mt-1.5 flex items-center justify-between">
                              <span className="text-[10px] text-muted-foreground/60">
                                Beginner
                              </span>
                              <span className="text-[10px] text-muted-foreground/60">
                                Expert
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================
     DEFAULT VARIANT - Fixed
  ========================================================= */

  return (
    <section
      id="skills"
      className={cn(
        "relative w-full min-w-0 overflow-hidden",
        "py-14 sm:py-16 lg:py-20",
        className
      )}
    >
      {/* Background effects */}
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" as const

 }}
        className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"
      />

      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -30, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" as const

 }}
        className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="Technologies I work with and specialize in"
          className="mb-9 sm:mb-10 lg:mb-12"
        />

        {showCategories ? (
          <div className="mx-auto w-full max-w-5xl space-y-8 sm:space-y-10">
            {skillsData.map((group, groupIndex) => (
              <motion.div
                key={group.category}
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: animateOnce, amount: 0.15 }}
                custom={groupIndex}
                className="min-w-0"
              >
                {/* Category */}
                <div className="mb-4 flex items-center gap-2.5">
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0",
                      "items-center justify-center",
                      "rounded-lg",
                      "bg-gradient-to-br",
                      group.iconGradient,
                      "text-primary"
                    )}
                  >
                    {group.icon}
                  </div>
                  <h4 className="text-sm font-bold tracking-tight">
                    {group.category}
                  </h4>
                  <div
                    className={cn(
                      "h-px flex-1",
                      "bg-gradient-to-r",
                      getCategoryColor(group.category),
                      "opacity-40"
                    )}
                  />
                </div>

                {/* Skills */}
                <div className="flex min-w-0 flex-wrap gap-2.5">
                  {group.skills.map((skill, index) => {
                    const isHovered = hoveredSkill === skill.id;

                    return (
                      <motion.div
                        key={skill.id || index}
                        variants={scaleInVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: animateOnce }}
                        custom={index}
                        whileHover={{ y: -3, scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        onMouseEnter={() => setHoveredSkill(skill.id)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <Badge
                          variant="secondary"
                          className={cn(
                            "relative flex max-w-full",
                            "cursor-default",
                            "items-center gap-1.5",
                            "overflow-hidden",
                            "rounded-full",
                            "border border-transparent",
                            "px-3 py-1.5",
                            "text-xs",
                            "transition-all duration-300",
                            "hover:border-primary/20",
                            "hover:bg-primary/10",
                            "hover:text-primary",
                            "hover:shadow-md"
                          )}
                        >
                          {/* Hover shimmer */}
                          <motion.span
                            aria-hidden="true"
                            animate={{
                              opacity: isHovered ? 1 : 0,
                              x: isHovered ? "100%" : "-100%",
                            }}
                            transition={{ duration: 0.5 }}
                            className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                          />

                          <span className="relative z-10">{skill.icon}</span>
                          <span className="relative z-10 truncate">{skill.name}</span>
                          {showLevels && (
                            <span className="relative z-10 ml-0.5 text-[10px] font-semibold opacity-60 tabular-nums">
                              {skill.level}%
                            </span>
                          )}
                        </Badge>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            ref={ref}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: animateOnce, amount: 0.12 }}
            variants={containerVariants}
            className="mx-auto flex w-full max-w-5xl min-w-0 flex-wrap justify-center gap-2.5 sm:gap-3"
          >
            {displayedSkills.map((skill, index) => (
              <motion.div
                key={skill.id || index}
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Badge
                  variant="secondary"
                  className="flex max-w-full cursor-default items-center gap-1.5 rounded-full border border-transparent px-3 py-1.5 text-xs transition-all duration-300 hover:border-primary/20 hover:bg-primary/10 hover:text-primary hover:shadow-md sm:px-4 sm:py-2 sm:text-sm"
                >
                  {skill.icon}
                  <span className="truncate">{skill.name}</span>
                  {showLevels && (
                    <span className="text-[10px] opacity-60 sm:text-xs">
                      {skill.level}%
                    </span>
                  )}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View all */}
        {displayedSkills.length < allSkills.length && (
          <motion.div
            variants={viewAllVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: animateOnce }}
            className="mt-9 flex justify-center sm:mt-10"
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="group rounded-full gap-2 border-border/60 bg-background/60 px-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:shadow-lg"
            >
              <Link href="/skills">
                <span>View All Skills</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}