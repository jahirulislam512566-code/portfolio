"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TestimonialCard } from "./testimonial-card";
import { Button } from "@/components/ui/button";
import { Testimonial } from "@/types/testimonial";
import { testimonialsData } from "@/data/testimonials";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Dot } from "lucide-react";

interface TestimonialSliderProps {
  className?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  itemsPerView?: number;
}

export function TestimonialSlider({
  className,
  autoplay = true,
  autoplayInterval = 5000,
  showDots = true,
  showArrows = true,
  itemsPerView = 1,
}: TestimonialSliderProps) {
  const testimonials = testimonialsData.filter(t => t.isFeatured);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalItems = testimonials.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  // Autoplay
  useEffect(() => {
    if (autoplay && !isPaused && totalItems > itemsPerView) {
      const interval = setInterval(nextSlide, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [autoplay, isPaused, nextSlide, autoplayInterval, totalItems, itemsPerView]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  if (totalItems === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No featured testimonials available</p>
      </div>
    );
  }

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  return (
    <div 
      className={cn("relative", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "grid gap-6",
              itemsPerView === 1 && "grid-cols-1 max-w-2xl mx-auto",
              itemsPerView === 2 && "grid-cols-1 md:grid-cols-2",
              itemsPerView === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            )}
          >
            {visibleTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
                variant="featured"
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalItems > itemsPerView && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg hover:scale-110 transition-transform"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg hover:scale-110 transition-transform"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Dots */}
      {showDots && totalItems > itemsPerView && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(totalItems / itemsPerView) }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index * itemsPerView)}
              className={cn(
                "transition-all duration-300 rounded-full",
                currentIndex === index * itemsPerView
                  ? "w-8 h-2 bg-primary"
                  : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      {totalItems > itemsPerView && (
        <div className="text-center mt-4 text-sm text-muted-foreground">
          {currentIndex + 1} - {Math.min(currentIndex + itemsPerView, totalItems)} of {totalItems}
        </div>
      )}
    </div>
  );
}