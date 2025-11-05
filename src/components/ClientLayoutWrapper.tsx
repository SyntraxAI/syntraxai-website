"use client";

// Import the simple ChatWidget directly.
import ChatWidget from '@/components/ChatWidget';
// 1. Import our new Header component
import Header from '@/components/Header';

// This wrapper's only job is to provide a client-side
// entry point for the chat widget.
export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 2. Add the Header here, so it's on every page */}
      <Header />
      
      {children}
      
      <ChatWidget />
    </>
  );
}