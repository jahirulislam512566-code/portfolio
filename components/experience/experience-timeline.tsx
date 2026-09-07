"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExperienceCard } from "./experience-card";
import { EducationCard } from "./education-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { experienceData } from "@/data/experience";
import { educationData } from "@/data/about";
import { cn } from "@/lib/utils";

interface ExperienceTimelineProps {
  className?: string;
  showEducation?: boolean;
}

export function ExperienceTimeline({ 
  className, 
  showEducation = true 
}: ExperienceTimelineProps) {
  const [activeTab, setActiveTab] = useState("experience");

  return (
    <div className={cn("space-y-8", className)}>
      <Tabs 
        defaultValue="experience" 
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="experience">Experience</TabsTrigger>
          {showEducation && (
            <TabsTrigger value="education">Education</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="experience" className="mt-8">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 transform -translate-x-1/2 hidden md:block" />

            <div className="space-y-8">
              {experienceData.map((exp, index) => (
                <ExperienceCard 
                  key={exp.id} 
                  experience={exp} 
                  index={index}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        {showEducation && (
          <TabsContent value="education" className="mt-8">
            <div className="grid gap-6 md:grid-cols-2">
              {educationData.map((edu, index) => (
                <EducationCard 
                  key={edu.id} 
                  education={edu} 
                  index={index}
                />
              ))}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}