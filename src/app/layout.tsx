import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import { Analytics } from "@vercel/analytics/react"; // Vercel Analytics
import Script from "next/script"; // For Google Tag Manager

// This is the correct ID from your GTM_ID.PNG screenshot
const GTM_ID = "GTM-PKX47BMM";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Syntrax AI",
    default: "Syntrax AI - Revenue-Focused Marketing, Accelerated by AI",
  },
  description: "We deliver the outcomes of a 20-person agency with the precision and cost-efficiency of an AI-first core.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Syntrax AI",
    "url": "https://www.syntraxai.com",
    // "logo": "https://www.syntraxai.com/logo.png",
  };

  return (
    <html lang="en">
      <head>
        {/*
          --- START: Google Tag Manager (Snippet 1) ---
          This is the CORRECT script from your GTM_ID.PNG screenshot.
          We use "beforeInteractive" to ensure it loads for any verifier.
        */}
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
        {/* --- END: Google Tag Manager --- */}
      </head>

      <body className={inter.className}>
        {/*
          --- START: Google Tag Manager (Snippet 2 - noscript) ---
          This is the <noscript> tag, placed just after the <body> tag.
        */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* --- END: Google Tag Manager (noscript) --- */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>

        {/* --- START: Vercel Analytics --- */}
        <Analytics />
        {/* --- END: Vercel Analytics --- */}
      </body>
    </html>
  );
}