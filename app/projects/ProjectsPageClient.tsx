"use client";

import { motion } from "framer-motion";
import {
  ProjectsHeader,
  ProjectGrid,
} from "@/components/projects";

import {
  PageHeader,
  Container,
  Section,
  BackToTop,
} from "@/components/layout";

import { Button } from "@/components/ui/button";

import {
  FolderGit2,
  ArrowRight,
  FolderOpen,
  CheckCircle2,
  Star,
  Layers,
} from "lucide-react";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProjectsPageClientProps {
  totalProjects: number;
  completedProjects: number;
  featuredProjects: number;
  categories: Set<string>;
}

export function ProjectsPageClient({
  totalProjects,
  completedProjects,
  featuredProjects,
  categories,
}: ProjectsPageClientProps) {
  const stats = [
    {
      label: "Total Projects",
      value: totalProjects,
      icon: FolderOpen,
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Completed",
      value: completedProjects,
      icon: CheckCircle2,
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Featured",
      value: featuredProjects,
      icon: Star,
      bgColor: "bg-amber-500/10",
    },
    {
      label: "Categories",
      value: categories.size,
      icon: Layers,
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background">

      {/* =========================================================
          PAGE HEADER
      ========================================================= */}

      <PageHeader
        title="Projects"
        description="Explore my portfolio of work spanning web development, AI applications, and design."
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Projects",
            href: "/projects",
          },
        ]}
        badge="Portfolio"
        showDivider
        gradientFrom="from-purple-600"
        gradientTo="to-pink-600"
      />

      {/* =========================================================
          PROJECT STATISTICS
      ========================================================= */}

      <Section
        variant="muted"
        padding="md"
        className="w-full border-b border-border/40 overflow-hidden"
      >
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="
              grid
              w-full
              grid-cols-2
              gap-2
              sm:gap-3
              md:grid-cols-4
            "
          >
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.label}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 12,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.35,
                      },
                    },
                  }}
                  className="
                    min-w-0
                    rounded-lg
                    border
                    border-border/50
                    bg-background
                    p-2.5
                    text-center
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-primary/30
                    hover:shadow-md
                    sm:rounded-xl
                    sm:p-4
                  "
                >
                  {/* Icon */}

                  <div
                    className={cn(
                      "mx-auto mb-1.5",
                      "flex h-7 w-7 items-center justify-center",
                      "rounded-full",
                      stat.bgColor,
                      "sm:mb-2 sm:h-9 sm:w-9"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  </div>

                  {/* Value */}

                  <div
                    className="
                      bg-gradient-to-r
                      from-purple-600
                      to-pink-600
                      bg-clip-text
                      text-lg
                      font-bold
                      leading-tight
                      tracking-tight
                      text-transparent
                      sm:text-2xl
                    "
                  >
                    {stat.value}
                  </div>

                  {/* Label */}

                  <div
                    className="
                      mt-0.5
                      truncate
                      text-[9px]
                      font-medium
                      leading-tight
                      text-muted-foreground
                      sm:text-xs
                    "
                    title={stat.label}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </Section>

      {/* =========================================================
          PROJECTS
      ========================================================= */}

      <Section
        variant="default"
        padding="md"
        className="w-full overflow-hidden"
      >
        <Container>
          {/* Header */}

          <ProjectsHeader
            totalProjects={totalProjects}
          />

          {/* Project Grid */}

          <div className="mt-6 w-full sm:mt-8">
            <ProjectGrid
              limit={6}
              showFilter
              showSearch
              showLoadMore
            />
          </div>
        </Container>
      </Section>

      {/* =========================================================
          CALL TO ACTION
      ========================================================= */}

      <Section
        variant="gradient"
        padding="md"
        className="
          w-full
          overflow-hidden
          border-t
          border-border/40
        "
      >
        <Container>
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              mx-auto
              w-full
              max-w-2xl
              px-1
              text-center
              sm:px-4
            "
          >
            {/* CTA Icon */}

            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              whileInView={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                delay: 0.1,
                duration: 0.4,
              }}
              viewport={{
                once: true,
              }}
              className="
                mx-auto
                mb-4
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
              <FolderGit2 className="h-6 w-6 sm:h-7 sm:w-7" />
            </motion.div>

            {/* Heading */}

            <h2
              className="
                text-xl
                font-bold
                tracking-tight
                sm:text-2xl
                md:text-3xl
              "
            >
              Interested in{" "}
              <span
                className="
                  bg-gradient-to-r
                  from-purple-600
                  to-pink-600
                  bg-clip-text
                  text-transparent
                "
              >
                Working Together
              </span>
              ?
            </h2>

            {/* Description */}

            <p
              className="
                mx-auto
                mt-3
                max-w-xl
                text-xs
                leading-5
                text-muted-foreground
                sm:text-sm
                sm:leading-6
                md:text-base
              "
            >
              Have a project in mind? Let's collaborate and
              bring your ideas to life.
            </p>

            {/* Button */}

            <div className="mt-5">
              <Button
                size="lg"
                asChild
                className="
                  group
                  w-full
                  max-w-xs
                  gap-2
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
                  sm:w-auto
                "
              >
                <Link
                  href="/contact"
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >
                  <span>Get in Touch</span>

                  <ArrowRight
                    className="
                      h-4 w-4
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

      {/* =========================================================
          BACK TO TOP
      ========================================================= */}

      <BackToTop />

    </main>
  );
}