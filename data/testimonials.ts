import { Testimonial } from "@/types/testimonial";

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    author: "Sarah Johnson",
    authorTitle: "CEO",
    authorCompany: "Tech Corp Inc.",
    authorImage: "/images/testimonials/sarah.jpg",
    content: "John is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding. He's been instrumental in the success of our products.",
    rating: 5,
    date: "2024-01-15",
    isFeatured: true,
    isVerified: true,
  },
  {
    id: 2,
    author: "Michael Chen",
    authorTitle: "Product Manager",
    authorCompany: "Startup Studios",
    authorImage: "/images/testimonials/michael.jpg",
    content: "Working with John was a pleasure. He understood our requirements quickly and delivered a solution that exceeded our expectations. His technical expertise is impressive.",
    rating: 5,
    date: "2023-12-01",
    isFeatured: true,
    isVerified: true,
    response: {
      content: "Thank you, Michael! It was great working with you too.",
      date: "2023-12-05",
    },
  },
  {
    id: 3,
    author: "Emily Rodriguez",
    authorTitle: "CTO",
    authorCompany: "AI Innovations",
    authorImage: "/images/testimonials/emily.jpg",
    content: "John's work on our AI chat application was brilliant. He not only delivered the project on time but also provided valuable insights that improved the overall architecture. Highly recommended!",
    rating: 5,
    date: "2023-11-20",
    isFeatured: false,
    isVerified: true,
  },
  {
    id: 4,
    author: "David Kim",
    authorTitle: "Founder",
    authorCompany: "E-Commerce Solutions",
    authorImage: "/images/testimonials/david.jpg",
    content: "We hired John to build our e-commerce platform, and he delivered a fantastic product. His understanding of both frontend and backend development made the process smooth and efficient.",
    rating: 4,
    date: "2023-10-01",
    isFeatured: false,
    isVerified: true,
  },
];

export const testimonialStats = {
  total: testimonialsData.length,
  averageRating: 4.75,
  totalVerified: testimonialsData.filter(t => t.isVerified).length,
  ratingDistribution: {
    5: 3,
    4: 1,
    3: 0,
    2: 0,
    1: 0,
  },
};