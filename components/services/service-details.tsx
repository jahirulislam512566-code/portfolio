"use client";

import { Service } from "@/types/service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Calendar,
  ArrowRight,
  Mail,
  MessageSquare
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ServiceDetailsProps {
  service: Service;
  className?: string;
}

export function ServiceDetails({ service, className }: ServiceDetailsProps) {
  // ✅ Get the icon component
  const IconComponent = service.icon;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {/* ✅ Render the Lucide icon component */}
            {IconComponent && <IconComponent className="h-6 w-6" />}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{service.title}</h2>
            {service.isAvailable !== undefined && (
              <Badge variant={service.isAvailable ? "default" : "secondary"}>
                {service.isAvailable ? "Available" : "Currently Unavailable"}
              </Badge>
            )}
          </div>
        </div>
        <p className="text-muted-foreground">{service.description}</p>
      </div>

      <Separator />

      {/* Pricing & Delivery */}
      <div className="grid gap-4 sm:grid-cols-2">
        {service.price && (
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <DollarSign className="h-4 w-4" />
              Pricing
            </div>
            <p className="text-lg font-semibold">
              {typeof service.price === 'number' ? `$${service.price}` : service.price}
            </p>
            {service.pricingModel && (
              <p className="text-sm text-muted-foreground">{service.pricingModel}</p>
            )}
          </div>
        )}
        {service.deliveryTime && (
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Clock className="h-4 w-4" />
              Delivery Time
            </div>
            <p className="text-lg font-semibold">{service.deliveryTime}</p>
          </div>
        )}
      </div>

      {/* Features */}
      {service.features && service.features.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">What's Included</h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Technologies */}
      {service.technologies && service.technologies.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">{tech}</Badge>
            ))}
          </div>
        </div>
      )}

      {/* Long Description */}
      {service.longDescription && (
        <div>
          <h3 className="font-semibold mb-2">About This Service</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {service.longDescription}
          </p>
        </div>
      )}

      <Separator />

      {/* CTA */}
      <div className="flex flex-wrap gap-3">
        <Button asChild className="gap-2">
          <Link href="#contact">
            <Mail className="h-4 w-4" />
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" asChild className="gap-2">
          <Link href="#contact">
            <MessageSquare className="h-4 w-4" />
            Ask a Question
          </Link>
        </Button>
      </div>
    </div>
  );
}