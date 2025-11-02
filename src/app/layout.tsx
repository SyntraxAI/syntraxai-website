import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Import our new ClientLayoutWrapper
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

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
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        
        {/* 2. We wrap {children} in our new ClientLayoutWrapper.
          The chat widget logic is now safely inside this wrapper.
        */}
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>

      </body>
    </html>
  );
}