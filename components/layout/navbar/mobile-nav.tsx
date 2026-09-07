"use client";

import { useCallback, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  MailIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/icons";
import { Download, FileText, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { NavLink } from "./nav-link";
import { mainNav, socialNav } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface MobileNavProps {
  isOpen: boolean;
  activeSection?: string;
  onClose: () => void;
  className?: string;
  id?: string;
}

export function MobileNav({
  isOpen,
  activeSection,
  onClose,
  className,
  id = "mobile-navigation",
}: MobileNavProps) {
  /* ---------------------------------------------
   * Lock body scroll while menu is open
   * --------------------------------------------- */
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  /* ---------------------------------------------
   * Escape key
   * --------------------------------------------- */
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleEscape]);

  /* ---------------------------------------------
   * Social icons
   * --------------------------------------------- */
  const socialIcons = useMemo(
    () => ({
      github: GithubIcon,
      linkedin: LinkedinIcon,
      twitter: TwitterIcon,
    }),
    []
  );

  /* ---------------------------------------------
   * Animation variants
   * --------------------------------------------- */
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -12,
    },

    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.22,
        ease: "easeOut" as const,
        staggerChildren: 0.035,
        delayChildren: 0.04,
      },
    },
  };

  const backdropVariants = {
    closed: {
      opacity: 0,
    },

    open: {
      opacity: 1,
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      x: -10,
    },

    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.18,
        ease: "easeOut" as const

      },
    },
  };

  /* ---------------------------------------------
   * Contact
   * --------------------------------------------- */
  const email =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@example.com";

  /* ---------------------------------------------
   * Resume
   * --------------------------------------------- */
  const handleResumeDownload = useCallback(() => {
    window.open(
      "/resume.pdf",
      "_blank",
      "noopener,noreferrer"
    );

    onClose();
  }, [onClose]);

  /* ---------------------------------------------
   * Navigation click
   * --------------------------------------------- */
  const handleNavClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ==========================================
              BACKDROP
          ========================================== */}
          <motion.button
            type="button"
            aria-label="Close mobile navigation"
            className="
              fixed
              inset-0
              z-[55]
              bg-black/50
              backdrop-blur-sm
              md:hidden
            "
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* ==========================================
              MOBILE MENU
          ========================================== */}
          <motion.aside
            id={id}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className={cn(
              "fixed inset-x-0 top-14 z-[60] w-full min-w-0",
              "max-h-[calc(100vh-3.5rem)] overflow-y-auto",
              "overscroll-contain",
              "border-b border-border/50",
              "bg-background",
              "shadow-2xl",
              "md:hidden md:top-16",
              className
            )}
          >
            {/* ========================================
                INNER CONTAINER
            ======================================== */}
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
              
              {/* ======================================
                  CLOSE BUTTON
              ====================================== */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="
                  absolute
                  right-4
                  top-3
                  z-10
                  inline-flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  text-muted-foreground
                  transition-colors
                  hover:bg-accent
                  hover:text-foreground
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-ring
                  sm:right-6
                "
              >
                <X
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </button>

              {/* ======================================
                  NAVIGATION
              ====================================== */}
              <nav
                aria-label="Mobile navigation"
                className="
                  flex
                  w-full
                  min-w-0
                  flex-col
                  gap-1
                  pb-5
                  pt-14
                "
              >
                {mainNav.map((item) => {
                  const sectionId = item.href.startsWith("#")
                    ? item.href.slice(1)
                    : "";

                  return (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      className="w-full min-w-0"
                    >
                      <NavLink
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                        isActive={
                          activeSection === sectionId
                        }
                        onClick={handleNavClick}
                        className="
                          flex
                          w-full
                          min-w-0
                          items-center
                          rounded-lg
                          px-4
                          py-3.5
                          text-base
                          text-foreground
                          transition-colors
                          duration-150
                          hover:bg-accent
                          hover:text-accent-foreground
                          active:scale-[0.98]
                          touch-manipulation
                        "
                      />
                    </motion.div>
                  );
                })}
              </nav>

              {/* ======================================
                  SEPARATOR
              ====================================== */}
              <Separator className="w-full opacity-50" />

              {/* ======================================
                  RESUME
              ====================================== */}
              <div className="py-5">
                <motion.div variants={itemVariants}>
                  <Button
                    type="button"
                    size="lg"
                    className="
                      h-12
                      w-full
                      gap-2.5
                      text-base
                      touch-manipulation
                    "
                    onClick={handleResumeDownload}
                  >
                    <FileText
                      className="h-4 w-4"
                      aria-hidden="true"
                    />

                    <span>
                      Download Resume
                    </span>

                    <Download
                      className="h-3.5 w-3.5 opacity-60"
                      aria-hidden="true"
                    />
                  </Button>
                </motion.div>
              </div>

              {/* ======================================
                  SOCIAL LINKS
              ====================================== */}
              <div className="pb-5">
                <motion.div variants={itemVariants}>
                  <p className="mb-3 text-sm font-medium text-muted-foreground">
                    Connect with me
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {socialNav.map((item) => {
                      const iconKey =
                        item.id.replace(
                          "social-",
                          ""
                        ) as keyof typeof socialIcons;

                      const Icon =
                        socialIcons[iconKey];

                      if (!Icon) {
                        return null;
                      }

                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          target={
                            item.target || "_blank"
                          }
                          rel={
                            item.rel ||
                            "noopener noreferrer"
                          }
                          aria-label={item.label}
                          onClick={onClose}
                          className="
                            inline-flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-muted
                            text-muted-foreground
                            transition-all
                            duration-200
                            hover:scale-105
                            hover:bg-primary
                            hover:text-primary-foreground
                            active:scale-95
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-ring
                            touch-manipulation
                          "
                        >
                          <Icon
                            size={22}
                            aria-hidden="true"
                          />
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              {/* ======================================
                  CONTACT
              ====================================== */}
              <div className="pb-6">
                <motion.div
                  variants={itemVariants}
                  className="
                    rounded-xl
                    border
                    border-border/50
                    bg-muted/30
                    p-4
                  "
                >
                  <p className="mb-2 text-sm font-medium text-foreground">
                    Let's work together
                  </p>

                  <a
                    href={`mailto:${email}`}
                    onClick={onClose}
                    className="
                      group
                      inline-flex
                      max-w-full
                      items-center
                      gap-2.5
                      text-sm
                      text-muted-foreground
                      transition-colors
                      hover:text-primary
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-ring
                    "
                  >
                    <MailIcon
                      size={16}
                      className="
                        shrink-0
                        transition-transform
                        duration-200
                        group-hover:scale-110
                      "
                      aria-hidden="true"
                    />

                    <span className="break-all">
                      {email}
                    </span>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}