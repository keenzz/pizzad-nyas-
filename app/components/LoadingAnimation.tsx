'use client'

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function LoadingAnimation() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  // Her sayfa değişiminde yükleme durumunu yönet
  useEffect(() => {
    setIsLoading(true);
    
    // Sayfa yüklendiğinde animasyonu kaldır
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 z-[9999] flex justify-center items-center pointer-events-none">
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20">
          <div className="absolute w-full h-full border-4 border-gray-200 rounded-full"></div>
          <div className="absolute w-full h-full border-4 border-transparent border-t-red-700 rounded-full animate-spin"></div>
        </div>
        <div className="mt-4 text-center">
          <div className="text-lg font-medium text-red-700">Yükleniyor</div>
          <div className="text-gray-500 text-sm">Lütfen bekleyin...</div>
        </div>
      </div>
    </div>
  );
} 