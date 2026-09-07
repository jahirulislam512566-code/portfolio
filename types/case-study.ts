// types/case-study.ts
export interface Feature {
  title: string;
  description: string;
}

export interface Result {
  label: string;
  value: string;
  icon: string;
}

export interface Challenge {
  title: string;
  description: string;
}

export interface Project {
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
}