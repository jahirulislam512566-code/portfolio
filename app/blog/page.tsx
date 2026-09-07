import { BlogHeader, BlogGrid } from "@/components/blog";
import { blogPosts } from "@/data/blog";

export default function BlogPage() {
  const publishedPosts = blogPosts.filter(
    (post) => post.status === "published"
  );

  const categories = new Set(
    publishedPosts.map((post) => post.category)
  );

  return (
    <section
      id="main-content"
      aria-labelledby="blog-heading"
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
        {/* Blog Header */}
        <BlogHeader
          totalPosts={publishedPosts.length}
          totalCategories={categories.size}
        />

        {/* Blog Grid */}
        <div
          className="
            mt-8
            w-full
            min-w-0
            sm:mt-10
            lg:mt-12
          "
        >
          <BlogGrid postsPerPage={6} />
        </div>
      </div>
    </section>
  );
}