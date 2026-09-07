// app/skills/SkillsPageClient.tsx
"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Code2,
  Cpu,
  Layers3,
  Rocket,
  Sparkles,
  TrendingUp,
  LucideIcon,
} from "lucide-react";

import {
  SkillsHeader,
  SkillsGrid,
  ToolsGrid,
} from "@/components/skills";

import {
  PageHeader,
  Container,
  Section,
  BackToTop,
} from "@/components/layout";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* ============================================================
 * TYPES
 * ============================================================ */

interface Skill {
  id?: string | number;
  name?: string;
  level?: number;
  category?: string;
}

interface SkillsPageClientProps {
  totalSkills: number;
  totalCategories: number;
  avgLevel: number;
  expertSkills: Skill[];
  advancedSkills: Skill[];
  intermediateSkills: Skill[];
}

interface StatItem {
  label: string;
  value: number | string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

interface DistributionItem {
  label: string;
  count: number;
  color: string;
}

interface LearningGoal {
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
  gradient: string;
  iconBg: string;
  iconColor: string;
}

/* ============================================================
 * ANIMATION - FIXED
 * ============================================================ */

// ✅ FIXED: Use 'as const' for string literal types
const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut" as const
    },
  },
};

const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// Additional animation for stats
const statItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.05,
      duration: 0.4,
      ease: "easeOut" as const
    },
  }),
};

/* ============================================================
 * COMPONENT
 * ============================================================ */

