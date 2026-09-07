"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { FooterLinks } from "./footer-links";
import { FooterSocials } from "./footer-socials";
import { GradientText } from "@/components/common/gradient-text";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site.config";
import { footerNav } from "@/data/navigation";
import { Mail, MapPin, Phone, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className={cn(
        "w-full min-w-0 border-t bg-background",
        className
      )}
    >
      {/* Footer Container */}
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid w-full min-w-0 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="min-w-0 space-y-4 md:col-span-1">
            <Link
              href="/"
              className="group inline-block max-w-full"
            >
              <GradientText className="text-2xl font-bold transition-opacity group-hover:opacity-80">
                {siteConfig.name}
              </GradientText>
            </Link>

            <p className="w-full max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.author.bio}
            </p>

            {/* Contact Info */}
            <div className="min-w-0 space-y-2">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group flex min-w-0 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />

                <span className="min-w-0 break-words">
                  {siteConfig.contact.email}
                </span>
              </a>

              {siteConfig.contact.phone && (
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="group flex min-w-0 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />

                  <span className="min-w-0 break-words">
                    {siteConfig.contact.phone}
                  </span>
                </a>
              )}

              {siteConfig.contact.address && (
                <div className="flex min-w-0 items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />

                  <span className="min-w-0 break-words">
                    {siteConfig.contact.address}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          {footerNav.map((section) => (
            <div
              key={section.id}
              className="min-w-0 space-y-4"
            >
              <h3 className="text-sm font-semibold text-foreground">
                {section.label}
              </h3>

              <FooterLinks items={section.items} />
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex w-full min-w-0 flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>

          <div className="flex max-w-full flex-wrap items-center justify-center gap-4 sm:gap-6">
            {/* Social Links */}
            <FooterSocials
              variant="icon"
              size="sm"
            />

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <Link
                href="/privacy"
                className="group relative transition-colors hover:text-primary"
              >
                Privacy

                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link
                href="/terms"
                className="group relative transition-colors hover:text-primary"
              >
                Terms

                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link
                href="/sitemap"
                className="group relative transition-colors hover:text-primary"
              >
                Sitemap

                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>

            {/* Back To Top */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0 rounded-full transition-colors hover:bg-primary hover:text-primary-foreground"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}