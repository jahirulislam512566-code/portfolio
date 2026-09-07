"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Mail,
  Rocket,
  Send,
 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GradientText } from "@/components/common/gradient-text";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site.config";

interface CTAProps {
  className?: string;
  variant?: "default" | "minimal" | "gradient" | "glass";
  size?: "default" | "compact" | "expanded";
  showSocial?: boolean;
  showStats?: boolean;
}

export function CTA({
  className,
  variant = "default",
  size = "default",
  showSocial = true,
  showStats = true,
}: CTAProps) {
  const variantStyles = {
    default:
      "bg-card border-border/60",
    minimal:
      "bg-transparent border-border/50",
    gradient:
      "bg-gradient-to-br from-purple-500/[0.08] via-background to-pink-500/[0.08] border-primary/20",
    glass:
      "bg-background/70 backdrop-blur-xl border-border/50 shadow-xl",
  };

  const sizeStyles = {
    compact: {
      section: "py-10 md:py-12",
      card: "p-6 md:p-8",
      icon: "h-12 w-12",
      iconSize: "h-6 w-6",
      title: "text-2xl md:text-3xl",
      subtitle: "text-lg md:text-xl",
      description: "text-sm md:text-base",
    },

    default: {
      section: "py-12 md:py-16",
      card: "p-7 sm:p-8 md:p-12",
      icon: "h-14 w-14 md:h-16 md:w-16",
      iconSize: "h-7 w-7 md:h-8 md:w-8",
      title: "text-3xl sm:text-4xl",
      subtitle: "text-xl md:text-2xl",
      description: "text-base md:text-lg",
    },

    expanded: {
      section: "py-14 md:py-20",
      card: "p-8 md:p-16",
      icon: "h-16 w-16 md:h-20 md:w-20",
      iconSize: "h-8 w-8 md:h-10 md:w-10",
      title: "text-3xl sm:text-4xl md:text-5xl",
      subtitle: "text-xl md:text-2xl",
      description: "text-base md:text-lg",
    },
  };

  const currentSize = sizeStyles[size];

  const stats = [
    {
      value: "50+",
      label: "Projects Delivered",
    },
    {
      value: "30+",
      label: "Happy Clients",
    },
    {
      value: "98%",
      label: "Satisfaction Rate",
    },
  ];

  const email =
    siteConfig.contact?.email ||
    siteConfig.author?.email ||
    "hello@example.com";

  const calendar = siteConfig.contact?.calendar;

  const github = siteConfig.social?.github;
  const linkedin = siteConfig.social?.linkedin;
  const twitter = siteConfig.social?.twitter;

  return (
    <section
      id="cta"
      className={cn(
        "relative w-full overflow-hidden",
        currentSize.section,
        className
      )}
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut" as const

,
          }}
          className="w-full"
        >
          <Card
            className={cn(
              "relative w-full overflow-hidden border shadow-sm transition-shadow duration-300 hover:shadow-lg",
              variantStyles[variant]
            )}
          >
            <CardContent className={cn("relative", currentSize.card)}>
              <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                {/* Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1,
                  }}
                  className={cn(
                    "mb-5 flex items-center justify-center rounded-full",
                    "bg-gradient-to-r from-purple-600 to-pink-600",
                    "text-white shadow-md",
                    currentSize.icon
                  )}
                >
                  <Rocket
                    className={currentSize.iconSize}
                    aria-hidden="true"
                  />
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.15,
                  }}
                  className={cn(
                    "font-bold tracking-tight",
                    "bg-gradient-to-r from-purple-600 to-pink-600",
                    "bg-clip-text text-transparent",
                    currentSize.title
                  )}
                >
                  Let&apos;s Work Together
                </motion.h2>

                {/* Subtitle */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2,
                  }}
                  className="mt-2"
                >
                  <GradientText
                    className={cn(
                      "font-semibold",
                      currentSize.subtitle
                    )}
                  >
                    Have a project in mind?
                  </GradientText>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.25,
                  }}
                  className={cn(
                    "mx-auto mt-4 max-w-2xl leading-relaxed text-muted-foreground",
                    currentSize.description
                  )}
                >
                  I&apos;m always open to new opportunities, collaborations,
                  and interesting projects. Let&apos;s build something
                  amazing together.
                </motion.p>

                {/* Stats */}
                {showStats && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3,
                    }}
                    className="mt-7 grid w-full max-w-lg grid-cols-3 gap-3 sm:gap-6"
                  >
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-lg px-2 py-2"
                      >
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                          {stat.value}
                        </div>

                        <div className="mt-1 text-[10px] leading-tight text-muted-foreground sm:text-xs">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.35,
                  }}
                  className="mt-7 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row"
                >
                 <Button
                      size={size === "compact" ? "default" : "lg"}
                      asChild
                      className={cn(
                        "w-full gap-2 sm:w-auto",
                        "bg-gradient-to-r from-purple-600 to-pink-600",
                        "text-white",
                        "shadow-md",
                        "transition-all duration-300",
                        "hover:from-purple-700 hover:to-pink-700",
                        "hover:shadow-lg"
                      )}
                    >
                      <Link 
                        href="/contact"
                        className="inline-flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span className="leading-none">Get in Touch</span>
                        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                      </Link>
                    </Button>

                  {github ? (
                    <Button
                      size={size === "compact" ? "default" : "lg"}
                      variant="outline"
                      asChild
                      className="w-full gap-2 sm:w-auto"
                    >
                      <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {/* <Github
                          className="h-4 w-4"
                          aria-hidden="true"
                        /> */}

                        <span>View GitHub</span>
                      </a>
                    </Button>
                  ) : (
                    <Button
                      size={size === "compact" ? "default" : "lg"}
                      variant="outline"
                      asChild
                      className="w-full gap-2 sm:w-auto"
                    >
                      <Link href="/contact">
                        <Send
                          className="h-4 w-4"
                          aria-hidden="true"
                        />

                        <span>Let&apos;s Connect</span>
                      </Link>
                    </Button>
                  )}
                </motion.div>

                {/* Contact links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.4,
                  }}
                  className="mt-6 flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-6"
                >
                  {/* Email */}
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 transition-colors hover:text-primary"
                  >
                    <Mail
                      className="h-4 w-4"
                      aria-hidden="true"
                    />

                    <span>{email}</span>
                  </a>

                  {/* Calendar */}
                  {calendar && (
                    <>
                      <span className="hidden sm:inline">
                        •
                      </span>

                      <a
                        href={calendar}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 transition-colors hover:text-primary"
                      >
                        <Calendar
                          className="h-4 w-4"
                          aria-hidden="true"
                        />

                        <span>Book a Call</span>
                      </a>
                    </>
                  )}

                  {/* Social */}
                  {showSocial &&
                    (github || linkedin || twitter) && (
                      <>
                        <span className="hidden sm:inline">
                          •
                        </span>

                        <div className="flex items-center gap-3">
                          {github && (
                            <a
                              href={github}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="GitHub"
                              className="transition-colors hover:text-primary"
                            >
                              {/* <Github className="h-4 w-4" /> */}
                            </a>
                          )}

                          {linkedin && (
                            <a
                              href={linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="LinkedIn"
                              className="transition-colors hover:text-primary"
                            >
                              {/* <Linkedin className="h-4 w-4" /> */}
                            </a>
                          )}

                          {twitter && (
                            <a
                              href={twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Twitter"
                              className="transition-colors hover:text-primary"
                            >
                              {/* <Twitter className="h-4 w-4" /> */}
                            </a>
                          )}
                        </div>
                      </>
                    )}
                </motion.div>

                {/* Availability */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.45,
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-600 dark:text-green-400"
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