"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: "active" | "inactive" | "pending" | "completed" | "error" | "in-progress" | "planned" | "maintaining" | "archived" | string;
  className?: string;
  label?: string;
}

export function StatusBadge({ status, className, label }: StatusBadgeProps) {
  const statusConfig: Record<string, {
    variant: "default" | "secondary" | "destructive" | "outline";
    label: string;
    className: string;
  }> = {
    active: {
      variant: "default",
      label: "Active",
      className: "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20"
    },
    inactive: {
      variant: "secondary",
      label: "Inactive",
      className: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-gray-500/20"
    },
    pending: {
      variant: "default",
      label: "Pending",
      className: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20"
    },
    completed: {
      variant: "default",
      label: "Completed",
      className: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20"
    },
    error: {
      variant: "destructive",
      label: "Error",
      className: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20"
    },
    "in-progress": {
      variant: "default",
      label: "In Progress",
      className: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-purple-500/20"
    },
    planned: {
      variant: "outline",
      label: "Planned",
      className: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-gray-500/20"
    },
    maintaining: {
      variant: "secondary",
      label: "Maintaining",
      className: "bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 border-cyan-500/20"
    },
    archived: {
      variant: "secondary",
      label: "Archived",
      className: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-gray-500/20"
    },
  };

  // Default config if status is not found
  const config = statusConfig[status] || {
    variant: "secondary" as const,
    label: status || "Unknown",
    className: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-gray-500/20"
  };

  return (
    <Badge 
      variant={config.variant}
      className={cn(config.className, className)}
    >
      {label || config.label}
    </Badge>
  );
}