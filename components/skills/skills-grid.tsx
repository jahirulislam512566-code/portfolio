// components/skills/skills-grid.tsx
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillCategory } from "./skill-category";
import { SkillCard } from "./skill-card";
import { Skill, SkillGroup } from "@/types/skill";
import { skillsData } from "@/data/skills";
import { cn } from "@/lib/utils";
import { Search, Filter, Grid3x3, List, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SkillsGridProps {
  className?: string;
  showCategories?: boolean;
  variant?: 'default' | 'compact' | 'expanded';
  columns?: 2 | 3 | 4;
  showSearch?: boolean;
  showFilter?: boolean;
  showViewToggle?: boolean;
}

// ✅ Animation variants with proper typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,

      stiffness: 200,
      damping: 25,
    },
  },
};

const tabContentVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const

    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: "easeIn" as const, // ✅ Fixed
    },
  },
};

export function SkillsGrid({ 
  className, 
  showCategories = true,
  variant = 'default',
  columns = 3,
  showSearch = true,
  showFilter = true,
  showViewToggle = true
}: SkillsGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);

  // ✅ Memoize allSkills
  const allSkills = useMemo(() => {
    return skillsData.flatMap(group => group.skills);
  }, []);

  // ✅ Memoize allTags
  const allTags = useMemo(() => {
    return Array.from(
      new Set(skillsData.flatMap(group => 
        group.skills.flatMap(skill => skill.tags || [])
      ))
    );
  }, []);

  // ✅ Memoize filtered skills with useMemo instead of useEffect
  const displaySkills = useMemo(() => {
    let filtered = allSkills;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(skill => 
        skill.name.toLowerCase().includes(query) ||
        skill.description?.toLowerCase().includes(query) ||
        skill.category?.toLowerCase().includes(query) ||
        skill.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    if (selectedTags.length > 0) {
      filtered = filtered.filter(skill =>
        selectedTags.every(tag => skill.tags?.includes(tag))
      );
    }
    
    return filtered;
  }, [searchQuery, selectedTags, allSkills]);

  // ✅ Toggle tag selection with useCallback
  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }, []);

  // ✅ Clear filters with useCallback
  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedTags([]);
  }, []);

  // ✅ Grid columns configuration
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  // ✅ Get category groups with proper typing
  const categoryGroups = useMemo(() => {
    return skillsData.map((group) => ({
      ...group,
      // Ensure label is used for display
      label: group.label || group.category,
    }));
  }, []);

  // ✅ Flat grid without categories
  if (!showCategories) {
    return (
      <div className={cn("space-y-6", className)}>
        {/* Search and Filter Bar */}
        {(showSearch || showFilter) && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-3"
          >
            {showSearch && (
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            )}
            
            {showViewToggle && (
              <div className="flex gap-1 p-1 bg-muted rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {(searchQuery || selectedTags.length > 0) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="gap-1"
              >
                <X className="h-3 w-3" />
                Clear
              </Button>
            )}
          </motion.div>
        )}

        {/* Filter Tags */}
        {showFilter && allTags.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-1.5"
          >
            {allTags.slice(0, 10).map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
            {allTags.length > 10 && (
              <Badge variant="outline" className="cursor-default">
                +{allTags.length - 10} more
              </Badge>
            )}
          </motion.div>
        )}

        {/* Results count */}
        {(searchQuery || selectedTags.length > 0) && (
          <p className="text-sm text-muted-foreground">
            Found {displaySkills.length} skill{displaySkills.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* Skills Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className={cn(
            viewMode === 'list' ? "space-y-3" : gridCols[columns],
            "gap-3 md:gap-4"
          )}
        >
          <AnimatePresence mode="wait">
            {displaySkills.map((skill, index) => (
              <motion.div 
                key={skill.id} 
                variants={itemVariants}
                layout
              >
                <SkillCard 
                  skill={skill} 
                  index={index}
                  variant={viewMode === 'list' ? 'compact' : variant}
                  className={viewMode === 'list' ? "w-full" : ""}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {displaySkills.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No skills found matching your criteria.</p>
            <Button variant="link" onClick={clearFilters} className="mt-2">
              Clear filters
            </Button>
          </motion.div>
        )}
      </div>
    );
  }

  // ✅ Categorized view with tabs
  return (
    <div className={cn("w-full", className)}>
      {/* Search and Filter Bar */}
      {(showSearch || showFilter) && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          {showSearch && (
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          )}
          
          {(searchQuery || selectedTags.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="gap-1"
            >
              <X className="h-3 w-3" />
              Clear
            </Button>
          )}
        </motion.div>
      )}

      <Tabs 
        defaultValue={categoryGroups[0]?.category || categoryGroups[0]?.label} 
        className="w-full"
      >
        <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0 mb-6">
          {categoryGroups.map((group) => (
            <TabsTrigger 
              key={group.category} 
              value={group.category}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {group.icon && <span className="mr-2">{group.icon}</span>}
              {group.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <AnimatePresence mode="wait">
          {categoryGroups.map((group) => (
            <TabsContent key={group.category} value={group.category}>
              <motion.div
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <SkillCategory 
                  category={group}
                  skills={group.skills}
                  variant={variant}
                  columns={columns}
                />
              </motion.div>
            </TabsContent>
          ))}
        </AnimatePresence>
      </Tabs>
    </div>
  );
}