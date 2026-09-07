"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface CaseStudyFeaturesProps {
  features: Feature[];
  className?: string;
}

export function CaseStudyFeatures({ features, className }: CaseStudyFeaturesProps) {
  if (!features || features.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={cn("py-12", className)}
    >
      <div className="container max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Key Features</h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                {feature.icon && (
                  <div className="mb-3 text-primary">
                    {feature.icon}
                  </div>
                )}
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
}