'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showCategoryMenu, setShowCategoryMenu] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Kategorileri tanımla
  const categories = [
    { id: 'kampanyalar', title: 'Tüm Kampanyalar', href: '/menu', icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7' },
    { id: 'pizzalar', title: 'Tüm Pizzalar', href: '/menu', icon: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0', subCategories: [
      { title: 'Klasik Pizzalar', href: '/menu' },
      { title: 'Özel Pizzalar', href: '/menu' },
      { title: 'Gurme Pizzalar', href: '/menu' },
      { title: 'Vejetaryen Pizzalar', href: '/menu' },
    ]},
    { id: 'ekstralar', title: 'Ekstra Lezzetler', href: '/menu', icon: 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5', subCategories: [
      { title: 'Yan Ürünler', href: '/menu' },
      { title: 'Tatlılar', href: '/menu' },
      { title: 'Soslar', href: '/menu' },
    ]},
    { id: 'icecekler', title: 'İçecekler', href: '/menu', icon: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.357 2.059l.886.443c.59.3.952.907.909 1.559l-.64 9.922a2.25 2.25 0 01-2.247 2.118h-6.53a2.25 2.25 0 01-2.247-2.118L3.75 23.36c-.043-.652.319-1.26.91-1.559l.885-.443a2.25 2.25 0 001.356-2.059V3.104a24.301 24.301 0 014.5 0m-7.5 0c.251.023.501.05.75.082M9 14.25v-2.625c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V14.25' },
  ];

  // Kampanya duyuruları
  const announcements = [
    "🔥 Büyük Pizza Kampanyası: Bir alana bir bedava! Son gün bugün!",
    "⚡ İkinci pizzanın %50 indirimli olduğunu biliyor muydunuz?",
    "🎁 Siparişinize özel içecek hediye!",
  ];

  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Örnek olarak sepette 3 ürün olduğunu varsayalım
    setCartCount(3);

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Duyuruları döndür
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [announcements.length]);

  useEffect(() => {
    // Alt kategori menüsünün dışına tıklandığında kapanmasını sağla
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
        setActiveCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Active link kontrolü
  const isActive = (path: string) => {
    return pathname === path;
  };

  // Kategori üzerine gelindiğinde
  const handleCategoryHover = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  // Kategori üzerinden çıkıldığında
  const handleCategoryLeave = () => {
    // Alt kategoriler üzerine gelince kategori menüsünün kapanmaması için timer kullanıyoruz
    setTimeout(() => {
      if (!categoryMenuRef.current?.matches(':hover')) {
        setActiveCategory(null);
      }
    }, 100);
  };

  return (
    <>
      <header className="z-50 fixed top-0 left-0 right-0 flex flex-col">
        {/* Kampanya duyuruları */}
        <div className="bg-red-700 text-white py-1.5 text-center relative overflow-hidden">
          <motion.div
            key={currentAnnouncement}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium"
          >
            {announcements[currentAnnouncement]}
          </motion.div>
        </div>

        {/* Üst bar - Logo ve Sepet/Giriş kısmı */}
        <div className={`transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'} bg-white shadow-sm`}>
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link href="/">
                <motion.div 
                  className="flex items-center space-x-2" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 bg-red-800 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:rotate-12">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="w-7 h-7 text-white"
                      >
                        <path d="M11.9998 2C6.47733 2 1.99979 6.47754 1.99979 12C1.99979 17.5225 6.47733 22 11.9998 22C17.5223 22 21.9998 17.5225 21.9998 12C21.9998 6.47754 17.5223 2 11.9998 2ZM18.3748 7.5H13.4998L15.6198 5.365C16.9273 6.07 17.9748 7.0925 18.3748 7.5ZM11.9998 8.5C13.3923 8.5 14.4998 9.6075 14.4998 11C14.4998 12.3925 13.3923 13.5 11.9998 13.5C10.6073 13.5 9.49979 12.3925 9.49979 11C9.49979 9.6075 10.6073 8.5 11.9998 8.5ZM8.37229 5.36C9.11979 5.0175 9.91979 4.8175 10.7473 4.7675L7.49979 8H5.75479C6.36479 6.8525 7.26479 5.9 8.37229 5.36ZM5.34729 14C5.17979 13.3675 5.07729 12.6975 5.07729 12C5.07729 11.3025 5.17979 10.6325 5.34729 10H7.66229L7.13729 11.485C7.04979 11.645 7.04979 11.8325 7.13729 12C7.14979 12.0125 7.15479 12.035 7.16729 12.05L7.66229 14H5.34729ZM5.75479 16H7.49979L10.7473 19.235C9.92479 19.185 9.12479 18.985 8.37229 18.6425C7.26479 18.1 6.36479 17.1475 5.75479 16ZM13.4998 16.5H18.3723C17.6423 17.28 16.7223 17.8725 15.6198 18.1475L13.4998 16.5ZM16.8723 14L17.3673 12.05C17.3798 12.035 17.3848 12.02 17.3973 12C17.4848 11.8325 17.4848 11.645 17.3973 11.485L16.8723 10H19.1873C19.3548 10.6325 19.4573 11.3025 19.4573 12C19.4573 12.6975 19.3548 13.3675 19.1873 14H16.8723Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold heading-font tracking-tight text-red-800">
                      Pizza Dünyası
                    </span>
                    <span className="text-xs text-yellow-600">
                      İtalyan Lezzeti
                    </span>
                  </div>
                </motion.div>
              </Link>

              {/* Mobile Cart Icon - yalnızca sepet iconu (hamburger menu kaldırıldı) */}
              <div className="lg:hidden flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <Link href="/sepet">
                    <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </motion.div>
              </div>

              {/* Desktop Right Menu */}
              <div className="hidden lg:flex items-center space-x-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <Link href="/sepet">
                    <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300 relative">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                          {cartCount}
                        </span>
                      )}
                    </div>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/giris" 
                    className="px-5 py-2 rounded-md text-sm font-medium bg-red-800 text-white hover:bg-red-700 transition duration-300 shadow-sm"
                  >
                    Giriş
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Alt bar - Kategori menüsü (sadece desktop görünümde) */}
        <div className="bg-gray-100 border-b border-gray-200 hidden lg:block">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center py-2">
              <nav className="flex justify-center space-x-12">
                {categories.map((category) => (
                  <div 
                    key={category.id} 
                    className="relative"
                    onMouseEnter={() => handleCategoryHover(category.id)}
                    onMouseLeave={handleCategoryLeave}
                  >
                    <Link 
                      href={category.href} 
                      className={`text-base font-semibold py-2 inline-block ${isActive(category.href) ? 'text-red-800 border-b-2 border-red-800' : 'text-gray-700 hover:text-red-800'} transition duration-200`}
                    >
                      {category.title}
                    </Link>
                    
                    {/* Alt kategoriler menüsü */}
                    {category.subCategories && activeCategory === category.id && (
                      <motion.div 
                        ref={categoryMenuRef}
                        className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 mt-1 z-50 min-w-[200px]"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {category.subCategories.map((subCat, index) => (
                          <Link 
                            key={index} 
                            href={subCat.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-800 transition duration-200"
                          >
                            {subCat.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Arama butonu */}
              <div className="hidden lg:block absolute right-4">
                <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navbar - Yalnızca mobil görünümde */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-between items-center px-1">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={category.href}
              className={`flex flex-col items-center py-2 px-2 ${isActive(category.href) ? 'text-red-800' : 'text-gray-600'}`}
            >
              <div className={`p-1.5 rounded-full ${isActive(category.href) ? 'bg-red-100' : ''}`}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={isActive(category.href) ? 2 : 1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={category.icon} />
                </svg>
              </div>
              <span className="text-xs mt-1 font-medium">
                {category.title.split(' ').pop()}
              </span>
            </Link>
          ))}
          
          <Link 
            href="/hesabim"
            className={`flex flex-col items-center py-2 px-2 ${isActive('/hesabim') ? 'text-red-800' : 'text-gray-600'}`}
          >
            <div className={`p-1.5 rounded-full ${isActive('/hesabim') ? 'bg-red-100' : ''}`}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={isActive('/hesabim') ? 2 : 1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-xs mt-1 font-medium">
              Hesabım
            </span>
          </Link>
        </div>
      </div>
      
      {/* Mobil görünümde bottom navbar'dan dolayı sayfa içeriğinin altta kalmaması için padding ekliyoruz */}
      <div className="lg:hidden h-16"></div>
    </>
  );
} 