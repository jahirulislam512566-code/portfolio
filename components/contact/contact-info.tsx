"use client";

import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone, Calendar, Clock, Globe, MessageSquare } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface ContactInfoProps {
  className?: string;
  variant?: 'default' | 'compact' | 'expanded';
  showTitle?: boolean;
  showIcons?: boolean;
}

export function ContactInfo({ 
  className,
  variant = 'default',
  showTitle = true,
  showIcons = true
}: ContactInfoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Contact items with proper fallbacks
  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.contact?.email || siteConfig.author?.email || "hello@example.com",
      href: `mailto:${siteConfig.contact?.email || siteConfig.author?.email || "hello@example.com"}`,
      description: "Send me an email",
    },
    {
      icon: Phone,
      label: "Phone",
      value: siteConfig.contact?.phone || "Not available",
      href: siteConfig.contact?.phone ? `tel:${siteConfig.contact.phone}` : undefined,
      description: "Give me a call",
    },
    {
      icon: MapPin,
      label: "Location",
      value: siteConfig.contact?.address || "Remote",
      href: undefined,
      description: siteConfig.contact?.address ? "Visit me" : "Working remotely",
    },
    {
      icon: Calendar,
      label: "Book a Call",
      value: "Schedule a meeting",
      href: siteConfig.contact?.calendar || "#",
      description: "Let's talk",
    },
    {
      icon: Clock,
      label: "Office Hours",
      value: siteConfig.contact?.officeHours?.schedule || "Mon-Fri 9:00 AM - 5:00 PM",
      href: undefined,
      description: siteConfig.contact?.officeHours?.timezone || "Your timezone",
    },
    {
      icon: Globe,
      label: "Website",
      value: siteConfig.url?.replace(/^https?:\/\//, '') || "Portfolio",
      href: siteConfig.url || "#",
      description: "Visit my website",
    },
  ];

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
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const



,
        stiffness: 200,
        damping: 25,
      },
    },
  };

  // Compact variant
  if (variant === 'compact') {
    return (
      <div className={cn("space-y-2", className)}>
        {contactItems.slice(0, 4).map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 text-sm"
            >
              {showIcons && <Icon className="h-4 w-4 text-muted-foreground shrink-0" />}
              {item.href ? (
                <a
                  href={item.href}
                  target={item.label === "Book a Call" || item.label === "Website" ? "_blank" : undefined}
                  rel={item.label === "Book a Call" || item.label === "Website" ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-primary transition-colors truncate"
                >
                  {item.value}
                </a>
              ) : (
                <span className="text-muted-foreground truncate">{item.value}</span>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Expanded variant
  if (variant === 'expanded') {
    return (
      <Card className={cn("overflow-hidden border-primary/10", className)}>
        <CardContent className="p-6 md:p-8">
          {showTitle && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-8 w-1 rounded-full bg-gradient-to-b from-purple-600 to-pink-600" />
              <h3 className="font-semibold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Contact Information
              </h3>
            </motion.div>
          )}
          
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {contactItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
                >
                  {showIcons && (
                    <div className="mt-0.5 shrink-0">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-purple-600/10 to-pink-600/10 flex items-center justify-center text-purple-600 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white transition-all duration-300">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.label === "Book a Call" || item.label === "Website" ? "_blank" : undefined}
                        rel={item.label === "Book a Call" || item.label === "Website" ? "noopener noreferrer" : undefined}
                        className="text-sm font-medium hover:text-primary transition-colors break-all"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium break-all">{item.value}</p>
                    )}
                    {item.description && (
                      <p className="text-xs text-muted-foreground/60 mt-0.5">{item.description}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 pt-6 border-t border-border/50"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span>Available for freelance work</span>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6 space-y-4">
        {showTitle && (
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Contact Information
            </span>
          </h3>
        )}
        
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-3"
        >
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="flex items-start gap-3 group"
              >
                {showIcons && (
                  <div className="mt-0.5 shrink-0">
                    <div className="h-9 w-9 rounded-lg bg-gradient-to-r from-purple-600/10 to-pink-600/10 flex items-center justify-center text-purple-600 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white transition-all duration-300">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.label === "Book a Call" || item.label === "Website" ? "_blank" : undefined}
                      rel={item.label === "Book a Call" || item.label === "Website" ? "noopener noreferrer" : undefined}
                      className="text-sm font-medium hover:text-primary transition-colors break-all"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium break-all">{item.value}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </CardContent>
    </Card>
  );
}