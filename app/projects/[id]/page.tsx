// app/projects/[id]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  CaseStudyHero,
  CaseStudyOverview,
  CaseStudyProblem,
  CaseStudySolution,
  CaseStudyFeatures,
  CaseStudyGallery,
  CaseStudyChallenges,
  CaseStudyResults,
  CaseStudyNavigation,
} from "@/components/projects/case-study";
import { BackToTop } from "@/components/layout";
import { projectsData } from "@/data/projects";
import { siteConfig } from "@/config/site.config";

// ✅ Define proper types for project data
interface Feature {
  title: string;
  description: string;
}

interface Result {
  label: string;
  value: string;
  icon: string;
}

interface Project {
  id: number | string;
  title: string;
  slug?: string;
  description: string;
  tags?: string[];
  image?: string;
  images?: string[];
  featured?: Feature[];
  results?: Result[];
  challenges?: string[];
  solutions?: string[];
  [key: string]: any; // For other fields
}

interface ProjectCaseStudyProps {
  params: {
    id: string;
  };
}

// Generate static paths for all projects
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: String(project.id),
  }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: ProjectCaseStudyProps): Promise<Metadata> {
  const project = projectsData.find(p => p.id === Number(params.id));
  
  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} | Projects`,
    description: project.description,
    keywords: project.tags,
    openGraph: {
      title: `${project.title} | Projects`,
      description: project.description,
      url: `${siteConfig.url}/projects/${project.id}`,
      images: project.image ? [{ url: project.image }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Projects`,
      description: project.description,
      images: project.image ? [project.image] : [],
    },
  };
}

export default function ProjectCaseStudy({ params }: ProjectCaseStudyProps) {
  // Find the project
  const project = projectsData.find(p => p.id === Number(params.id));
  
  // If project not found, show 404
  if (!project) {
    notFound();
  }

  // Find prev/next projects
  const currentIndex = projectsData.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : undefined;
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : undefined;

  // ✅ FIXED: Properly typed features with explicit type assertion
  const features: Feature[] = (Array.isArray(project.featured) && project.featured.length > 0) 
    ? (project.featured as Feature[]) // ✅ Type assertion to ensure correct type
    : [
        {
          title: "Responsive Design",
          description: "Optimized for all devices and screen sizes.",
        },
        {
          title: "User Authentication",
          description: "Secure login and user management system.",
        },
        {
          title: "Real-time Updates",
          description: "Instant data synchronization and updates.",
        },
      ];

  // ✅ FIXED: Properly typed results with explicit type assertion
  const results: Result[] = (Array.isArray(project.results) && project.results.length > 0) 
    ? (project.results as unknown as Result[]) // ✅ Type assertion to ensure correct type
    : [
        { label: "Performance", value: "Optimized", icon: "🚀" },
        { label: "User Experience", value: "Enhanced", icon: "✨" },
        { label: "Reliability", value: "99.9%", icon: "🛡️" },
        { label: "Satisfaction", value: "100%", icon: "⭐" },
      ];

  // ✅ Ensure challenges and solutions are arrays
  const challenges = Array.isArray(project.challenges) ? project.challenges : [];
  const solutions = Array.isArray(project.solutions) ? project.solutions : [];
  const images = Array.isArray(project.images) ? project.images : [];

  return (
    <main className="min-h-screen">
      {/* Case Study Content */}
      <article>
        {/* Hero Section */}
        <CaseStudyHero project={project} />
        
        {/* Overview Section */}
        <section className="py-8">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <CaseStudyOverview project={project} />
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="container max-w-4xl">
          <hr className="border-border" />
        </div>

        {/* Problem Section */}
        {challenges.length > 0 && (
          <section className="py-8">
            <div className="container max-w-4xl mx-auto">
              <CaseStudyProblem problems={challenges} />
            </div>
          </section>
        )}

        {/* Solution Section */}
        {solutions.length > 0 && (
          <section className="py-8">
            <div className="container max-w-4xl mx-auto">
              <CaseStudySolution solutions={solutions} />
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-8">
          <div className="container max-w-4xl mx-auto">
            <CaseStudyFeatures features={features} />
          </div>
        </section>

        {/* Gallery Section */}
        {images.length > 0 && (
          <section className="py-8">
            <div className="container max-w-4xl mx-auto">
              <CaseStudyGallery images={images} />
            </div>
          </section>
        )}

        {/* Challenges Section */}
        {challenges.length > 0 && (
          <section className="py-8">
            <div className="container max-w-4xl mx-auto">
              <CaseStudyChallenges 
                challenges={challenges.map((challenge: string) => ({
                  title: challenge.slice(0, 50),
                  description: challenge
                }))}
              />
            </div>
          </section>
        )}

        {/* Results Section */}
        <section className="py-8">
          <div className="container max-w-4xl mx-auto">
            <CaseStudyResults results={results} />
          </div>
        </section>

        {/* Navigation */}
        <CaseStudyNavigation 
          prevProject={prevProject} 
          nextProject={nextProject} 
        />
      </article>

      {/* Back to Top Button */}
      <BackToTop />
    </main>
  );
}