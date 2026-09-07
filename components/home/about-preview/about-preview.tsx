"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AboutHighlights } from "./about-highlights";
import { siteConfig } from "@/config/site.config";
import { 
  ArrowRightIcon, 
  DownloadIcon, 
  MailIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon
} from "@/components/icons";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Code2, Layout, Server, Database, Cloud } from "lucide-react";

interface AboutPreviewProps {
  className?: string;
  variant?: "default" | "compact" | "expanded";
  showSocialLinks?: boolean;
  showHighlights?: boolean;
  ctaText?: string;
}

export function AboutPreview({ 
  className,
  variant = "default",
  showSocialLinks = true,
  showHighlights = true,
  ctaText = "Get in Touch"
}: AboutPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  // ✅ Safe access with fallbacks
  const experience = siteConfig.author?.experience || "5";
  const email = siteConfig.author?.email || "";

  // ✅ Social links with fallbacks
  const socialLinks = [
    { icon: GithubIcon, href: siteConfig.social?.github || "", label: "GitHub" },
    { icon: LinkedinIcon, href: siteConfig.social?.linkedin || "", label: "LinkedIn" },
    { icon: TwitterIcon, href: siteConfig.social?.twitter || "", label: "Twitter" },
    { icon: MailIcon, href: email ? `mailto:${email}` : "", label: "Email" },
  ].filter((link) => Boolean(link.href));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring" as const



,
        stiffness: 260,
        damping: 24,
        ease: "easeOut" as const
      },
    },
  };

  const layoutClasses = {
    default: "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start",
    compact: "grid grid-cols-1 lg:grid-cols-2 gap-8 items-center",
    expanded: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start",
  };

  const mainTechnologies = [
    { name: "React", icon: <Code2 className="h-3.5 w-3.5" /> },
    { name: "Laravel", icon: <Server className="h-3.5 w-3.5" /> },
    { name: "Next.js", icon: <Layout className="h-3.5 w-3.5" /> },
    { name: "PostgreSQL", icon: <Database className="h-3.5 w-3.5" /> },
    { name: "AWS", icon: <Cloud className="h-3.5 w-3.5" /> },
  ];

  return (
    <section 
      id="about"
      className={cn(
        "relative py-16 md:py-20 lg:py-24 overflow-hidden",
        className
      )}
      aria-label="About Me"
    >
      {/* ✅ Centered container */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            About{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Me
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-3 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg"
          >
            Get to know me and my journey in tech
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 h-0.5 w-16 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full origin-center"
          />
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className={cn(layoutClasses[variant])}
        >
          {/* Left Column */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
              Who I Am
            </h3>

            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              I&apos;m a Full Stack Developer with {experience}+ years of experience specializing in{" "}
              <span className="text-foreground font-medium">
                Laravel, React, and modern CMS development
              </span>.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              I build scalable dashboards, RESTful APIs, and responsive frontend systems 
              that solve real-world problems. I&apos;m passionate about clean code, performance 
              optimization, and creating seamless user experiences.
            </p>

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-sm text-muted-foreground mr-1">Stack:</span>
              {mainTechnologies.map((tech) => (
                <span 
                  key={tech.name}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                >
                  {tech.icon}
                  {tech.name}
                </span>
              ))}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 pt-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-sm text-muted-foreground">
                Available for freelance projects
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Button 
                asChild 
                size="lg" 
                className="gap-2 group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-md hover:shadow-lg transition-all"
              >
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2"
                >
                  <span className="leading-none">{ctaText}</span>
                  <ArrowRightIcon 
                    size={16} 
                    className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" 
                  />
                </Link>
              </Button>

              <Button variant="outline" size="lg" asChild className="group border-2">
                <Link 
                  href="/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <DownloadIcon 
                    size={16} 
                    className="shrink-0 transition-transform duration-200 group-hover:translate-y-0.5" 
                  />
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-medium leading-none">
                    Resume
                  </span>
                </Link>
              </Button>
            </div>

            {/* Social Links */}
            {showSocialLinks && socialLinks.length > 0 && (
              <div className="flex items-center gap-3 pt-2">
                <span className="text-sm text-muted-foreground">Connect:</span>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href || "#"}
                    target={social.label === "Email" ? undefined : "_blank"}
                    rel={social.label === "Email" ? undefined : "noopener noreferrer"}
                    className="p-2 rounded-full hover:bg-accent transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right Column - Highlights */}
          {showHighlights && (
            <motion.div variants={itemVariants} className="w-full">
              <AboutHighlights 
                columns={2}
                variant={variant === "compact" ? "minimal" : "default"}
                showDescriptions={variant !== "compact"}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}