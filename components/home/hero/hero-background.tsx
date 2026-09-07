"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroBackgroundProps {
  className?: string;
  showGrid?: boolean;
  showGradient?: boolean;
  intensity?: 'low' | 'medium' | 'high';
}

export function HeroBackground({ 
  className = "",
  showGrid = true,
  showGradient = true,
  intensity = 'medium'
}: HeroBackgroundProps) {
  // Mouse tracking for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Intensity levels for opacity
  const getOpacity = (base: number) => {
    const multipliers = { low: 0.5, medium: 1, high: 1.5 };
    return base * (multipliers[intensity] || 1);
  };

  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      {/* Gradient Background */}
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
      )}
      
      {/* Animated Orbs with Parallax */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full bg-purple-500/20 blur-3xl"
        style={{
          x: useTransform(springX, [-1, 1], [-50, 50]),
          y: useTransform(springY, [-1, 1], [-30, 30]),
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [getOpacity(0.4), getOpacity(0.7), getOpacity(0.4)],
        }}
        transition={{
          scale: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut" as const

,
          },
          opacity: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut" as const

,
          },
        }}
      />
      
      <motion.div
        className="absolute bottom-0 right-0 w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full bg-pink-500/15 blur-3xl"
        style={{
          x: useTransform(springX, [-1, 1], [30, -30]),
          y: useTransform(springY, [-1, 1], [20, -20]),
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [getOpacity(0.3), getOpacity(0.6), getOpacity(0.3)],
        }}
        transition={{
          scale: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut" as const

,
          },
          opacity: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut" as const

,
            delay: 1,
          },
        }}
      />
      
      <motion.div
        className="absolute top-0 left-0 w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full bg-blue-500/10 blur-3xl"
        style={{
          x: useTransform(springX, [-1, 1], [-20, 20]),
          y: useTransform(springY, [-1, 1], [-40, 40]),
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [getOpacity(0.2), getOpacity(0.5), getOpacity(0.2)],
        }}
        transition={{
          scale: {
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut" as const

,
          },
          opacity: {
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut" as const

,
            delay: 2,
          },
        }}
      />

      {/* Additional floating orbs for depth */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full bg-indigo-500/10 blur-2xl"
        animate={{
          y: [0, -20, 0],
          opacity: [getOpacity(0.2), getOpacity(0.4), getOpacity(0.2)],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut" as const

,
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-[80px] h-[80px] md:w-[120px] md:h-[120px] rounded-full bg-rose-500/10 blur-2xl"
        animate={{
          y: [0, 20, 0],
          opacity: [getOpacity(0.2), getOpacity(0.4), getOpacity(0.2)],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut" as const

,
          delay: 3,
        }}
      />

      {/* Grid Pattern - Improved */}
      {showGrid && (
        <>
          <div 
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
          
          {/* Subtle diagonal grid overlay */}
          <div 
            className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(45deg, currentColor 1px, transparent 0)`,
              backgroundSize: '80px 80px',
            }}
          />
        </>
      )}

      {/* Vignette effect for focus */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-background/20 pointer-events-none" />
      
      {/* Subtle glow at center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />
    </div>
  );
}