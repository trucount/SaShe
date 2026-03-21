'use client';

import React, { useState } from 'react';

const CHATBOT_URL = 'https://heho.vercel.app/deploy/l6jwvkbfa73fh72o2i7l5';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 bg-black text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-gray-800 transition-all z-50"
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
      >
        {isOpen ? (
          <span className="text-2xl leading-none">✕</span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <>
          {/* Overlay (mobile only) */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Chat Container */}
          <div
            className="
              fixed z-50 bg-white shadow-2xl border border-black/10 overflow-hidden

              /* 📱 MOBILE: full screen with small top gap */
              top-4 left-0 right-0 bottom-0 rounded-t-2xl

              /* 🖥️ DESKTOP: right side panel */
              md:top-0 md:right-0 md:left-auto md:bottom-0
              md:w-[420px] md:rounded-none md:rounded-l-2xl
            "
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black z-10 bg-white/80 rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
              aria-label="Close chatbot"
            >
              ✕
            </button>

            {/* Iframe */}
            <iframe
              src={CHATBOT_URL}
              className="w-full h-full"
              style={{ border: 'none' }}
              allow="microphone; camera"
              title="HeHo Chatbot"
            />
          </div>
        </>
      )}
    </>
  );
};

export default ChatbotWidget;
