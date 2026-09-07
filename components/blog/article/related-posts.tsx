"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BlogPost } from "@/types/blog";
import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface RelatedPostsProps {
  posts: BlogPost[];
  className?: string;
}

export function RelatedPosts({ posts, className }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-xl font-bold">Related Articles</h3>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {posts.slice(0, 3).map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className="hover:shadow-lg transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <Link href={`/blog/${post.slug}`}>
                  <h4 className="font-semibold hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                </Link>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.publishedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readingTime || 5} min read
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}