// components/providers/AnalyticsProvider.tsx
"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

interface AnalyticsProviderProps {
  children: React.ReactNode;
  googleAnalyticsId?: string;
  plausibleDomain?: string;
  umamiWebsiteId?: string;
}

// ✅ Separate component that uses the hooks
function AnalyticsTracker({ 
  googleAnalyticsId,
  plausibleDomain,
}: {
  googleAnalyticsId?: string;
  plausibleDomain?: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views with Google Analytics
  useEffect(() => {
    if (googleAnalyticsId && typeof window !== "undefined" && (window as any).gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      (window as any).gtag("config", googleAnalyticsId, {
        page_path: url,
      });
    }
  }, [pathname, searchParams, googleAnalyticsId]);

  // Track page views with Plausible
  useEffect(() => {
    if (plausibleDomain && typeof window !== "undefined" && (window as any).plausible) {
      (window as any).plausible("pageview");
    }
  }, [pathname, plausibleDomain]);

  return null;
}

// ✅ Main component with Suspense
export function AnalyticsProvider({ 
  children, 
  googleAnalyticsId,
  plausibleDomain,
  umamiWebsiteId
}: AnalyticsProviderProps) {
  return (
    <>
      {/* Analytics Scripts */}
      {googleAnalyticsId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            id="google-analytics-script"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {/* Plausible Analytics */}
      {plausibleDomain && (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
          id="plausible-script"
        />
      )}

      {/* Umami Analytics */}
      {umamiWebsiteId && (
        <Script
          defer
          src="https://analytics.umami.is/script.js"
          data-website-id={umamiWebsiteId}
          strategy="afterInteractive"
          id="umami-script"
        />
      )}

      {/* ✅ Wrap the tracker in Suspense */}
      <Suspense fallback={null}>
        <AnalyticsTracker 
          googleAnalyticsId={googleAnalyticsId}
          plausibleDomain={plausibleDomain}
        />
      </Suspense>

      {children}
    </>
  );
}