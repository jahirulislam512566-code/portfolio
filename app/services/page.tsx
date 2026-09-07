import { Metadata } from "next";
import { 
  ServicesHeader,
  ServicesGrid
} from "@/components/services";
import { PageHeader, Container, Section, BackToTop } from "@/components/layout";
import { servicesData } from "@/data/services";
import { siteConfig } from "@/config/site.config";
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

// Generate metadata for the page
export const metadata: Metadata = {
  title: "Services",
  description: "Explore the services I offer including web development, UI/UX design, backend development, and consulting.",
  keywords: ["services", "web development", "design", "consulting", "freelance"],
  openGraph: {
    title: "Services | John Doe",
    description: "Explore the services I offer including web development, UI/UX design, backend development, and consulting.",
    url: `${siteConfig.url}/services`,
    images: [
      {
        url: `${siteConfig.url}/images/og-services.jpg`,
        width: 1200,
        height: 630,
        alt: "Services",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | John Doe",
    description: "Explore the services I offer including web development, UI/UX design, backend development, and consulting.",
    images: [`${siteConfig.url}/images/og-services.jpg`],
  },
};

export default function ServicesPage() {
  // Calculate stats
  const availableServices = servicesData.filter(s => s.isAvailable !== false).length;
  const pricingModels = new Set(servicesData.map(s => s.pricingModel));
  const totalTechnologies = new Set(servicesData.flatMap(s => s.technologies || [])).size;

  return (
    <main className="min-h-screen">
      {/* Page Header */}
      <PageHeader 
        title="Services"
        description="Professional services to help bring your ideas to life"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" }
        ]}
      />

      {/* Quick Stats */}
      <Section variant="muted" padding="md">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">{servicesData.length}</p>
              <p className="text-sm text-muted-foreground">Total Services</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">{availableServices}</p>
              <p className="text-sm text-muted-foreground">Available Now</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">{pricingModels.size}</p>
              <p className="text-sm text-muted-foreground">Pricing Models</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">{totalTechnologies}+</p>
              <p className="text-sm text-muted-foreground">Technologies</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Grid */}
      <Section variant="default" padding="lg">
        <Container>
          <ServicesHeader serviceCount={servicesData.length} />
          <div className="mt-12">
            <ServicesGrid showProcess={true} />
          </div>
        </Container>
      </Section>

      {/* Why Choose Me Section */}
      <Section variant="muted" padding="lg">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose Me?</h2>
            <p className="text-muted-foreground">
              Here's what sets me apart and why you should work with me.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center p-6 bg-background rounded-lg border hover:shadow-lg transition-all hover:border-primary/50">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Quality First</h3>
              <p className="text-sm text-muted-foreground">
                I prioritize quality in every project, ensuring clean, maintainable, and performant code.
              </p>
            </div>

            <div className="text-center p-6 bg-background rounded-lg border hover:shadow-lg transition-all hover:border-primary/50">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">Clear Communication</h3>
              <p className="text-sm text-muted-foreground">
                I keep you informed throughout the process with regular updates and transparent communication.
              </p>
            </div>

            <div className="text-center p-6 bg-background rounded-lg border hover:shadow-lg transition-all hover:border-primary/50">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <ArrowRight className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">On-Time Delivery</h3>
              <p className="text-sm text-muted-foreground">
                I respect your time and deliver projects on schedule without compromising quality.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section variant="default" padding="lg">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Common questions about my services and how I work.
            </p>
          </div>

          <div className="grid gap-4 max-w-3xl mx-auto">
            <div className="p-6 bg-muted/30 rounded-lg border">
              <h3 className="font-semibold mb-2">How do we get started?</h3>
              <p className="text-sm text-muted-foreground">
                Simply reach out through the contact form or book a call. We'll discuss your project, 
                requirements, and timeline.
              </p>
            </div>

            <div className="p-6 bg-muted/30 rounded-lg border">
              <h3 className="font-semibold mb-2">What's your typical process?</h3>
              <p className="text-sm text-muted-foreground">
                Discovery → Planning → Development → Testing → Launch → Support. 
                I keep you involved at every step.
              </p>
            </div>

            <div className="p-6 bg-muted/30 rounded-lg border">
              <h3 className="font-semibold mb-2">Do you offer ongoing support?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, I provide ongoing support and maintenance services to ensure your project 
                continues to run smoothly.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="gradient" padding="lg">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6">
              Let's discuss your project and how I can help bring your vision to life.
            </p>
            <Button size="lg" asChild className="gap-2">
              <Link href="/contact">
                <MessageSquare className="h-4 w-4" />
                Contact Me
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Back to Top Button */}
      <BackToTop />
    </main>
  );
}