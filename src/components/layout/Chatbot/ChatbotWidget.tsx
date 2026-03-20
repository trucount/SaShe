'use client';

import React, { useEffect, useState } from 'react';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-black text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-gray-800 transition-all z-40 md:hidden"
        aria-label="Open chatbot"
      >
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
      </button>

      {/* Mobile Chatbot Modal */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold text-black">Chat with us</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>
            <div className="h-[calc(90vh-60px)] overflow-auto">
              <iframe
                src="https://heho.vercel.app/deploy/l6jwvkbfa73fh72o2i7l5"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '8px',
                }}
                allow="microphone; camera"
                title="HeHo Chatbot"
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Chatbot Sidebar */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40 max-w-sm">
        <iframe
          src="https://heho.vercel.app/deploy/l6jwvkbfa73fh72o2i7l5"
          style={{
            width: '100%',
            height: '600px',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
          allow="microphone; camera"
          title="HeHo Chatbot"
        />
      </div>
    </>
  );
};

export default ChatbotWidget;
