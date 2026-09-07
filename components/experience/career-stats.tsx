"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Briefcase, 
  Calendar, 
  Code, 
  Users, 
  Award, 
  Rocket,
  TrendingUp,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CareerStatsProps {
  className?: string;
  stats?: {
    label: string;
    value: string;
    icon: React.ReactNode;
    description?: string;
  }[];
}

export function CareerStats({ 
  className,
  stats = [
    {
      label: "Years Experience",
      value: "5+",
      icon: <Calendar className="h-5 w-5" />,
      description: "Professional experience",
    },
    {
      label: "Companies Worked",
      value: "3",
      icon: <Briefcase className="h-5 w-5" />,
      description: "In tech industry",
    },
    {
      label: "Projects Delivered",
      value: "50+",
      icon: <Code className="h-5 w-5" />,
      description: "Production projects",
    },
    {
      label: "Team Size",
      value: "5-10",
      icon: <Users className="h-5 w-5" />,
      description: "Average team size",
    },
    {
      label: "Technologies",
      value: "20+",
      icon: <Rocket className="h-5 w-5" />,
      description: "Different tech stacks",
    },
    {
      label: "Client Satisfaction",
      value: "100%",
      icon: <Star className="h-5 w-5" />,
      description: "Positive feedback",
    },
  ]
}: CareerStatsProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {stats.map((stat, index) => {
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="group hover:shadow-lg transition-all hover:border-primary/50 text-center">
              <CardContent className="p-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {stat.icon}
                </div>
                <p className="text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </p>
                <p className="font-medium">{stat.label}</p>
                {stat.description && (
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}