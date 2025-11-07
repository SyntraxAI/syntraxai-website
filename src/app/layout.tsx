import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Import our new ClientLayoutWrapper
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

// --- START: ANALYTICS IMPORTS ---
import { Analytics } from "@vercel/analytics/react"; // Vercel Analytics
// We no longer need the 'Script' import
// --- END: ANALYTICS IMPORTS ---

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
          --- START: CONTENTSQUARE/HOTJAR SCRIPT ---
          Pasting the tag directly in the <head> as requested by the documentation.
          This replaces the Next.js <Script> component.
        */}
        <script 
          src="https://t.contentsquare.net/uxa/D74c101537a8d.js"
          async // Use async for performance
          defer // Use defer for performance
        ></script>
        {/* --- END: CONTENTSQUARE/HOTJAR SCRIPT --- */}
      </head>

      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>

        {/* --- START: VERCEL ANALYTICS SCRIPT --- */}
        <Analytics />
        {/* --- END: VERCEL ANALYTICS SCRIPT --- */}

      </body>
    </html>
  );
}