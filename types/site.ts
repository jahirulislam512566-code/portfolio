// types/site.ts

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  domain: string;
  keywords: string[];
  author: SiteAuthor;
  social: SiteSocial;
  contact: SiteContact;
  theme: SiteTheme;
  analytics: SiteAnalytics;
  meta: SiteMeta;
  features: SiteFeatures;
}

// ✅ Enhanced with missing fields
export interface SiteAuthor {
  name: string;
  title: string;
  role?: string; // ✅ Added - alias for title or specific role display
  bio: string;
  avatar: string;
  email: string;
  location: string;
  experience: number | string; // ✅ Changed to support both number and string
  skills?: string[]; // ✅ Added - list of skills for display
  socials?: SiteSocial; // ✅ Added - author-specific social links
  // Optional additional fields
  company?: string;
  website?: string;
  phone?: string;
  birthday?: string;
}

export interface SiteSocial {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  discord?: string;
  mastodon?: string;
  dribbble?: string;
  medium?: string;
  devto?: string;
  stackoverflow?: string;
  facebook?: string;
  tiktok?: string;
  snapchat?: string;
  pinterest?: string;
  reddit?: string;
  twitch?: string;
  [key: string]: string | undefined; // ✅ Allows additional social platforms
}

export interface SiteContact {
  email: string;
  phone?: string;
  address?: string;
  calendar?: string;
  officeHours?: {
    timezone: string;
    schedule: string;
  };
  emergency?: string;
  support?: string;
}

export interface SiteTheme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
  fonts: {
    heading: string;
    body: string;
  };
  // Optional theme extensions
  muted?: string;
  border?: string;
  radius?: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadows?: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export interface SiteAnalytics {
  googleAnalytics?: string;
  plausible?: string;
  umami?: string;
  hotjar?: string;
  clarity?: string;
  mixpanel?: string;
  amplitude?: string;
  segment?: string;
  posthog?: string;
}

export interface SiteMeta {
  ogImage: string;
  favicon: string;
  appleTouchIcon: string;
  manifest: string;
  // Optional meta fields
  themeColor?: string;
  msTileColor?: string;
  msTileImage?: string;
  robots?: string;
  author?: string;
  publisher?: string;
}

export interface SiteFeatures {
  blog: boolean;
  portfolio: boolean;
  testimonials: boolean;
  services: boolean;
  contactForm: boolean;
  comments: boolean;
  analytics: boolean;
  darkMode: boolean;
  search: boolean;
  newsletter: boolean;
  // Additional features
  aiChat?: boolean;
  liveChat?: boolean;
  notifications?: boolean;
  multiLanguage?: boolean;
  rss?: boolean;
  sitemap?: boolean;
}

export interface SEO {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonical?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  schema?: Record<string, any>;
  // Additional SEO fields
  ogType?: 'website' | 'article' | 'profile' | 'video' | 'music';
  ogSiteName?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  alternateLanguages?: Record<string, string>;
  prev?: string;
  next?: string;
}

// ✅ Navigation Types
export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  order?: number;
  target?: string;
  rel?: string;
  active?: boolean;
  disabled?: boolean;
  children?: NavItem[];
}

export interface NavigationConfig {
  main: NavItem[];
  footer: NavItem[];
  social: NavItem[];
}

// ✅ Feature Flags Types
export interface FeatureFlags {
  enableBlog: boolean;
  enableComments: boolean;
  enableAnalytics: boolean;
  enableSearch: boolean;
  enableNewsletter: boolean;
  enableDarkMode: boolean;
  enableAnimations: boolean;
  enableTestimonials: boolean;
  enableServices: boolean;
  enablePortfolio: boolean;
  enableContactForm: boolean;
  enableAIChat?: boolean;
  enableLiveChat?: boolean;
  enableNotifications?: boolean;
}

// ✅ Site Config Utility Types
export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface SiteNavigation {
  main: NavItem[];
  footer: NavItem[];
  social: NavItem[];
  mobile: NavItem[];
}

// ✅ Site Configuration with all fields
export type SiteConfigWithNavigation = SiteConfig & {
  navigation: SiteNavigation;
  featureFlags: FeatureFlags;
  brand: BrandColors;
};