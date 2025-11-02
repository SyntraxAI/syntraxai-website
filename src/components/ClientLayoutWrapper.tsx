"use client";

// Import the simple ChatWidget directly.
import ChatWidget from '@/components/ChatWidget';

// This wrapper's only job is to provide a client-side
// entry point for the chat widget.
export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ChatWidget />
    </>
  );
}