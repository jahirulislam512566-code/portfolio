"use client";

import { motion, useInView, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Lightbulb,
  Users,
  Heart,
  Shield,
  Zap,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

interface AboutValuesProps {
  className?: string;
  variant?: "default" | "compact" | "expanded";
  columns?: 2 | 3 | 4;
}

export function AboutValues({
  className,
  variant = "default",
  columns = 3,
}: AboutValuesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const values: ValueItem[] = [
    {
      icon: CheckCircle,
      title: "Quality",
      description:
        "Writing clean, maintainable, and well-tested code that stands the test of time.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Always learning and adopting new technologies to solve problems creatively.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "Working together to build great products and foster a positive team culture.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Heart,
      title: "User Experience",
      description:
        "Creating intuitive and delightful experiences that users love.",
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Integrity",
      description:
        "Being honest, transparent, and reliable in all professional relationships.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Zap,
      title: "Efficiency",
      description:
        "Optimizing workflows and processes to deliver value quickly and effectively.",
      color: "from-yellow-500 to-amber-500",
    },
  ];

  const gridCols: Record<2 | 3 | 4, string> = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
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
    hidden: { opacity: 0, scale: 0.9, y: 12 },
    visible: {
      opacity: 1,
      scale: 1,
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
            className="flex flex-wrap justify-center gap-3"
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div key={value.title} variants={itemVariants}>
                  <Card className="group transition-all hover:border-primary/50 hover:shadow-md">
                    <CardContent className="flex items-center gap-2 px-4 py-2">
                      <div className="text-primary transition-colors">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-medium">{value.title}</span>
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
      <section className={cn("bg-muted/30 py-16 md:py-20 lg:py-24", className)}>
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
                Values
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
              These are the core values that guide my work and professional
              relationships.
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mx-auto mt-4 h-0.5 w-16 origin-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
            />
          </motion.div>

          {/* Values Grid */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className={cn("grid gap-6", gridCols[columns])}
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div key={value.title} variants={itemVariants}>
                  <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl">
                    <CardContent className="p-6">
                      <div
                        className={cn(
                          "mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r text-white transition-all duration-300",
                          value.color,
                          "group-hover:scale-110 group-hover:shadow-lg"
                        )}
                      >
                        <Icon className="h-7 w-7" />
                      </div>
                      <h4 className="mb-2 text-lg font-bold">{value.title}</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {value.description}
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
    <section className={cn("py-12 md:py-16 lg:py-20", className)}>
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
            My{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Values
            </span>
          </h3>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            These are the core values that guide my work and professional
            relationships.
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto mt-3 h-0.5 w-16 origin-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
          />
        </motion.div>

        {/* Values Grid */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className={cn("grid gap-4 md:gap-6", gridCols[columns])}
        >
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="group h-full transition-all hover:border-primary/50 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div
                      className={cn(
                        "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r text-white transition-all duration-300",
                        value.color,
                        "group-hover:scale-110 group-hover:shadow-md"
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="mb-2 text-base font-semibold md:text-lg">
                      {value.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {value.description}
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