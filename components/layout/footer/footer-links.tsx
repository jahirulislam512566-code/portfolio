// components/layout/footer/footer-links.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types/navigation";
import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface FooterLinksProps {
  items: NavItem[];
  className?: string;
  columns?: number;
}

// ✅ Animation variants with proper typing
const linkVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.05,
      duration: 0.3,
      ease: "easeOut" as const
    },
  }),
};

export function FooterLinks({ 
  items, 
  className,
  columns = 1 
}: FooterLinksProps) {
  const pathname = usePathname();

  // Check if link is active
  const isActive = (href: string) => {
    if (href.startsWith("#")) return false;
    if (href.startsWith("http")) return false;
    return pathname === href;
  };

  // Check if link is external
  const isExternal = (href: string) => {
    return href.startsWith("http") || href.startsWith("//");
  };

  // Filter out disabled items
  const visibleItems = items.filter(item => !item.isDisabled);

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <div 
      className={cn(
        "grid gap-2",
        columns === 2 && "grid-cols-2",
        columns === 3 && "grid-cols-3",
        columns === 4 && "grid-cols-4",
        className
      )}
    >
      {visibleItems.map((item, index) => {
        const isExternalLink = isExternal(item.href);
        const active = isActive(item.href);

        return (
          <motion.div
            key={item.id}
            custom={index}
            initial="initial"
            animate="animate"
            variants={linkVariants}
          >
            <Link
              href={item.href}
              target={item.target || (isExternalLink ? "_blank" : undefined)}
              rel={isExternalLink ? "noopener noreferrer" : item.rel}
              className={cn(
                "group inline-flex items-center gap-1 text-sm",
                "text-muted-foreground transition-colors hover:text-primary",
                active && "text-primary font-medium",
                isExternalLink && "after:content-['↗'] after:ml-0.5 after:text-xs after:opacity-50"
              )}
              aria-current={active ? "page" : undefined}
            >
              <span className="relative">
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-[1px] w-0",
                    "bg-primary transition-all duration-300",
                    "group-hover:w-full",
                    active && "w-full"
                  )}
                />
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

// ============================================================
// Sub-component for link with icon
// ============================================================

interface FooterLinkWithIconProps {
  href: string;
  label: string;
  icon?: ReactNode;
  target?: string;
  rel?: string;
  className?: string;
  isExternal?: boolean;
}

export function FooterLinkWithIcon({ 
  href, 
  label, 
  icon, 
  target, 
  rel,
  className,
  isExternal: isExternalProp,
}: FooterLinkWithIconProps) {
  const isExternalLink = isExternalProp ?? (href.startsWith("http") || href.startsWith("//"));

  return (
    <Link
      href={href}
      target={target || (isExternalLink ? "_blank" : undefined)}
      rel={isExternalLink ? "noopener noreferrer" : rel}
      className={cn(
        "group flex items-center gap-2 text-sm",
        "text-muted-foreground transition-colors hover:text-primary",
        className
      )}
    >
      {icon && (
        <span className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary">
          {icon}
        </span>
      )}
      <span className="relative">
        {label}
        <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
      </span>
    </Link>
  );
}

// ============================================================
// Sub-component for grouped footer links
// ============================================================

interface FooterLinkGroupProps {
  title: string;
  items: NavItem[];
  className?: string;
  columns?: number;
}

export function FooterLinkGroup({ 
  title, 
  items, 
  className,
  columns = 1
}: FooterLinkGroupProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <FooterLinks items={items} columns={columns} />
    </div>
  );
}