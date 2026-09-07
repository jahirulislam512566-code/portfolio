import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { AnalyticsProvider } from "@/components/providers/analytics-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Navbar } from "@/components/layout/navbar/navbar";
import { Footer } from "@/components/layout/footer/footer";

import { siteConfig } from "@/config/site.config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,
  keywords: siteConfig.keywords,

  authors: [
    {
      name: siteConfig.author.name,
    },
  ],

  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.meta.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.meta.ogImage],
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
  },

  icons: {
    icon: [
      {
        url: siteConfig.meta.favicon,
      },
    ],
    apple: [
      {
        url: siteConfig.meta.appleTouchIcon,
      },
    ],
  },

  manifest: siteConfig.meta.manifest,

  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} w-full`}
      data-scroll-behavior="smooth"
    >
      <body
        className={`${inter.className} min-h-screen w-full overflow-x-clip bg-background font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={["light", "dark", "system"]}
        >
          <TooltipProvider>
            <AnalyticsProvider
              googleAnalyticsId={process.env.NEXT_PUBLIC_GA_ID}
              plausibleDomain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
              umamiWebsiteId={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            >
              <div className="flex min-h-screen w-full flex-col">
                <Navbar />

                <main className="w-full flex-1 min-w-0">
                  {children}
                </main>

                <Footer />
              </div>
            </AnalyticsProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}