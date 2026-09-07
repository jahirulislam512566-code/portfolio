// data/about.ts

import { About, Education } from "@/types/about";

export const aboutData: About = {
  title: "About Me",
  subtitle: "Get to know me and my journey in tech",
  description: "I'm a passionate Full-Stack Developer with 3+ years of experience building web applications.",
  journey: [
    {
      year: 2018,
      title: "Started Coding",
      description: "Began my journey into web development with HTML, CSS, and JavaScript.",
    },
    {
      year: 2019,
      title: "First Professional Role",
      description: "Joined a startup as a Junior Developer, working on React and Node.js applications.",
    },
    {
      year: 2020,
      title: "Full-Stack Developer",
      description: "Transitioned to full-stack development, mastering both frontend and backend technologies.",
    },
    {
      year: 2022,
      title: "Senior Developer",
      description: "Became a senior developer at a tech company, leading projects and mentoring juniors.",
    },
  ],
  values: [
    {
      title: "Quality",
      description: "Writing clean, maintainable, and well-tested code",
      icon: "CheckCircle",
    },
    {
      title: "Innovation",
      description: "Always learning and adopting new technologies",
      icon: "Lightbulb",
    },
    {
      title: "Collaboration",
      description: "Working together to build great products",
      icon: "Users",
    },
    {
      title: "User Experience",
      description: "Creating intuitive and delightful experiences",
      icon: "Heart",
    },
  ],
  interests: [
    "Open Source Contributions",
    "Technical Writing",
    "Hackathons",
    "Mentoring",
    "Podcasts",
    "Photography",
    "Traveling",
    "Gaming",
  ],
};

export const educationData: Education[] = [
  {
    id: 1,
    institution: "University of Technology",
    institutionWebsite: "https://university.edu",
    degree: "Bachelor of Science",
    field: "Computer Science",
    startDate: "2018-08-01",
    endDate: "2022-05-01",
    isCurrent: false,
    grade: "3.8 GPA",
    description: "Graduated with honors, specializing in software engineering and machine learning.",
    achievements: [
      "Dean's List (4 semesters)",
      "Senior Project Award",
      "AI Research Assistant",
    ],
    courses: [
      "Data Structures and Algorithms",
      "Machine Learning",
      "Cloud Computing",
      "Database Systems",
    ],
    location: "San Francisco, CA",
  },
  {
    id: 2,
    institution: "Tech Academy",
    institutionWebsite: "https://w3schools.com",
    degree: "Certificate",
    field: "Full-Stack Web Development",
    startDate: "2020-06-01",
    endDate: "2021-01-01",
    isCurrent: false,
    description: "Intensive 6-month program covering modern web development technologies.",
    achievements: [
      "Top 10% of class",
      "Built 5 production-ready applications",
    ],
    courses: [
      "React & Next.js",
      "Node.js & Express",
      "MongoDB & PostgreSQL",
      "DevOps & Cloud",
    ],
    location: "Online",
  },
];