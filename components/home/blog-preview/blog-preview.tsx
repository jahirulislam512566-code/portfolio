"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/common/section-heading";
import { blogPosts } from "@/data/blog";
import { Calendar, Clock, ArrowRight, PenSquare, Tag, Eye, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import Image from "next/image";

interface BlogPreviewProps {
  className?: string;
  limit?: number;
  variant?: 'default' | 'compact' | 'expanded';
  showViewAll?: boolean;
  showTags?: boolean;
  showStats?: boolean;
  columns?: 2 | 3 | 4;
}

export function BlogPreview({ 
  className, 
  limit = 3,
  variant = 'default',
  showViewAll = true,
  showTags = true,
  showStats = true,
  columns = 3
}: BlogPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const displayedPosts = blogPosts
    .filter(post => post.status === "published")
    .slice(0, limit);

  // Grid columns configuration
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const



,
        stiffness: 200,
        damping: 25,
      },
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 60px -12px rgba(0,0,0,0.15)",
      transition: { duration: 0.3, ease: "easeOut" as const

 }, // ✅ Fixed
    },
  };

  // ✅ Format date - handles both string and Date
  const formatDate = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'React': 'from-blue-500 to-cyan-500',
      'Next.js': 'from-purple-500 to-pink-500',
      'TypeScript': 'from-blue-600 to-indigo-600',
      'UI/UX': 'from-rose-500 to-pink-500',
      'Backend': 'from-emerald-500 to-teal-500',
      'DevOps': 'from-indigo-500 to-purple-500',
    };
    return colors[category] || 'from-gray-500 to-slate-500';
  };

  // Compact variant
  if (variant === 'compact') {
    return (
      <section id="blog-preview" className={cn("py-8 md:py-12", className)}>
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading 
            title="Latest Posts" 
            subtitle="Thoughts and insights"
            className="mb-6"
            // ✅ Remove alignment prop
          />

          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className={cn("grid gap-4", gridCols[Math.min(columns, 3) as 2 | 3])}
          >
            {displayedPosts.slice(0, 4).map((post, index) => (
              <motion.div
                key={post.id}
                variants={cardVariants}
                whileHover="hover"
                className="h-full"
              >
                <Card className="h-full hover:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.publishedDate)}
                    </div>
                    <CardTitle className="text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {post.readingTime} min read
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  // Expanded variant
  if (variant === 'expanded') {
    return (
      <section id="blog-preview" className={cn("py-16 md:py-24", className)}>
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading 
            title="Latest Blog Posts" 
            subtitle="Thoughts, tutorials, and insights on web development"
            className="mb-12"
            // ✅ Remove alignment prop
          >
            {showViewAll && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.3 }}
              >
                <Button variant="outline" size="lg" asChild className="gap-2 group mt-4">
                  <Link href="/blog" className="flex items-center justify-center gap-2">
                    View All Posts
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </SectionHeading>

          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className={cn("grid gap-6", gridCols[columns])}
          >
            {displayedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={cardVariants}
                whileHover="hover"
                className="h-full"
              >
                <Card className="h-full overflow-hidden hover:border-primary/50 transition-all duration-300 group">
                  {/* Cover Image with Gradient Overlay */}
                  {post.coverImage && (
                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                      <Image
                        src={post.coverImage}
                        alt={post.coverImageAlt || post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Category Badge */}
                      {post.category && (
                        <div className="absolute top-3 left-3">
                          <Badge className={cn(
                            "bg-gradient-to-r text-white border-none",
                            getCategoryColor(post.category)
                          )}>
                            {post.category}
                          </Badge>
                        </div>
                      )}
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.publishedDate)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readingTime} min read
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col justify-end space-y-4">
                    {/* Tags */}
                    {showTags && post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 4).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            <Tag className="h-2.5 w-2.5 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{post.tags.length - 4}
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    {/* Stats and Read More */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {showStats && post.views !== undefined && (
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {post.views}
                          </span>
                        )}
                        {showStats && post.likes !== undefined && (
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {post.likes}
                          </span>
                        )}
                      </div>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1 group/link"
                      >
                        Read More
                        <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  // Default variant
  return (
    <section id="blog-preview" className={cn("py-12 md:py-16 lg:py-20 bg-muted/30", className)}>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading 
          title="Latest Blog Posts" 
          subtitle="Thoughts, tutorials, and insights on web development"
          className="mb-8 md:mb-10 lg:mb-12"
          // ✅ Remove alignment prop
        >
          {showViewAll && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.3 }}
            >
              <Button variant="outline" size="lg" asChild className="gap-2 group mt-4">
                <Link href="/blog" className="flex items-center justify-center gap-2">
                  <span className="leading-none bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">
                    View All Posts
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          )}
        </SectionHeading>

        {displayedPosts.length > 0 ? (
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className={cn("grid gap-4 md:gap-6", gridCols[columns])}
          >
            {displayedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                variants={cardVariants}
                whileHover="hover"
                className="h-full"
              >
                <Card className="h-full overflow-hidden hover:shadow-lg transition-all hover:border-primary/50 group">
                  {/* Cover Image */}
                  {post.coverImage && (
                    <div className="aspect-video w-full overflow-hidden bg-muted relative">
                      <Image
                        src={post.coverImage}
                        alt={post.coverImageAlt || post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Category Badge */}
                      {post.category && (
                        <div className="absolute top-3 left-3">
                          <Badge className={cn(
                            "bg-gradient-to-r text-white border-none",
                            getCategoryColor(post.category)
                          )}>
                            {post.category}
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.publishedDate)}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readingTime} min read
                      </span>
                      {post.category && (
                        <>
                          <span className="hidden sm:inline">•</span>
                          <Badge variant="outline" className="text-[10px] px-2 py-0 h-5">
                            {post.category}
                          </Badge>
                        </>
                      )}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Tags */}
                    {showTags && post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            <Tag className="h-2.5 w-2.5 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{post.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    {/* Stats and Read More */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      {showStats && (post.views !== undefined || post.likes !== undefined) && (
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          {post.views !== undefined && (
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {post.views}
                            </span>
                          )}
                          {post.likes !== undefined && (
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {post.likes}
                            </span>
                          )}
                        </div>
                      )}
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1 group/link"
                      >
                        Read More
                        <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Empty state
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
              <PenSquare className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <p className="text-lg font-medium text-foreground">No blog posts yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Check back soon for new content
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}