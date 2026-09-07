"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  TestimonialsHeader,
  TestimonialSlider,
} from "@/components/testimonials";

import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { testimonialsData } from "@/data/testimonials";

import {
  Container,
  Section,
  PageHeader,
  BackToTop,
} from "@/components/layout";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Star,
  Grid2X2,
  LayoutGrid,
  ChevronDown,
  Users,
  Award,
  TrendingUp,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface TestimonialsPageClientProps {
  totalTestimonials: number;
  avgRating: number;
  totalVerified: number;
  fiveStarRatings: number;
  ratingDistribution: Record<number, number>;
}

export function TestimonialsPageClient({
  totalTestimonials,
  avgRating,
  totalVerified,
  fiveStarRatings,
  ratingDistribution,
}: TestimonialsPageClientProps) {
  const [viewMode, setViewMode] = useState<"grid" | "slider">("grid");

  const [filterRating, setFilterRating] = useState<number | null>(null);

  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  const [sortBy, setSortBy] = useState<
    "newest" | "oldest" | "rating"
  >("newest");

  /*
   * ============================================================
   * FILTER + SORT TESTIMONIALS
   * ============================================================
   */

  const filteredTestimonials = useMemo(() => {
    let filtered = [...testimonialsData];

    // Rating filter
    if (filterRating !== null) {
      filtered = filtered.filter(
        (testimonial) => testimonial.rating === filterRating
      );
    }

    // Verified filter
    if (showVerifiedOnly) {
      filtered = filtered.filter(
        (testimonial) => testimonial.isVerified
      );
    }

    // Sorting
    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
        );
        break;

      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.date).getTime() -
            new Date(b.date).getTime()
        );
        break;

      case "rating":
        filtered.sort(
          (a, b) =>
            (b.rating || 0) -
            (a.rating || 0)
        );
        break;
    }

    return filtered;
  }, [
    filterRating,
    showVerifiedOnly,
    sortBy,
  ]);

  /*
   * ============================================================
   * STATISTICS
   * ============================================================
   */

  const stats = [
    {
      label: "Total Testimonials",
      value: totalTestimonials,
      icon: Users,
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Average Rating",
      value: avgRating.toFixed(1),
      icon: Star,
      bgColor: "bg-amber-500/10",
    },
    {
      label: "Verified Reviews",
      value: totalVerified,
      icon: Award,
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "5-Star Ratings",
      value: fiveStarRatings,
      icon: TrendingUp,
      bgColor: "bg-purple-500/10",
    },
  ];

  /*
   * ============================================================
   * HELPERS
   * ============================================================
   */

  const clearFilters = () => {
    setFilterRating(null);
    setShowVerifiedOnly(false);
  };

  const hasActiveFilters =
    filterRating !== null || showVerifiedOnly;

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background">

      {/* ========================================================
          PAGE HEADER
      ======================================================== */}

      <PageHeader
        title="Testimonials"
        description="What people say about working with me"
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Testimonials",
            href: "/testimonials",
          },
        ]}
        badge="Client Feedback"
        showDivider
        gradientFrom="from-purple-600"
        gradientTo="to-pink-600"
        className="mb-0"
      />

      {/* ========================================================
          TESTIMONIAL HEADER
      ======================================================== */}

      <Section
        variant="default"
        padding="md"
        className="w-full overflow-hidden"
      >
        <Container>
          <TestimonialsHeader
            totalTestimonials={totalTestimonials}
            avgRating={avgRating}
          />
        </Container>
      </Section>

      {/* ========================================================
          QUICK STATS
      ======================================================== */}

      <Section
        variant="muted"
        padding="md"
        className="
          w-full
          overflow-hidden
          border-y
          border-border/40
        "
      >
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="
              grid
              w-full
              min-w-0
              grid-cols-2
              gap-2
              sm:gap-3
              md:grid-cols-4
            "
          >
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.label}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 12,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.35,
                      },
                    },
                  }}
                  className="
                    min-w-0
                    rounded-lg
                    border
                    border-border/50
                    bg-background
                    p-2.5
                    text-center
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-primary/30
                    hover:shadow-md
                    sm:rounded-xl
                    sm:p-4
                  "
                >
                  {/* Icon */}

                  <div
                    className={cn(
                      "mx-auto mb-1.5",
                      "flex h-7 w-7 items-center justify-center",
                      "rounded-full",
                      stat.bgColor,
                      "sm:mb-2 sm:h-9 sm:w-9"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
                  </div>

                  {/* Value */}

                  <p
                    className="
                      bg-gradient-to-r
                      from-purple-600
                      to-pink-600
                      bg-clip-text
                      text-lg
                      font-bold
                      leading-tight
                      tracking-tight
                      text-transparent
                      sm:text-2xl
                      md:text-3xl
                    "
                  >
                    {stat.value}
                  </p>

                  {/* Label */}

                  <p
                    className="
                      mt-1
                      truncate
                      text-[9px]
                      font-medium
                      leading-tight
                      text-muted-foreground
                      sm:text-xs
                    "
                    title={stat.label}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </Section>

      {/* ========================================================
          FILTERS + SORT
      ======================================================== */}

      <Section
        variant="muted"
        padding="md"
        className="
          w-full
          overflow-hidden
          border-b
          border-border/40
        "
      >
        <Container>

          <div className="w-full min-w-0">

            {/* ==================================================
                FILTER ROW
            ================================================== */}

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

              {/* Rating + Verified */}

              <div
                className="
                  flex
                  min-w-0
                  flex-col
                  gap-3
                  sm:flex-row
                  sm:flex-wrap
                  sm:items-center
                "
              >

                {/* Rating */}

                <div
                  className="
                    flex
                    min-w-0
                    flex-col
                    gap-2
                    xs:flex-row
                    xs:items-center
                  "
                >
                  <span className="shrink-0 text-xs text-muted-foreground sm:text-sm">
                    Rating:
                  </span>

                  <div
                    className="
                      flex
                      max-w-full
                      flex-wrap
                      gap-1
                    "
                  >
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const active =
                        filterRating === rating;

                      return (
                        <Button
                          key={rating}
                          type="button"
                          variant={
                            active
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            setFilterRating(
                              active
                                ? null
                                : rating
                            )
                          }
                          className={cn(
                            "h-8 gap-1 px-2 text-xs",
                            active &&
                              "bg-primary text-primary-foreground"
                          )}
                          aria-pressed={active}
                          aria-label={`Filter ${rating} star testimonials`}
                        >
                          <Star
                            className={cn(
                              "h-3 w-3",
                              active
                                ? "fill-current"
                                : "fill-transparent"
                            )}
                          />

                          <span>{rating}</span>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Verified */}

                <Button
                  type="button"
                  variant={
                    showVerifiedOnly
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    setShowVerifiedOnly(
                      (current) => !current
                    )
                  }
                  className="h-8 w-fit gap-2 text-xs"
                  aria-pressed={showVerifiedOnly}
                >
                  <Badge
                    className={cn(
                      "h-2 w-2 rounded-full p-0",
                      showVerifiedOnly
                        ? "bg-green-500"
                        : "bg-muted-foreground"
                    )}
                  />

                  <span>Verified Only</span>
                </Button>

                {/* Clear */}

                {hasActiveFilters && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="
                      h-8
                      w-fit
                      gap-1
                      px-2
                      text-xs
                      text-muted-foreground
                    "
                  >
                    <X className="h-3 w-3" />
                    Clear
                  </Button>
                )}
              </div>

              {/* =================================================
                  SORT + VIEW
              ================================================= */}

              <div
                className="
                  flex
                  min-w-0
                  flex-wrap
                  items-center
                  gap-2
                  sm:gap-3
                "
              >

                {/* Sort */}

                <div
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-2
                  "
                >
                  <label
                    htmlFor="testimonial-sort"
                    className="
                      shrink-0
                      text-xs
                      text-muted-foreground
                      sm:text-sm
                    "
                  >
                    Sort:
                  </label>

                  <select
                    id="testimonial-sort"
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(
                        event.target
                          .value as typeof sortBy
                      )
                    }
                    className="
                      h-8
                      min-w-0
                      rounded-md
                      border
                      border-border
                      bg-background
                      px-2
                      text-xs
                      outline-none
                      transition
                      focus:ring-2
                      focus:ring-primary
                      sm:px-3
                      sm:text-sm
                    "
                  >
                    <option value="newest">
                      Newest
                    </option>

                    <option value="oldest">
                      Oldest
                    </option>

                    <option value="rating">
                      Highest Rated
                    </option>
                  </select>
                </div>

                {/* View Toggle */}

                <div
                  className="
                    flex
                    shrink-0
                    overflow-hidden
                    rounded-md
                    border
                    border-border
                  "
                  role="group"
                  aria-label="Testimonial view"
                >
                  <Button
                    type="button"
                    variant={
                      viewMode === "grid"
                        ? "default"
                        : "ghost"
                    }
                    size="sm"
                    onClick={() =>
                      setViewMode("grid")
                    }
                    className="h-8 rounded-none px-2"
                    aria-label="Grid view"
                    aria-pressed={
                      viewMode === "grid"
                    }
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </Button>

                  <Button
                    type="button"
                    variant={
                      viewMode === "slider"
                        ? "default"
                        : "ghost"
                    }
                    size="sm"
                    onClick={() =>
                      setViewMode("slider")
                    }
                    className="h-8 rounded-none px-2"
                    aria-label="Slider view"
                    aria-pressed={
                      viewMode === "slider"
                    }
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* ==================================================
                RESULTS COUNT
            ================================================== */}

            <div className="mt-4">
              <p className="text-xs text-muted-foreground sm:text-sm">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {filteredTestimonials.length}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {totalTestimonials}
                </span>{" "}
                testimonials
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ========================================================
          TESTIMONIALS
      ======================================================== */}

      <Section
        variant="default"
        padding="md"
        className="w-full overflow-hidden"
      >
        <Container>

          {filteredTestimonials.length === 0 ? (

            /* ==================================================
               EMPTY STATE
            ================================================== */

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                mx-auto
                max-w-md
                px-4
                py-10
                text-center
                sm:py-14
              "
            >
              <div
                className="
                  mx-auto
                  mb-4
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-muted
                  text-muted-foreground
                "
              >
                <Star className="h-7 w-7" />
              </div>

              <h3 className="text-lg font-semibold sm:text-xl">
                No Testimonials Found
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your filters to see more
                testimonials.
              </p>

              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </motion.div>

          ) : viewMode === "slider" ? (

            /* ==================================================
               SLIDER
            ================================================== */

            <div className="w-full min-w-0">
              <TestimonialSlider
                autoplay
                autoplayInterval={5000}
                itemsPerView={
                  filteredTestimonials.length >= 3
                    ? 3
                    : filteredTestimonials.length >= 2
                      ? 2
                      : 1
                }
              />
            </div>

          ) : (

            /* ==================================================
               GRID
            ================================================== */

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
              className="
                grid
                w-full
                min-w-0
                grid-cols-1
                gap-4
                sm:grid-cols-2
                lg:grid-cols-3
                lg:gap-6
              "
            >
              {filteredTestimonials.map(
                (testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 15,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.35,
                        },
                      },
                    }}
                    className="min-w-0 w-full"
                  >
                    <TestimonialCard
                      testimonial={testimonial}
                      index={index}
                      variant={
                        testimonial.isFeatured
                          ? "featured"
                          : "default"
                      }
                    />
                  </motion.div>
                )
              )}
            </motion.div>
          )}
        </Container>
      </Section>

      {/* ========================================================
          RATING DISTRIBUTION
      ======================================================== */}

      <Section
        variant="muted"
        padding="md"
        className="
          w-full
          overflow-hidden
          border-y
          border-border/40
        "
      >
        <Container>

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.45,
            }}
            className="
              mx-auto
              w-full
              max-w-lg
            "
          >
            <h4
              className="
                mb-5
                text-center
                text-sm
                font-semibold
              "
            >
              Rating Distribution
            </h4>

            <div className="space-y-3">

              {[5, 4, 3, 2, 1].map(
                (rating) => {
                  const count =
                    ratingDistribution[
                      rating
                    ] || 0;

                  const percentage =
                    totalTestimonials > 0
                      ? (count /
                          totalTestimonials) *
                        100
                      : 0;

                  return (
                    <div
                      key={rating}
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-2
                        sm:gap-3
                      "
                    >
                      {/* Rating */}

                      <span
                        className="
                          flex
                          w-8
                          shrink-0
                          items-center
                          gap-1
                          text-xs
                          font-medium
                          sm:w-10
                          sm:text-sm
                        "
                      >
                        {rating}

                        <Star
                          className="
                            h-3
                            w-3
                            fill-yellow-400
                            text-yellow-400
                          "
                        />
                      </span>

                      {/* Progress */}

                      <div
                        className="
                          relative
                          h-2
                          min-w-0
                          flex-1
                          overflow-hidden
                          rounded-full
                          bg-muted
                        "
                      >
                        <motion.div
                          className="
                            h-full
                            rounded-full
                            bg-gradient-to-r
                            from-purple-500
                            to-pink-500
                          "
                          initial={{
                            width: 0,
                          }}
                          whileInView={{
                            width: `${percentage}%`,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 0.8,
                            ease: "easeOut" as const

,
                          }}
                        />
                      </div>

                      {/* Count */}

                      <span
                        className="
                          w-7
                          shrink-0
                          text-right
                          text-xs
                          text-muted-foreground
                          sm:w-8
                          sm:text-sm
                        "
                      >
                        {count}
                      </span>
                    </div>
                  );
                }
              )}

            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ========================================================
          CTA
      ======================================================== */}

      <Section
        variant="gradient"
        padding="md"
        className="
          w-full
          overflow-hidden
          border-t
          border-border/40
        "
      >
        <Container>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              mx-auto
              w-full
              max-w-2xl
              px-2
              text-center
              sm:px-4
            "
          >

            {/* Icon */}

            <div
              className="
                mx-auto
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-gradient-to-r
                from-purple-600
                to-pink-600
                text-white
                shadow-lg
                sm:h-14
                sm:w-14
              "
            >
              <Star className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>

            {/* Heading */}

            <h2
              className="
                text-xl
                font-bold
                tracking-tight
                sm:text-2xl
                md:text-3xl
              "
            >
              Leave a{" "}
              <span
                className="
                  bg-gradient-to-r
                  from-purple-600
                  to-pink-600
                  bg-clip-text
                  text-transparent
                "
              >
                Testimonial
              </span>
            </h2>

            {/* Description */}

            <p
              className="
                mx-auto
                mt-3
                max-w-xl
                text-xs
                leading-5
                text-muted-foreground
                sm:text-sm
                sm:leading-6
                md:text-base
              "
            >
              If you've worked with me and would like to
              share your experience, I'd love to hear from
              you.
            </p>

            {/* Button */}

            <div className="mt-5">
              <Button
                size="lg"
                asChild
                className="
                  group
                  w-full
                  max-w-xs
                  gap-2
                  bg-gradient-to-r
                  from-purple-600
                  to-pink-600
                  text-white
                  shadow-md
                  transition-all
                  duration-300
                  hover:from-purple-700
                  hover:to-pink-700
                  hover:shadow-lg
                  sm:w-auto
                "
              >
                <a
                  href="contact"
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >
                  <span>
                    Share Your Experience
                  </span>

                  <ChevronDown
                    className="
                      h-4 w-4
                      transition-transform
                      duration-300
                      group-hover:translate-y-1
                    "
                  />
                </a>
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ========================================================
          BACK TO TOP
      ======================================================== */}

      <BackToTop />

    </main>
  );
}