import { SEO } from "@/types/site";

// Default SEO configuration
export const defaultSEO: SEO = {
  title: "John Doe - Full-Stack Developer Portfolio",
  description: "Full-stack developer passionate about building exceptional digital experiences with React, Next.js, and modern web technologies.",
  keywords: [
    "portfolio",
    "developer",
    "full-stack",
    "react",
    "next.js",
    "typescript",
    "web development"
  ],
  ogImage: "/images/og-image.jpg",
  ogTitle: "John Doe - Full-Stack Developer Portfolio",
  ogDescription: "Full-stack developer passionate about building exceptional digital experiences.",
  canonical: "https://yourportfolio.com",
  noIndex: false,
  noFollow: false,
  schema: {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "John Doe",
    "jobTitle": "Full-Stack Developer",
    "url": "https://yourportfolio.com",
    "sameAs": [
      "https://github.com/jahirulislam512566-code",
      "https://linkedin.com/in/johndoe",
      "https://twitter.com/johndoe"
    ],
  },
};

// Page-specific SEO configurations
export const seoConfig = {
  home: {
    title: "John Doe - Full-Stack Developer Portfolio",
    description: "Full-stack developer building exceptional digital experiences. Specializing in React, Next.js, and cloud technologies.",
    keywords: ["portfolio", "developer", "full-stack", "react", "next.js"],
    ogImage: "/images/og-image.jpg",
    ogTitle: "John Doe - Full-Stack Developer Portfolio",
  },
  about: {
    title: "About Me - John Doe",
    description: "Learn about John Doe, a passionate full-stack developer with 5+ years of experience building web applications.",
    keywords: ["about", "developer", "experience", "skills"],
    ogImage: "/images/about-og.jpg",
  },
  projects: {
    title: "Projects - John Doe",
    description: "Explore my portfolio of web development projects including e-commerce, AI applications, and more.",
    keywords: ["projects", "portfolio", "web development", "case studies"],
    ogImage: "/images/projects-og.jpg",
  },
  blog: {
    title: "Blog - John Doe",
    description: "Read articles and tutorials about web development, programming, and technology.",
    keywords: ["blog", "programming", "web development", "tutorials"],
    ogImage: "/images/blog-og.jpg",
  },
  contact: {
    title: "Contact - John Doe",
    description: "Get in touch with John Doe for collaboration, opportunities, or just to say hello.",
    keywords: ["contact", "email", "collaboration", "opportunities"],
    ogImage: "/images/contact-og.jpg",
  },
};

// Open Graph configuration
export const ogConfig = {
  siteName: "John Doe Portfolio",
  type: "website",
  locale: "en_US",
  imageWidth: 1200,
  imageHeight: 630,
  twitterCard: "summary_large_image",
  twitterSite: "@johndoe",
};

// JSON-LD schemas for structured data
export const schemas = {
  person: {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "John Doe",
    "jobTitle": "Full-Stack Developer",
    "url": "https://yourportfolio.com",
    "sameAs": [
      "https://github.com/jahirulislam512566-code",
      "https://linkedin.com/in/johndoe",
      "https://twitter.com/johndoe"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Tech Company"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "University of Technology"
    },
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://yourportfolio.com",
    "name": "John Doe Portfolio",
    "description": "Full-stack developer portfolio showcasing projects and skills.",
    "author": {
      "@type": "Person",
      "name": "John Doe"
    },
  },
  blog: {
    "@context": "https://schema.org",
    "@type": "Blog",
    "url": "https://yourportfolio.com/blog",
    "name": "John Doe's Blog",
    "description": "Articles about web development and programming.",
  },
};