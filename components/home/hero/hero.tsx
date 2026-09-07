"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

import { HeroContent } from "./hero-content";
import { HeroImage } from "./hero-image";
import { HeroBackground } from "./hero-background";
import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
  showScrollIndicator?: boolean;
  layout?: "default" | "image-left" | "centered" | "compact";
  fullHeight?: boolean;
  variant?: "default" | "gradient" | "minimal";
}

export function Hero({
  className,
  showScrollIndicator = true,
  layout = "default",
  fullHeight = true,
  variant = "default",
}: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  const { scrollY } = useScroll();

  const backgroundY = useTransform(scrollY, [0, 500], [0, 80]);
  const backgroundOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const layoutConfigs = {
    default: {
      grid: "grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16",
      contentOrder: "order-1",
      imageOrder: "order-2",
      contentClass: "",
      imageClass: "",
    },
    "image-left": {
      grid: "grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16",
      contentOrder: "order-2",
      imageOrder: "order-1",
      contentClass: "",
      imageClass: "",
    },
    centered: {
      grid: "mx-auto flex w-full max-w-4xl flex-col items-center text-center",
      contentOrder: "",
      imageOrder: "",
      contentClass: "w-full",
      imageClass: "",
    },
    compact: {
      grid: "grid items-center gap-6 lg:grid-cols-2 lg:gap-10",
      contentOrder: "order-1",
      imageOrder: "order-2",
      contentClass: "",
      imageClass: "scale-95",
    },
  };

  const config = layoutConfigs[layout] ?? layoutConfigs.default;
  const shouldShowImage = layout !== "centered";

  const variantStyles = {
    default: "bg-background",
    gradient: "bg-gradient-to-b from-background via-muted/10 to-background",
    minimal: "bg-transparent",
  };

  return (
    <section
      id="home"
      aria-label="Hero Section"
      className={cn(
        "relative w-full overflow-hidden",
        variantStyles[variant],
        fullHeight ? "min-h-[calc(100svh-4rem)]" : "min-h-0",
        layout === "compact"
          ? "py-12 sm:py-14 md:py-16"
          : "py-14 sm:py-16 md:py-20 lg:py-24",
        className
      )}
    >
      {/* Background */}
      <motion.div
        aria-hidden="true"
        style={{
          y: backgroundY,
          opacity: backgroundOpacity,
        }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <HeroBackground />
      </motion.div>

      {/* ✅ Centered Container */}
      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 20,
          }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: "easeOut" as const

,
          }}
          className={config.grid}
        >
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              x: isVisible ? 0 : -20,
            }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: "easeOut" as const

,
            }}
            className={cn(
              config.contentOrder,
              config.contentClass,
              "min-w-0 w-full"
            )}
          >
            <HeroContent
              alignment={layout === "centered" ? "center" : "left"}
            />
          </motion.div>

          {/* Hero Image */}
          {shouldShowImage && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                x: isVisible ? 0 : 20,
              }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                ease: "easeOut" as const

,
              }}
              className={cn(
                config.imageOrder,
                config.imageClass,
                "flex w-full min-w-0 justify-center lg:justify-end"
              )}
            >
              <HeroImage
                size={layout === "compact" ? "sm" : "md"}
                variant="rounded"
              />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && fullHeight && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 sm:bottom-6"
        >
          <motion.button
            type="button"
            animate={{ y: [0, 6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut" as const

,
            }}
            onClick={() => {
              const nextSection =
                document.querySelector("#about") ||
                document.querySelector("#projects") ||
                document.querySelector("section:not(#home)");

              nextSection?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className={cn(
              "group flex flex-col items-center gap-1 rounded-md px-2 py-1",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            )}
            aria-label="Scroll down to explore more"
          >
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60 transition-colors group-hover:text-muted-foreground">
              Scroll
            </span>

            <div className="flex h-8 w-5 items-start justify-center rounded-full border border-muted-foreground/25 p-1 transition-colors group-hover:border-primary/50 sm:h-9 sm:w-6">
              <motion.span
                animate={{ y: [0, 8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut" as const

,
                }}
                className="h-1 w-1 rounded-full bg-primary/60"
              />
            </div>
          </motion.button>
        </motion.div>
      )}

      {/* Bottom Fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent sm:h-16"
      />
    </section>
  );
}