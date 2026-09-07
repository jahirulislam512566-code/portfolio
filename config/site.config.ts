// config/site.config.ts
import { SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
  name: "Jahir Rayhan",
  title: "Jahir Rayhan - Full-Stack Developer",
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
    "software engineer",
  ],
  author: {
    name: "Jahir Rayhan",
    title: "Senior Full-Stack Developer",
    bio: "Passionate developer with 3+ years of experience building scalable web applications. Specializing in React, Next.js, and cloud technologies.",
    avatar: "/images/profile.jpg",
    email: "rayhanjahir662@gmail.com",
    location: "Meghna, Cumilla, Bangladesh",
    experience: 5,
    // ✅ Added missing fields
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "MongoDB",
      "GraphQL",
      "Docker",
      "AWS",
      "Framer Motion",
    ],
    socials: {
      github: "https://github.com/jahirulislam512566-code",
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
      youtube: "https://youtube.com/@johndoe",
      instagram: "https://instagram.com/johndoe",
      discord: "https://discord.gg/johndoe",
      mastodon: "https://mastodon.social/@johndoe",
      dribbble: "https://dribbble.com/johndoe",
      medium: "https://medium.com/@johndoe",
      devto: "https://dev.to/johndoe",
      stackoverflow: "https://stackoverflow.com/users/1234567/johndoe",
    },
  },
  social: {
    github: "https://github.com/jahirulislam512566-code",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
    instagram: "https://instagram.com/johndoe",
    youtube: "https://youtube.com/@johndoe",
    discord: "https://discord.gg/johndoe",
    mastodon: "https://mastodon.social/@johndoe",
    dribbble: "https://dribbble.com/johndoe",
    medium: "https://medium.com/@johndoe",
    devto: "https://dev.to/johndoe",
    stackoverflow: "https://stackoverflow.com/users/1234567/johndoe",
  },
  contact: {
    email: "rayhanjahir662@gmail.com",
    phone: "+880 1616547245",
    address: "Meghna, Cumilla, Bangladesh",
    calendar: "https://cal.com/johndoe/30min",
    officeHours: {
      timezone: "Bangladesh/Dhaka",
      schedule: "Always Open",
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
    googleAnalytics: "G-XXXXXXXXXX",
    plausible: "yourdomain.com",
    umami: "your-umami-website-id",
    hotjar: "1234567",
    clarity: "clarity-project-id",
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

// ✅ Navigation configuration - Fixed
export const navigationConfig = {
  main: [
    {
      id: "home",
      label: "Home",
      href: "/", // ✅ Added leading slash
      icon: "Home",
      order: 1,
    },
    {
      id: "about",
      label: "About",
      href: "/about", // ✅ Added leading slash
      icon: "User",
      order: 2,
    },
    {
      id: "skills",
      label: "Skills",
      href: "/skills", // ✅ Added leading slash
      icon: "Code2",
      order: 3,
    },
    {
      id: "projects",
      label: "Projects",
      href: "/projects", // ✅ Added leading slash
      icon: "Folder",
      order: 4,
    },
    {
      id: "experience",
      label: "Experience",
      href: "/experience", // ✅ Added leading slash
      icon: "Briefcase",
      order: 5, // ✅ Fixed duplicate order
    },
    {
      id: "testimonials",
      label: "Testimonials",
      href: "/testimonials", // ✅ Added leading slash
      icon: "MessageSquare",
      order: 6,
    },
    {
      id: "blog",
      label: "Blog",
      href: "/blog", // ✅ Added leading slash
      icon: "PenSquare",
      order: 7,
    },
    {
      id: "contact",
      label: "Contact",
      href: "/contact", // ✅ Added leading slash
      icon: "Mail",
      order: 8,
    },
  ],
  footer: [
    {
      id: "footer-home",
      label: "Home",
      href: "/", // ✅ Added leading slash
      icon: "Home",
    },
    {
      id: "footer-about",
      label: "About",
      href: "/about", // ✅ Added leading slash
      icon: "User",
    },
    {
      id: "footer-projects",
      label: "Projects",
      href: "/projects", // ✅ Added leading slash
      icon: "Folder",
    },
    {
      id: "footer-blog",
      label: "Blog",
      href: "/blog", // ✅ Added leading slash
      icon: "PenSquare",
    },
    {
      id: "footer-contact",
      label: "Contact",
      href: "/contact", // ✅ Added leading slash
      icon: "Mail",
    },
  ],
  social: [
    {
      id: "social-github",
      label: "GitHub",
      href: "https://github.com/jahirulislam512566-code",
      icon: "Github",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      id: "social-linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/in/johndoe",
      icon: "Linkedin",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      id: "social-twitter",
      label: "Twitter",
      href: "https://twitter.com/johndoe",
      icon: "Twitter",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      id: "social-youtube",
      label: "YouTube",
      href: "https://youtube.com/@johndoe",
      icon: "Youtube",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      id: "social-instagram",
      label: "Instagram",
      href: "https://instagram.com/johndoe",
      icon: "Instagram",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      id: "social-discord",
      label: "Discord",
      href: "https://discord.gg/johndoe",
      icon: "Discord",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      id: "social-mastodon",
      label: "Mastodon",
      href: "https://mastodon.social/@johndoe",
      icon: "Mastodon",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      id: "social-dribbble",
      label: "Dribbble",
      href: "https://dribbble.com/johndoe",
      icon: "Dribbble",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      id: "social-medium",
      label: "Medium",
      href: "https://medium.com/@johndoe",
      icon: "Medium",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      id: "social-devto",
      label: "Dev.to",
      href: "https://dev.to/johndoe",
      icon: "Devto",
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      id: "social-stackoverflow",
      label: "Stack Overflow",
      href: "https://stackoverflow.com/users/1234567/johndoe",
      icon: "Stackoverflow",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ],
};

// ✅ Feature flags
export const featureFlags = {
  enableBlog: true,
  enableComments: false,
  enableAnalytics: process.env.NODE_ENV === "production",
  enableSearch: true,
  enableNewsletter: false,
  enableDarkMode: true,
  enableAnimations: true,
  enableTestimonials: true,
  enableServices: true,
  enablePortfolio: true,
  enableContactForm: true,
};