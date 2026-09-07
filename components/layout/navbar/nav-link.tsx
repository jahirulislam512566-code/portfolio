"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode, MouseEvent } from "react";

interface NavLinkProps {
  href: string;
  label: string;
  icon?: ReactNode | string;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

export function NavLink({
  href,
  label,
  icon,
  isActive = false,
  className,
  onClick,
  target,
  rel,
  ariaLabel,
}: NavLinkProps) {
  const pathname = usePathname();

  const isHashLink = href.startsWith("#");

  const isExternal =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//");

  const isBlankTarget = target === "_blank";

  const isCurrent = isHashLink
    ? isActive
    : pathname === href || pathname?.startsWith(`${href}/`);

  const resolvedTarget = isExternal || isBlankTarget ? "_blank" : target;

  const resolvedRel =
    isExternal || isBlankTarget
      ? rel || "noopener noreferrer"
      : rel;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isHashLink) {
      event.preventDefault();

      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const navbar = document.getElementById("site-navbar");

        const navHeight = navbar?.getBoundingClientRect().height ?? 0;

        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          navHeight -
          20;

        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: "smooth",
        });

        window.history.pushState(
          null,
          "",
          href
        );

        targetElement.setAttribute("tabindex", "-1");

        targetElement.focus({
          preventScroll: true,
        });
      }
    }

    onClick?.();
  };

  return (
    <Link
      href={href}
      target={resolvedTarget}
      rel={resolvedRel}
      onClick={handleClick}
      aria-label={ariaLabel || label}
      aria-current={isCurrent ? "true" : undefined}
      className={cn(
        // Layout
        "relative flex min-w-0 shrink-0 items-center justify-center",

        // Spacing
        "gap-2 rounded-md px-3 py-2",

        // Typography
        "whitespace-nowrap text-sm font-medium",

        // Colors
        "text-muted-foreground",

        // Interaction
        "transition-colors duration-200",
        "hover:bg-accent hover:text-accent-foreground",

        // Focus
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-ring",
        "focus-visible:ring-offset-2",

        // Active
        isCurrent && "text-foreground",

        className
      )}
    >
      {icon && (
        <span
          className={cn(
            "inline-flex shrink-0",
            "h-4 w-4",
            "items-center justify-center",
            "transition-transform duration-200",
            "group-hover:scale-110"
          )}
          aria-hidden="true"
        >
          {typeof icon === "string" ? icon : icon}
        </span>
      )}

      <span className="min-w-0">
        {label}
      </span>

      {/* Active indicator */}
      {isCurrent && (
        <motion.span
          layoutId="desktop-nav-indicator"
          initial={false}
          transition={{
            type: "spring" as const



,
            stiffness: 300,
            damping: 30,
          }}
          className={cn(
            "pointer-events-none absolute",
            "inset-x-0 -bottom-[2px]",
            "h-[2px]",
            "rounded-full",
            "bg-gradient-to-r from-purple-600 to-pink-600"
          )}
          aria-hidden="true"
        />
      )}

      {/* Hover indicator */}
      {!isCurrent && (
        <span
          className={cn(
            "pointer-events-none absolute",
            "inset-x-4 -bottom-[2px]",
            "h-[2px]",
            "origin-center scale-x-0",
            "rounded-full",
            "bg-gradient-to-r from-purple-600 to-pink-600",
            "transition-transform duration-300",
            "group-hover:scale-x-100"
          )}
          aria-hidden="true"
        />
      )}

      {/* External link indicator */}
      {isExternal && (
        <span
          className={cn(
            "shrink-0",
            "text-[10px]",
            "opacity-60",
            "transition-opacity duration-200",
            "group-hover:opacity-100"
          )}
          aria-hidden="true"
        >
          ↗
        </span>
      )}
    </Link>
  );
}