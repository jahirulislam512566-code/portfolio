// components/layout/footer/footer-socials.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
  DiscordIcon,
  MailIcon,
  ExternalLinkIcon,
  CodeIcon,
} from "@/components/icons";
import { socialNav } from "@/data/navigation";
import { siteConfig } from "@/config/site.config";


interface FooterSocialsProps {
  className?: string;
  variant?: "icon" | "text" | "both";
  size?: "sm" | "md" | "lg";
}

export function FooterSocials({ 
  className, 
  variant = "icon",
  size = "md" 
}: FooterSocialsProps) {
  // Map social platform names to your custom icons
  const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    github: GithubIcon,
    linkedin: LinkedinIcon,
    twitter: TwitterIcon,
    instagram: InstagramIcon,
    youtube: YoutubeIcon,
    discord: DiscordIcon,
    mail: MailIcon,
    website: ExternalLinkIcon,
    devto: CodeIcon,
  };

  // Get social links from config or use default
  const socialLinks = socialNav.map(item => {
    const platform = item.id.replace("social-", "");
    const Icon = iconMap[platform];
    return {
      ...item,
      icon: Icon,
      platform,
    };
  });

  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
  };

  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "flex items-center gap-2",
        variant === "both" && "flex-wrap gap-3",
        className
      )}
    >
      {socialLinks.map((item) => {
        const Icon = item.icon;
        if (!Icon) return null;

        return (
          <motion.a
            key={item.id}
            href={item.href}
            target={item.target || "_blank"}
            rel={item.rel || "noopener noreferrer"}
            variants={itemVariants}
            whileHover={{
              scale: 1.1,
              rotate: -5,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "group relative inline-flex items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-all duration-300",
              "hover:border-primary hover:bg-primary hover:text-primary-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              sizeClasses[size]
            )}
            aria-label={item.label || item.platform}
          >
            {/* Hover Glow Effect */}
            <span className="absolute inset-0 -z-10 rounded-full bg-primary opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20" />
            
            {/* Icon */}
            <Icon 
              size={iconSize[size]} 
              className="transition-transform duration-300 group-hover:scale-110"
            />
            
            {/* Tooltip for icon-only variant */}
            {variant === "icon" && (
              <span className="absolute -bottom-8 whitespace-nowrap rounded bg-background px-2 py-1 text-xs opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                {item.label}
              </span>
            )}
          </motion.a>
        );
      })}

      {/* Email Contact (always shown) */}
      {variant !== "icon" && (
        <motion.a
          variants={itemVariants}
          href={`mailto:${siteConfig.contact?.email || "hello@example.com"}`}
          whileHover={{ scale: 1.05 }}
          className={cn(
            "group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-all duration-300",
            "hover:border-primary hover:bg-primary hover:text-primary-foreground"
          )}
        >
          <MailIcon size={iconSize[size]} />
          <span>Email</span>
        </motion.a>
      )}
    </motion.div>
  );
}

// Sub-component for social links with labels
interface SocialLinkWithLabelProps {
  platform: string;
  url: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  className?: string;
}

export function SocialLinkWithLabel({
  platform,
  url,
  label,
  icon: Icon,
  className,
}: SocialLinkWithLabelProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex items-center gap-3 rounded-lg p-3 transition-all duration-300",
        "hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon size={20} />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{platform}</span>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
    </a>
  );
}