export function SkillsPageClient({
  totalSkills = 0,
  totalCategories = 0,
  avgLevel = 0,
  expertSkills = [],
  advancedSkills = [],
  intermediateSkills = [],
}: SkillsPageClientProps) {
  /* ==========================================================
   * SAFE VALUES
   * ========================================================== */

  const safeTotalSkills = Math.max(0, totalSkills);
  const safeTotalCategories = Math.max(0, totalCategories);
  const safeAvgLevel = Math.min(100, Math.max(0, avgLevel));

  /* ==========================================================
   * STATS - TYPED
   * ========================================================== */

  const stats: StatItem[] = [
    {
      label: "Total Skills",
      value: safeTotalSkills,
      icon: Code2,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Categories",
      value: safeTotalCategories,
      icon: Layers3,
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      label: "Avg. Proficiency",
      value: `${Math.round(safeAvgLevel)}%`,
      icon: TrendingUp,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Expert Skills",
      value: expertSkills.length,
      icon: Award,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
  ];

  /* ==========================================================
   * SKILL DISTRIBUTION - TYPED
   * ========================================================== */

  const distribution: DistributionItem[] = [
    {
      label: "Expert",
      count: expertSkills.length,
      color: "bg-emerald-500",
    },
    {
      label: "Advanced",
      count: advancedSkills.length,
      color: "bg-blue-500",
    },
    {
      label: "Intermediate",
      count: intermediateSkills.length,
      color: "bg-amber-500",
    },
  ];

  /* ==========================================================
   * LEARNING GOALS - TYPED
   * ========================================================== */

  const learningGoals: LearningGoal[] = [
    {
      icon: Sparkles,
      title: "Currently Learning",
      description: "Technologies I'm actively exploring and improving.",
      items: ["AI / ML Fundamentals", "Cloud Architecture", "Web3 Technologies"],
      gradient: "from-purple-500 to-pink-500",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Rocket,
      title: "Next Up",
      description: "Technologies planned for my next learning cycle.",
      items: ["GraphQL & Apollo", "Kubernetes", "Rust Programming"],
      gradient: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: BookOpen,
      title: "Areas of Interest",
      description: "Topics I want to explore beyond day-to-day development.",
      items: ["Open Source Contribution", "Technical Writing", "Developer Advocacy"],
      gradient: "from-emerald-500 to-teal-500",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  /* ==========================================================
   * RENDER
   * ========================================================== */

  return (
    <main
      className="
        min-h-screen
        w-full
        min-w-0
        overflow-x-clip
        bg-background
      "
    >
      {/* ======================================================
          PAGE HEADER
      ====================================================== */}

      <PageHeader
        title="Skills & Technologies"
        description="A comprehensive overview of my technical expertise, tools, and technologies."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Skills", href: "/skills" },
        ]}
        badge="Technical Expertise"
        showHome
        showDivider
        variant="default"
        gradientFrom="from-purple-600"
        gradientTo="to-pink-600"
      />

      {/* ======================================================
          QUICK STATS
      ====================================================== */}

      <Section variant="muted" padding="md" className="border-y border-border/40">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="
              grid
              w-full
              min-w-0
              grid-cols-2
              gap-3
              sm:gap-4
              md:grid-cols-4
            "
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.label}
                  custom={index}
                  variants={statItemVariants}
                  className="
                    group
                    min-w-0
                    rounded-xl
                    border
                    border-border/60
                    bg-background
                    p-3
                    text-center
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-primary/30
                    hover:shadow-md
                    sm:p-4
                  "
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "mx-auto mb-2.5",
                      "flex h-9 w-9 items-center justify-center",
                      "rounded-full",
                      "transition-transform duration-300",
                      "group-hover:scale-105",
                      stat.iconBg
                    )}
                  >
                    <Icon className={cn("h-4 w-4 sm:h-5 sm:w-5", stat.iconColor)} />
                  </div>

                  {/* Value */}
                  <p
                    className="
                      truncate
                      bg-gradient-to-r
                      from-purple-600
                      to-pink-600
                      bg-clip-text
                      text-xl
                      font-bold
                      tracking-tight
                      text-transparent
                      sm:text-2xl
                      md:text-3xl
                    "
                  >
                    {stat.value}
                  </p>

                  {/* Label */}
                  <p
                    className="
                      mt-0.5
                      truncate
                      text-[11px]
                      font-medium
                      text-muted-foreground
                      sm:text-xs
                      md:text-sm
                    "
                  >
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </Section>

      {/* ======================================================
          SKILL DISTRIBUTION
      ====================================================== */}

      <Section variant="default" padding="md">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="mx-auto w-full max-w-2xl min-w-0"
          >
            <div className="mb-4 text-center">
              <h2 className="text-sm font-semibold">Skill Distribution</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Breakdown of my current proficiency levels.
              </p>
            </div>

            {/* Distribution Bar */}
            <div
              className="
                relative
                flex
                h-2.5
                w-full
                min-w-0
                overflow-hidden
                rounded-full
                bg-muted
              "
              role="img"
              aria-label="Skill proficiency distribution"
            >
              {distribution.map((item, index) => {
                const percentage =
                  safeTotalSkills > 0
                    ? Math.min(100, (item.count / safeTotalSkills) * 100)
                    : 0;

                return (
                  <motion.div
                    key={item.label}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.9,
                      delay: index * 0.1,
                      ease: "easeOut" as const

                    }}
                    className={cn(
                      "h-full shrink-0",
                      item.color,
                      index === 0 && "rounded-l-full",
                      index === distribution.length - 1 && "rounded-r-full"
                    )}
                  />
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
              {distribution.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span className={cn("h-2 w-2 rounded-full", item.color)} />
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className="text-xs font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ======================================================
          MAIN SKILLS
      ====================================================== */}

      <Section variant="default" padding="lg" className="overflow-visible">
        <Container>
          <div className="w-full min-w-0">
            <SkillsHeader
              totalSkills={safeTotalSkills}
              categories={safeTotalCategories}
              variant="default"
            />

            <div className="mt-7 w-full min-w-0 sm:mt-10">
              <SkillsGrid
                showCategories
                variant="default"
                columns={3}
                showSearch
                showFilter
                showViewToggle
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ======================================================
          TOOLS & TECHNOLOGIES
      ====================================================== */}

      <Section
        variant="muted"
        padding="lg"
        className="border-y border-border/40"
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-8 w-full max-w-3xl text-center sm:mb-10"
          >
            <Badge
              variant="outline"
              className="mb-3 gap-2 px-3 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm"
            >
              <Cpu className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Tools & Technologies
            </Badge>

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              My Development Stack
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              The frameworks, libraries, platforms, and development tools I use to
              build reliable and modern applications.
            </p>
          </motion.div>

          <div className="w-full min-w-0">
            <ToolsGrid variant="default" showLevels showCategories />
          </div>
        </Container>
      </Section>

      {/* ======================================================
          CONTINUOUS LEARNING
      ====================================================== */}

      <Section variant="default" padding="lg">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-8 w-full max-w-3xl text-center sm:mb-10"
          >
            <Badge
              variant="outline"
              className="mb-3 gap-2 px-3 py-1 text-xs sm:px-4 sm:py-1.5 sm:text-sm"
            >
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Continuous Learning
            </Badge>

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Learning Journey
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Technology evolves quickly, so I continuously explore new tools,
              ideas, and engineering practices.
            </p>
          </motion.div>

          {/* Learning Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid w-full min-w-0 gap-4 sm:gap-5 md:grid-cols-3"
          >
            {learningGoals.map((goal) => {
              const Icon = goal.icon;

              return (
                <motion.article
                  key={goal.title}
                  variants={fadeUp}
                  className="
                    group
                    relative
                    min-w-0
                    overflow-hidden
                    rounded-xl
                    border
                    border-border/60
                    bg-background
                    p-5
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-primary/30
                    hover:shadow-lg
                    sm:p-6
                  "
                >
                  {/* Top accent */}
                  <div
                    className={cn(
                      "absolute inset-x-0 top-0 h-0.5",
                      "bg-gradient-to-r",
                      goal.gradient
                    )}
                  />

                  {/* Icon */}
                  <div
                    className={cn(
                      "mb-4 flex h-11 w-11 items-center justify-center rounded-xl",
                      "transition-transform duration-300",
                      "group-hover:scale-105",
                      goal.iconBg
                    )}
                  >
                    <Icon className={cn("h-5 w-5", goal.iconColor)} />
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold">{goal.title}</h3>

                  {/* Description */}
                  <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                    {goal.description}
                  </p>

                  {/* Items */}
                  <ul className="mt-4 space-y-2.5">
                    {goal.items.map((item) => (
                      <li
                        key={item}
                        className="flex min-w-0 items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                        <span className="min-w-0 break-words">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </motion.div>
        </Container>
      </Section>

      {/* ======================================================
          CTA
      ====================================================== */}

      <Section variant="gradient" padding="lg" className="border-t border-border/40">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mx-auto w-full max-w-2xl text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                type: "spring" as const,

                stiffness: 180,
              }}
              className="
                mx-auto
                mb-5
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-gradient-to-r
                from-purple-600
                to-pink-600
                text-white
                shadow-lg
                sm:h-14
                sm:w-14
              "
            >
              <Rocket className="h-6 w-6 sm:h-7 sm:w-7" />
            </motion.div>

            {/* Heading */}
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Ready to{" "}
              <span
                className="
                  bg-gradient-to-r
                  from-purple-600
                  to-pink-600
                  bg-clip-text
                  text-transparent
                "
              >
                Work Together
              </span>
              ?
            </h2>

            {/* Description */}
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Let's turn these skills into a practical, high-quality solution for
              your next project.
            </p>

            {/* CTA */}
            <div className="mt-6">
              <Button
                size="lg"
                asChild
                className="
                  group
                  gap-2
                  border-0
                  bg-gradient-to-r
                  from-purple-600
                  to-pink-600
                  text-white
                  shadow-md
                  transition-all
                  duration-300
                  hover:from-purple-700
                  hover:to-pink-700
                  hover:shadow-lg
                "
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2"
                >
                  <span>Get in Touch</span>
                  <ArrowRight
                    className="
                      h-4
                      w-4
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ======================================================
          BACK TO TOP
      ====================================================== */}

      <BackToTop />
    </main>
  );
}