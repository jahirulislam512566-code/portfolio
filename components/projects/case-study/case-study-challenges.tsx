"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Challenge {
  title: string;
  description: string;
}

interface CaseStudyChallengesProps {
  challenges: Challenge[];
  className?: string;
}

export function CaseStudyChallenges({ challenges, className }: CaseStudyChallengesProps) {
  if (!challenges || challenges.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className={cn("py-12", className)}
    >
      <div className="container max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Challenges Faced</h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          {challenges.map((challenge, index) => (
            <Card key={index} className="border-orange-500/20 bg-orange-500/5">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{challenge.title}</h3>
                <p className="text-sm text-muted-foreground">{challenge.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
}