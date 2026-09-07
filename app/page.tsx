"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/common/error-state";
import { BackToTop } from "@/components/layout";
import { cn } from "@/lib/utils";

// Direct imports — don't lazy load every homepage section.
import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { AboutPreview } from "@/components/home/about-preview";
import { SkillsPreview } from "@/components/home/skills-preview";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ServicesPreview } from "@/components/home/services-preview";
import { ExperiencePreview } from "@/components/home/experience-preview";
import { TestimonialsPreview } from "@/components/home/testimonials-preview";
import { BlogPreview } from "@/components/home/blog-preview";
import { CTA } from "@/components/home/cta";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 250);

    return () => window.clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-background">
      <ScrollProgress />

      {/* Accessibility */}
      <a
        href="#main-content"
        className={cn(
          "sr-only",
          "focus:not-sr-only focus:fixed",
          "focus:left-4 focus:top-4",
          "focus:z-[100]",
          "focus:rounded-md",
          "focus:bg-primary",
          "focus:px-4 focus:py-2",
          "focus:text-primary-foreground"
        )}
      >
        Skip to main content
      </a>

      <main
        id="main-content"
        className="w-full min-w-0"
      >
        {/* Hero */}
        <HomeSection>
          <Hero />
        </HomeSection>

        {/* About */}
        <HomeSection>
          <AboutPreview className="w-full" />
        </HomeSection>

        {/* Stats */}
        <HomeSection className="bg-muted/30">
          <Stats />
        </HomeSection>

        {/* Skills */}
        <HomeSection className="bg-muted/30">
          <SkillsPreview className="w-full" />
        </HomeSection>

        {/* Featured Projects */}
        <HomeSection>
          <FeaturedProjects className="w-full" />
        </HomeSection>

        {/* Services */}
        <HomeSection className="bg-muted/30">
          <ServicesPreview className="w-full" />
        </HomeSection>

        {/* Experience */}
        <HomeSection>
          <ExperiencePreview
            className="w-full"
            limit={2}
            variant="default"
            showViewAll
            showTechnologies
            showAchievements
          />
        </HomeSection>

        {/* Testimonials */}
        <HomeSection className="bg-muted/30">
          <TestimonialsPreview className="w-full" />
        </HomeSection>

        {/* Blog */}
        <HomeSection>
          <BlogPreview className="w-full" />
        </HomeSection>

        {/* CTA */}
        <HomeSection className="bg-muted/30">
          <CTA className="w-full" />
        </HomeSection>
      </main>

      <BackToTop />

      <FloatingActions />
    </div>
  );
}

/* ============================================================
   HOME SECTION
============================================================ */

interface HomeSectionProps {
  children: React.ReactNode;
  className?: string;
}

function HomeSection({
  children,
  className,
}: HomeSectionProps) {
  return (
    <section
      className={cn(
        "relative w-full min-w-0",
        className
      )}
    >
      {children}
    </section>
  );
}

/* ============================================================
   PAGE LOADER
============================================================ */

function PageLoader() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Loader2
            className="h-10 w-10 text-primary"
            aria-hidden="true"
          />
        </motion.div>

        <p className="text-sm text-muted-foreground">
          Loading portfolio...
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   SCROLL PROGRESS
============================================================ */

function ScrollProgress() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const documentElement = document.documentElement;

        const scrollTop =
          window.scrollY ||
          documentElement.scrollTop;

        const scrollHeight =
          documentElement.scrollHeight -
          window.innerHeight;

        const percentage =
          scrollHeight > 0
            ? (scrollTop / scrollHeight) * 100
            : 0;

        setScroll(
          Math.min(
            100,
            Math.max(0, percentage)
          )
        );

        ticking = false;
      });
    };

    updateScroll();

    window.addEventListener(
      "scroll",
      updateScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateScroll
      );

      window.removeEventListener(
        "resize",
        updateScroll
      );
    };
  }, []);

  return (
    <div
      className="
        pointer-events-none
        fixed
        left-0
        top-0
        z-[100]
        h-1
        w-full
        bg-transparent
      "
      aria-hidden="true"
    >
      <motion.div
        className="
          h-full
          bg-gradient-to-r
          from-purple-600
          via-pink-600
          to-purple-600
        "
        style={{
          width: `${scroll}%`,
        }}
      />
    </div>
  );
}

/* ============================================================
   FLOATING ACTIONS
============================================================ */

function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
          }}
          transition={{
            duration: 0.2,
          }}
          className="
            fixed
            bottom-24
            right-4
            z-40
            flex
            flex-col
            gap-2
            md:right-6
          "
        >
          {/* Contact */}
          <Button
            size="icon"
            variant="outline"
            className="
              rounded-full
              bg-background/90
              shadow-lg
              backdrop-blur
              transition-transform
              hover:scale-105
            "
            asChild
          >
            <Link
              href="/contact"
              aria-label="Contact"
            >
              <Mail
                className="h-4 w-4"
                aria-hidden="true"
              />
            </Link>
          </Button>

          {/* Projects */}
          <Button
            size="icon"
            variant="outline"
            className="
              rounded-full
              bg-background/90
              shadow-lg
              backdrop-blur
              transition-transform
              hover:scale-105
            "
            asChild
          >
            <Link
              href="/projects"
              aria-label="Projects"
            >
              <Sparkles
                className="h-4 w-4"
                aria-hidden="true"
              />
            </Link>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}