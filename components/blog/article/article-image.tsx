"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export function ArticleImage({
  src,
  alt,
  caption,
  className,
}: ArticleImageProps) {
  return (
    <motion.figure
      initial={{
        opacity: 0,
        y: 16,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut" as const

,
      }}
      className={cn(
        "my-8 w-full min-w-0 sm:my-10",
        className
      )}
    >
      {/* Image */}
      <div
        className="
          relative
          w-full
          min-w-0
          overflow-hidden
          rounded-xl
          border
          border-border/50
          bg-muted/30
          shadow-sm
          sm:rounded-2xl
        "
      >
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={900}
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 90vw,
            800px
          "
          className="
            block
            h-auto
            w-full
            max-w-full
            object-cover
            transition-transform
            duration-500
            ease-out
            hover:scale-[1.01]
          "
        />
      </div>

      {/* Caption */}
      {caption && (
        <figcaption
          className="
            mx-auto
            mt-3
            max-w-2xl
            px-2
            text-center
            text-xs
            leading-5
            text-muted-foreground
            sm:mt-4
            sm:px-0
            sm:text-sm
            sm:leading-6
          "
        >
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}