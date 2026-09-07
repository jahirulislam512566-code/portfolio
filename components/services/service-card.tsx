"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Service } from "@/types/service";
import { ArrowRight, CheckCircle, Clock, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  index?: number;
  className?: string;
  onViewDetails?: () => void;
}

export function ServiceCard({ 
  service, 
  index = 0, 
  className,
  onViewDetails 
}: ServiceCardProps) {
  // ✅ Get the icon component from service.icon
  const IconComponent = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className={cn(
        "h-full group hover:shadow-xl transition-all hover:border-primary/50 flex flex-col",
        className
      )}>
        <CardHeader>
          {/* Icon */}
          <div className="mb-4">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {/* ✅ Render the Lucide icon component */}
              {IconComponent && <IconComponent className="h-6 w-6" />}
            </div>
          </div>

          <CardTitle className="text-xl">{service.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {service.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          {/* Features */}
          <div className="space-y-2 mb-4 flex-1">
            {service.features.slice(0, 3).map((feature, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
            {service.features.length > 3 && (
              <div className="text-sm text-muted-foreground pl-6">
                +{service.features.length - 3} more features
              </div>
            )}
          </div>

          {/* Pricing & Delivery */}
          <div className="space-y-2 pt-4 border-t">
            {service.price && (
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">
                  {typeof service.price === 'number' ? `$${service.price}` : service.price}
                </span>
                {service.pricingModel && (
                  <Badge variant="outline" className="text-xs">
                    {service.pricingModel}
                  </Badge>
                )}
              </div>
            )}
            {service.deliveryTime && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{service.deliveryTime}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-4">
            <Button 
              variant="outline" 
              className="w-full gap-2 group/btn"
              onClick={onViewDetails}
            >
              View Details
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}