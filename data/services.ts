// data/services.ts
import {
  Cloud,
  Database,
  Globe2,
  Lightbulb,
  Palette,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

import type { Service } from "@/types/service";

export const servicesData: Service[] = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Building responsive, performant, and scalable web applications.",
    longDescription:
      "I build modern web applications using reliable technologies and scalable architecture. From high-converting landing pages to complex SaaS platforms, every project is designed for performance, accessibility, and maintainability.",
    icon: Globe2, // ✅ Now correctly typed as LucideIcon
    features: [
      "Responsive design for all devices",
      "Server-side rendering",
      "Performance optimization",
      "REST API integration",
      "Authentication systems",
      "Payment integration",
    ],
    pricingModel: "project-based" as const,
    price: "Starting at $2,000",
    deliveryTime: "2–4 weeks",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
    ],
    isAvailable: true,
  },
  {
    id: 2,
    title: "UI/UX Design",
    description:
      "Creating clean, intuitive, and engaging digital experiences.",
    longDescription:
      "I design user-centered interfaces that combine visual quality with usability. From wireframes and prototypes to complete design systems, every interface is created to feel clear, modern, and intuitive.",
    icon: Palette,
    features: [
      "User flows",
      "Wireframes",
      "Interactive prototypes",
      "Design systems",
      "Responsive layouts",
      "Accessibility-focused design",
    ],
    pricingModel: "project-based" as const,
    price: "Starting at $1,500",
    deliveryTime: "1–3 weeks",
    technologies: [
      "Figma",
      "Adobe XD",
      "Design Systems",
      "Prototyping",
      "UI/UX",
    ],
    isAvailable: true,
  },
  {
    id: 3,
    title: "Backend Development",
    description:
      "Building secure APIs, databases, and reliable backend systems.",
    longDescription:
      "I develop robust backend systems for business logic, databases, authentication, integrations, and APIs. The architecture is designed with security, scalability, and long-term maintainability in mind.",
    icon: Database,
    features: [
      "RESTful API development",
      "Database architecture",
      "Authentication and authorization",
      "File storage",
      "Email systems",
      "Third-party integrations",
    ],
    pricingModel: "project-based" as const,
    price: "Starting at $2,500",
    deliveryTime: "2–5 weeks",
    technologies: [
      "Node.js",
      "Laravel",
      "PHP",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
    ],
    isAvailable: true,
  },
  {
    id: 4,
    title: "Cloud & DevOps",
    description:
      "Deploying and maintaining reliable, scalable cloud infrastructure.",
    longDescription:
      "I help deploy and maintain production applications using modern cloud and DevOps practices. The focus is on reliable deployments, scalability, monitoring, and infrastructure performance.",
    icon: Cloud,
    features: [
      "Cloud architecture",
      "CI/CD pipelines",
      "Docker containerization",
      "Production deployment",
      "Monitoring and logging",
      "Performance optimization",
    ],
    pricingModel: "hourly" as const,
    price: "$75/hour",
    deliveryTime: "Flexible",
    technologies: [
      "AWS",
      "Vercel",
      "Docker",
      "GitHub Actions",
      "Linux",
      "CI/CD",
    ],
    isAvailable: true,
  },
  {
    id: 5,
    title: "Mobile Development",
    description:
      "Creating modern cross-platform mobile applications.",
    longDescription:
      "I build cross-platform mobile applications focused on performance, usability, and maintainability. Applications can share business logic while providing a polished experience across platforms.",
    icon: Smartphone,
    features: [
      "Cross-platform development",
      "Native-like performance",
      "Push notifications",
      "Offline functionality",
      "API integration",
      "App deployment",
    ],
    pricingModel: "project-based" as const,
    price: "Starting at $3,000",
    deliveryTime: "3–6 weeks",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "Redux",
      "Firebase",
    ],
    isAvailable: true,
  },
  {
    id: 6,
    title: "Consulting & Mentoring",
    description:
      "Technical guidance for developers, teams, and digital products.",
    longDescription:
      "I provide practical technical guidance for architecture, code quality, technology selection, performance, security, and developer workflows.",
    icon: Lightbulb,
    features: [
      "Architecture reviews",
      "Code reviews",
      "Technology selection",
      "Performance optimization",
      "Security recommendations",
      "Developer mentoring",
    ],
    pricingModel: "hourly" as const,
    price: "$100/hour",
    deliveryTime: "Flexible scheduling",
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "Laravel",
      "TypeScript",
      "Architecture",
    ],
    isAvailable: true,
  },
];

/* =========================================================
   Service Packages
========================================================= */

export const servicePackages = {
  "web-development": {
    basic: {
      name: "Basic",
      price: "$2,000",
      description:
        "A professional website for individuals and small businesses.",
      features: [
        "Up to 5 pages",
        "Responsive design",
        "Basic technical SEO",
        "Contact form",
        "Performance optimization",
        "Deployment setup",
      ],
    },
    standard: {
      name: "Standard",
      price: "$4,000",
      description:
        "A complete website with content and growth features.",
      features: [
        "Up to 10 pages",
        "Responsive design",
        "Advanced technical SEO",
        "Contact form",
        "Blog integration",
        "Analytics integration",
        "Performance optimization",
        "Deployment setup",
      ],
    },
    premium: {
      name: "Premium",
      price: "$8,000",
      description:
        "A powerful custom web platform for growing businesses.",
      features: [
        "Unlimited pages",
        "Custom responsive design",
        "Advanced SEO",
        "Blog and CMS",
        "Analytics",
        "User authentication",
        "Payment processing",
        "Admin dashboard",
        "API integrations",
        "Performance optimization",
        "Production deployment",
      ],
    },
  },
} as const;

/* =========================================================
   Helpers
========================================================= */

export function createServiceSlug(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getServiceById(
  id: number
): Service | undefined {
  return servicesData.find(
    (service) => service.id === id
  );
}

export function getServiceBySlug(
  slug: string
): Service | undefined {
  return servicesData.find(
    (service) => createServiceSlug(service.title) === slug
  );
}

export function getAvailableServices(): Service[] {
  return servicesData.filter(
    (service) => service.isAvailable
  );
}

export function getServiceSlugs(): string[] {
  return servicesData.map((service) =>
    createServiceSlug(service.title)
  );
}