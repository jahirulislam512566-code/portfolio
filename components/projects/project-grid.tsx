"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./project-card";
import { ProjectFilter } from "./project-filter";
import { ProjectSearch } from "./project-search";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/project";
import { projectsData } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Folder } from "lucide-react";

interface ProjectGridProps {
  className?: string;
  limit?: number;
  showFilter?: boolean;
  showSearch?: boolean;
  showLoadMore?: boolean;
}

export function ProjectGrid({
  className,
  limit = 6,
  showFilter = true,
  showSearch = true,
  showLoadMore = true,
}: ProjectGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [showAll, setShowAll] = useState(false);

  // Get unique categories and statuses
  const categories = useMemo(() => {
    const cats = new Set(projectsData.map(p => p.category));
    return ["all", ...Array.from(cats)];
  }, []);

  const statuses = useMemo(() => {
    const stats = new Set(projectsData.map(p => p.status));
    return ["all", ...Array.from(stats)];
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    let filtered = projectsData;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.technologies.some((tech) => tech.toLowerCase().includes(query)) ||
          p.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter((p) => p.status === selectedStatus);
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedStatus]);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, limit);
  const hasMore = filteredProjects.length > limit;

  return (
    <div className={cn("space-y-8", className)}>
      {/* Filters */}
      {(showFilter || showSearch) && (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {showSearch && (
            <ProjectSearch onSearch={setSearchQuery} />
          )}
          {showFilter && (
            <div className="flex flex-wrap gap-2">
              <ProjectFilter
                label="Category"
                options={categories}
                value={selectedCategory}
                onChange={setSelectedCategory}
              />
              <ProjectFilter
                label="Status"
                options={statuses}
                value={selectedStatus}
                onChange={setSelectedStatus}
              />
            </div>
          )}
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {displayedProjects.length} of {filteredProjects.length} projects
      </p>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="wait">
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* No results */}
      {displayedProjects.length === 0 && (
        <div className="text-center py-12">
          <Folder className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-muted-foreground">No projects found matching your criteria</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSelectedStatus("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Load More */}
      {showLoadMore && hasMore && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="gap-2"
          >
            {showAll ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Load More ({filteredProjects.length - limit} more)
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}