"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseStudySolutionProps {
  solutions: string[];
  className?: string;
}

export function CaseStudySolution({ solutions, className }: CaseStudySolutionProps) {
  if (!solutions || solutions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={cn("py-12", className)}
    >
      <div className="container max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">The Solution</h2>
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <ul className="space-y-3">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{solution}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}