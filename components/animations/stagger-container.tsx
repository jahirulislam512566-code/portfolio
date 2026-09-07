// components/animations/stagger-container.tsx
"use client";

import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode, Children, isValidElement } from "react";

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  once?: boolean;
  amount?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

export function StaggerContainer({
  children,
  className,
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.1,
  once = true,
  amount = 0.1,
  direction = "up",
  distance = 20,
  ...props
}: StaggerContainerProps) {
  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      default:
        return { y: distance };
    }
  };

  const directionOffset = getDirectionOffset();

  // ✅ Properly typed container variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  // ✅ Properly typed child variants with string easing
  const childVariants: Variants = {
    hidden: { 
      opacity: 0, 
      ...directionOffset 
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: "easeOut", // ✅ Use string instead of array
      },
    },
  };

  // ✅ Helper function to check if children are valid React elements
  const renderChildren = () => {
    if (!children) return null;

    // If children is an array, wrap each in motion.div
    if (Array.isArray(children)) {
      return children.map((child, index) => {
        // Only wrap valid React elements
        if (isValidElement(child)) {
          return (
            <motion.div key={index} variants={childVariants}>
              {child}
            </motion.div>
          );
        }
        return child;
      });
    }

    // If single child, wrap it
    if (isValidElement(children)) {
      return (
        <motion.div variants={childVariants}>
          {children}
        </motion.div>
      );
    }

    return children;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={cn(className)}
      {...props}
    >
      {renderChildren()}
    </motion.div>
  );
}