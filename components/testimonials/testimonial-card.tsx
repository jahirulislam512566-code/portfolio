"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Testimonial } from "@/types/testimonial";
import { Star, User, Quote, CheckCircle, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
  className?: string;
  variant?: "default" | "featured" | "compact";
}

export function TestimonialCard({ 
  testimonial, 
  index = 0, 
  className,
  variant = "default"
}: TestimonialCardProps) {
  const isFeatured = variant === "featured" || testimonial.isFeatured;
  const isCompact = variant === "compact";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card className={cn(
        "h-full group hover:shadow-xl transition-all hover:border-primary/50 relative",
        isFeatured && "border-primary/30 bg-gradient-to-br from-primary/5 to-transparent",
        isCompact && "p-4",
        className
      )}>
        {/* Quote Icon */}
        {!isCompact && (
          <div className="absolute top-4 right-4 text-primary/10 group-hover:text-primary/20 transition-colors">
            <Quote className="h-8 w-8" />
          </div>
        )}

        <CardContent className={cn(
          "p-6",
          isCompact && "p-4"
        )}>
          {/* Rating */}
          {testimonial.rating && (
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < testimonial.rating! 
                      ? "fill-yellow-400 text-yellow-400" 
                      : "text-muted-foreground/30"
                  )}
                />
              ))}
            </div>
          )}

          {/* Featured Badge */}
          {isFeatured && (
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
              Featured
            </Badge>
          )}

          {/* Content */}
          <p className={cn(
            "text-muted-foreground leading-relaxed",
            isCompact ? "text-sm line-clamp-3" : "text-base"
          )}>
            "{testimonial.content}"
          </p>

          {/* Response */}
          {testimonial.response && !isCompact && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">{testimonial.author} replied:</span>
                <br />
                {testimonial.response.content}
              </p>
            </div>
          )}

          {/* Author */}
          <div className={cn(
            "flex items-center gap-3 pt-4 border-t",
            isCompact ? "mt-3" : "mt-6"
          )}>
            <div className="h-10 w-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center shrink-0">
              {testimonial.authorImage ? (
                <img 
                  src={testimonial.authorImage} 
                  alt={testimonial.author}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm">{testimonial.author}</p>
                {testimonial.isVerified && (
                  <CheckCircle className="h-3.5 w-3.5 text-green-500 shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {testimonial.authorTitle}
                {testimonial.authorCompany && `, ${testimonial.authorCompany}`}
              </p>
              {!isCompact && testimonial.date && (
                <p className="text-xs text-muted-foreground/70 mt-0.5 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(testimonial.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}