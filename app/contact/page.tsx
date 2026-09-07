"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Lock } from "lucide-react";

import {
  ContactHeader,
  ContactForm,
  ContactInfo,
  SocialLinks,
  AvailabilityCard,
  ContactSuccess,
} from "@/components/contact";

import {
  PageHeader,
  Container,
  Section,
} from "@/components/layout";

export default function ContactPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.1,
  });

  /* ---------------------------------------------
   * Mounted state
   * --------------------------------------------- */
  useEffect(() => {
    setIsVisible(true);
  }, []);

  /* ---------------------------------------------
   * Form success
   * --------------------------------------------- */
  const handleFormSuccess = () => {
    setIsFormSubmitted(true);
    setShowSuccess(true);

    window.setTimeout(() => {
      const successElement =
        document.getElementById("contact-success");

      if (successElement) {
        successElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  };

  /* ---------------------------------------------
   * Reset form
   * --------------------------------------------- */
  const handleReset = () => {
    setIsFormSubmitted(false);
    setShowSuccess(false);
  };

  /* ---------------------------------------------
   * Animation variants
   * --------------------------------------------- */
  const containerVariants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },

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

  return (
    <main
      id="contact-page"
      className="
        min-h-screen
        w-full
        min-w-0
        overflow-x-clip
        bg-background
      "
    >
      {/* ==========================================
          PAGE HEADER
      ========================================== */}
      <PageHeader
        title="Get in Touch"
        description="I'm always open to new opportunities and collaborations"
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Contact",
            href: "/contact",
          },
        ]}
        badge="Let's Connect"
        showDivider
        gradientFrom="from-purple-600"
        gradientTo="to-pink-600"
        className="mb-0 w-full"
      />

      {/* ==========================================
          CONTACT CONTENT
      ========================================== */}
      <Section
        variant="default"
        padding="lg"
        className="w-full min-w-0"
      >
        <Container>
          <motion.div
            ref={containerRef}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="
              grid
              w-full
              min-w-0
              gap-8
              lg:grid-cols-3
            "
          >
            {/* ======================================
                LEFT — CONTACT FORM
            ====================================== */}
            <motion.div
              variants={itemVariants}
              className="
                min-w-0
                lg:col-span-2
              "
            >
              {isFormSubmitted ? (
                <div
                  id="contact-success"
                  className="w-full min-w-0"
                >
                  <ContactSuccess
                    onReset={handleReset}
                    variant="celebratory"
                    title="Message Sent Successfully! 🎉"
                    message="Thanks for reaching out! I'll get back to you as soon as possible. In the meantime, feel free to connect with me on social media."
                  />
                </div>
              ) : (
                <div className="w-full min-w-0">
                  <ContactForm
                    onSuccess={handleFormSuccess}
                    variant="expanded"
                  />
                </div>
              )}
            </motion.div>

            {/* ======================================
                RIGHT — CONTACT INFORMATION
            ====================================== */}
            <motion.div
              variants={itemVariants}
              className="
                min-w-0
                space-y-6
              "
            >
              {/* Availability */}
              <div className="w-full min-w-0">
                <AvailabilityCard
                  status="available"
                  variant="compact"
                  className="border-0 bg-muted/30"
                />
              </div>

              {/* Contact information */}
              <div className="w-full min-w-0">
                <ContactInfo variant="expanded" />
              </div>

              {/* Social links */}
              <div className="w-full min-w-0">
                <SocialLinks
                  variant="expanded"
                  showTitle
                  showDescription
                />
              </div>
            </motion.div>
          </motion.div>

          {/* ==========================================
              TRUST INDICATORS
          ========================================== */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={
              isVisible
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            transition={{
              delay: 0.5,
              duration: 0.5,
            }}
            className="
              mt-12
              w-full
              min-w-0
              border-t
              border-border/50
              pt-8
              md:mt-16
            "
          >
            <div
              className="
                flex
                w-full
                min-w-0
                flex-wrap
                items-center
                justify-center
                gap-x-6
                gap-y-3
                text-sm
                text-muted-foreground
              "
            >
              {/* Availability */}
              <span className="flex min-w-0 items-center gap-2">
                <span
                  className="
                    relative
                    flex
                    h-2.5
                    w-2.5
                    shrink-0
                  "
                >
                  <span
                    className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      animate-ping
                      rounded-full
                      bg-green-400
                      opacity-75
                    "
                  />

                  <span
                    className="
                      relative
                      inline-flex
                      h-2.5
                      w-2.5
                      rounded-full
                      bg-green-500
                    "
                  />
                </span>

                <span>Available for work</span>
              </span>

              <span
                className="hidden text-border sm:inline"
                aria-hidden="true"
              >
                •
              </span>

              {/* Response time */}
              <span className="flex min-w-0 items-center gap-2">
                <Clock
                  className="h-4 w-4 shrink-0"
                  aria-hidden="true"
                />

                <span>Response within 24 hours</span>
              </span>

              <span
                className="hidden text-border sm:inline"
                aria-hidden="true"
              >
                •
              </span>

              {/* Security */}
              <span className="flex min-w-0 items-center gap-2">
                <Lock
                  className="h-4 w-4 shrink-0"
                  aria-hidden="true"
                />

                <span>Your data is secure</span>
              </span>
            </div>
          </motion.div>

          {/* ==========================================
              BACK TO TOP
          ========================================== */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={
              isVisible
                ? {
                    opacity: 1,
                  }
                : {
                    opacity: 0,
                  }
            }
            transition={{
              delay: 0.6,
            }}
            className="
              mt-8
              w-full
              text-center
            "
          >
            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="
                text-sm
                text-muted-foreground
                transition-colors
                hover:text-primary
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
                focus-visible:ring-offset-2
              "
            >
              ↑ Back to top
            </button>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
}