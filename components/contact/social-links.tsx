"use client";

import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { SocialIcon } from "@/components/common/social-icon";
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
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface SocialLinksProps {
  className?: string;
  variant?: 'default' | 'compact' | 'expanded';
  showTitle?: boolean;
  showDescription?: boolean;
  columns?: 2 | 3 | 4 | 6;
}

export function SocialLinks({ 
  className,
  variant = 'default',
  showTitle = true,
  showDescription = true,
  columns = 6
}: SocialLinksProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Define all social links with proper configuration
  const socialLinks = [
    {
      platform: "github",
      icon: GithubIcon,
      href: siteConfig.social?.github || "",
      label: "GitHub",
      color: "hover:bg-[#333] hover:text-white dark:hover:bg-[#fff] dark:hover:text-[#333]",
    },
    {
      platform: "linkedin",
      icon: LinkedinIcon,
      href: siteConfig.social?.linkedin || "",
      label: "LinkedIn",
      color: "hover:bg-[#0A66C2] hover:text-white",
    },
    {
      platform: "twitter",
      icon: TwitterIcon,
      href: siteConfig.social?.twitter || "",
      label: "Twitter",
      color: "hover:bg-[#1DA1F2] hover:text-white",
    },
    {
      platform: "instagram",
      icon: InstagramIcon,
      href: siteConfig.social?.instagram || "",
      label: "Instagram",
      color: "hover:bg-gradient-to-br from-[#405DE6] via-[#5851DB] to-[#E1306C] hover:text-white",
    },
    {
      platform: "youtube",
      icon: YoutubeIcon,
      href: siteConfig.social?.youtube || "",
      label: "YouTube",
      color: "hover:bg-[#FF0000] hover:text-white",
    },
    {
      platform: "discord",
      icon: DiscordIcon,
      href: siteConfig.social?.discord || "",
      label: "Discord",
      color: "hover:bg-[#5865F2] hover:text-white",
    },
  ];

  // Filter active links
  const activeLinks = socialLinks.filter(link => 
    link.href && link.href !== "#" && link.href !== ""
  );

  // Add email as a special case
  const emailLink = {
    platform: "email",
    icon: MailIcon,
    href: `mailto:${siteConfig.contact?.email || siteConfig.author?.email || "hello@example.com"}`,
    label: "Email",
    color: "hover:bg-primary hover:text-primary-foreground",
  };

  // Animation variants - ✅ Fixed with as const
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
        ease: "easeOut" as const

      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const



,
        stiffness: 200,
        damping: 25,
        ease: "easeOut" as const

      },
    },
  };

  // Grid columns based on variant
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
    6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-6",
  };

  // All links (social + email)
  const allLinks = [...activeLinks, emailLink];

  // Compact variant
  if (variant === 'compact') {
    return (
      <div className={cn("flex flex-wrap items-center gap-2", className)}>
        {allLinks.map((link) => (
          <SocialIcon
            key={link.platform}
            icon={link.icon}
            href={link.href || "#"}
            label={link.label}
            className={cn(
              "h-8 w-8 transition-all duration-200",
              "hover:scale-110 active:scale-95",
              link.color
            )}
            iconSize={16}
          />
        ))}
      </div>
    );
  }

  // Expanded variant
  if (variant === 'expanded') {
    return (
      <Card className={cn("overflow-hidden border-primary/10", className)}>
        <CardContent className="p-6 md:p-8">
          {showTitle && (
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-1 rounded-full bg-gradient-to-b from-purple-600 to-pink-600" />
              <h3 className="font-semibold text-lg">Connect with Me</h3>
            </div>
          )}
          
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-wrap gap-4"
          >
            {allLinks.map((link) => (
              <motion.div key={link.platform} variants={itemVariants}>
                <SocialIcon
                  icon={link.icon}
                  href={link.href || "#"}
                  label={link.label}
                  className={cn(
                    "h-12 w-12 transition-all duration-200",
                    "hover:scale-110 active:scale-95",
                    "border-2 border-border/30 hover:border-primary/30",
                    "bg-background/50 backdrop-blur-sm",
                    link.color
                  )}
                  iconSize={22}
                />
              </motion.div>
            ))}
          </motion.div>
          
          {showDescription && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border/50"
            >
              Connect with me on social media or send me an email directly.
            </motion.p>
          )}
        </CardContent>
      </Card>
    );
  }

  // Default variant with grid
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        {showTitle && (
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <span className="text-primary">🌐</span>
            Connect with Me
          </h3>
        )}
        
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={cn("grid gap-3", gridCols[columns])}
        >
          {allLinks.map((link) => (
            <motion.div 
              key={link.platform} 
              variants={itemVariants}
              className="flex items-center justify-center"
            >
              <SocialIcon
                icon={link.icon}
                href={link.href || "#"}
                label={link.label}
                className={cn(
                  "h-10 w-10 transition-all duration-200",
                  "hover:scale-110 active:scale-95",
                  "border border-border/30 hover:border-primary/30",
                  link.color
                )}
                iconSize={20}
              />
            </motion.div>
          ))}
        </motion.div>
        
        {showDescription && (
          <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border/50">
            Connect with me on social media or send me an email directly.
          </p>
        )}
      </CardContent>
    </Card>
  );
}