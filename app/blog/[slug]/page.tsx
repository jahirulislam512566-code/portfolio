// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";

import {
  ArticleHeader,
  ArticleMeta,
  ArticleContent,
  ArticleShare,
  ArticleTags,
  TableOfContents,
  RelatedPosts,
} from "@/components/blog/article";

import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog";
import { siteConfig } from "@/config/site.config";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Get a published post by slug.
 */
function getPostBySlug(slug: string) {
  return blogPosts.find(
    (post) =>
      post.slug === slug &&
      post.status === "published"
  );
}

/**
 * Generate static article routes.
 */
export function generateStaticParams() {
  return blogPosts
    .filter(
      (post) => post.status === "published"
    )
    .map((post) => ({
      slug: post.slug,
    }));
}

/**
 * Generate article metadata.
 */
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  const description =
    post.excerpt ||
    `Read ${post.title} on ${siteConfig.name}.`;

  const canonicalUrl = `${siteConfig.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description,

    keywords: [
      post.category,
      ...(post.tags ?? []),
    ],

    authors: post.author?.name
      ? [{ name: post.author.name }]
      : undefined,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: post.title,
      description,

      publishedTime: post.publishedDate
        ? new Date(post.publishedDate).toISOString()
        : undefined,

      authors: post.author?.name
        ? [post.author.name]
        : undefined,

      tags: post.tags ?? [],

      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              alt: post.title,
            },
          ]
        : undefined,
    },

    twitter: {
      card: post.coverImage
        ? "summary_large_image"
        : "summary",
      title: post.title,
      description,

      images: post.coverImage
        ? [post.coverImage]
        : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  /**
   * Find related published articles.
   *
   * Articles with more matching tags
   * are ranked first.
   */
  const relatedPosts = blogPosts
    .filter(
      (candidate) =>
        candidate.status === "published" &&
        candidate.id !== post.id
    )
    .map((candidate) => {
      const postTags = post.tags ?? [];
      const candidateTags =
        candidate.tags ?? [];

      const matchingTags =
        candidateTags.filter((tag) =>
          postTags.some(
            (postTag) =>
              postTag.toLowerCase() ===
              tag.toLowerCase()
          )
        );

      return {
        post: candidate,
        score: matchingTags.length,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.post);

  const articleUrl = `${siteConfig.url}/blog/${post.slug}`;

  return (
    <article
      id="article"
      className="
        w-full
        min-w-0
      "
    >
      {/* -------------------------------------------------
          Article Header
      -------------------------------------------------- */}
      <ArticleHeader post={post} />

      {/* -------------------------------------------------
          Article Body
      -------------------------------------------------- */}
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          min-w-0
          px-4
          py-10
          sm:px-6
          sm:py-12
          lg:px-8
          lg:py-16
        "
      >
        {/* Back to blog */}
        <div className="mb-8 sm:mb-10">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="
              -ml-2
              rounded-full
              gap-2
              text-muted-foreground
              hover:text-foreground
            "
          >
            <Link href="/blog">
              <ArrowLeft
                className="h-4 w-4"
                aria-hidden="true"
              />

              <span>Back to blog</span>
            </Link>
          </Button>
        </div>

        {/* Main article layout */}
        <div
          className="
            grid
            w-full
            min-w-0
            gap-10
            lg:grid-cols-[minmax(0,1fr)_240px]
            lg:gap-12
            xl:gap-16
          "
        >
          {/* -------------------------------------------------
              Main Content
          -------------------------------------------------- */}
          <div
            className="
              min-w-0
              max-w-3xl
            "
          >
            {/* Article metadata */}
            <ArticleMeta post={post} />

            {/* Article content */}
            <div className="mt-8 sm:mt-10">
              <ArticleContent
                content={post.content}
              />
            </div>

            {/* -------------------------------------------------
                Article Footer
            -------------------------------------------------- */}
            <footer
              className="
                mt-10
                space-y-8
                border-t
                border-border/60
                pt-8
                sm:mt-12
                sm:pt-10
              "
            >
              {/* Tags */}
              <ArticleTags
                tags={post.tags ?? []}
              />

              {/* ✅ FIX: Wrap ArticleShare in Suspense */}
              <Suspense fallback={
                <div className="h-10 w-full animate-pulse rounded bg-muted/50" />
              }>
                <ArticleShare
                  title={post.title}
                  url={articleUrl}
                  variant="default"
                />
              </Suspense>
            </footer>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <RelatedPosts
                posts={relatedPosts}
                className="mt-12 sm:mt-16"
              />
            )}
          </div>

          {/* -------------------------------------------------
              Table of Contents
          -------------------------------------------------- */}
          <aside
            className="
              hidden
              min-w-0
              lg:block
            "
            aria-label="Article navigation"
          >
            <div className="sticky top-24">
              <TableOfContents
                content={post.content}
              />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}