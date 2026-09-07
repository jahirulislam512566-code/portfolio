"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageSquare, 
  Lightbulb, 
  Code, 
  TestTube, 
  Rocket, 
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceProcessProps {
  className?: string;
  steps?: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
}

export function ServiceProcess({ 
  className,
  steps = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Discovery",
      description: "We discuss your project goals, requirements, and vision.",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Planning",
      description: "I create a detailed plan and architecture for your project.",
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Development",
      description: "Building your project with clean, maintainable code.",
    },
    {
      icon: <TestTube className="h-6 w-6" />,
      title: "Testing",
      description: "Rigorous testing to ensure quality and reliability.",
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Launch",
      description: "Deploying your project to production with care.",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Support",
      description: "Ongoing support and maintenance after launch.",
    },
  ]
}: ServiceProcessProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="text-center">
        <h3 className="text-2xl font-bold">My Process</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Here's how I work with clients to deliver exceptional results.
        </p>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 hidden md:block" />

        <div className="space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="hover:shadow-lg transition-all hover:border-primary/50">
                  <CardContent className="p-4 flex items-start gap-4">
                    {/* Step Number & Icon */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {step.icon}
                        </div>
                        <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-background border flex items-center justify-center text-xs font-bold text-muted-foreground">
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}