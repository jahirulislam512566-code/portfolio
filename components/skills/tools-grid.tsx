// components/skills/tools-grid.tsx
"use client";

import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  GitBranch, 
  Terminal, 
  Server,
  Database,
  Cloud,
  Layout,
  Palette,
  Cpu,
  Box,
  CloudLightning,
  Container,
  Braces,
  Workflow,
  Blocks,
  Wrench,
  type LucideIcon
} from "lucide-react";
import { technologiesData } from "@/data/skills";
import { cn } from "@/lib/utils";
import { useRef, useState, ReactNode } from "react";

// ✅ Custom SVG Icons (if not imported from elsewhere)
const GithubIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn("h-4 w-4", className)}
    style={{ width: size, height: size }}
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const FigmaIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn("h-4 w-4", className)}
    style={{ width: size, height: size }}
  >
    <path d="M8.5 24c2.5 0 4.5-2 4.5-4.5V15h-4.5C5.5 15 4 16.5 4 18.5S5.5 22 7 22h1.5v2zM4 4.5C4 2 5.5.5 8 .5h4.5V7H8C5.5 7 4 5.5 4 4.5zM4.5 12C4.5 9.5 6 8 8.5 8H13v8H8.5C6 16 4.5 14.5 4.5 12zM13 2h4.5C20 2 21.5 3.5 21.5 6S20 10 17.5 10H13V2zM17.5 12c2.5 0 4.5 2 4.5 4.5S20 21 17.5 21 13 19 13 16.5 15 12 17.5 12z" />
  </svg>
);

// ✅ Type for tool icon map
type ToolIconMap = Record<string, ReactNode>;

interface ToolsGridProps {
  className?: string;
  variant?: 'default' | 'compact' | 'expanded';
  showLevels?: boolean;
  showCategories?: boolean;
  limit?: number;
}

interface ToolCategory {
  name: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  tools: string[];
  levels?: number[];
}

// ✅ Default tool categories
const defaultToolCategories: ToolCategory[] = [
  {
    name: "Frontend",
    icon: Layout,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    levels: [90, 85, 82, 80],
  },
  {
    name: "Backend",
    icon: Server,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    tools: ["Node.js", "Python", "Express", "Django"],
    levels: [85, 75, 80, 70],
  },
  {
    name: "Database",
    icon: Database,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    tools: ["PostgreSQL", "MongoDB", "Firebase", "Redis"],
    levels: [78, 72, 80, 65],
  },
  {
    name: "DevOps",
    icon: Cloud,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    tools: ["Docker", "AWS", "Vercel", "Git"],
    levels: [75, 70, 85, 90],
  },
  {
    name: "Tools",
    icon: Wrench,
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-500/10",
    tools: ["VS Code", "GitHub", "Figma", "Postman"],
    levels: [90, 85, 75, 80],
  },
];

// ✅ Map of tool names to icons
const toolIconMap: ToolIconMap = {
  "React": <Code2 className="h-4 w-4" />,
  "Next.js": <Braces className="h-4 w-4" />,
  "TypeScript": <Blocks className="h-4 w-4" />,
  "Tailwind CSS": <Palette className="h-4 w-4" />,
  "Node.js": <Server className="h-4 w-4" />,
  "Python": <Terminal className="h-4 w-4" />,
  "Express": <Workflow className="h-4 w-4" />,
  "Django": <Cpu className="h-4 w-4" />,
  "PostgreSQL": <Database className="h-4 w-4" />,
  "MongoDB": <Database className="h-4 w-4" />,
  "Firebase": <Cloud className="h-4 w-4" />,
  "Redis": <Database className="h-4 w-4" />,
  "Docker": <Container className="h-4 w-4" />,
  "AWS": <CloudLightning className="h-4 w-4" />,
  "Vercel": <CloudLightning className="h-4 w-4" />,
  "Git": <GitBranch className="h-4 w-4" />,
  "VS Code": <Code2 className="h-4 w-4" />,
  "GitHub": <GithubIcon className="h-4 w-4" />,
  "Figma": <FigmaIcon className="h-4 w-4" />,
  "Postman": <Box className="h-4 w-4" />,
};

// ✅ Animation variants with proper typing
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const categoryVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,

      stiffness: 200,
      damping: 25,
    },
  },
};

const toolVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const

    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut" as const
    },
  },
  tap: {
    scale: 0.95,
  },
};

