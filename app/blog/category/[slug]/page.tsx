import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { BlogGrid } from "@/components/blog";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blog";
import { siteConfig } from "@/config/site.config";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

/**
 * Convert a category name into a URL-safe slug.
 */
function createCategorySlug(category: string) {
  return category
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
}

/**
 * Convert a slug into a readable category name.
 */
function formatCategoryName(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Generate static pages for every available category.
 */
export function generateStaticParams() {
  const categories = new Set(
    blogPosts
      .filter((post) => post.status === "published")
      .map((post) => post.category)
  );

  return Array.from(categories).map((category) => ({
    slug: createCategorySlug(category),
  }));
}

/**
 * Generate SEO metadata for each category page.
 */
export function generateMetadata({
  params,
}: CategoryPageProps): Metadata {
  const categorySlug = params.slug;

  const categoryPosts = blogPosts.filter(
    (post) =>
      post.status === "published" &&
      createCategorySlug(post.category) === categorySlug
  );

  if (categoryPosts.length === 0) {
    return {
      title: "Category Not Found",
      description:
        "The requested blog category could not be found.",
    };
  }

  const categoryName = categoryPosts[0].category;

  const title = `${categoryName} - Blog`;
  const description = `Read articles and tutorials about ${categoryName} on my blog.`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/blog/category/${categorySlug}`,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function CategoryPage({
  params,
}: CategoryPageProps) {
  const categorySlug = params.slug;

  /**
   * Find all published posts belonging
   * to the current category.
   */
  const categoryPosts = blogPosts.filter(
    (post) =>
      post.status === "published" &&
      createCategorySlug(post.category) === categorySlug
  );

  /**
   * If the category doesn't exist,
   * render the Next.js 404 page.
   */
  if (categoryPosts.length === 0) {
    notFound();
  }

  /**
   * Use the actual category name from the post data.
   * This avoids incorrectly formatting names such as:
   * "Web Development" -> "Web development"
   */
  const categoryName = categoryPosts[0].category;

  /**
   * Only show categories that contain published posts.
   */
  const allCategories = Array.from(
    new Set(
      blogPosts
        .filter((post) => post.status === "published")
        .map((post) => post.category)
    )
  ).sort((a, b) => a.localeCompare(b));

  return (
    <section
      id="blog-category"
      aria-labelledby="category-heading"
      className="w-full min-w-0 py-12 sm:py-16 lg:py-20"
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          min-w-0
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* Back to Blog */}
        <div className="mb-6 sm:mb-8">
          <Button
            asChild
            variant="ghost"
            className="
              -ml-2
              h-9
              gap-2
              rounded-full
              px-3
              text-sm
              sm:h-10
              sm:px-4
            "
          >
            <Link href="/blog">
              <ArrowLeft
                className="h-4 w-4"
                aria-hidden="true"
              />

              <span>Back to Blog</span>
            </Link>
          </Button>
        </div>

        {/* Category Header */}
        <header
          className="
            mb-8
            w-full
            min-w-0
            max-w-4xl
            sm:mb-10
            lg:mb-12
          "
        >
          <h1
            id="category-heading"
            className="
              text-3xl
              font-bold
              tracking-tight
              sm:text-4xl
              lg:text-5xl
            "
          >
            {categoryName}
          </h1>

          <p
            className="
              mt-3
              max-w-2xl
              text-sm
              leading-6
              text-muted-foreground
              sm:mt-4
              sm:text-base
              sm:leading-7
            "
          >
            {categoryPosts.length}{" "}
            {categoryPosts.length === 1
              ? "article"
              : "articles"}{" "}
            in this category.
          </p>

          {/* Category Navigation */}
          {allCategories.length > 0 && (
            <nav
              aria-label="Blog categories"
              className="
                mt-5
                flex
                w-full
                min-w-0
                flex-wrap
                gap-2
              "
            >
              {allCategories.map((category) => {
                const slug = createCategorySlug(category);
                const isActive = slug === categorySlug;

                return (
                  <Link
                    key={category}
                    href={`/blog/category/${slug}`}
                    aria-current={
                      isActive ? "page" : undefined
                    }
                    className={`
                      inline-flex
                      max-w-full
                      items-center
                      rounded-full
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      transition-colors
                      sm:px-4
                      sm:py-2
                      sm:text-sm
                      ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                      }
                    `}
                  >
                    <span className="max-w-[180px] truncate sm:max-w-none">
                      {category}
                    </span>
                  </Link>
                );
              })}
            </nav>
          )}
        </header>

        {/* Category Posts */}
        <BlogGrid
          postsPerPage={6}
          showSearch={true}
          showCategories={false}
        />
      </div>
    </section>
  );
}