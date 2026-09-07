import { Education } from "@/types/education";

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
    institutionWebsite: "https://w3scholls.com",
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