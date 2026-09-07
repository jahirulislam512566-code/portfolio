"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

import { ThemeToggle } from "@/components/common/theme-toggle";
import { GradientText } from "@/components/common/gradient-text";
import { Button } from "@/components/ui/button";

import { useScroll } from "@/hooks/use-scroll";
import { useActiveSection } from "@/hooks/use-active-section";

import { mainNav } from "@/data/navigation";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { isScrolled } = useScroll({
    threshold: 20,
  });

  /* ---------------------------------------------
   * Navigation sections
   * --------------------------------------------- */
  const sections = useMemo(
    () =>
      mainNav
        .map((item) => item.href)
        .filter((href) => href.startsWith("#"))
        .map((href) => href.substring(1))
        .filter(Boolean),
    []
  );

  const { activeSection } = useActiveSection({
    sections,
  });

  /* ---------------------------------------------
   * Hydration
   * --------------------------------------------- */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---------------------------------------------
   * Close mobile menu on route change
   * --------------------------------------------- */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  /* ---------------------------------------------
   * Mobile menu controls
   * --------------------------------------------- */
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((previous) => !previous);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  /* ---------------------------------------------
   * Logo
   * --------------------------------------------- */
  const Logo = (
    <Link
      href="/"
      aria-label="Jahir home"
      className="group flex shrink-0 items-center gap-2"
    >
      <div
        className="
          relative
          flex
          h-8
          w-8
          shrink-0
          overflow-hidden
          rounded-lg
          bg-gradient-to-r
          from-purple-600
          to-pink-600
          p-[2px]
          shadow-md
          transition-shadow
          duration-300
          group-hover:shadow-lg
          sm:h-9
          sm:w-9
        "
      >
        <div
          className="
            flex
            h-full
            w-full
            items-center
            justify-center
            rounded-[7px]
            bg-background
            transition-transform
            duration-300
            group-hover:scale-95
          "
        >
          <span
            className="
              bg-gradient-to-r
              from-purple-600
              to-pink-600
              bg-clip-text
              text-sm
              font-bold
              text-transparent
            "
          >
            Jr
          </span>
        </div>
      </div>

      <GradientText
        className="
          hidden
          text-base
          font-bold
          transition-opacity
          duration-300
          group-hover:opacity-80
          sm:block
          md:text-xl
        "
      >
        Jahir
      </GradientText>
    </Link>
  );

  /* ---------------------------------------------
   * Header classes
   * --------------------------------------------- */
  const headerClasses = cn(
    "fixed inset-x-0 top-0 z-50 w-full min-w-0",
    "transition-all duration-300",
    isScrolled || isMobileMenuOpen
      ? [
          "border-b border-border/50",
          "bg-background/95",
          "shadow-sm",
          "backdrop-blur",
          "supports-[backdrop-filter]:bg-background/60",
        ]
      : "bg-transparent",
    className
  );

  /* ---------------------------------------------
   * Hydration-safe initial header
   * --------------------------------------------- */
  if (!mounted) {
    return (
      <>
        <header
          id="site-navbar"
          className={headerClasses}
          role="banner"
        >
          <div
            className="
              mx-auto
              flex
              h-14
              w-full
              max-w-7xl
              min-w-0
              items-center
              justify-between
              px-4
              sm:px-6
              md:h-16
              lg:px-8
            "
          >
            {Logo}

            <div
              className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
              aria-hidden="true"
            />
          </div>
        </header>

        <div
          className="h-14 w-full md:h-16"
          aria-hidden="true"
        />
      </>
    );
  }

  return (
    <>
      {/* ==========================================
          HEADER
      ========================================== */}
      <header
        id="site-navbar"
        className={headerClasses}
        role="banner"
      >
        <div
          className="
            mx-auto
            flex
            h-14
            w-full
            max-w-7xl
            min-w-0
            items-center
            justify-between
            gap-4
            px-4
            sm:px-6
            md:h-16
            lg:px-8
          "
        >
          {/* Logo */}
          {Logo}

          {/* ========================================
              DESKTOP NAVIGATION
          ======================================== */}
          <div
            className="
              hidden
              min-w-0
              flex-1
              justify-center
              md:flex
            "
          >
            <DesktopNav
              activeSection={activeSection}
            />
          </div>

          {/* ========================================
              RIGHT ACTIONS
          ======================================== */}
          <div
            className="
              flex
              shrink-0
              items-center
              gap-1
              sm:gap-2
            "
          >
            <ThemeToggle />

            {/* Mobile menu button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="
                relative
                h-9
                w-9
                shrink-0
                touch-manipulation
                md:hidden
                sm:h-10
                sm:w-10
              "
              onClick={toggleMobileMenu}
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <motion.span
                className="
                  relative
                  flex
                  items-center
                  justify-center
                "
                initial={false}
                animate={{
                  rotate: isMobileMenuOpen ? 90 : 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut" as const

,
                }}
              >
                {isMobileMenuOpen ? (
                  <X
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                ) : (
                  <Menu
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                )}
              </motion.span>
            </Button>
          </div>
        </div>
      </header>

      {/* ==========================================
          MOBILE NAVIGATION

          IMPORTANT:
          MobileNav owns:
          - AnimatePresence
          - backdrop
          - fixed positioning
          - menu z-index
          - scroll behavior
      ========================================== */}
      <MobileNav
        id="mobile-navigation"
        isOpen={isMobileMenuOpen}
        activeSection={activeSection}
        onClose={closeMobileMenu}
      />

      {/* ==========================================
          HEADER SPACER
      ========================================== */}
      <div
        className="h-14 w-full md:h-16"
        aria-hidden="true"
      />
    </>
  );
}