// types/service.ts
import { LucideIcon } from "lucide-react";

export type PricingModel = "project-based" | "hourly" | "monthly" | "fixed";

export interface Service {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  icon: LucideIcon; // ✅ Changed from string to LucideIcon
  features: string[];
  pricingModel: PricingModel;
  price: string;
  deliveryTime: string;
  technologies: string[];
  isAvailable: boolean;
  category?: string;
  slug?: string;
  featured?: boolean;
  order?: number;
}

export interface ServicePackage {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface ServicePackages {
  [key: string]: {
    basic: ServicePackage;
    standard: ServicePackage;
    premium: ServicePackage;
  };
}

export interface ServiceCategory {
  id: string;
  name: string;
  description?: string;
  icon: LucideIcon;
  services: Service[];
}