//
// ⬇️ PASTE THIS CODE INTO: src/components/ChatWindow.tsx ⬇️
//
"use client";

// ⛔️ FIX: This is the correct import path for the hook
import { useChat } from '@ai-sdk/react'; 
import { useEffect, useRef } from 'react';

export default function ChatWindow({ closeChat }: { closeChat: () => void }) {

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
            <div className={`rounded-lg px-3 py-2 max-w-[80%] whitespace-pre-wrap ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {m.content}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            name="message"
            className="flex-grow border border-gray-300 rounded-md p-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
            value={input} 
            placeholder="Ask a question..."
            onChange={handleInputChange} 
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 disabled:bg-gray-400"
            disabled={isLoading}
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