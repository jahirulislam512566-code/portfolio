// types/about.ts

export interface About {
  title: string;
  subtitle: string;
  description: string;
  journey: JourneyItem[];
  values: ValueItem[];
  interests: string[];
}

export interface JourneyItem {
  year: number;
  title: string;
  description: string;
}

export interface ValueItem {
  title: string;
  description: string;
  icon: string; // Icon name from lucide-react or other icon library
}

export interface Education {
  id: number | string;
  institution: string;
  institutionWebsite?: string;
  degree: string;
  field: string;
  startDate: string; // ISO date format: "YYYY-MM-DD"
  endDate?: string; // ISO date format: "YYYY-MM-DD"
  isCurrent: boolean;
  grade?: string;
  description?: string;
  achievements?: string[];
  courses?: string[];
  location?: string;
}

// If you have work experience data
export interface Experience {
  id: number | string;
  company: string;
  companyWebsite?: string;
  position: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  achievements?: string[];
  technologies?: string[];
  location?: string;
  companyLogo?: string;
}

// If you have skills data
export interface Skill {
  id: number | string;
  name: string;
  category: "frontend" | "backend" | "tools" | "other";
  proficiency: number; // 0-100
  icon?: string;
  yearsOfExperience?: number;
  color?: string;
}

// If you have testimonial data
export interface Testimonial {
  id: number | string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating?: number; // 1-5
  avatar?: string;
  date?: string;
}

// If you have project data
export interface Project {
  id: number | string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category?: string;
  startDate?: string;
  endDate?: string;
}

// Combined user profile data
export interface UserProfile {
  name: string;
  title: string;
  email: string;
  location: string;
  phone?: string;
  avatar?: string;
  bio: string;
  experience: number; // years
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
  };
  resumeUrl?: string;
}

// Export all types as a namespace
export type AboutData = About;
export type EducationData = Education[];
export type ExperienceData = Experience[];
export type SkillData = Skill[];
export type TestimonialData = Testimonial[];
export type ProjectData = Project[];
export type UserProfileData = UserProfile;