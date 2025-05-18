'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Scroll pozisyonunu izle
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  // Sayfanın en üstüne git
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div 
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <button 
        onClick={scrollToTop}
        className="bg-red-700 hover:bg-red-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 focus:outline-none hover:scale-110"
        aria-label="Yukarı çık"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
} 