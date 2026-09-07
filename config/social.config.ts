import { SiteSocial } from "@/types/site";

export const socialConfig: SiteSocial = {
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
};

// Social platform configuration with display names and icons
export const socialPlatforms = {
  github: {
    name: "GitHub",
    icon: "Github",
    color: "#181717",
    url: "https://github.com/jahirulislam512566-code",
    label: "GitHub Profile",
  },
  linkedin: {
    name: "LinkedIn",
    icon: "Linkedin",
    color: "#0A66C2",
    url: "https://linkedin.com/in/johndoe",
    label: "LinkedIn Profile",
  },
  twitter: {
    name: "Twitter",
    icon: "Twitter",
    color: "#1DA1F2",
    url: "https://twitter.com/johndoe",
    label: "Twitter Profile",
  },
  instagram: {
    name: "Instagram",
    icon: "Instagram",
    color: "#E4405F",
    url: "https://instagram.com/johndoe",
    label: "Instagram Profile",
  },
  youtube: {
    name: "YouTube",
    icon: "Youtube",
    color: "#FF0000",
    url: "https://youtube.com/@johndoe",
    label: "YouTube Channel",
  },
  discord: {
    name: "Discord",
    icon: "Discord",
    color: "#5865F2",
    url: "https://discord.gg/johndoe",
    label: "Discord Server",
  },
  mastodon: {
    name: "Mastodon",
    icon: "Mastodon",
    color: "#6364FF",
    url: "https://mastodon.social/@johndoe",
    label: "Mastodon Profile",
  },
  dribbble: {
    name: "Dribbble",
    icon: "Dribbble",
    color: "#EA4C89",
    url: "https://dribbble.com/johndoe",
    label: "Dribbble Profile",
  },
  medium: {
    name: "Medium",
    icon: "Medium",
    color: "#000000",
    url: "https://medium.com/@johndoe",
    label: "Medium Blog",
  },
  devto: {
    name: "Dev.to",
    icon: "Devto",
    color: "#0A0A0A",
    url: "https://dev.to/johndoe",
    label: "Dev.to Profile",
  },
  stackoverflow: {
    name: "Stack Overflow",
    icon: "Stackoverflow",
    color: "#F58025",
    url: "https://stackoverflow.com/users/1234567/johndoe",
    label: "Stack Overflow Profile",
  },
};

// Social share configuration
export const shareConfig = {
  twitter: {
    url: "https://twitter.com/intent/tweet",
    params: {
      text: "Check out this amazing developer portfolio!",
      url: "https://yourportfolio.com",
      via: "johndoe",
    },
  },
  linkedin: {
    url: "https://www.linkedin.com/sharing/share-offsite/",
    params: {
      url: "https://yourportfolio.com",
    },
  },
  facebook: {
    url: "https://www.facebook.com/sharer/sharer.php",
    params: {
      u: "https://yourportfolio.com",
    },
  },
  whatsapp: {
    url: "https://api.whatsapp.com/send",
    params: {
      text: "Check out this developer portfolio: https://yourportfolio.com",
    },
  },
  email: {
    url: "mailto:",
    params: {
      subject: "Check out this developer portfolio",
      body: "I thought you might be interested in this developer portfolio: https://yourportfolio.com",
    },
  },
};

// Social interaction tracking
export const socialTracking = {
  github: {
    label: "github_click",
    category: "social",
  },
  linkedin: {
    label: "linkedin_click",
    category: "social",
  },
  twitter: {
    label: "twitter_click",
    category: "social",
  },
  instagram: {
    label: "instagram_click",
    category: "social",
  },
  youtube: {
    label: "youtube_click",
    category: "social",
  },
};

// Social sharing messages
export const shareMessages = {
  project: "Check out this project I built!",
  blog: "I just wrote a new blog post. Check it out!",
  portfolio: "Explore my developer portfolio. I'm open to new opportunities!",
  contact: "Feel free to reach out to me!",
};