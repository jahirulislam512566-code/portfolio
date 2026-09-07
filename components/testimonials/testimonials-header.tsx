// components/testimonials/testimonials-header.tsx
"use client";

import { SectionHeading } from "@/components/common/section-heading";
import { Badge } from "@/components/ui/badge";
import { Star, Users, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialsHeaderProps {
  className?: string;
  totalTestimonials?: number;
  averageRating?: number; // ✅ Changed from avgRating to match parent
  // Keep both for flexibility
  avgRating?: number; // ✅ Add alias for backward compatibility
}

export function TestimonialsHeader({ 
  className, 
  totalTestimonials = 0, 
  averageRating = 0,
  avgRating, // ✅ Support both prop names
}: TestimonialsHeaderProps) {
  // ✅ Use avgRating if provided, fallback to averageRating
  const rating = avgRating ?? averageRating ?? 0;
  const hasTestimonials = totalTestimonials > 0;
  const hasRating = rating > 0;

  return (
    <div className={cn("text-center", className)}>
      <SectionHeading 
        title="Testimonials" 
        subtitle="What people say about working with me"
        className="mb-4"
      />
      <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
        Here's what clients, colleagues, and collaborators have to say about 
        working with me on various projects.
      </p>
      
      <div className="flex flex-wrap items-center justify-center gap-4">
        {hasTestimonials && (
          <Badge variant="outline" className="px-4 py-2 gap-2">
            <Users className="h-4 w-4" />
            {totalTestimonials} Testimonial{totalTestimonials !== 1 && "s"}
          </Badge>
        )}
        {hasRating && (
          <Badge variant="outline" className="px-4 py-2 gap-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {rating.toFixed(1)} / 5.0
          </Badge>
        )}
        <Badge variant="outline" className="px-4 py-2 gap-2 bg-green-500/10 text-green-500 border-green-500/20">
          <CheckCircle className="h-4 w-4" />
          Verified Reviews
        </Badge>
      </div>
    </div>
  );
}