"use client";

import { useState } from 'react';
import ChatWindow from './ChatWindow'; // Import our new component

// This component now ONLY manages if the chat is open or closed.
// It does NOT call the useChat() hook, so it will not crash.
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false); // <--- This makes it hidden by default

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    //
    // This is the correct position:
    // 1. 'right-4' (moves it to the right)
    // 2. 'bottom-8' (lifts it above the footer text)
    //
    <div className="fixed bottom-8 right-4 z-50">
      {/* 1. If chat is NOT open, show the bubble */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-transform hover:scale-110"
          aria-label="Open chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-3.86 8.25-8.625 8.25a9.76 9.76 0 0 1-2.53-.375 1.03 1.03 0 0 0-.84-.055l-3.46 1.038a.75.75 0 0 1-.954-.954l1.038-3.46a1.03 1.03 0 0 0-.055-.84A9.76 9.76 0 0 1 3 12c0-4.556 3.86-8.25 8.625-8.25S21 7.444 21 12Z" />
          </svg>
        </button>
      )}

      {/* 2. If chat IS open, render the full ChatWindow component */}
      {/* This will now open from the bottom-right, clear of the footer text */}
      {isOpen && (
        <ChatWindow closeChat={toggleChat} />
      )}
    </div>
  );
}