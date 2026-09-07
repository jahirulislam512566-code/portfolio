// components/animations/text-reveal.tsx
"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// ✅ Define valid HTML element types
type ValidElement = keyof React.JSX.IntrinsicElements;

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  wrapperClassName?: string;
  as?: ValidElement;
}

// ✅ Utility to get string content from ReactNode
function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (React.isValidElement(node)) {
    const element = node as React.ReactElement<{ children?: React.ReactNode }>;
    return getTextContent(element.props.children);
  }
  return "";
}

// ✅ Word-level text reveal
export function TextReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.1,
  staggerChildren = true,
  staggerDelay = 0.05,
  wrapperClassName,
  as: Component = "div",
  ...props
}: TextRevealProps) {
  
  const textContent = typeof children === "string" ? children : getTextContent(children);

  if (!textContent || typeof textContent !== "string") {
    // ✅ FIXED: Use React.createElement with proper typing
    return React.createElement(
      Component,
      {
        ...props,
        className: cn(className, wrapperClassName),
      },
      children
    );
  }

  const words = textContent.split(/\s+/).filter(word => word.length > 0);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren ? staggerDelay : 0,
        delayChildren: delay,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={cn("flex flex-wrap", wrapperClassName)}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={childVariants}
          className={cn(
            "inline-block",
            index < words.length - 1 && "mr-[0.25em]",
            className
          )}
        >
          {word}
          {index < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.div>
  );
}

// ✅ Character-level text reveal
export function CharReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.1,
  wrapperClassName,
  as: Component = "div",
  ...props
}: TextRevealProps) {
  
  const textContent = typeof children === "string" ? children : getTextContent(children);

  if (!textContent || typeof textContent !== "string") {
    // ✅ FIXED: Use React.createElement with proper typing
    return React.createElement(
      Component,
      {
        ...props,
        className: cn(className, wrapperClassName),
      },
      children
    );
  }

  const chars = textContent.split("");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20, rotateX: 90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={cn("inline-flex flex-wrap", wrapperClassName)}
    >
      {chars.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={childVariants}
          className={cn(
            "inline-block",
            char === " " && "w-[0.25em]",
            className
          )}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

// ✅ Paragraph-level text reveal
export function ParagraphReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.1,
  staggerChildren = true,
  staggerDelay = 0.1,
  wrapperClassName,
  as: Component = "div",
  ...props
}: TextRevealProps) {
  
  const textContent = typeof children === "string" ? children : getTextContent(children);

  if (!textContent || typeof textContent !== "string") {
    // ✅ FIXED: Use React.createElement with proper typing
    return React.createElement(
      Component,
      {
        ...props,
        className: cn(className, wrapperClassName),
      },
      children
    );
  }

  const paragraphs = textContent.split("\n").filter(p => p.trim().length > 0);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren ? staggerDelay : 0,
        delayChildren: delay,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={cn("flex flex-col gap-4", wrapperClassName)}
    >
      {paragraphs.map((paragraph, idx) => (
        <motion.p
          key={idx}
          variants={childVariants}
          className={cn(className)}
        >
          {paragraph}
        </motion.p>
      ))}
    </motion.div>
  );
}