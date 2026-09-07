"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseStudyProblemProps {
  problems: string[];
  className?: string;
}

export function CaseStudyProblem({ problems, className }: CaseStudyProblemProps) {
  if (!problems || problems.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={cn("py-12", className)}
    >
      <div className="container max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <AlertCircle className="h-6 w-6 text-destructive" />
          <h2 className="text-2xl font-bold">The Challenge</h2>
        </div>

        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-6">
            <ul className="space-y-3">
              {problems.map((problem, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{problem}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}