export function ToolsGrid({ 
  className,
  variant = 'default',
  showLevels = true,
  showCategories = true,
  limit
}: ToolsGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // ✅ Get categories from data or use defaults
  const getCategories = (): ToolCategory[] => {
    if (!technologiesData) return defaultToolCategories;

    const data = technologiesData as any;
    const categories: ToolCategory[] = [];

    if (data.frontend) {
      categories.push({
        name: "Frontend",
        icon: Layout,
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-500/10",
        tools: data.frontend,
        levels: data.frontend.map(() => Math.floor(Math.random() * 30) + 70),
      });
    }
    if (data.backend) {
      categories.push({
        name: "Backend",
        icon: Server,
        color: "from-emerald-500 to-teal-500",
        bgColor: "bg-emerald-500/10",
        tools: data.backend,
        levels: data.backend.map(() => Math.floor(Math.random() * 30) + 70),
      });
    }
    if (data.database) {
      categories.push({
        name: "Database",
        icon: Database,
        color: "from-amber-500 to-orange-500",
        bgColor: "bg-amber-500/10",
        tools: data.database,
        levels: data.database.map(() => Math.floor(Math.random() * 30) + 70),
      });
    }
    if (data.devops) {
      categories.push({
        name: "DevOps",
        icon: Cloud,
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-purple-500/10",
        tools: data.devops,
        levels: data.devops.map(() => Math.floor(Math.random() * 30) + 70),
      });
    }
    if (data.tools) {
      categories.push({
        name: "Tools",
        icon: Wrench,
        color: "from-indigo-500 to-purple-500",
        bgColor: "bg-indigo-500/10",
        tools: data.tools,
        levels: data.tools.map(() => Math.floor(Math.random() * 30) + 70),
      });
    }

    return categories.length > 0 ? categories : defaultToolCategories;
  };

  const toolCategories = getCategories();

  // ✅ Limit tools per category if specified
  const processedCategories = toolCategories.map((cat) => ({
    ...cat,
    tools: limit ? cat.tools.slice(0, limit) : cat.tools,
    levels: limit ? cat.levels?.slice(0, limit) : cat.levels,
  }));

  // ✅ Compact variant
  if (variant === 'compact') {
    return (
      <div className={cn("space-y-6", className)}>
        {processedCategories.map((category, catIndex) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={cn("p-1.5 rounded-md", category.bgColor)}>
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{category.name}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {category.tools.map((tool) => (
                  <Badge key={tool} variant="outline" className="text-xs">
                    {tool}
                  </Badge>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  // ✅ Expanded variant with technology cards
  if (variant === 'expanded') {
    return (
      <div className={cn("space-y-10", className)} ref={ref}>
        {processedCategories.map((category, catIndex) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={containerVariants}
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <motion.div variants={categoryVariants} className="mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    category.bgColor,
                    "text-primary"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold">{category.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {category.tools.length} tools
                  </Badge>
                  <div className={cn(
                    "flex-1 h-0.5 rounded-full bg-gradient-to-r",
                    category.color
                  )} />
                </div>
              </motion.div>
              
              <motion.div 
                variants={containerVariants}
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
              >
                {category.tools.map((tool, index) => {
                  const icon = toolIconMap[tool];
                  const level = category.levels?.[index];
                  
                  return (
                    <motion.div
                      key={tool}
                      variants={categoryVariants}
                    >
                      <Card className="hover:shadow-md transition-all hover:border-primary/50 group">
                        <CardContent className="p-3 flex items-center gap-3">
                          {icon && (
                            <span className="text-muted-foreground group-hover:text-primary transition-colors">
                              {icon}
                            </span>
                          )}
                          <span className="text-sm font-medium flex-1">{tool}</span>
                          {showLevels && level !== undefined && (
                            <Badge variant="outline" className="text-[10px]">
                              {level}%
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  // ✅ Default variant
  return (
    <div className={cn("space-y-8", className)} ref={ref}>
      {processedCategories.map((category, catIndex) => {
        const Icon = category.icon;
        return (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIndex * 0.08, duration: 0.5 }}
            onMouseEnter={() => setHoveredCategory(category.name)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {showCategories && (
              <div className="flex items-center gap-3 mb-4">
                <div className={cn(
                  "p-2 rounded-lg transition-all duration-300",
                  category.bgColor,
                  "text-primary",
                  hoveredCategory === category.name && "scale-110 shadow-md"
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {category.tools.length}
                </Badge>
                <div className={cn(
                  "flex-1 h-px bg-gradient-to-r",
                  category.color,
                  "opacity-30"
                )} />
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {category.tools.map((tool, index) => {
                const icon = toolIconMap[tool];
                return (
                  <motion.div
                    key={tool}
                    variants={toolVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.02 }}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Card className="hover:shadow-md transition-all hover:border-primary/50 group">
                      <CardContent className="px-3 py-2 flex items-center gap-2">
                        {icon && (
                          <span className="text-muted-foreground group-hover:text-primary transition-colors">
                            {icon}
                          </span>
                        )}
                        <span className="text-sm font-medium">{tool}</span>
                        {showLevels && category.levels?.[index] !== undefined && (
                          <Badge variant="outline" className="text-[10px] ml-1">
                            {category.levels[index]}%
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}