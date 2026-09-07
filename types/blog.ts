export interface BlogPost {
  id: string | number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  coverImageAlt?: string;
  author: BlogAuthor;
  publishedDate: Date | string;
  updatedDate?: Date | string;
  tags: string[];
  category: BlogCategory;
  status: BlogStatus;
  readingTime: number; // in minutes
  likes: number;
  views: number;
  comments: BlogComment[];
  isFeatured?: boolean;
  isArchived?: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonical?: string;
  };
}

export interface BlogAuthor {
  name: string;
  email?: string;
  image?: string;
  bio?: string;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export type BlogCategory = 
  | "technology"
  | "programming"
  | "design"
  | "career"
  | "life"
  | "tutorial"
  | "review"
  | "news"
  | "other";

export type BlogStatus = 
  | "draft"
  | "published"
  | "scheduled"
  | "archived";

export interface BlogComment {
  id: string | number;
  author: BlogAuthor;
  content: string;
  date: Date | string;
  replies?: BlogComment[];
  likes: number;
  isApproved: boolean;
  isAnonymous?: boolean;
}

export interface BlogTag {
  id: string | number;
  name: string;
  slug: string;
  count: number;
  description?: string;
}

export interface BlogFilter {
  category?: BlogCategory;
  tag?: string;
  status?: BlogStatus;
  search?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  author?: string;
  isFeatured?: boolean;
}

export interface BlogSortOptions {
  field: keyof BlogPost;
  direction: "asc" | "desc";
}