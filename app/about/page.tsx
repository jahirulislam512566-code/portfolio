"use client";

import { motion } from "framer-motion";

import {
  AboutIntro,
  AboutStory,
  AboutStats,
  AboutValues,
  AboutInterests,
  AboutCTA,
} from "@/components/about";

import { BackToTop, PageHeader } from "@/components/layout";

export default function AboutPage() {
  return (
    <main
      id="about-page"
      className="min-h-screen w-full min-w-0 overflow-x-clip bg-background"
    >
      {/* Page Header */}
      <PageHeader
        title="About Me"
        description="Learn more about who I am, what I do, and what drives me"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        badge="Get to Know Me"
        showDivider
        gradientFrom="from-purple-600"
        gradientTo="to-pink-600"
        className="mb-0 w-full"
      />

      {/* About Intro */}
      <AboutIntro />

      {/* Divider */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="h-px w-full origin-center bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
        />
      </div>

      {/* About Story */}
      <AboutStory variant="default" />

      {/* Divider */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="h-px w-full origin-center bg-gradient-to-r from-transparent via-pink-500/30 to-transparent"
        />
      </div>

      {/* About Stats */}
      <AboutStats variant="default" columns={3} />

      {/* Divider */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="h-px w-full origin-center bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
        />
      </div>

      {/* About Values */}
      <AboutValues variant="default" columns={3} />

      {/* Divider */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="h-px w-full origin-center bg-gradient-to-r from-transparent via-pink-500/30 to-transparent"
        />
      </div>

      {/* About Interests */}
      <AboutInterests variant="default" />

      {/* Divider */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="h-px w-full origin-center bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
        />
      </div>

      {/* About CTA */}
      <AboutCTA variant="gradient" size="default" />

      {/* Back to Top */}
      <BackToTop />
    </main>
  );
}