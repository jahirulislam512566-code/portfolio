export interface Skill {
  id: string | number;
  name: string;
  category: SkillCategory;
  level: number; // 0-100
  icon?: string;
  iconComponent?: React.ReactNode;
  color?: string;
  yearsOfExperience?: number;
  description?: string;
  projects?: string[]; // Project IDs
  tags?: string[];
  certifications?: string[];
  // ✅ Add these missing properties
  projectsCompleted?: number; // For tracking completed projects
  isFeatured?: boolean; // For featured skills
}

export type SkillCategory = 
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "mobile"
  | "design"
  | "language"
  | "framework"
  | "library"
  | "tool"
  | "other";

export interface SkillGroup {
  category: SkillCategory;
  label: string;
  skills: Skill[];
  icon?: string;
  order?: number;
  description?: string; // Add this if you haven't already
}

export interface SkillFilter {
  category?: SkillCategory;
  level?: number;
  search?: string;
  technology?: string;
}