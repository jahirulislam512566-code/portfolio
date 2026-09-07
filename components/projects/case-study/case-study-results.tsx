"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Clock, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface Result {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface CaseStudyResultsProps {
  results: Result[];
  className?: string;
}

export function CaseStudyResults({ results, className }: CaseStudyResultsProps) {
  if (!results || results.length === 0) {
    // Default results
    results = [
      { label: "Performance Improvement", value: "200%", icon: <TrendingUp className="h-5 w-5" /> },
      { label: "Users", value: "10,000+", icon: <Users className="h-5 w-5" /> },
      { label: "Reduced Load Time", value: "60%", icon: <Clock className="h-5 w-5" /> },
      { label: "Client Satisfaction", value: "100%", icon: <Award className="h-5 w-5" /> },
    ];
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className={cn("py-12", className)}
    >
      <div className="container max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Results & Impact</h2>
        
        <div className="grid gap-4 md:grid-cols-4">
          {results.map((result, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all">
              <CardContent className="p-6">
                {result.icon && (
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                    {result.icon}
                  </div>
                )}
                <p className="text-2xl font-bold text-primary">{result.value}</p>
                <p className="text-sm text-muted-foreground">{result.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
}