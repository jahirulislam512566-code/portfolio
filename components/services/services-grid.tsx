"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceCard } from "./service-card";
import { ServiceDetails } from "./service-details";
import { ServiceProcess } from "./service-process";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { servicesData } from "@/data/services";
import { Service } from "@/types/service";
import { cn } from "@/lib/utils";

interface ServicesGridProps {
  className?: string;
  showProcess?: boolean;
  limit?: number;
}

export function ServicesGrid({ className, showProcess = true, limit }: ServicesGridProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services = limit ? servicesData.slice(0, limit) : servicesData;

  return (
    <div className={cn("space-y-12", className)}>
      {/* Services Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            onViewDetails={() => setSelectedService(service)}
          />
        ))}
      </div>

      {/* Service Details Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedService && <ServiceDetails service={selectedService} />}
        </DialogContent>
      </Dialog>

      {/* Service Process */}
      {showProcess && <ServiceProcess />}
    </div>
  );
}