"use client";

import { motion } from "framer-motion";
import {
  ExperienceHeader,
  ExperienceTimeline,
} from "@/components/experience";

import {
  PageHeader,
  BackToTop,
  Container,
  Section,
} from "@/components/layout";

import { Button } from "@/components/ui/button";

import {
  Calendar,
  Briefcase,
  Code2,
  Rocket,
  Users,
  Star,
  Download,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface ExperiencePageClientProps {
  totalYears: number;
  totalCompanies: number;
  totalProjects: number;
  totalTech: number;
}

export function ExperiencePageClient({
  totalYears,
  totalCompanies,
  totalProjects,
  totalTech,
}: ExperiencePageClientProps) {
  const stats = [
    {
      label: "Years Experience",
      value: `${totalYears}+`,
      description: "Professional experience",
      icon: Calendar,
      bg: "bg-blue-500/10",
    },
    {
      label: "Companies Worked",
      value: `${totalCompanies}`,
      description: "In tech industry",
      icon: Briefcase,
      bg: "bg-purple-500/10",
    },
    {
      label: "Projects Delivered",
      value: `${totalProjects}+`,
      description: "Production projects",
      icon: Code2,
      bg: "bg-emerald-500/10",
    },
    {
      label: "Technologies",
      value: `${totalTech}+`,
      description: "Different tech stacks",
      icon: Rocket,
      bg: "bg-amber-500/10",
    },
    {
      label: "Team Size",
      value: "5–10",
      description: "Average team size",
      icon: Users,
      bg: "bg-indigo-500/10",
    },
    {
      label: "Client Satisfaction",
      value: "100%",
      description: "Positive feedback",
      icon: Star,
      bg: "bg-rose-500/10",
    },
  ];

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">

      {/* =========================================================
          PAGE HEADER
      ========================================================= */}

      <PageHeader
        title="Experience"
        description={`My professional journey spanning ${totalYears}+ years across ${totalCompanies} companies.`}
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Experience",
            href: "/experience",
          },
        ]}
        badge="Career"
        showDivider
        gradientFrom="from-purple-600"
        gradientTo="to-pink-600"
      />

      {/* =========================================================
          EXPERIENCE INTRO
      ========================================================= */}

      <Section
        variant="default"
        padding="md"
        className="overflow-hidden"
      >
        <Container>
          <ExperienceHeader
            totalYears={totalYears}
            totalCompanies={totalCompanies}
          />
        </Container>
      </Section>

      {/* =========================================================
          CAREER STATS
      ========================================================= */}

      <Section
        variant="muted"
        padding="md"
        className="overflow-hidden"
      >
        <Container>
          <div className="mx-auto w-full max-w-6xl">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
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
                grid-cols-2
                gap-2
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-6
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
                        y: 16,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.4,
                        },
                      },
                    }}
                    className={cn(
                      "group",
                      "rounded-xl",
                      "border",
                      "border-border/60",
                      "bg-background",
                      "p-3",
                      "text-center",
                      "shadow-sm",
                      "transition-all",
                      "duration-300",
                      "hover:-translate-y-1",
                      "hover:shadow-md",
                      "hover:border-primary/30",
                      "sm:p-4"
                    )}
                  >
                    {/* Icon */}

                    <div
                      className={cn(
                        "mx-auto mb-2",
                        "flex h-8 w-8",
                        "items-center justify-center",
                        "rounded-full",
                        stat.bg
                      )}
                    >
                      <Icon className="h-4 w-4 text-primary" />
                    </div>

                    {/* Value */}

                    <div
                      className="
                        bg-gradient-to-r
                        from-purple-600
                        to-pink-600
                        bg-clip-text
                        text-xl
                        font-bold
                        leading-none
                        text-transparent
                        sm:text-2xl
                      "
                    >
                      {stat.value}
                    </div>

                    {/* Label */}

                    <div className="mt-1 text-[11px] font-semibold leading-tight sm:text-xs">
                      {stat.label}
                    </div>

                    {/* Description */}

                    <div className="mt-1 text-[9px] leading-tight text-muted-foreground sm:text-[10px]">
                      {stat.description}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* =========================================================
          EXPERIENCE TIMELINE
      ========================================================= */}

      <Section
        variant="default"
        padding="md"
        className="overflow-hidden"
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
            transition={{
              duration: 0.5,
            }}
            viewport={{
              once: true,
              amount: 0.1,
            }}
            className="w-full"
          >
            <ExperienceTimeline
              showEducation
            />
          </motion.div>
        </Container>
      </Section>

      {/* =========================================================
          RESUME CTA
      ========================================================= */}

      <Section
        variant="gradient"
        padding="md"
        className="overflow-hidden"
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
            transition={{
              duration: 0.5,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="
              mx-auto
              w-full
              max-w-2xl
              px-2
              text-center
            "
          >
            {/* Icon */}

            <div
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
              <Download className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>

            {/* Heading */}

            <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
              Download{" "}
              <span
                className="
                  bg-gradient-to-r
                  from-purple-600
                  to-pink-600
                  bg-clip-text
                  text-transparent
                "
              >
                My Resume
              </span>
            </h2>

            {/* Description */}

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Want to learn more about my experience and skills?
              Download my complete professional resume.
            </p>

            {/* Button */}

           <Button
  size="lg"
  asChild
  className={`
    mt-5
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
  `}
>
  <a
    href="/resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2" // Changed from flex-col to items-center
  >
    <Download className="h-4 w-4" />
    <span>Download Resume</span>
  </a>
</Button>
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