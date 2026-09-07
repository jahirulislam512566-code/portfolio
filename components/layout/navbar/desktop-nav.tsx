"use client";

import { NavLink } from "./nav-link";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DesktopNavProps {
  activeSection?: string;
  className?: string;
}

export function DesktopNav({
  activeSection,
  className,
}: DesktopNavProps) {
  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "flex min-w-0 shrink-0 items-center justify-center gap-1",
        className
      )}
    >
      {/* =====================================================
          MAIN NAVIGATION
          ===================================================== */}

      <div className="flex min-w-0 items-center gap-1">
        {mainNav.map((item) => {
          const isHashLink = item.href.startsWith("#");

          const sectionId = isHashLink
            ? item.href.slice(1)
            : "";

          const isActive =
            isHashLink &&
            activeSection === sectionId;

          return (
            <NavLink
              key={item.id}
              href={item.href}
              label={item.label}
              isActive={isActive}
              icon={item.icon}
            />
          );
        })}
      </div>

      {/* =====================================================
          RESUME
          ===================================================== */}

      <div
        className="
          ml-2
          flex
          shrink-0
          items-center
          border-l
          border-border/30
          pl-2
          lg:ml-3
          lg:pl-3
        "
      >
        <Button
  asChild
  size="sm"
  variant="ghost"
  className="
    h-auto
    shrink-0
    px-2.5
    py-2
    text-sm
    transition-all
    duration-200
    hover:bg-accent
    hover:text-accent-foreground
    lg:px-3
  "
>
  <a
    href="/resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    download
    aria-label="Download resume"
    className="inline-flex flex-col items-center gap-1"
  >
    <Download
      className="h-3.5 w-3.5 opacity-70 transition-transform duration-200 group-hover:translate-y-0.5"
      aria-hidden="true"
    />
    <span className="font-medium leading-none">Resume</span>
  </a>
</Button>
      </div>
    </nav>
  );
}