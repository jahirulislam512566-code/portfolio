import { NavItem, NavSection } from "@/types/navigation";

export const mainNav: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
//     icon: "Home",
    order: 1,
  },
  {
    id: "about",
    label: "About",
    href: "about",
//     icon: "User",
    order: 2,
  },
  {
    id: "skills",
    label: "Skills",
    href: "skills",
//     icon: "Code2",
    order: 3,
  },
  {
    id: "projects",
    label: "Projects",
    href: "projects",
//     icon: "Folder",
    order: 4,
  },
  {
    id: "experience",
    label: "Experience",
    href: "experience",
//     icon: "Briefcase",
    order: 5,
  },
  {
    id: "testimonials",
    label: "Testimonials",
    href: "testimonials",
//     icon: "MessageSquare",
    order: 6,
  },
  {
    id: "contact",
    label: "Contact",
    href: "contact",
//     icon: "Mail",
    order: 7,
  },
];

export const footerNav: NavSection[] = [
  {
    id: "footer-main",
    label: "Quick Links",
    items: [
      { id: "footer-home", label: "Home", href: "home" },
      { id: "footer-about", label: "About", href: "about" },
      { id: "footer-projects", label: "Projects", href: "projects" },
      { id: "footer-contact", label: "Contact", href: "contact" },
    ],
  },
  {
    id: "footer-resources",
    label: "Resources",
    items: [
      { id: "footer-blog", label: "Blog", href: "/blog" },
      { id: "footer-resume", label: "Resume", href: "/resume.pdf", isExternal: true },
      { id: "footer-github", label: "GitHub", href: "https://github.com/jahirulislam512566-code", isExternal: true },
    ],
  },
  {
    id: "footer-legal",
    label: "Legal",
    items: [
      { id: "footer-privacy", label: "Privacy Policy", href: "/privacy" },
      { id: "footer-terms", label: "Terms of Service", href: "/terms" },
    ],
  },
];

export const socialNav: NavItem[] = [
  {
    id: "social-github",
    label: "GitHub",
    href: "https://github.com/jahirulislam512566-code",
    icon: "Github",
    target: "_blank",
    rel: "noopener noreferrer",
    isExternal: true,
  },
  {
    id: "social-linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/johndoe",
    icon: "Linkedin",
    target: "_blank",
    rel: "noopener noreferrer",
    isExternal: true,
  },
  {
    id: "social-twitter",
    label: "Twitter",
    href: "https://twitter.com/johndoe",
    icon: "Twitter",
    target: "_blank",
    rel: "noopener noreferrer",
    isExternal: true,
  },
  {
    id: "social-youtube",
    label: "YouTube",
    href: "https://youtube.com/@johndoe",
    icon: "Youtube",
    target: "_blank",
    rel: "noopener noreferrer",
    isExternal: true,
  },
];

export const navSections = {
  main: mainNav,
  footer: footerNav,
  social: socialNav,
};