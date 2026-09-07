"use client";

import { motion, useInView, Variants } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GradientText } from "@/components/common/gradient-text";
import {
  Mail,
  ArrowRight,
  Rocket,
  MessageSquare,
  Calendar,
  Send,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

interface AboutCTAProps {
  className?: string;
  variant?: "default" | "gradient" | "glass";
  size?: "default" | "compact" | "expanded";
}

export function AboutCTA({
  className,
  variant = "gradient",
  size = "default",
}: AboutCTAProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [isHovered, setIsHovered] = useState(false);

  // Variant styles
  const variantStyles: Record<NonNullable<AboutCTAProps["variant"]>, string> = {
    default: "bg-muted/30 border-border/50 hover:border-primary/30",
    gradient:
      "bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 border-primary/20 hover:border-primary/40",
    glass:
      "bg-background/40 backdrop-blur-md border-white/10 shadow-xl hover:border-primary/30",
  };

  // Size styles
  const sizeStyles = {
    compact: {
      padding: "p-6 md:p-8",
      title: "text-2xl md:text-3xl",
      description: "text-base",
      iconWrapper: "h-12 w-12",
      icon: "h-6 w-6",
    },
    default: {
      padding: "p-8 md:p-12",
      title: "text-3xl md:text-4xl",
      description: "text-lg",
      iconWrapper: "h-16 w-16",
      icon: "h-8 w-8",
    },
    expanded: {
      padding: "p-10 md:p-16",
      title: "text-4xl md:text-5xl",
      description: "text-xl",
      iconWrapper: "h-20 w-20",
      icon: "h-10 w-10",
    },
  } as const;

  const currentSize = sizeStyles[size];

  // Animation variants (properly typed)
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const

,
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const iconVariants: Variants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const



,
        stiffness: 200,
        damping: 22,
        delay: 0.25,
      },
    },
  };

  // Safe data extraction
  const email =
    siteConfig.contact?.email ||
    siteConfig.author?.email ||
    "hello@example.com";

  const calendarLink = siteConfig.contact?.calendar || "#";
  const githubLink = siteConfig.social?.github || "#";

  const socialLinks = [
    { label: "GitHub", href: siteConfig.social?.github },
    { label: "LinkedIn", href: siteConfig.social?.linkedin },
    { label: "Twitter", href: siteConfig.social?.twitter },
  ].filter((link): link is { label: string; href: string } =>
    Boolean(link.href)
  );

  return (
    <section
      id="about-cta"
      className={cn("py-12 md:py-16 lg:py-20", className)}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <Card
            className={cn(
              "relative overflow-hidden border-2 transition-all duration-500 hover:shadow-2xl",
              variantStyles[variant]
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Decorative blurs */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-3xl" />

            {/* Floating sparkles */}
            <motion.div
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.1, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" as const

,
              }}
              className="absolute right-5 top-5 text-purple-500/40"
            >
              <Sparkles className="h-4 w-4" />
            </motion.div>

            <CardContent className={cn("relative z-10", currentSize.padding)}>
              <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                {/* Icon */}
                <motion.div variants={iconVariants} className="mb-6">
                  <div
                    className={cn(
                      "inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md transition-all duration-300",
                      currentSize.iconWrapper,
                      isHovered && "scale-110 shadow-lg"
                    )}
                  >
                    <Rocket className={currentSize.icon} />
                  </div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  variants={itemVariants}
                  className={cn(
                    "mb-3 font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent",
                    currentSize.title
                  )}
                >
                  Ready to Work Together?
                </motion.h2>

                <motion.div variants={itemVariants} className="mb-4">
                  <GradientText
                    className={cn(
                      "font-semibold",
                      size === "compact"
                        ? "text-lg md:text-xl"
                        : "text-xl md:text-2xl"
                    )}
                  >
                    Let&apos;s Build Something Amazing
                  </GradientText>
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  className={cn(
                    "mb-8 max-w-2xl text-muted-foreground",
                    currentSize.description
                  )}
                >
                  Whether you have a project in mind, want to collaborate, or
                  just want to say hello — I&apos;d love to hear from you.
                  Let&apos;s create something great together.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap justify-center gap-4"
                >
                  <Button
                    size={size === "compact" ? "default" : "lg"}
                    asChild
                    className={cn(
                      "gap-2 border-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md",
                      "transition-all duration-300",
                      "hover:from-purple-700 hover:to-pink-700 hover:shadow-lg"
                    )}
                  >
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4 shrink-0" />
                      <span className="leading-none">Get in Touch</span>
                      <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>

                  <Button
                    size={size === "compact" ? "default" : "lg"}
                    variant="outline"
                    asChild
                    className="gap-2 border-2 hover:border-primary/50"
                  >
                    <Link
                      href={githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <MessageSquare className="h-4 w-4 shrink-0" />
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-medium text-transparent">
                        Connect on GitHub
                      </span>
                    </Link>
                  </Button>
                </motion.div>

                {/* Quick Contact Info */}
                <motion.div
                  variants={itemVariants}
                  className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
                >
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                  >
                    <Mail className="h-4 w-4" />
                    {email}
                  </a>

                  <span className="hidden text-border sm:inline">•</span>

                  <a
                    href={calendarLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                  >
                    <Calendar className="h-4 w-4" />
                    Schedule a Call
                  </a>

                  {socialLinks.length > 0 && (
                    <>
                      <span className="hidden text-border sm:inline">•</span>
                      <div className="inline-flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        <div className="flex items-center gap-2">
                          {socialLinks.map((link) => (
                            <a
                              key={link.label}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="transition-colors hover:text-primary"
                              aria-label={link.label}
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>

                {/* Availability Badge */}
                <motion.div
                  variants={itemVariants}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-600 dark:text-green-400"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  Available for freelance work
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}