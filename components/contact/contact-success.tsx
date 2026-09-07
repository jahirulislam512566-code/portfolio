"use client";

import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, ArrowRight, Home, Send, Sparkles, PartyPopper } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRef, useEffect, useState } from "react";

interface ContactSuccessProps {
  className?: string;
  onReset?: () => void;
  variant?: 'default' | 'minimal' | 'celebratory';
  showConfetti?: boolean;
  message?: string;
  title?: string;
  email?: string;
}

export function ContactSuccess({ 
  className, 
  onReset,
  variant = 'default',
  showConfetti = true,
  message = "Thanks for reaching out! I'll get back to you as soon as possible. In the meantime, feel free to connect with me on social media.",
  title = "Message Sent! 🎉",
  email = "confirmation@example.com",
}: ContactSuccessProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [showSparkles, setShowSparkles] = useState(false);

  // Trigger sparkles on mount
  useEffect(() => {
    setShowSparkles(true);
    const timer = setTimeout(() => setShowSparkles(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,

        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const

 }, // ✅ Fixed
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const



,
        stiffness: 200,
        damping: 25,
        delay: 0.2,
      },
    },
  };

  // Sparkle animation
  const sparkleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const

      },
    },
  };

  // Variant styles
  const variantStyles = {
    default: "border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent",
    minimal: "border-border/30 bg-background/50 backdrop-blur-sm",
    celebratory: "border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-purple-500/5 to-pink-500/5",
  };

  // Get appropriate icon
  const getIcon = () => {
    if (variant === 'celebratory') {
      return <PartyPopper className="h-10 w-10" />;
    }
    return <CheckCircle className="h-10 w-10" />;
  };

  // Get icon color
  const getIconColor = () => {
    if (variant === 'celebratory') {
      return "bg-amber-500/10 text-amber-500";
    }
    return "bg-green-500/10 text-green-500";
  };

  // Minimal variant
  if (variant === 'minimal') {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className={cn("max-w-md mx-auto", className)}
      >
        <Card className={cn("border-border/30", variantStyles[variant])}>
          <CardContent className="p-6 text-center">
            <motion.div variants={iconVariants} className="mb-4">
              <div className={cn(
                "inline-flex h-16 w-16 items-center justify-center rounded-full",
                getIconColor()
              )}>
                {getIcon()}
              </div>
            </motion.div>

            <motion.h3 variants={itemVariants} className="text-xl font-bold mb-2">
              {title}
            </motion.h3>

            <motion.p variants={itemVariants} className="text-sm text-muted-foreground mb-4">
              {message}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center">
              <Button variant="outline" onClick={onReset} size="sm">
                Send Another
              </Button>
              <Button variant="outline" asChild size="sm">
                <Link href="/">
                  <Home className="mr-2 h-3.5 w-3.5" />
                  Home
                </Link>
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Celebratory variant
  if (variant === 'celebratory') {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className={cn("max-w-md mx-auto", className)}
      >
        <Card className={cn("border-amber-500/20", variantStyles[variant])}>
          <CardContent className="p-8 text-center relative overflow-hidden">
            {/* Confetti background effect */}
            {showConfetti && (
              <>
                <motion.div
                  variants={sparkleVariants}
                  className="absolute top-4 right-4 text-amber-500/30"
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
                <motion.div
                  variants={sparkleVariants}
                  className="absolute bottom-4 left-4 text-pink-500/30"
                >
                  <Sparkles className="h-3 w-3" />
                </motion.div>
                <motion.div
                  variants={sparkleVariants}
                  className="absolute top-1/2 left-1/4 text-purple-500/20"
                >
                  <Sparkles className="h-5 w-5" />
                </motion.div>
              </>
            )}

            <motion.div variants={iconVariants} className="mb-6">
              <div className={cn(
                "inline-flex h-20 w-20 items-center justify-center rounded-full",
                getIconColor()
              )}>
                {getIcon()}
              </div>
            </motion.div>

            <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-2">
              {title}
            </motion.h3>

            <motion.p variants={itemVariants} className="text-muted-foreground mb-6">
              {message}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="gap-2 group">
                <Link href="/">
                  <Home className="h-4 w-4 transition-transform group-hover:scale-110" />
                  Back to Home
                </Link>
              </Button>
              <Button variant="outline" onClick={onReset} className="gap-2 group">
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                Send Another Message
              </Button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="mt-6 pt-6 border-t border-border/50"
            >
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                <Mail className="h-3 w-3" />
                You'll receive a confirmation email shortly at <span className="font-medium text-foreground">{email}</span>
              </p>
            </motion.div>
          </CardContent>
        </Card>
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
      className={cn("max-w-md mx-auto", className)}
    >
      <Card className={cn("border-green-500/20", variantStyles[variant])}>
        <CardContent className="p-8 text-center">
          {/* Success Icon */}
          <motion.div
            variants={iconVariants}
            className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500 mb-6"
          >
            <CheckCircle className="h-10 w-10" />
          </motion.div>

          <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-2">
            {title}
          </motion.h3>
          
          <motion.p variants={itemVariants} className="text-muted-foreground mb-6">
            {message}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="gap-2 group">
              <Link href="/">
                <Home className="h-4 w-4 transition-transform group-hover:scale-110" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" onClick={onReset} className="gap-2 group">
              <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
              Send Another Message
            </Button>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="mt-6 pt-6 border-t border-border/50"
          >
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <Mail className="h-3 w-3" />
              You'll receive a confirmation email shortly.
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}