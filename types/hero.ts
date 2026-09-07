// types/hero.ts
export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  greeting?: string; // ✅ Add this
  rolePrefix?: string; // ✅ Add this
  profileImage: string;
  profileImageAlt?: string;
  profileImagePlaceholder?: string;
  cta: {
    primary: {
      label: string;
      href: string;
    };
    secondary: {
      label: string;
      href: string;
    };
  };
  stats: Array<{
    value: string;
    label: string;
    suffix: string;
    prefix?: string;
    description?: string;
    trend?: {
      value: number;
      label: string;
      positive: boolean;
    };
  }>;
  socialLinks: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
  typewriterTexts: string[];
  status: {
    text: string;
    color: string;
  };
}