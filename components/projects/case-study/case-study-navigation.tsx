"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseStudyNavigationProps {
  prevProject?: { id: string | number; title: string; slug?: string };
  nextProject?: { id: string | number; title: string; slug?: string };
  className?: string;
}

export function CaseStudyNavigation({
  prevProject,
  nextProject,
  className,
}: CaseStudyNavigationProps) {
  return (
    <div className={cn("py-12 border-t", className)}>
      <div className="container max-w-4xl">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Back to projects */}
          <div className="sm:col-span-2 flex justify-center mb-4">
            <Button variant="outline" asChild>
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Projects
              </Link>
            </Button>
          </div>

          {/* Previous */}
          {prevProject && (
            <Button variant="ghost" className="justify-start" asChild>
              <Link href={`/projects/${prevProject.id}`}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Previous</p>
                  <p className="text-sm font-medium">{prevProject.title}</p>
                </div>
              </Link>
            </Button>
          )}

          {/* Next */}
          {nextProject && (
            <Button variant="ghost" className="justify-end sm:ml-auto" asChild>
              <Link href={`/projects/${nextProject.id}`}>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Next</p>
                  <p className="text-sm font-medium">{nextProject.title}</p>
                </div>
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}