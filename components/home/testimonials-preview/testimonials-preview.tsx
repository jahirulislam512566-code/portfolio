// components/testimonials/testimonials-preview.tsx
"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/common/section-heading";
import { testimonialsData } from "@/data/testimonials";
import { Star, Quote, ArrowRight, CheckCircle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import Image from "next/image";

// ✅ Import Testimonial type
import { Testimonial } from "@/types/testimonial";

interface TestimonialsPreviewProps {
  className?: string;
  limit?: number;
  variant?: "default" | "compact" | "expanded";
  showViewAll?: boolean;
  showRating?: boolean;
  columns?: 2 | 3 | 4;
  autoplay?: boolean;
  autoplaySpeed?: number;
}

// ✅ Animation variants with proper typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,

      stiffness: 200,
      damping: 25,
    },
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 60px -12px rgba(0,0,0,0.15)",
    transition: { duration: 0.3 },
  },
};

const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
      delay: 0.3,
    },
  },
};

export function TestimonialsPreview({ 
  className, 
  limit = 3,
  variant = "default",
  showViewAll = true,
  showRating = true,
  columns = 3,
  autoplay = false,
  autoplaySpeed = 5000,
}: TestimonialsPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);

  const displayedTestimonials = testimonialsData
    .filter(t => t.isFeatured)
    .slice(0, limit);

  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4 transition-colors",
          i < rating 
            ? "fill-yellow-400 text-yellow-400" 
            : "text-muted-foreground/30 fill-muted-foreground/30"
        )}
      />
    ));
  };

  // ✅ Compact variant
  if (variant === "compact") {
    return (
      <section id="testimonials" className={cn("py-8 md:py-12", className)}>
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading 
            title="Testimonials" 
            subtitle="What people say"
            className="mb-6"
          />

          <motion.div
            ref={ref}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className={cn("grid gap-4", gridCols[Math.min(columns, 3) as 2 | 3])}
          >
            {displayedTestimonials.slice(0, 4).map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={cardVariants}
                whileHover="hover"
                className="h-full"
              >
                <Card className="h-full hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center shrink-0">
                        {testimonial.authorImage ? (
                          <Image
                            src={testimonial.authorImage}
                            alt={testimonial.author}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-xs font-semibold text-muted-foreground">
                            {getInitials(testimonial.author)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{testimonial.author}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {testimonial.authorCompany}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      &quot;{testimonial.content}&quot;
                    </p>
                    {showRating && testimonial.rating && (
                      <div className="flex gap-0.5 mt-2">
                        {renderStars(testimonial.rating)}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  // ✅ Expanded variant
  if (variant === "expanded") {
    return (
      <section id="testimonials" className={cn("py-16 md:py-20 lg:py-24", className)}>
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading 
            title="Testimonials" 
            subtitle="What people say about working with me"
            className="mb-12"
          >
            {showViewAll && (
              <motion.div
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Button variant="outline" size="lg" asChild className="gap-2 group mt-4">
                  <Link href="/testimonials">
                    View All Testimonials
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </SectionHeading>

          <motion.div
            ref={ref}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className={cn("grid gap-6", gridCols[columns])}
          >
            {displayedTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={cardVariants}
                whileHover="hover"
                className="h-full"
              >
                <Card className="h-full overflow-hidden hover:border-primary/50 transition-all duration-300 group">
                  <CardContent className="p-6 relative">
                    <div className="absolute top-4 right-4 text-primary/10">
                      <Quote className="h-12 w-12" />
                    </div>

                    {showRating && testimonial.rating && (
                      <div className="flex gap-0.5 mb-4">
                        {renderStars(testimonial.rating)}
                      </div>
                    )}

                    <p className="text-muted-foreground leading-relaxed text-base">
                      &quot;{testimonial.content}&quot;
                    </p>

                    <div className="mt-6 flex items-center gap-4 pt-4 border-t border-border/50">
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center shrink-0 ring-2 ring-primary/10">
                        {testimonial.authorImage ? (
                          <Image
                            src={testimonial.authorImage}
                            alt={testimonial.author}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-semibold text-muted-foreground">
                            {getInitials(testimonial.author)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{testimonial.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.authorTitle}, {testimonial.authorCompany}
                        </p>
                      </div>
                      {testimonial.isVerified && (
                        <div className="shrink-0">
                          <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span className="text-[10px] text-green-500 font-medium">Verified</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {testimonial.projectLink && (
                      <div className="mt-3 pt-3 border-t border-border/30">
                        <Link 
                          href={testimonial.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View Project
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  // ✅ Default variant
  return (
    <section id="testimonials" className={cn("py-12 md:py-16 lg:py-20", className)}>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading 
          title="Testimonials" 
          subtitle="What people say about working with me"
          className="mb-8 md:mb-10 lg:mb-12"
        >
          {showViewAll && (
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Button
                variant="outline"
                asChild
                className="mt-4 gap-2 group"
              >
                <Link 
                  href="/testimonials"
                  className="inline-flex items-center gap-2"
                >
                  <span className="leading-none bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">
                    View All Testimonials
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-purple-600 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          )}
        </SectionHeading>

        <motion.div
          ref={ref}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className={cn("grid gap-4 md:gap-6", gridCols[columns])}
        >
          {displayedTestimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover="hover"
              className="h-full"
            >
              <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50 relative group">
                <div className="absolute top-4 right-4 text-primary/10 group-hover:text-primary/20 transition-colors">
                  <Quote className="h-8 w-8" />
                </div>

                <CardContent className="p-6">
                  {showRating && testimonial.rating && (
                    <div className="flex gap-0.5 mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                  )}

                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    &quot;{testimonial.content}&quot;
                  </p>

                  <div className="mt-6 flex items-center gap-3 pt-4 border-t border-border/50">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center shrink-0">
                      {testimonial.authorImage ? (
                        <Image
                          src={testimonial.authorImage}
                          alt={testimonial.author}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-xs font-semibold text-muted-foreground">
                          {getInitials(testimonial.author)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {testimonial.authorTitle}, {testimonial.authorCompany}
                      </p>
                    </div>
                    {testimonial.isVerified && (
                      <div className="shrink-0">
                        <div className="h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center">
                          <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}