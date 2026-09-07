// app/skills/page.tsx (Server Component - no "use client")
import { Metadata } from "next";
import { SkillsPageClient } from "./SkillsPageClient";
import { skillsData } from "@/data/skills";
import { siteConfig } from "@/config/site.config";

// Metadata stays here in the Server Component
export const metadata: Metadata = {
  title: "Skills & Technologies",
  description: "Explore my technical skills and technologies including frontend, backend, database, and DevOps.",
  keywords: ["skills", "technologies", "frontend", "backend", "database", "devops", "full stack"],
  openGraph: {
    title: "Skills & Technologies | John Doe",
    description: "Explore my technical skills and technologies including frontend, backend, database, and DevOps.",
    url: `${siteConfig.url}/skills`,
    images: [
      {
        url: `${siteConfig.url}/images/og-skills.jpg`,
        width: 1200,
        height: 630,
        alt: "Skills & Technologies",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skills & Technologies | John Doe",
    description: "Explore my technical skills and technologies including frontend, backend, database, and DevOps.",
    images: [`${siteConfig.url}/images/og-skills.jpg`],
  },
};

// This is a Server Component that passes data to the Client Component
export default function SkillsPage() {
  // Calculate data on the server
  const totalSkills = skillsData.reduce((acc, group) => acc + group.skills.length, 0);
  const totalCategories = skillsData.length;
  
  const allSkills = skillsData.flatMap(group => group.skills);
  const avgLevel = Math.round(
    allSkills.reduce((acc, skill) => acc + (skill.level || 0), 0) / allSkills.length
  );
  
  const expertSkills = allSkills.filter(skill => (skill.level || 0) >= 80);
  const advancedSkills = allSkills.filter(skill => (skill.level || 0) >= 60 && (skill.level || 0) < 80);
  const intermediateSkills = allSkills.filter(skill => (skill.level || 0) >= 40 && (skill.level || 0) < 60);

  // Pass data as props to the client component
  return (
    <SkillsPageClient 
      totalSkills={totalSkills}
      totalCategories={totalCategories}
      avgLevel={avgLevel}
      expertSkills={expertSkills}
      advancedSkills={advancedSkills}
      intermediateSkills={intermediateSkills}
    />
  );
}