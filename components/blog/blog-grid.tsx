"use client";

import { useMemo, useState } from "react";
import { Search, X, PenSquare } from "lucide-react";

import { BlogCard } from "./blog-card";
import { BlogCategory } from "./blog-category";
import { BlogPagination } from "./blog-pagination";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { BlogPost } from "@/types/blog";
import { blogPosts } from "@/data/blog";
import { cn } from "@/lib/utils";

interface BlogGridProps {
  className?: string;
  postsPerPage?: number;
  showSearch?: boolean;
  showCategories?: boolean;
}

export function BlogGrid({
  className,
  postsPerPage = 6,
  showSearch = true,
  showCategories = true,
}: BlogGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  /*
   * ---------------------------------------------------------
   * Published posts
   * ---------------------------------------------------------
   */

  const publishedPosts = useMemo<BlogPost[]>(() => {
    return blogPosts.filter(
      (post) => post.status === "published"
    );
  }, []);

  /*
   * ---------------------------------------------------------
   * Categories
   * ---------------------------------------------------------
   */

  const categories = useMemo(() => {
    const categorySet = new Set(
      publishedPosts
        .map((post) => post.category)
        .filter(Boolean)
    );

    return [
      "all",
      ...Array.from(categorySet),
    ];
  }, [publishedPosts]);

  /*
   * ---------------------------------------------------------
   * Search + category filtering
   * ---------------------------------------------------------
   */

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return publishedPosts.filter((post) => {
      /*
       * Category filter
       */
      const matchesCategory =
        selectedCategory === "all" ||
        post.category === selectedCategory;

      if (!matchesCategory) {
        return false;
      }

      /*
       * No search query
       */
      if (!query) {
        return true;
      }

      /*
       * Search across relevant fields
       */
      const searchableContent = [
        post.title,
        post.excerpt ?? "",
        post.content ?? "",
        post.category ?? "",
        ...(post.tags ?? []),
        post.author?.name ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return searchableContent.includes(query);
    });
  }, [
    publishedPosts,
    searchQuery,
    selectedCategory,
  ]);

  /*
   * ---------------------------------------------------------
   * Pagination
   * ---------------------------------------------------------
   */

  const safePostsPerPage = Math.max(
    1,
    Math.floor(postsPerPage)
  );

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredPosts.length / safePostsPerPage
    )
  );

  /*
   * Keep page within valid range
   */
  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) * safePostsPerPage;

  const displayedPosts = filteredPosts.slice(
    startIndex,
    startIndex + safePostsPerPage
  );

  /*
   * ---------------------------------------------------------
   * Handlers
   * ---------------------------------------------------------
   */

  const handleSearchChange = (
    value: string
  ) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleSearchClear = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleCategoryChange = (
    category: string
  ) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  /*
   * ---------------------------------------------------------
   * Render
   * ---------------------------------------------------------
   */

  return (
    <div
      className={cn(
        "w-full min-w-0 space-y-8",
        className
      )}
    >
      {/* =====================================================
          Filters
      ====================================================== */}

      {(showSearch || showCategories) && (
        <div
          className="
            flex
            w-full
            min-w-0
            flex-col
            gap-4
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* Search */}
          {showSearch && (
            <div className="relative w-full min-w-0 lg:max-w-sm">
              <Search
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-muted-foreground
                "
              />

              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(event) =>
                  handleSearchChange(
                    event.target.value
                  )
                }
                aria-label="Search articles"
                className="
                  h-10
                  w-full
                  pl-9
                  pr-9
                  rounded-full
                "
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={handleSearchClear}
                  aria-label="Clear search"
                  className="
                    absolute
                    right-2
                    top-1/2
                    flex
                    h-7
                    w-7
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    text-muted-foreground
                    transition-colors
                    hover:bg-muted
                    hover:text-foreground
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-ring
                  "
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          )}

          {/* Categories */}
          {showCategories && (
            <BlogCategory
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={
                handleCategoryChange
              }
              className="
                w-full
                lg:w-auto
                lg:max-w-[70%]
              "
            />
          )}
        </div>
      )}

      {/* =====================================================
          Results information
      ====================================================== */}

      <div
        className="
          flex
          min-w-0
          flex-wrap
          items-center
          justify-between
          gap-2
        "
      >
        <p className="text-sm text-muted-foreground">
          {filteredPosts.length === 0
            ? "No articles found"
            : `Showing ${startIndex + 1}–${Math.min(
                startIndex + displayedPosts.length,
                filteredPosts.length
              )} of ${filteredPosts.length} articles`}
        </p>

        {(searchQuery ||
          selectedCategory !== "all") && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="
              text-sm
              font-medium
              text-primary
              transition-colors
              hover:text-primary/80
              hover:underline
            "
          >
            Clear filters
          </button>
        )}
      </div>

      {/* =====================================================
          Blog Grid
      ====================================================== */}

      {displayedPosts.length > 0 && (
        <div
          className="
            grid
            w-full
            min-w-0
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-6
          "
        >
          {displayedPosts.map(
            (post, index) => (
              <BlogCard
                key={post.id ?? post.slug}
                post={post}
                index={index}
              />
            )
          )}
        </div>
      )}

      {/* =====================================================
          Empty state
      ====================================================== */}

      {displayedPosts.length === 0 && (
        <div
          className="
            flex
            min-h-[260px]
            w-full
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-border
            bg-muted/20
            px-6
            py-12
            text-center
          "
        >
          <div
            className="
              mb-4
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-muted
            "
          >
            <PenSquare
              className="
                h-5
                w-5
                text-muted-foreground
              "
              aria-hidden="true"
            />
          </div>

          <h3 className="text-base font-semibold">
            No articles found
          </h3>

          <p
            className="
              mt-1
              max-w-md
              text-sm
              leading-6
              text-muted-foreground
            "
          >
            Try adjusting your search or selecting
            a different category.
          </p>

          <Button
            type="button"
            variant="outline"
            className="mt-5 rounded-full"
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* =====================================================
          Pagination
      ====================================================== */}

      {filteredPosts.length > 0 &&
        totalPages > 1 && (
          <div className="flex w-full justify-center pt-2">
            <BlogPagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
    </div>
  );
}