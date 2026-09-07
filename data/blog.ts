import { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building a Modern E-Commerce Platform with Next.js and Stripe",
    slug: "building-ecommerce-nextjs-stripe",
    excerpt: "Learn how to build a full-stack e-commerce platform using Next.js, Stripe, and modern web technologies.",
    content: `
      <p>In this comprehensive guide, we'll walk through building a modern e-commerce platform from scratch...</p>
      <h2>Introduction</h2>
      <p>E-commerce has become an essential part of modern business...</p>
      <h2>Setting Up the Project</h2>
      <p>We'll start by setting up our Next.js project...</p>
      <h2>Payment Integration</h2>
      <p>Integrating Stripe for secure payment processing...</p>
    `,
    coverImage: "/images/blog/ecommerce.jpg",
    coverImageAlt: "E-commerce platform building guide",
    author: {
      name: "John Doe",
      image: "/images/avatar.jpg",
      bio: "Full-Stack Developer passionate about modern web technologies.",
      social: {
        twitter: "https://twitter.com/johndoe",
        github: "https://github.com/jahirulislam512566-code",
        linkedin: "https://linkedin.com/in/johndoe",
      },
    },
    publishedDate: "2024-01-10",
    updatedDate: "2024-01-15",
    tags: ["Next.js", "Stripe", "E-Commerce", "TypeScript"],
    category: "technology",
    status: "published",
    readingTime: 8,
    likes: 120,
    views: 1500,
    comments: [
      {
        id: 1,
        author: {
          name: "Jane Smith",
          image: "/images/comments/jane.jpg",
          bio: "Developer",
        },
        content: "Great tutorial! Very helpful for my project.",
        date: "2024-01-12",
        likes: 15,
        isApproved: true,
        replies: [
          {
            id: 2,
            author: {
              name: "John Doe",
              image: "/images/avatar.jpg",
              bio: "Author",
            },
            content: "Thank you Jane! Glad you found it helpful.",
            date: "2024-01-12",
            likes: 5,
            isApproved: true,
          },
        ],
      },
    ],
    isFeatured: true,
    seo: {
      title: "Building a Modern E-Commerce Platform | John Doe",
      description: "Learn how to build a full-stack e-commerce platform using Next.js, Stripe, and modern web technologies.",
      keywords: ["ecommerce", "next.js", "stripe", "web development"],
    },
  },
  {
    id: 2,
    title: "Getting Started with AI Chat Applications",
    slug: "getting-started-ai-chat-applications",
    excerpt: "Explore how to build AI-powered chat applications using OpenAI and modern web technologies.",
    content: `
      <p>Artificial Intelligence is revolutionizing the way we interact with applications...</p>
      <h2>Introduction to AI Chat</h2>
      <p>AI chat applications are becoming increasingly popular...</p>
      <h2>Setting Up OpenAI</h2>
      <p>We'll start by integrating OpenAI's API...</p>
    `,
    coverImage: "/images/blog/ai-chat.jpg",
    coverImageAlt: "AI Chat Application guide",
    author: {
      name: "John Doe",
      image: "/images/avatar.jpg",
      bio: "Full-Stack Developer passionate about AI.",
      social: {
        twitter: "https://twitter.com/johndoe",
        github: "https://github.com/jahirulislam512566-code",
      },
    },
    publishedDate: "2023-12-20",
    tags: ["AI", "OpenAI", "React", "WebSocket"],
    category: "programming",
    status: "published",
    readingTime: 10,
    likes: 85,
    views: 1200,
    comments: [],
    isFeatured: false,
  },
  {
    id: 3,
    title: "Mastering Tailwind CSS in 2024",
    slug: "mastering-tailwind-css-2024",
    excerpt: "Discover the latest features and best practices for Tailwind CSS in 2024.",
    content: `
      <p>Tailwind CSS has become one of the most popular CSS frameworks...</p>
      <h2>What's New in Tailwind CSS</h2>
      <p>Explore the latest features and improvements...</p>
    `,
    coverImage: "/images/blog/tailwind.jpg",
    coverImageAlt: "Tailwind CSS guide",
    author: {
      name: "John Doe",
      image: "/images/avatar.jpg",
      bio: "UI/UX Enthusiast and Developer.",
      social: {
        github: "https://github.com/jahirulislam512566-code",
      },
    },
    publishedDate: "2024-01-05",
    tags: ["Tailwind CSS", "CSS", "Design", "Styling"],
    category: "design",
    status: "published",
    readingTime: 6,
    likes: 60,
    views: 800,
    comments: [],
    isFeatured: false,
  },
];

export const blogCategories = {
  "technology": "Technology",
  "programming": "Programming",
  "design": "Design",
  "career": "Career",
  "life": "Life",
  "tutorial": "Tutorial",
};

export const blogTags = [
  { id: 1, name: "Next.js", slug: "nextjs", count: 5 },
  { id: 2, name: "React", slug: "react", count: 8 },
  { id: 3, name: "TypeScript", slug: "typescript", count: 6 },
  { id: 4, name: "Tailwind CSS", slug: "tailwind", count: 4 },
  { id: 5, name: "AI", slug: "ai", count: 3 },
  { id: 6, name: "OpenAI", slug: "openai", count: 2 },
  { id: 7, name: "E-Commerce", slug: "ecommerce", count: 3 },
  { id: 8, name: "Stripe", slug: "stripe", count: 2 },
];