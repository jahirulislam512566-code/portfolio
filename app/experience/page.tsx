import { Metadata } from "next";
import { ExperiencePageClient } from "./ExperiencePageClient";
import { experienceData } from "@/data/experience";
import { siteConfig } from "@/config/site.config";

// Generate metadata for the page
export const metadata: Metadata = {
  title: "Experience",
  description: "Explore my professional journey and work experience in tech.",
  keywords: ["experience", "career", "work", "professional", "development"],
  openGraph: {
    title: "Experience | John Doe",
    description: "Explore my professional journey and work experience in tech.",
    url: `${siteConfig.url}/experience`,
    images: [
      {
        url: `${siteConfig.url}/images/og-experience.jpg`,
        width: 1200,
        height: 630,
        alt: "Experience",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience | John Doe",
    description: "Explore my professional journey and work experience in tech.",
    images: [`${siteConfig.url}/images/og-experience.jpg`],
  },
};

// Calculate data on the server
const totalYears = experienceData.reduce((acc, exp) => {
  const start = new Date(exp.startDate);
  const end = exp.isCurrent ? new Date() : new Date(exp.endDate || new Date());
  const years = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365);
  return acc + years;
}, 0);

const totalCompanies = experienceData.length;
const totalProjects = experienceData.reduce((acc, exp) => acc + exp.achievements.length, 0);
const totalTech = new Set(experienceData.flatMap(exp => exp.technologies)).size;

export default function ExperiencePage() {
  return (
    <ExperiencePageClient 
      totalYears={Math.round(totalYears)}
      totalCompanies={totalCompanies}
      totalProjects={totalProjects}
      totalTech={totalTech}
    />
  );
}