"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { AnimatedBorder } from "@/components/common/animated-border";
import { User, Sparkles, Camera } from "lucide-react";
import { heroData } from "@/data/hero";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface HeroImageProps {
  className?: string;
  showStats?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'circle' | 'rounded' | 'square';
}

export function HeroImage({ 
  className,
  showStats = true,
  size = 'md',
  variant = 'rounded'
}: HeroImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Mouse tracking for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Transform for 3D tilt
  const rotateX = useTransform(springY, [-1, 1], [-8, 8]);
  const rotateY = useTransform(springX, [-1, 1], [8, -8]);

  // Size configurations
  const sizeConfig = {
    sm: {
      container: "w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56",
      icon: "h-12 w-12 sm:h-14 sm:w-14",
      text: "text-xs sm:text-sm",
      ring: "-inset-1 sm:-inset-1.5",
    },
    md: {
      container: "w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80",
      icon: "h-16 w-16 sm:h-20 sm:w-20",
      text: "text-sm sm:text-base",
      ring: "-inset-1.5 sm:-inset-2",
    },
    lg: {
      container: "w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96",
      icon: "h-20 w-20 sm:h-24 sm:w-24",
      text: "text-base sm:text-lg",
      ring: "-inset-2 sm:-inset-2.5",
    },
  };

  // Variant configurations
  const variantClasses = {
    circle: "rounded-full",
    rounded: "rounded-lg",
    square: "rounded-none",
  };

  const hoverVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" as const

 },
    },
  };

  // Handle mouse enter/leave for tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 2);
    mouseY.set(y * 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: 0.3,
        type: "spring" as const



,
        stiffness: 200,
        damping: 25
      }}
      className={cn(
        "flex flex-col items-center gap-4 sm:gap-6 md:gap-8 w-full max-w-full overflow-hidden", 
        className
      )}
    >
      {/* Image Container with 3D Tilt */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover="hover"
        variants={hoverVariants}
        className="relative flex-shrink-0"
      >
        <AnimatedBorder>
          <motion.div
            className={cn(
              "relative overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20",
              sizeConfig[size].container,
              variantClasses[variant],
              "shadow-2xl"
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {heroData.profileImage ? (
              <>
                <Image
                  src={heroData.profileImage}
                  alt={heroData.profileImageAlt || "Profile"}
                  fill
                  className={cn(
                    "object-cover transition-all duration-700",
                    imageLoaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
                  )}
                  onLoad={() => setImageLoaded(true)}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Loading placeholder */}
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                    <div className="h-6 w-6 sm:h-8 sm:w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
                  </div>
                )}
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
              </>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center p-4">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut" as const

,
                  }}
                >
                  <User className={cn(
                    "text-muted-foreground/50 mx-auto mb-2",
                    sizeConfig[size].icon
                  )} />
                </motion.div>
                <p className={cn(
                  "text-muted-foreground text-center",
                  sizeConfig[size].text
                )}>
                  {heroData.profileImagePlaceholder || "Profile Image"}
                </p>
                <div className="mt-2 flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground/40">
                  <Camera className="h-3 w-3" />
                  <span>Add your photo</span>
                </div>
              </div>
            )}
            
            {/* Decorative Ring Animation */}
            <motion.div
              className={cn(
                "absolute rounded-lg border-2 border-primary/20 pointer-events-none",
                sizeConfig[size].ring,
                variantClasses[variant]
              )}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut" as const

,
              }}
            />

            {/* Glow Effect */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl opacity-50 -z-10" />

            {/* Status Indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
              className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex h-3 w-3 sm:h-4 sm:w-4"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-full w-full bg-green-500 border-2 border-background" />
            </motion.div>
          </motion.div>
        </AnimatedBorder>
      </motion.div>

      {/* Stats Cards */}
      {showStats && heroData.stats && heroData.stats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 w-full max-w-full sm:max-w-sm"
        >
          {heroData.stats.map((stat, index) => (
            <motion.div
              key={stat.label || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.6 + index * 0.1,
                type: "spring" as const



,
                stiffness: 200,
                damping: 25
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="group bg-background/80 backdrop-blur-sm border border-border/50 rounded-lg p-3 sm:p-4 text-center shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-default min-w-0"
            >
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform truncate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                {stat.value}{stat.suffix || ''}
              </motion.p>
              <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-0.5 sm:mt-1 truncate">
                {stat.label}
              </p>
              {stat.description && (
                <p className="text-[8px] sm:text-[10px] text-muted-foreground/60 mt-0.5 truncate">
                  {stat.description}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Floating Decorative Elements */}
      <motion.div
        className="absolute -top-4 -right-4 h-6 w-6 rounded-full bg-purple-500/20 blur-xl pointer-events-none"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut" as const

,
        }}
      />
      <motion.div
        className="absolute -bottom-4 -left-4 h-8 w-8 rounded-full bg-pink-500/20 blur-xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut" as const

,
          delay: 1,
        }}
      />
    </motion.div>
  );
}