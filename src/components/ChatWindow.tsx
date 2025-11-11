"use client";

import { useState, FormEvent, useRef, useEffect } from 'react';

// Define the shape of a message
type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatWindow({ closeChat }: { closeChat: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // This function scrolls the chat window to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { id: Date.now().toString(), role: 'user', content: inputValue },
    ];
    
    setMessages(newMessages); // Add user message to UI
    setInputValue('');      // Clear input
    setIsLoading(true);

    // Add the "Typing..." bubble
    const aiMessageId = `ai-${Date.now()}`;
    setMessages(prevMessages => [
      ...prevMessages,
      { id: aiMessageId, role: 'assistant', content: 'Typing...' },
    ]);

    try {
      // Call our API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }), 
      });

      // We are not streaming; we read the entire response as text.
      const fullResponse = await response.text();

      if (!response.ok) {
        // If the server returned an error (like 500), use its text
        throw new Error(fullResponse || "An unknown error occurred");
      }
      
      // Now that we have the full response, update the "Typing..." message.
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === aiMessageId 
            ? { ...msg, content: fullResponse } // Replace "Typing..." with full response
            : msg
        )
      );

    } catch (error: unknown) {
      console.error("Chat fetch error:", error);
      
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      // Update the "Typing..." bubble to show an error
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === aiMessageId 
            ? { ...msg, content: `Sorry, an error occurred: ${errorMessage}` }
            : msg
        )
      );
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col border border-gray-200">
      {/* Header */}
      <div className="bg-gray-100 p-3 flex justify-between items-center rounded-t-lg border-b border-gray-200">
        <h3 className="font-semibold text-gray-800">Syntrax AI Assistant</h3>
        <button onClick={closeChat} className="text-gray-500 hover:text-gray-700" aria-label="Close chat">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-grow p-4 overflow-y-auto space-y-3 text-sm">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center mt-4">Ask me about Syntrax AI services!</p>
        )}
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg px-3 py-2 max-w-[80%] ${m.role === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {/* This empty div is the target for our auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            name="message"
            className="flex-grow border border-gray-300 rounded-md p-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-400"
            value={inputValue}
            placeholder="Ask a question..."
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-primary text-white rounded-md p-2 hover:bg-primary/90 disabled:bg-gray-400"
            disabled={isLoading || !inputValue.trim()}
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}