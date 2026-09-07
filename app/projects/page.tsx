import { Metadata } from "next";
import { ProjectsPageClient } from "./ProjectsPageClient";
import { projectsData } from "@/data/projects";
import { siteConfig } from "@/config/site.config";

// Generate metadata for the page
export const metadata: Metadata = {
  title: "Projects",
  description: "Explore my portfolio of projects including web applications, AI solutions, and design work.",
  keywords: ["projects", "portfolio", "web development", "case studies"],
  openGraph: {
    title: "Projects | John Doe",
    description: "Explore my portfolio of projects including web applications, AI solutions, and design work.",
    url: `${siteConfig.url}/projects`,
    images: [
      {
        url: `${siteConfig.url}/images/og-projects.jpg`,
        width: 1200,
        height: 630,
        alt: "Projects",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | John Doe",
    description: "Explore my portfolio of projects including web applications, AI solutions, and design work.",
    images: [`${siteConfig.url}/images/og-projects.jpg`],
  },
};

export default function ProjectsPage() {
  // Calculate data on the server
  const categories = new Set(projectsData.map(p => p.category));
  const completedProjects = projectsData.filter(p => p.status === "completed").length;
  const featuredProjects = projectsData.filter(p => p.featured).length;
  const totalProjects = projectsData.length;

  // Pass data as props to the client component
  return (
    <ProjectsPageClient 
      totalProjects={totalProjects}
      completedProjects={completedProjects}
      featuredProjects={featuredProjects}
      categories={categories}
    />
  );
}