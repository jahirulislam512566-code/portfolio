"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/common/section-heading";
import { FeaturedProjectCard } from "./featured-project-card";
import { projectsData } from "@/data/projects";
import { ArrowRightIcon, FolderIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface FeaturedProjectsProps {
  className?: string;
  limit?: number;
  variant?: 'default' | 'compact' | 'expanded';
  showViewAll?: boolean;
  columns?: 2 | 3 | 4;
}

export function FeaturedProjects({ 
  className, 
  limit = 3,
  variant = 'default',
  showViewAll = true,
  columns = 3
}: FeaturedProjectsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Filter featured projects
  const featuredProjects = projectsData
    .filter(project => project.featured)
    .slice(0, limit);

  // Grid columns configuration
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Section variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      },
    },
  };

  return (
    <section 
      id="featured-projects" 
      className={cn(
        "py-12 md:py-16 lg:py-20",
        variant === 'compact' && "py-8 md:py-12",
        variant === 'expanded' && "py-16 md:py-20 lg:py-24",
        "bg-muted/30",
        className
      )}
      aria-label="Featured Projects"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          {/* Section Heading - ✅ Remove alignment prop */}
          <SectionHeading 
            title="Featured Projects" 
            subtitle="Here are some of the projects I've worked on"
            className="mb-8 md:mb-10 lg:mb-12"
          >
            {showViewAll && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.3 }}
              >
                <Button 
                  variant="outline" 
                  size="lg" 
                  asChild 
                  className="gap-2 group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-md hover:shadow-lg transition-all"
                >
                  <Link href="/projects" className="inline-flex items-center gap-2">
                    View All Projects
                    <ArrowRightIcon size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </SectionHeading>

          {/* Projects Grid */}
          {featuredProjects.length > 0 ? (
            <motion.div
              variants={containerVariants}
              className={cn(
                "grid gap-4 md:gap-6",
                gridCols[columns]
              )}
            >
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        type: "spring" as const



,
                        stiffness: 200,
                        damping: 25,
                        delay: index * 0.1,
                      },
                    },
                  }}
                >
                  <FeaturedProjectCard 
                    project={project} 
                    index={index}
                    variant={variant === 'compact' ? 'compact' : variant === 'expanded' ? 'expanded' : 'default'}
                    showStats={variant !== 'compact'}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // Fallback if no featured projects
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                <FolderIcon size={40} className="text-muted-foreground/50" />
              </div>
              <p className="text-lg font-medium text-foreground">No featured projects yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Check back soon for updates
              </p>
            </motion.div>
          )}

          {/* Show more indicator */}
          {featuredProjects.length > 0 && featuredProjects.length < projectsData.filter(p => p.featured).length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-8 md:mt-10"
            >
              <p className="text-sm text-muted-foreground">
                Showing {featuredProjects.length} of {projectsData.filter(p => p.featured).length} featured projects
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}