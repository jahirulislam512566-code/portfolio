"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseStudyGalleryProps {
  images: string[];
  className?: string;
}

export function CaseStudyGallery({ images, className }: CaseStudyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const displayedImages = images.slice(0, 4);
  const remainingCount = images.length - 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className={cn("py-12", className)}
    >
      <div className="container max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Gallery</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {displayedImages.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="relative aspect-video overflow-hidden rounded-lg cursor-pointer group">
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-white" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0">
                <div className="relative">
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-white hover:text-white/80"
                    onClick={() => {}}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ))}
          
          {remainingCount > 0 && (
            <div className="relative aspect-video rounded-lg bg-muted flex items-center justify-center">
              <p className="text-2xl font-bold text-muted-foreground">
                +{remainingCount}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}