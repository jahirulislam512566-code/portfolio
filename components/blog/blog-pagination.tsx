"use client";

import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: BlogPaginationProps) {
  /*
   * ---------------------------------------------------------
   * Validate pagination values
   * ---------------------------------------------------------
   */

  const safeTotalPages = Math.max(
    1,
    Math.floor(totalPages)
  );

  const safeCurrentPage = Math.min(
    Math.max(1, Math.floor(currentPage)),
    safeTotalPages
  );

  /*
   * ---------------------------------------------------------
   * Generate page numbers
   * ---------------------------------------------------------
   */

  const pageNumbers = useMemo(() => {
    const pages: Array<number | "..."> = [];

    if (safeTotalPages <= 7) {
      for (let page = 1; page <= safeTotalPages; page++) {
        pages.push(page);
      }

      return pages;
    }

    pages.push(1);

    if (safeCurrentPage > 4) {
      pages.push("...");
    }

    const start = Math.max(
      2,
      safeCurrentPage - 1
    );

    const end = Math.min(
      safeTotalPages - 1,
      safeCurrentPage + 1
    );

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    if (safeCurrentPage < safeTotalPages - 3) {
      pages.push("...");
    }

    pages.push(safeTotalPages);

    return pages;
  }, [safeCurrentPage, safeTotalPages]);

  /*
   * ---------------------------------------------------------
   * Handlers
   * ---------------------------------------------------------
   */

  const handlePageChange = (page: number) => {
    if (
      page < 1 ||
      page > safeTotalPages ||
      page === safeCurrentPage
    ) {
      return;
    }

    onPageChange(page);
  };

  /*
   * ---------------------------------------------------------
   * Render
   * ---------------------------------------------------------
   */

  if (safeTotalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Blog pagination"
      className={cn(
        "w-full min-w-0",
        className
      )}
    >
      <div
        className="
          flex
          w-full
          min-w-0
          items-center
          justify-center
          gap-1.5
          sm:gap-2
        "
      >
        {/* Previous */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() =>
            handlePageChange(safeCurrentPage - 1)
          }
          disabled={safeCurrentPage === 1}
          aria-label="Go to previous page"
          className="
            h-9
            w-9
            shrink-0
            rounded-full
            sm:h-10
            sm:w-10
          "
        >
          <ChevronLeft
            className="h-4 w-4"
            aria-hidden="true"
          />
        </Button>

        {/* Page numbers */}
        <div
          className="
            flex
            min-w-0
            items-center
            justify-center
            gap-1.5
            sm:gap-2
          "
        >
          {pageNumbers.map((page, index) => {
            const isEllipsis = page === "...";
            const isCurrent = page === safeCurrentPage;

            if (isEllipsis) {
              return (
                <span
                  key={`ellipsis-${index}`}
                  aria-hidden="true"
                  className="
                    flex
                    h-9
                    w-7
                    items-center
                    justify-center
                    text-sm
                    text-muted-foreground
                    sm:h-10
                    sm:w-8
                  "
                >
                  …
                </span>
              );
            }

            return (
              <Button
                key={page}
                type="button"
                variant={
                  isCurrent
                    ? "default"
                    : "outline"
                }
                size="icon"
                onClick={() =>
                  handlePageChange(page)
                }
                aria-current={
                  isCurrent ? "page" : undefined
                }
                aria-label={
                  isCurrent
                    ? `Current page, ${page}`
                    : `Go to page ${page}`
                }
                className={cn(
                  "h-9 w-9 shrink-0 rounded-full sm:h-10 sm:w-10",
                  isCurrent &&
                    "bg-primary text-primary-foreground shadow-sm"
                )}
              >
                {page}
              </Button>
            );
          })}
        </div>

        {/* Next */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() =>
            handlePageChange(safeCurrentPage + 1)
          }
          disabled={
            safeCurrentPage === safeTotalPages
          }
          aria-label="Go to next page"
          className="
            h-9
            w-9
            shrink-0
            rounded-full
            sm:h-10
            sm:w-10
          "
        >
          <ChevronRight
            className="h-4 w-4"
            aria-hidden="true"
          />
        </Button>
      </div>
    </nav>
  );
}