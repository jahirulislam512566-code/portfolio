"use client";

import { motion, useInView } from "framer-motion";
import { SectionHeading } from "@/components/common/section-heading";
import { GradientText } from "@/components/common/gradient-text";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { Mail, Send, Sparkles } from "lucide-react";

interface ContactHeaderProps {
  className?: string;
  variant?: 'default' | 'minimal' | 'with-decoration';
  showSubtitle?: boolean;
  showBadge?: boolean;
}

export function ContactHeader({ 
  className,
  variant = 'default',
  showSubtitle = true,
  showBadge = true
}: ContactHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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

  // Minimal variant
  if (variant === 'minimal') {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className={cn("text-center", className)}
      >
        <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          <GradientText>Get in Touch</GradientText>
        </motion.h2>
        {showSubtitle && (
          <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's talk.
          </motion.p>
        )}
      </motion.div>
    );
  }

  // With decoration variant
  if (variant === 'with-decoration') {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className={cn("text-center relative", className)}
      >
        {/* Decorative elements */}
        <motion.div
          variants={badgeVariants}
          className="absolute -top-4 -right-4 text-purple-500/20"
        >
          <Sparkles className="h-8 w-8" />
        </motion.div>
        <motion.div
          variants={badgeVariants}
          className="absolute -bottom-4 -left-4 text-pink-500/20"
        >
          <Sparkles className="h-6 w-6" />
        </motion.div>

        {showBadge && (
          <motion.div variants={badgeVariants} className="mb-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600/10 to-pink-600/10 px-4 py-1.5 text-sm text-purple-600 border border-purple-600/20">
              <Mail className="h-4 w-4" />
              Let's Connect
            </span>
          </motion.div>
        )}

        <SectionHeading 
          title="Get in Touch" 
          subtitle="I'm always open to new opportunities and collaborations"
          className="mb-4"
        />
        
        {showSubtitle && (
          <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out 
            through the form below or connect with me on social media.
          </motion.p>
        )}

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 h-0.5 w-24 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
        />
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={cn("text-center", className)}
    >
      {/* Badge */}
      {showBadge && (
        <motion.div variants={badgeVariants} className="mb-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600/10 to-pink-600/10 px-4 py-1.5 text-sm text-purple-600 border border-purple-600/20">
            <Send className="h-4 w-4" />
            Get in Touch
          </span>
        </motion.div>
      )}

      <SectionHeading 
        title="Get in Touch" 
        subtitle={showSubtitle ? "I'm always open to new opportunities and collaborations" : undefined}
        className="mb-4"
        alignment="center"
      />
      
      {showSubtitle && (
        <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
          Have a project in mind or want to collaborate? Feel free to reach out 
          through the form below or connect with me on social media.
        </motion.p>
      )}

      {/* Decorative dots with gradient */}
      <motion.div
        variants={itemVariants}
        className="flex justify-center gap-2 mt-6"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-30" />
        <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-50" />
        <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-70" />
        <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-50" />
        <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-30" />
      </motion.div>
    </motion.div>
  );
}