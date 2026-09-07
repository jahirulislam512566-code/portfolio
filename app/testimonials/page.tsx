import { Metadata } from "next";
import { TestimonialsPageClient } from "./TestimonialsPageClient";
import { testimonialsData, testimonialStats } from "@/data/testimonials";
import { siteConfig } from "@/config/site.config";

// Generate metadata for the page
export const metadata: Metadata = {
  title: "Testimonials",
  description: "What people say about working with me. Read reviews and feedback from clients and colleagues.",
  keywords: ["testimonials", "reviews", "feedback", "clients", "recommendations"],
  openGraph: {
    title: "Testimonials | John Doe",
    description: "What people say about working with me. Read reviews and feedback from clients and colleagues.",
    url: `${siteConfig.url}/testimonials`,
    images: [
      {
        url: `${siteConfig.url}/images/og-testimonials.jpg`,
        width: 1200,
        height: 630,
        alt: "Testimonials",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Testimonials | John Doe",
    description: "What people say about working with me. Read reviews and feedback from clients and colleagues.",
    images: [`${siteConfig.url}/images/og-testimonials.jpg`],
  },
};

export default function TestimonialsPage() {
  // Calculate data on the server
  const totalTestimonials = testimonialsData.length;
  const avgRating = testimonialStats.averageRating;
  const totalVerified = testimonialStats.totalVerified;
  const fiveStarRatings = testimonialStats.ratingDistribution[5] || 0;
  const ratingDistribution = testimonialStats.ratingDistribution;

  return (
    <TestimonialsPageClient 
      totalTestimonials={totalTestimonials}
      avgRating={avgRating}
      totalVerified={totalVerified}
      fiveStarRatings={fiveStarRatings}
      ratingDistribution={ratingDistribution}
    />
  );
}