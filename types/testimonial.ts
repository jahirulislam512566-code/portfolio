export interface Testimonial {
  id: string | number;
  author: string;
  authorTitle?: string;
  authorCompany?: string;
  authorImage?: string;
  content: string;
  rating?: number;
  date: Date | string;
  project?: string; // Project ID
  service?: string; // Service ID
  isFeatured?: boolean;
   projectLink?: string;
  isVerified?: boolean;
  response?: {
    content: string;
    date: Date | string;
  };
}

export interface TestimonialStats {
  total: number;
  averageRating: number;
  totalVerified: number;
  ratingDistribution: Record<number, number>;
}

export interface TestimonialFilter {
  rating?: number;
  isFeatured?: boolean;
  isVerified?: boolean;
  project?: string;
  service?: string;
  search?: string;
}