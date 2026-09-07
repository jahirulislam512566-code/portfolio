// components/layout/page-header.tsx
"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Home,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef, ReactNode } from "react";

interface Breadcrumb {
  label: string;
  href: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  backLink?: string;
  backLabel?: string;
  showHome?: boolean;
  showDivider?: boolean;
  variant?: "default" | "minimal" | "centered";
  breadcrumbs?: Breadcrumb[];
  badge?: string;
  gradientFrom?: string;
  gradientTo?: string;
  children?: ReactNode;
}

// ✅ Animation variants with proper typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut" as const

    },
  },
};

const slideVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const
    },
  },
};

export function PageHeader({
  title,
  description,
  className,
  backLink,
  backLabel = "Back",
  showHome = true,
  showDivider = true,
  variant = "default",
  breadcrumbs = [],
  badge,
  gradientFrom = "from-purple-600",
  gradientTo = "to-pink-600",
  children,
}: PageHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);

  // ✅ Normalize breadcrumbs - remove duplicate Home
  const normalizedBreadcrumbs = breadcrumbs.filter(
    (breadcrumb, index) => {
      if (
        showHome &&
        index === 0 &&
        breadcrumb.label.toLowerCase() === "home" &&
        breadcrumb.href === "/"
      ) {
        return false;
      }
      return true;
    }
  );

  // ✅ Back Navigation Component
  const BackNavigation = () => {
    if (!backLink) return null;

    return (
      <motion.div
        variants={slideVariants}
        className="mb-4"
      >
        <Link
          href={backLink}
          className={cn(
            "group inline-flex items-center gap-1.5",
            "rounded-md text-xs font-medium",
            "text-muted-foreground transition-colors duration-200",
            "hover:text-primary sm:gap-2 sm:text-sm"
          )}
        >
          <ArrowLeft
            className={cn(
              "h-3.5 w-3.5 shrink-0 transition-transform duration-200",
              "group-hover:-translate-x-1 sm:h-4 sm:w-4"
            )}
          />
          <span>{backLabel}</span>
        </Link>
      </motion.div>
    );
  };

  // ✅ Breadcrumb Navigation Component
  const BreadcrumbNavigation = () => {
    if (normalizedBreadcrumbs.length === 0 && !showHome) {
      return null;
    }

    return (
      <motion.nav
        variants={itemVariants}
        aria-label="Breadcrumb"
        className="mb-4 w-full min-w-0 overflow-hidden"
      >
        <ol
          className={cn(
            "flex min-w-0 flex-wrap items-center",
            "gap-x-1.5 gap-y-1 text-[10px] text-muted-foreground",
            "sm:gap-x-2 sm:text-xs md:text-sm"
          )}
        >
          {/* Home */}
          {showHome && (
            <li className="flex shrink-0 items-center">
              <Link
                href="/"
                aria-label="Home"
                className="inline-flex items-center rounded transition-colors duration-200 hover:text-primary"
              >
                <Home className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </Link>
            </li>
          )}

          {showHome && normalizedBreadcrumbs.length > 0 && (
            <li aria-hidden="true" className="text-muted-foreground/50">
              /
            </li>
          )}

          {/* Breadcrumb items */}
          {normalizedBreadcrumbs.map((breadcrumb, index) => {
            const isLast = index === normalizedBreadcrumbs.length - 1;

            return (
              <li
                key={`${breadcrumb.href}-${breadcrumb.label}`}
                className="flex min-w-0 shrink-0 items-center gap-x-1.5 sm:gap-x-2"
              >
                {!isLast ? (
                  <>
                    <Link
                      href={breadcrumb.href}
                      className="max-w-[120px] truncate transition-colors duration-200 hover:text-primary sm:max-w-none"
                    >
                      {breadcrumb.label}
                    </Link>
                    <span aria-hidden="true" className="text-muted-foreground/50">
                      /
                    </span>
                  </>
                ) : (
                  <span
                    aria-current="page"
                    className="max-w-[140px] truncate font-medium text-foreground sm:max-w-none"
                  >
                    {breadcrumb.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </motion.nav>
    );
  };

  // ✅ Badge Component
  const HeaderBadge = ({ centered = false }: { centered?: boolean }) => {
    if (!badge) return null;

    return (
      <motion.div
        variants={itemVariants}
        className={cn("mb-3 flex", centered && "justify-center")}
      >
        <span
          className={cn(
            "inline-flex max-w-full items-center gap-1.5",
            "rounded-full border border-primary/10 bg-primary/10",
            "px-2.5 py-1 text-[10px] font-medium text-primary",
            "sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs"
          )}
        >
          <Sparkles className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
          <span className="truncate">{badge}</span>
        </span>
      </motion.div>
    );
  };

  // ✅ Title Component
  const HeaderTitle = ({ centered = false, minimal = false }: { centered?: boolean; minimal?: boolean }) => {
    return (
      <motion.h1
        variants={itemVariants}
        className={cn(
          "mx-auto w-full min-w-0 font-bold tracking-tight",
          "bg-gradient-to-r bg-clip-text text-transparent",
          gradientFrom,
          gradientTo,
          minimal
            ? "text-2xl sm:text-3xl lg:text-4xl"
            : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
          centered && "text-center"
        )}
      >
        {title}
      </motion.h1>
    );
  };

  // ✅ Description Component
  const HeaderDescription = ({ centered = false, minimal = false }: { centered?: boolean; minimal?: boolean }) => {
    if (!description) return null;

    return (
      <motion.p
        variants={itemVariants}
        className={cn(
          "mx-auto w-full min-w-0 break-words text-muted-foreground",
          minimal
            ? "mt-2 max-w-xl text-xs leading-5 sm:text-sm"
            : "mt-3 max-w-2xl text-sm leading-6 sm:mt-4 sm:text-base md:text-lg",
          centered && "text-center"
        )}
      >
        {description}
      </motion.p>
    );
  };

  // ✅ Divider Component
  const HeaderDivider = ({ width = "w-16" }: { width?: string }) => {
    if (!showDivider) return null;

    return (
      <motion.div
        variants={itemVariants}
        aria-hidden="true"
        className={cn(
          "mx-auto mt-5 h-0.5 rounded-full",
          "bg-gradient-to-r",
          gradientFrom,
          gradientTo,
          width
        )}
      />
    );
  };

  // ✅ Background Component
  const HeaderBackground = () => (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Base gradient */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-br",
          "from-purple-500/[0.04]",
          "via-transparent",
          "to-pink-500/[0.04]"
        )}
      />

      {/* Decorative glow */}
      <div
        className={cn(
          "absolute left-1/2 top-1/2",
          "h-64 w-64 -translate-x-1/2 -translate-y-1/2",
          "rounded-full bg-purple-500/[0.06] blur-3xl",
          "sm:h-80 sm:w-80 md:h-96 md:w-96"
        )}
      />

      {/* Bottom fade */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0",
          "h-16 bg-gradient-to-t from-background to-transparent",
          "sm:h-24"
        )}
      />
    </div>
  );

  // ✅ Apply contain style on mount
  useRef(() => {
    if (headerRef.current) {
      headerRef.current.style.contain = "layout paint";
    }
  });

  // ============================================================
  // MINIMAL VARIANT
  // ============================================================
  if (variant === "minimal") {
    return (
      <header
        ref={headerRef}
        className={cn(
          "relative w-full min-w-0 overflow-hidden",
          "py-8 sm:py-10 md:py-12",
          className
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full min-w-0"
          >
            <BackNavigation />
            <HeaderTitle minimal />
            <HeaderDescription minimal />
            {children}
          </motion.div>
        </div>
      </header>
    );
  }

  // ============================================================
  // CENTERED VARIANT
  // ============================================================
  if (variant === "centered") {
    return (
      <header
        ref={headerRef}
        className={cn(
          "relative isolate w-full min-w-0 overflow-hidden",
          "py-10 sm:py-14 md:py-18 lg:py-20",
          className
        )}
      >
        <HeaderBackground />
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mx-auto w-full min-w-0 max-w-3xl"
          >
            <HeaderBadge centered />
            <BackNavigation />
            <HeaderTitle centered />
            <HeaderDescription centered />
            <HeaderDivider width="w-20" />
            {children}
          </motion.div>
        </div>
      </header>
    );
  }

  // ============================================================
  // DEFAULT VARIANT
  // ============================================================
  return (
    <header
      ref={headerRef}
      className={cn(
        "relative isolate w-full min-w-0 overflow-hidden",
        "py-8 sm:py-12 md:py-16",
        className
      )}
    >
      <HeaderBackground />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full min-w-0"
        >
          <BackNavigation />
          <BreadcrumbNavigation />
          <HeaderBadge />
          <HeaderTitle />
          <HeaderDescription />
          <HeaderDivider />
          {children}
        </motion.div>
      </div>
    </header>
  );
}