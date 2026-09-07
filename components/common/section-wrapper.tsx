// components/common/section-wrapper.tsx
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'muted' | 'gradient';
  id?: string;
}

export function SectionWrapper({ 
  children, 
  className, 
  variant = 'default',
  id 
}: SectionWrapperProps) {
  const variants = {
    default: "bg-background",
    muted: "bg-muted/30",
    gradient: "bg-gradient-to-b from-background via-muted/10 to-background",
  };

  return (
    <section 
      id={id}
      className={cn(
        "py-section md:py-section-lg",
        variants[variant],
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </section>
  );
}