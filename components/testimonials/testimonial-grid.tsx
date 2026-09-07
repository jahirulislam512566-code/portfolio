"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TestimonialCard } from "./testimonial-card";
import { Button } from "@/components/ui/button";
import { Testimonial } from "@/types/testimonial";
import { testimonialsData } from "@/data/testimonials";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Quote } from "lucide-react"; // ← Add Quote here

interface TestimonialGridProps {
  className?: string;
  limit?: number;
  showFeatured?: boolean;
  showLoadMore?: boolean;
}

export function TestimonialGrid({ 
  className, 
  limit = 6,
  showFeatured = true,
  showLoadMore = true
}: TestimonialGridProps) {
  const [showAll, setShowAll] = useState(false);

  // Filter featured testimonials if requested
  let testimonials = showFeatured 
    ? testimonialsData.filter(t => t.isFeatured)
    : testimonialsData;

  // If no featured testimonials, show all
  if (testimonials.length === 0) {
    testimonials = testimonialsData;
  }

  const displayedTestimonials = showAll 
    ? testimonials 
    : testimonials.slice(0, limit);

  const hasMore = testimonials.length > limit;

  return (
    <div className={cn("space-y-8", className)}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="wait">
          {displayedTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              variant={testimonial.isFeatured ? "featured" : "default"}
            />
          ))}
        </AnimatePresence>
      </div>

      {showLoadMore && hasMore && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="gap-2"
          >
            {showAll ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Load More ({testimonials.length - limit} more)
              </>
            )}
          </Button>
        </div>
      )}

      {displayedTestimonials.length === 0 && (
        <div className="text-center py-12">
          <Quote className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">No testimonials yet</p>
        </div>
      )}
    </div>
  );
}