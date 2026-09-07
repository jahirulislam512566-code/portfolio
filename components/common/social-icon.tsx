// components/common/social-icon.tsx
"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface SocialIconProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
  label: string;
  className?: string;
  iconSize?: number;
  target?: string;
  rel?: string;
}

export function SocialIcon({
  icon: Icon,
  href,
  label,
  className,
  iconSize = 20,
  target = "_blank",
  rel = "noopener noreferrer",
}: SocialIconProps) {
  // ✅ If href is missing or invalid, don't render
  if (!href || href === "#" || href === "") {
    return null;
  }

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      aria-label={label}
      className={cn(
        "inline-flex items-center justify-center rounded-full",
        "transition-all duration-200",
        "hover:scale-110 active:scale-95",
        className
      )}
    >
      <Icon size={iconSize} />
    </Link>
  );
}