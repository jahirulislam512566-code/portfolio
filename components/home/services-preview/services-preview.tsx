// components/services/services-preview.tsx
"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/common/section-heading";
import { 
  Code2, 
  Palette, 
  Server, 
  Database, 
  Cloud, 
  Smartphone,
  Zap,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef, useState, ReactNode } from "react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  features: string[];
  color?: string;
  gradient?: string;
}

const services: Service[] = [
  {
    id: "web-dev",
    title: "Web Development",
    description: "Building responsive, performant, and scalable web applications.",
    icon: <Code2 className="h-6 w-6" />,
    features: ["React/Next.js", "TypeScript", "Tailwind CSS", "Responsive Design"],
    color: "from-blue-500 to-cyan-500",
    gradient: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description: "Creating intuitive and beautiful user interfaces that delight users.",
    icon: <Palette className="h-6 w-6" />,
    features: ["Figma", "User Research", "Prototyping", "Design Systems"],
    color: "from-purple-500 to-pink-500",
    gradient: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Building robust and secure server-side applications and APIs.",
    icon: <Server className="h-6 w-6" />,
    features: ["Node.js", "Python", "REST APIs", "GraphQL"],
    color: "from-emerald-500 to-teal-500",
    gradient: "bg-gradient-to-br from-emerald-500/10 to-teal-500/10",
  },
  {
    id: "database",
    title: "Database Design",
    description: "Designing and optimizing database structures for performance.",
    icon: <Database className="h-6 w-6" />,
    features: ["PostgreSQL", "MongoDB", "Prisma", "Query Optimization"],
    color: "from-amber-500 to-orange-500",
    gradient: "bg-gradient-to-br from-amber-500/10 to-orange-500/10",
  },
  {
    id: "cloud",
    title: "Cloud Services",
    description: "Deploying and managing applications on cloud platforms.",
    icon: <Cloud className="h-6 w-6" />,
    features: ["AWS", "Vercel", "Docker", "CI/CD"],
    color: "from-indigo-500 to-purple-500",
    gradient: "bg-gradient-to-br from-indigo-500/10 to-purple-500/10",
  },
  {
    id: "mobile",
    title: "Mobile Development",
    description: "Building cross-platform mobile applications with React Native.",
    icon: <Smartphone className="h-6 w-6" />,
    features: ["React Native", "Expo", "Native APIs", "App Store Deployment"],
    color: "from-rose-500 to-pink-500",
    gradient: "bg-gradient-to-br from-rose-500/10 to-pink-500/10",
  },
];

interface ServicesPreviewProps {
  className?: string;
  limit?: number;
  variant?: 'default' | 'compact' | 'expanded';
  showViewAll?: boolean;
  columns?: 2 | 3 | 4;
  showFeatures?: boolean;
}

// ✅ Animation variants with proper typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 25,
    },
  },
  hover: {
    y: -8,
    boxShadow: "0 20px 60px -12px rgba(0,0,0,0.15)",
    transition: { duration: 0.3 },
  },
};

export function ServicesPreview({ 
  className, 
  limit = 3,
  variant = 'default',
  showViewAll = true,
  columns = 3,
  showFeatures = true
}: ServicesPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const displayedServices = services.slice(0, limit);

  // Grid columns configuration
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  // Get icon color based on service color
  const getIconColor = (color?: string) => {
    if (!color) return "text-primary";
    const colors: Record<string, string> = {
      'from-blue-500 to-cyan-500': 'text-blue-500',
      'from-purple-500 to-pink-500': 'text-purple-500',
      'from-emerald-500 to-teal-500': 'text-emerald-500',
      'from-amber-500 to-orange-500': 'text-amber-500',
      'from-indigo-500 to-purple-500': 'text-indigo-500',
      'from-rose-500 to-pink-500': 'text-rose-500',
    };
    return colors[color] || 'text-primary';
  };

  // ✅ Compact variant
  if (variant === 'compact') {
    return (
      <section id="services-preview" className={cn("py-8 md:py-12", className)}>
        <div className="container px-4 sm:px-6">
          <SectionHeading 
            title="What I Do" 
            subtitle="Services I offer"
            className="mb-6"
            // ✅ Remove alignment prop if not supported
          />

          <motion.div
            ref={ref}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className={cn("grid gap-4", gridCols[Math.min(columns, 3) as 2 | 3])}
          >
            {displayedServices.slice(0, 6).map((service) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover="hover"
                className="h-full"
              >
                <Card className="h-full hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className={cn(
                      "inline-flex h-10 w-10 items-center justify-center rounded-lg mb-3",
                      service.gradient || "bg-primary/10"
                    )}>
                      <div className={cn("transition-colors", getIconColor(service.color))}>
                        {service.icon}
                      </div>
                    </div>
                    <CardTitle className="text-base">{service.title}</CardTitle>
                  </CardHeader>
                  {showFeatures && (
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {service.description}
                      </p>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  // ✅ Expanded variant
  if (variant === 'expanded') {
    return (
      <section id="services-preview" className={cn("py-16 md:py-24", className)}>
        <div className="container px-4 sm:px-6">
          <SectionHeading 
            title="What I Do" 
            subtitle="Services I offer to help bring your ideas to life"
            className="mb-12"
          >
            {showViewAll && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Button variant="outline" size="lg" asChild className="gap-2 group mt-4">
                  <Link href="/services">
                    View All Services
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </SectionHeading>

          <motion.div
            ref={ref}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className={cn("grid gap-6", gridCols[columns])}
          >
            {displayedServices.map((service) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover="hover"
                className="h-full"
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <Card className="h-full overflow-hidden hover:border-primary/50 transition-all duration-300 group">
                  {/* Gradient header */}
                  <div className={cn(
                    "h-2 w-full",
                    service.gradient || "bg-gradient-to-r from-primary/50 to-primary"
                  )} />
                  
                  <CardHeader>
                    <div className={cn(
                      "inline-flex h-14 w-14 items-center justify-center rounded-xl mb-4 transition-all duration-300",
                      service.gradient || "bg-primary/10",
                      "group-hover:scale-110 group-hover:shadow-lg"
                    )}>
                      <div className={cn(
                        "transition-colors",
                        getIconColor(service.color)
                      )}>
                        {service.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  {showFeatures && (
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={`${service.id}-feature-${idx}`} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  // ✅ Default variant
  return (
    <section id="services-preview" className={cn("py-12 md:py-16 lg:py-20", className)}>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading 
          title="What I Do" 
          subtitle="Services I offer to help bring your ideas to life"
          className="mb-8 md:mb-10 lg:mb-12"
        >
          {showViewAll && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Button asChild size="lg" className="gap-2 group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-md hover:shadow-lg transition-all">
                <Link href="/services" className="inline-flex items-center gap-2">
                  View All Services
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          )}
        </SectionHeading>

        <motion.div
          ref={ref}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className={cn("grid gap-4 md:gap-6", gridCols[columns])}
        >
          {displayedServices.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover="hover"
              className="h-full"
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50 group">
                <CardHeader>
                  <div className={cn(
                    "inline-flex h-12 w-12 items-center justify-center rounded-lg mb-4 transition-all duration-300",
                    service.gradient || "bg-primary/10",
                    "group-hover:scale-110 group-hover:shadow-md"
                  )}>
                    <div className={cn(
                      "transition-colors",
                      getIconColor(service.color)
                    )}>
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                {showFeatures && (
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={`${service.id}-feature-${idx}`} className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          <Zap className="h-3 w-3 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}