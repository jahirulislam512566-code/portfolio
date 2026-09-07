"use client";

import { motion, useInView, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Code2,
  PenTool,
  Users,
  Coffee,
  Camera,
  Plane,
  Gamepad2,
  Headphones,
  BookOpen,
  Heart,
  Music,
  Bike,
  Palette,
} from "lucide-react";
import { aboutData } from "@/data/about";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { ReactNode } from "react";

interface AboutInterestsProps {
  className?: string;
  variant?: "default" | "compact" | "expanded";
}

export function AboutInterests({
  className,
  variant = "default",
}: AboutInterestsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const interests: string[] = aboutData.interests ?? [
    "Open Source Contributions",
    "Technical Writing",
    "Hackathons",
    "Mentoring",
    "Podcasts",
    "Photography",
    "Traveling",
    "Gaming",
  ];

  const iconMap: Record<string, ReactNode> = {
    "Open Source Contributions": <Code2 className="h-5 w-5" />,
    "Technical Writing": <PenTool className="h-5 w-5" />,
    Hackathons: <Users className="h-5 w-5" />,
    Mentoring: <Users className="h-5 w-5" />,
    Podcasts: <Headphones className="h-5 w-5" />,
    Photography: <Camera className="h-5 w-5" />,
    Traveling: <Plane className="h-5 w-5" />,
    Gaming: <Gamepad2 className="h-5 w-5" />,
    Reading: <BookOpen className="h-5 w-5" />,
    Music: <Music className="h-5 w-5" />,
    Cycling: <Bike className="h-5 w-5" />,
    Design: <Palette className="h-5 w-5" />,
  };

  const getIcon = (interest: string, size: "sm" | "md" = "md") => {
    const icon = iconMap[interest] ?? <Coffee className="h-5 w-5" />;
    if (size === "sm") {
      return iconMap[interest] ?? <Coffee className="h-4 w-4" />;
    }
    return icon;
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.85, y: 10 },
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
            className="flex flex-wrap justify-center gap-2"
          >
            {interests.slice(0, 6).map((interest) => (
              <motion.div key={interest} variants={itemVariants}>
                <Card className="group transition-all hover:border-primary/50 hover:shadow-md">
                  <CardContent className="flex items-center gap-1.5 px-3 py-1.5">
                    <span className="text-primary transition-colors group-hover:text-primary">
                      {getIcon(interest, "sm")}
                    </span>
                    <span className="text-xs font-medium">{interest}</span>
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
              Beyond the{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Code
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
              When I&apos;m not coding, here are some of the things I enjoy doing.
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mx-auto mt-4 h-0.5 w-16 origin-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
            />
          </motion.div>

          {/* Grid */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
          >
            {interests.map((interest) => (
              <motion.div key={interest} variants={itemVariants}>
                <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl">
                  <CardContent className="p-6 text-center">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600/10 to-pink-600/10 text-purple-600 transition-all duration-300 group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white">
                      {getIcon(interest)}
                    </div>
                    <h4 className="text-sm font-medium">{interest}</h4>
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
            Beyond the{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Code
            </span>
          </h3>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            When I&apos;m not coding, here are some of the things I enjoy doing.
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto mt-3 h-0.5 w-16 origin-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
          />
        </motion.div>

        {/* Interest chips */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-3"
        >
          {interests.map((interest) => (
            <motion.div
              key={interest}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Card className="group transition-all hover:border-primary/50 hover:shadow-lg">
                <CardContent className="flex items-center gap-3 px-4 py-3">
                  <div className="rounded-full bg-primary/10 p-1.5 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    {getIcon(interest)}
                  </div>
                  <span className="text-sm font-medium transition-colors group-hover:text-primary">
                    {interest}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground/70">
            <Heart className="h-3.5 w-3.5 text-rose-500" />
            Always curious, always learning
          </span>
        </motion.div>
      </div>
    </section>
  );
}