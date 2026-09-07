"use client";

import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, CheckCircle, AlertCircle, Sparkles, Coffee, Zap, Mail } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface AvailabilityCardProps {
  className?: string;
  status?: "available" | "busy" | "limited";
  variant?: 'default' | 'compact' | 'expanded';
  showResponseTime?: boolean;
  showTimeZone?: boolean;
}

export function AvailabilityCard({ 
  className, 
  status = "available",
  variant = 'default',
  showResponseTime = true,
  showTimeZone = true
}: AvailabilityCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const statusConfig = {
    available: {
      label: "Available for Work",
      icon: CheckCircle,
      iconBg: "bg-green-500/10",
      color: "from-emerald-500 to-green-500",
      badgeColor: "bg-green-500/10 text-green-500 border-green-500/20",
      borderColor: "border-green-500/20",
      description: "I'm currently open to new opportunities and collaborations. Let's build something amazing together.",
      ctaText: "Start a Project",
      emoji: "🚀",
      dotColor: "bg-emerald-500",
    },
    busy: {
      label: "Currently Busy",
      icon: AlertCircle,
      iconBg: "bg-yellow-500/10",
      color: "from-yellow-500 to-amber-500",
      badgeColor: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      borderColor: "border-yellow-500/20",
      description: "I'm currently focused on existing projects but open to select opportunities and consultations.",
      ctaText: "Schedule Consultation",
      emoji: "⚡",
      dotColor: "bg-yellow-500",
    },
    limited: {
      label: "Limited Availability",
      icon: Clock,
      iconBg: "bg-orange-500/10",
      color: "from-orange-500 to-amber-500",
      badgeColor: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      borderColor: "border-orange-500/20",
      description: "I have limited capacity for new projects but still available for consultations and quick collaborations.",
      ctaText: "Book a Call",
      emoji: "☕",
      dotColor: "bg-orange-500",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const

,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const

 },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const



,
        stiffness: 300,
        damping: 25,
        delay: 0.2,
      },
    },
  };

  // Compact variant
  if (variant === 'compact') {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className={cn("relative h-2.5 w-2.5", config.dotColor === 'bg-emerald-500' ? "bg-emerald-500" : config.dotColor === 'bg-yellow-500' ? "bg-yellow-500" : "bg-orange-500")}>
          <span className={cn(
            "absolute inset-0 rounded-full animate-ping opacity-75",
            config.dotColor === 'bg-emerald-500' ? "bg-emerald-400" : config.dotColor === 'bg-yellow-500' ? "bg-yellow-400" : "bg-orange-400"
          )} />
          <span className={cn(
            "relative inline-flex h-2.5 w-2.5 rounded-full",
            config.dotColor
          )} />
        </div>
        <span className="text-sm font-medium">{config.label}</span>
        <Badge className={cn("text-xs", config.badgeColor)}>
          {config.emoji} {status === 'available' ? 'Open' : status === 'busy' ? 'Busy' : 'Limited'}
        </Badge>
      </div>
    );
  }

  // Default variant
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <Card className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg",
        "border-2",
        config.borderColor,
        variant === 'expanded' && "p-2",
        className
      )}>
        <CardContent className={cn(
          "p-6",
          variant === 'expanded' && "p-8"
        )}>
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <motion.div 
                variants={badgeVariants}
                className={cn(
                  "h-12 w-12 rounded-full flex items-center justify-center shrink-0",
                  "bg-gradient-to-r",
                  config.iconBg,
                  "shadow-sm"
                )}
              >
                <Icon className={cn("h-6 w-6 bg-gradient-to-r bg-clip-text text-transparent", config.color)} />
              </motion.div>
              <div>
                <motion.h3 
                  variants={itemVariants}
                  className="text-lg font-semibold flex items-center gap-2"
                >
                  Availability
                  <span className="text-base">{config.emoji}</span>
                </motion.h3>
                <motion.div variants={badgeVariants}>
                  <Badge className={cn("mt-1", config.badgeColor)}>
                    {config.label}
                  </Badge>
                </motion.div>
              </div>
            </div>
            
            {showTimeZone && (
              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-2 text-sm text-muted-foreground shrink-0"
              >
                <Clock className="h-4 w-4" />
                <span>UTC {siteConfig.contact?.officeHours?.timezone || "GMT"}</span>
              </motion.div>
            )}
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="text-muted-foreground text-sm mt-4 leading-relaxed"
          >
            {config.description}
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 pt-4 mt-4 border-t border-border/50"
          >
            {showResponseTime && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Response Time:</span>
                <span className="font-medium flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                  Within 24 hours
                </span>
              </div>
            )}
            
            <Button 
              size={variant === 'expanded' ? 'default' : 'sm'} 
              variant="outline" 
              className="gap-2 group border-2 hover:border-primary/50"
              asChild
            >
              <a 
                href={siteConfig.contact?.calendar || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <Calendar className="h-4 w-4 transition-transform group-hover:scale-110" />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">
                  {config.ctaText || "Book a Call"}
                </span>
              </a>
            </Button>

            {/* Optional quick action */}
            {status === 'available' && (
              <Button 
                size={variant === 'expanded' ? 'default' : 'sm'}
                className="gap-2 group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300"
                asChild
              >
                <a href="#contact" className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
                  Let's Chat
                </a>
              </Button>
            )}
          </motion.div>

          {/* Availability indicator with gradient */}
          <motion.div 
            variants={itemVariants}
            className="mt-4 pt-4 border-t border-border/50"
          >
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Status</span>
              <span className="font-medium flex items-center gap-1.5">
                <span className={cn(
                  "relative flex h-2 w-2",
                  config.dotColor === 'bg-emerald-500' ? "text-emerald-500" : config.dotColor === 'bg-yellow-500' ? "text-yellow-500" : "text-orange-500"
                )}>
                  <span className={cn(
                    "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                    config.dotColor === 'bg-emerald-500' ? "bg-emerald-400" : config.dotColor === 'bg-yellow-500' ? "bg-yellow-400" : "bg-orange-400"
                  )} />
                  <span className={cn(
                    "relative inline-flex rounded-full h-2 w-2",
                    config.dotColor
                  )} />
                </span>
                <span className="bg-gradient-to-r bg-clip-text text-transparent from-purple-600 to-pink-600">
                  {config.label}
                </span>
              </span>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}