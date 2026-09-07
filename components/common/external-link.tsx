import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
}

export function ExternalLink({ 
  href, 
  children, 
  className,
  showIcon = true 
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 text-primary hover:underline",
        className
      )}
    >
      {children}
      {showIcon && <ExternalLinkIcon className="h-3 w-3" />}
    </a>
  );
}