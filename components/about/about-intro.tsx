"use client";

import { motion, Variants } from "framer-motion";
import { AnimatedBorder } from "@/components/common/animated-border";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  User, 
  ArrowRight, 
  MapPin, 
  Briefcase, 
  Award,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";
import Image from "next/image";

// ✅ Custom SVG Icons
const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

interface AboutIntroProps {
  className?: string;
  showLocation?: boolean;
  showExperience?: boolean;
  showSocialLinks?: boolean;
}

// ✅ Animation variants with proper ease typing
const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    },
  },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      delay: 0.15,
      ease: "easeOut"
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const tagVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    },
  },
};

export function AboutIntro({ 
  className,
  showLocation = true,
  showExperience = true,
  showSocialLinks = false,
}: AboutIntroProps) {
  const author = siteConfig.author;
  
  const experience = author?.experience ?? 5;
  const skills = author?.skills ?? [];
  const bio = author?.bio ?? "";
  const name = author?.name ?? "Developer";
  const role = author?.role ?? "";
  const avatar = author?.avatar;
  const location = author?.location ?? "";
  const email = author?.email ?? "";
  const socials = author?.socials ?? {};

  const experienceYears = typeof experience === "number" 
    ? experience 
    : parseInt(String(experience)) || 5;

  // ✅ Info items
  const infoItems = [
    { icon: Briefcase, label: "Experience", value: `${experienceYears}+ Years` },
    { icon: MapPin, label: "Location", value: location },
    { icon: Award, label: "Projects", value: "50+" },
  ].filter(item => item.value);

  // ✅ FIXED: Define social links with proper types
  interface SocialLink {
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    label: string;
    color: string;
  }

  // ✅ FIXED: Build social links with fallback values
  const socialLinks: SocialLink[] = [];
  
  if (socials.github) {
    socialLinks.push({
      icon: GithubIcon,
      href: socials.github,
      label: "GitHub",
      color: "hover:text-[#333] dark:hover:text-white"
    });
  }
  
  if (socials.linkedin) {
    socialLinks.push({
      icon: LinkedinIcon,
      href: socials.linkedin,
      label: "LinkedIn",
      color: "hover:text-[#0A66C2]"
    });
  }
  
  if (email) {
    socialLinks.push({
      icon: Mail,
      href: `mailto:${email}`,
      label: "Email",
      color: "hover:text-[#EA4335]"
    });
  }

  // ✅ FIXED: Get avatar URL with fallback - ensures src is never undefined
  const getAvatarUrl = (): string => {
    if (typeof avatar === 'string' && avatar.trim() !== '') {
      return avatar;
    }
    return '/default-avatar.jpg';
  };

  return (
    <section
      id="about"
      className={cn("bg-muted/30 py-16 md:py-20 lg:py-24", className)}
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Image */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex justify-center lg:justify-start"
          >
            <AnimatedBorder>
              <div className="relative h-64 w-64 overflow-hidden rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 md:h-80 md:w-80">
                {avatar ? (
                  <Image
                    src={getAvatarUrl()}
                    alt={`Photo of ${name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 256px, 320px"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <User className="mb-3 h-20 w-20 text-muted-foreground/40" />
                    <p className="text-sm text-muted-foreground">{name}</p>
                  </div>
                )}
              </div>
            </AnimatedBorder>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <h2 id="about-heading" className="text-2xl font-bold tracking-tight md:text-3xl">
                Who I Am
              </h2>
              {role && (
                <p className="mt-1 text-sm font-medium text-purple-600 dark:text-purple-400">
                  {role}
                </p>
              )}
            </div>

            {/* Bio */}
            {bio && (
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {bio}
              </p>
            )}

            <p className="leading-relaxed text-muted-foreground">
              I&apos;m passionate about creating beautiful, performant, and
              user-friendly applications that solve real-world problems. With{" "}
              {experienceYears}+ years of experience, I&apos;ve worked on a wide range
              of projects from e-commerce platforms to AI-powered applications.
            </p>

            {/* Info Items */}
            {showLocation && infoItems.some(item => item.value) && (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-3 sm:grid-cols-3"
              >
                {infoItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      variants={tagVariants}
                      className="flex items-center gap-2 rounded-lg bg-background/50 px-3 py-2 text-sm"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{item.value}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Tech Stack Tags */}
            {skills.length > 0 && (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2 pt-1"
              >
                {skills.slice(0, 8).map((skill) => (
                  <motion.span
                    key={skill}
                    variants={tagVariants}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {skill}
                  </motion.span>
                ))}
                {skills.length > 8 && (
                  <motion.span
                    variants={tagVariants}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    +{skills.length - 8} more
                  </motion.span>
                )}
              </motion.div>
            )}

            {/* Social Links with Custom Icons */}
            {showSocialLinks && socialLinks.length > 0 && (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex gap-3"
              >
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.label}
                      variants={tagVariants}
                    >
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full",
                          "bg-muted text-muted-foreground",
                          "transition-all duration-300",
                          "hover:scale-110 hover:shadow-md",
                          link.color
                        )}
                        aria-label={link.label}
                      >
                        <Icon className="h-5 w-5" />
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Button
                asChild
                size="lg"
                className={cn(
                  "group gap-2 border-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md",
                  "transition-all duration-300",
                  "hover:from-purple-700 hover:to-pink-700 hover:shadow-lg"
                )}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2"
                >
                  <span className="leading-none">Get in Touch</span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="group gap-2 border-2 hover:border-primary/50"
              >
                <Link
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Download className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-medium text-transparent">
                    Resume
                  </span>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}