'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Mock favori ürün verileri
const mockFavorites = [
  {
    id: 'p1',
    name: 'Karışık Pizza',
    description: 'Sucuk, salam, sosis, mantar, mısır, yeşil biber, mozerella peyniri',
    price: 89.90,
    image: '/images/pizza1.jpg',
    category: 'pizza',
  },
  {
    id: 'p2',
    name: 'Margarita Pizza',
    description: 'Domates sos, mozerella peyniri, fesleğen',
    price: 69.90,
    image: '/images/pizza2.jpg',
    category: 'pizza',
  },
  {
    id: 'p3',
    name: 'Cola (1L)',
    description: 'Soğuk içecek',
    price: 20.00,
    image: '/images/cola.jpg',
    category: 'drink',
  },
  {
    id: 'p4',
    name: 'Tavuk Kanat (8 adet)',
    description: 'Baharatlı tavuk kanatları, ranch sos ile',
    price: 59.90,
    image: '/images/wings.jpg',
    category: 'side',
  },
];

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Mock API çağrısı
    const fetchFavorites = async () => {
      try {
        // Gerçek bir API çağrısını simüle etmek için timeout kullanıyoruz
        await new Promise(resolve => setTimeout(resolve, 800));
        setFavorites(mockFavorites);
      } catch (error) {
        console.error('Favoriler yüklenemedi:', error);
        setError('Favorileriniz yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (productId: string) => {
    try {
      // Mock API çağrısı
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Ürünü favorilerden kaldır
      setFavorites(favorites.filter(product => product.id !== productId));
      
      // Başarı mesajını göster
      setSuccessMessage('Ürün favorilerinizden kaldırıldı.');
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error('Favorilerden kaldırılırken hata oluştu:', error);
      setError('Ürün favorilerinizden kaldırılırken bir hata oluştu.');
    }
  };

  const handleAddToCart = async (product: Product) => {
    try {
      // Mock API çağrısı
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Gerçek uygulamada burada sepete ekleme işlemi yapılır
      console.log('Sepete eklendi:', product);
      
      // Başarı mesajını göster
      setSuccessMessage(`"${product.name}" sepetinize eklendi.`);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error('Sepete eklerken hata oluştu:', error);
      setError('Ürün sepetinize eklenirken bir hata oluştu.');
    }
  };

  const filteredFavorites = filter === 'all' 
    ? favorites 
    : favorites.filter(product => product.category === filter);

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

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-36 sm:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Başlık ve Geri Dön butonu */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Favorilerim</h1>
            <Link
              href="/hesabim"
              className="text-sm text-red-700 hover:text-red-800 font-medium flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Hesabıma Dön
            </Link>
          </div>

          {/* Hata mesajı */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Başarı mesajı */}
          {showSuccessMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-green-50 text-green-600 p-4 rounded-lg mb-6 text-sm"
            >
              {successMessage}
            </motion.div>
          )}

          {/* Kategori filtreleri */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="font-semibold text-lg text-gray-800">Favori Ürünlerim</h2>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filter === 'all' 
                    ? 'bg-red-700 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Tümü
              </button>
              <button
                onClick={() => setFilter('pizza')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filter === 'pizza' 
                    ? 'bg-red-700 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Pizzalar
              </button>
              <button
                onClick={() => setFilter('side')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filter === 'side' 
                    ? 'bg-red-700 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Yan Ürünler
              </button>
              <button
                onClick={() => setFilter('drink')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filter === 'drink' 
                    ? 'bg-red-700 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                İçecekler
              </button>
            </div>
            
            {filteredFavorites.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredFavorites.map((product) => (
                  <div key={product.id} className="p-6">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex-shrink-0 h-24 w-24 bg-gray-200 rounded-md overflow-hidden mb-4 sm:mb-0 relative">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                          <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                        {product.image && (
                          <Image 
                            src={product.image} 
                            alt={product.name} 
                            className="h-full w-full object-cover"
                            width={96}
                            height={96}
                          />
                        )}
                      </div>
                      <div className="sm:ml-6 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                          <p className="text-lg font-medium text-gray-900">{product.price.toFixed(2)} TL</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <svg className="-ml-1 mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            Sepete Ekle
                          </button>
                          <button
                            onClick={() => handleRemoveFavorite(product.id)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <svg className="-ml-1 mr-1 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                            Favorilerden Kaldır
                          </button>
                          <Link 
                            href={`/urun/${product.id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <svg className="-ml-1 mr-1 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                            Ürün Detayı
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  {filter === 'all' 
                    ? 'Henüz favori ürününüz yok' 
                    : 'Bu kategoride favori ürününüz yok'}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Favori ürünleriniz burada listelenecektir.
                </p>
                <div className="mt-6">
                  <Link
                    href="/menu"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Menüyü İncele
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Önerilen Ürünler */}
          {favorites.length > 0 && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="font-semibold text-lg text-gray-800">Şunlar da İlginizi Çekebilir</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-w-3 aspect-h-2 bg-gray-200 group-hover:opacity-75 relative">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 p-4 space-y-2 flex flex-col">
                      <h3 className="text-sm font-medium text-gray-900">Özel Kampanya</h3>
                      <p className="text-sm text-gray-500">1 Büyük Boy Pizza + 1 İçecek + 1 Tatlı</p>
                      <div className="flex-1 flex flex-col justify-end">
                        <p className="text-base font-medium text-gray-900">139.90 TL</p>
                        <Link
                          href="/kampanyalar"
                          className="mt-3 text-sm font-medium text-red-700 hover:text-red-800"
                        >
                          Kampanyaları İncele
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-w-3 aspect-h-2 bg-gray-200 group-hover:opacity-75 relative">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 p-4 space-y-2 flex flex-col">
                      <h3 className="text-sm font-medium text-gray-900">Yeni Lezzetlerimiz</h3>
                      <p className="text-sm text-gray-500">Barbekü Soslu Tavuklu Pizza ve daha fazlası</p>
                      <div className="flex-1 flex flex-col justify-end">
                        <p className="text-base font-medium text-gray-900">89.90 TL'den başlayan fiyatlarla</p>
                        <Link
                          href="/menu/yeni-lezzetler"
                          className="mt-3 text-sm font-medium text-red-700 hover:text-red-800"
                        >
                          Yeni Lezzetleri İncele
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 