export interface Project {
  id: string | number;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  images?: string[];
  tags: string[];
  technologies: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  link?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
  date: Date | string;
  startDate?: Date | string;
  endDate?: Date | string;
  teamSize?: number;
  role?: string;
  challenges?: string[];
  solutions?: string[];
  results?: string[];
  metrics?: ProjectMetric[];
  client?: string;
}

export type ProjectCategory = 
  | "web"
  | "mobile"
  | "ai"
  | "design"
  | "ecommerce"
  | "saas"
  | "open-source"
  | "game"
  | "data"
  | "blockchain";

export type ProjectStatus = 
  | "completed"
  | "in-progress"
  | "planned"
  | "maintaining"
  | "archived";

export interface ProjectMetric {
  label: string;
  value: string | number;
  description?: string;
  icon?: string;
}

export interface ProjectFilter {
  category?: ProjectCategory;
  status?: ProjectStatus;
  technology?: string;
  featured?: boolean;
  search?: string;
}

export interface ProjectSortOptions {
  field: keyof Project;
  direction: "asc" | "desc";
}