'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

// Mock kullanıcı verisi
const mockUser = {
  id: 1,
  firstName: 'Ahmet',
  lastName: 'Yılmaz',
  email: 'ahmet.yilmaz@example.com',
  phone: '0555 123 4567',
  joinDate: '15 Nisan 2023',
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<typeof mockUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock API çağrısı
    const fetchUserData = async () => {
      try {
        // Gerçek bir API çağrısını simüle etmek için timeout kullanıyoruz
        await new Promise(resolve => setTimeout(resolve, 800));
        setUser(mockUser);
      } catch (error) {
        console.error('Kullanıcı bilgileri alınamadı:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Çıkış işlemi - gerçek uygulamada bir API çağrısı olurdu
    router.push('/giris');
  };

  // Sayfa yükleniyor durumu
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-36 sm:pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Kullanıcı bulunamadı durumu
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-36 sm:pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Oturumunuz Sona Erdi</h1>
              <p className="text-gray-600 mb-6">Hesabınızı görüntülemek için lütfen giriş yapın.</p>
              <Link
                href="/giris"
                className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Giriş Yap
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Aktif menü öğesini belirle
  const isActive = (path: string) => {
    if (path === '/hesabim' && pathname === '/hesabim') {
      return true;
    }
    if (path !== '/hesabim' && pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-36 sm:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sol taraf - Hesap Menüsü */}
            <div className="w-full md:w-64 shrink-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24"
              >
                <div className="p-5 bg-red-700 text-white">
                  <h2 className="font-bold text-xl">Merhaba, {user.firstName}!</h2>
                  <p className="text-sm text-red-100">Üyelik: {user.joinDate}</p>
                </div>
                
                <nav className="p-2">
                  <Link 
                    href="/hesabim" 
                    className={`flex items-center px-3 py-3 text-gray-700 ${isActive('/hesabim') ? 'bg-red-50 font-medium' : 'hover:bg-gray-50'} rounded-lg transition-colors`}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    Hesap Özeti
                  </Link>
                  
                  <Link 
                    href="/hesabim/siparislerim" 
                    className={`flex items-center px-3 py-3 text-gray-700 ${isActive('/hesabim/siparislerim') ? 'bg-red-50 font-medium' : 'hover:bg-gray-50'} rounded-lg transition-colors mt-1`}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                    Siparişlerim
                  </Link>
                  
                  <Link 
                    href="/hesabim/adreslerim" 
                    className={`flex items-center px-3 py-3 text-gray-700 ${isActive('/hesabim/adreslerim') ? 'bg-red-50 font-medium' : 'hover:bg-gray-50'} rounded-lg transition-colors mt-1`}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Adreslerim
                  </Link>
                  
                  <Link 
                    href="/hesabim/favorilerim" 
                    className={`flex items-center px-3 py-3 text-gray-700 ${isActive('/hesabim/favorilerim') ? 'bg-red-50 font-medium' : 'hover:bg-gray-50'} rounded-lg transition-colors mt-1`}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    Favorilerim
                  </Link>
                  
                  <Link 
                    href="/hesabim/profil" 
                    className={`flex items-center px-3 py-3 text-gray-700 ${isActive('/hesabim/profil') ? 'bg-red-50 font-medium' : 'hover:bg-gray-50'} rounded-lg transition-colors mt-1`}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Profil Bilgilerim
                  </Link>
                  
                  <hr className="my-2 border-gray-200" />
                  
                  <button 
                    onClick={handleLogout}
                    className="flex w-full items-center px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Çıkış Yap
                  </button>
                </nav>
              </motion.div>
            </div>
            
            {/* Sağ taraf - Ana içerik */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-md p-6"
              >
                {children}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 