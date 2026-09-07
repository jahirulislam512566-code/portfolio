"use client";

import { motion, useInView, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  Briefcase,
  Users,
  Code2,
  Clock,
  Star,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { heroData } from "@/data/hero";
import { useRef } from "react";

interface StatItem {
  icon: LucideIcon;
  value: string;
  label: string;
  description: string;
  color: string;
}

interface AboutStatsProps {
  className?: string;
  variant?: "default" | "compact" | "expanded";
  columns?: 2 | 3 | 4;
}

export function AboutStats({
  className,
  variant = "default",
  columns = 3,
}: AboutStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const stats: StatItem[] = [
    {
      icon: Briefcase,
      value: `${heroData.stats?.[0]?.value ?? 5}+`,
      label: "Years Experience",
      description: "Professional experience",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Code2,
      value: `${heroData.stats?.[1]?.value ?? 50}+`,
      label: "Projects Completed",
      description: "Production projects",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      value: `${heroData.stats?.[2]?.value ?? 30}+`,
      label: "Happy Clients",
      description: "Satisfied clients",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Award,
      value: "5+",
      label: "Awards",
      description: "Industry recognition",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Clock,
      value: "10k+",
      label: "Hours Coded",
      description: "Total development time",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Star,
      value: "100%",
      label: "Client Satisfaction",
      description: "Positive feedback rate",
      color: "from-rose-500 to-pink-500",
    },
  ];

  const gridCols: Record<2 | 3 | 4, string> = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4",
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const



,
        stiffness: 260,
        damping: 22,
      },
    },
  };

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
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {stats.slice(0, 4).map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} variants={itemVariants}>
                  <Card className="group text-center transition-all hover:border-primary/50 hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
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
              By the{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Numbers
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
              Here are some statistics that showcase my professional journey and
              achievements.
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mx-auto mt-4 h-0.5 w-16 origin-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
            />
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className={cn("grid gap-6", gridCols[columns])}
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} variants={itemVariants}>
                  <Card className="group h-full text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl">
                    <CardContent className="p-6">
                      <div
                        className={cn(
                          "mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r text-white transition-all duration-300",
                          stat.color,
                          "group-hover:scale-110 group-hover:shadow-lg"
                        )}
                      >
                        <Icon className="h-7 w-7" />
                      </div>
                      <p className="mb-1 text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent md:text-4xl">
                        {stat.value}
                      </p>
                      <p className="text-base font-semibold">{stat.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {stat.description}
                      </p>
                    </CardContent>
                  </Card>
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
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h3 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">
            By the{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Numbers
            </span>
          </h3>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Here are some statistics that showcase my professional journey and
            achievements.
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto mt-3 h-0.5 w-16 origin-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
          />
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className={cn("grid gap-4 md:gap-6", gridCols[columns])}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="group text-center transition-all hover:border-primary/50 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div
                      className={cn(
                        "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r text-white transition-all duration-300",
                        stat.color,
                        "group-hover:scale-110 group-hover:shadow-md"
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="mb-1 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent md:text-3xl">
                      {stat.value}
                    </p>
                    <p className="text-sm font-medium md:text-base">
                      {stat.label}
                    </p>
                    <p className="text-xs text-muted-foreground md:text-sm">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}