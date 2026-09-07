// data/hero.ts
export const heroData = {
  // ✅ Added greeting (used in hero-content.tsx)
  greeting: "Hi, I'm",
  
  // ✅ Added rolePrefix (used in hero-content.tsx)
  rolePrefix: "Specializing in Full Stack Development",
  
  // ✅ Added profileImageAlt (used in hero-image.tsx)
  profileImageAlt: "Jahir Rayhan - Full-Stack Developer",
  
  // ✅ Added profileImagePlaceholder (used in hero-image.tsx)
  profileImagePlaceholder: "Jahir Rayhan",
  
  title: "Hi, I'm Jahir Rayhan",
  subtitle: "Full-Stack Developer",
  description: "Passionate about building exceptional digital experiences with modern web technologies. I specialize in creating beautiful, performant, and user-friendly applications.",
  
  cta: {
    primary: {
      label: "View My Work",
      href: "/projects", // ✅ Added leading slash for consistency
    },
    secondary: {
      label: "Contact Me",
      href: "/contact", // ✅ Added leading slash for consistency
    },
  },
  
  stats: [
    {
      label: "Years Experience",
      value: 3,
      suffix: "+",
      description: "Professional experience",
      trend: { value: 20, label: "growth", positive: true },
    },
    {
      label: "Projects Completed",
      value: 20,
      suffix: "+",
      description: "Completed projects",
      trend: { value: 15, label: "increase", positive: true },
    },
    {
      label: "Happy Clients",
      value: 15,
      suffix: "+",
      description: "Happy clients",
      trend: { value: 10, label: "increase", positive: true },
    },
    {
      label: "Technologies",
      value: 10,
      suffix: "+",
      description: "Technologies mastered",
      trend: { value: 5, label: "growth", positive: true },
    },
  ],
  
  socialLinks: [
    {
      platform: "github",
      url: "https://github.com/jahirulislam512566-code",
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com/in/johndoe",
    },
    {
      platform: "twitter",
      url: "https://twitter.com/johndoe",
    },
  ],
  
  typewriterTexts: [
    "Full-Stack Developer",
    "React Expert",
    "UI/UX Enthusiast",
    "Problem Solver",
  ],
  
  profileImage: "/images/profile.jpg",
  
  status: {
    label: "Available for work",
    status: "active",
  },
};