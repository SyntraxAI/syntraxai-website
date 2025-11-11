"use client";

// Import the simple ChatWidget directly.
import ChatWidget from '@/components/ChatWidget';
// 1. Import our new Header component
import Header from '@/components/Header';
// 2. Import our new Footer component
import Footer from '@/components/Footer';

// This wrapper's only job is to provide a client-side
// entry point for the chat widget.
export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      
      {/* This 'children' is the main page content */}
      {children}
      
      {/* 3. Add the Footer here, so it's on every page */}
      <Footer />

      <ChatWidget />
    </>
  );
}