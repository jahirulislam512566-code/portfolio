import { SiteConfig } from "@/types/site";

export const siteData: SiteConfig = {
  name: "John Doe",
  title: "John Doe - Full-Stack Developer",
  description: "Full-stack developer passionate about building exceptional digital experiences with modern web technologies.",
  url: "https://yourportfolio.com",
  domain: "yourportfolio.com",
  keywords: [
    "portfolio",
    "developer",
    "full-stack",
    "react",
    "next.js",
    "typescript",
    "web development",
    "software engineer"
  ],
  author: {
    name: "John Doe",
    title: "Senior Full-Stack Developer",
    bio: "Passionate developer with 5+ years of experience building scalable web applications. Specializing in React, Next.js, and cloud technologies. I love creating beautiful, performant, and user-friendly applications that solve real-world problems.",
    avatar: "/images/avatar.jpg",
    email: "john@example.com",
    location: "San Francisco, CA",
    experience: 5,
  },
  social: {
    github: "https://github.com/jahirulislam512566-code",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
    instagram: "https://instagram.com/johndoe",
    youtube: "https://youtube.com/@johndoe",
  },
  contact: {
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "San Francisco, CA, USA",
    calendar: "https://cal.com/johndoe/30min",
    officeHours: {
      timezone: "America/Los_Angeles",
      schedule: "Mon-Fri 9:00 AM - 5:00 PM PST",
    },
  },
  theme: {
    primary: "#6366f1",
    secondary: "#ec4899",
    background: "#ffffff",
    text: "#1f2937",
    accent: "#8b5cf6",
    fonts: {
      heading: "Inter",
      body: "Inter",
    },
  },
  analytics: {
    googleAnalytics: process.env.NEXT_PUBLIC_GA_ID || "",
    plausible: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "",
  },
  meta: {
    ogImage: "/images/og-image.jpg",
    favicon: "/favicon.ico",
    appleTouchIcon: "/apple-touch-icon.png",
    manifest: "/site.webmanifest",
  },
  features: {
    blog: true,
    portfolio: true,
    testimonials: true,
    services: true,
    contactForm: true,
    comments: false,
    analytics: true,
    darkMode: true,
    search: true,
    newsletter: false,
  },
};