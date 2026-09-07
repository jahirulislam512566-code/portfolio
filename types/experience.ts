export interface Experience {
  id: string | number;
  company: string;
  companyWebsite?: string;
  companyLogo?: string;
  position: string;
  location: string;
  locationType: LocationType;
  startDate: Date | string;
  endDate?: Date | string;
  isCurrent: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  industry: string;
  employmentType: EmploymentType;
  links?: {
    label: string;
    url: string;
  }[];
}

export type LocationType = 
  | "remote"
  | "hybrid"
  | "on-site";

export type EmploymentType = 
  | "full-time"
  | "part-time"
  | "contract"
  | "freelance"
  | "internship"
  | "volunteer";

export interface ExperienceTimeline {
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  duration: string;
}

export interface ExperienceFilter {
  company?: string;
  position?: string;
  locationType?: LocationType;
  employmentType?: EmploymentType;
  industry?: string;
  isCurrent?: boolean;
}