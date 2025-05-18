'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Sepet ürünü tipi
type CartItem = {
  id: string;
  name: string;
  size: 'small' | 'medium' | 'large';
  price: number;
  quantity: number;
  extras: {
    id: string;
    name: string;
    price: number;
  }[];
};

// Mock sepet verisi
const mockCartItems: CartItem[] = [
  {
    id: 'p1',
    name: 'Karışık Pizza',
    size: 'medium',
    price: 89.90,
    quantity: 1,
    extras: [
      { id: 'ex1', name: 'Ekstra Peynir', price: 10.00 },
      { id: 'ex4', name: 'Acı Sos', price: 5.00 }
    ]
  },
  {
    id: 'p3',
    name: 'Margarita Pizza',
    size: 'small',
    price: 69.90,
    quantity: 2,
    extras: []
  }
];

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [discount, setDiscount] = useState(0);

  // Sepeti yükle
  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Mock API çağrısı
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Gerçek uygulamada burada API'den veya localStorage'dan sepet verileri alınır
        setCartItems(mockCartItems);
      } catch (error) {
        console.error('Sepet yüklenirken hata oluştu:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Ürün miktarını değiştir
  const handleQuantityChange = (itemId: string, change: number) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Ürünü sepetten kaldır
  const handleRemoveItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  // Promosyon kodu uygula
  const applyPromoCode = () => {
    if (!promoCode) {
      setPromoError('Lütfen bir promosyon kodu girin.');
      return;
    }

    // Burada gerçek uygulamada API'ye istek atılır
    // Mock olarak birkaç kod kontrol edelim
    if (promoCode.toLowerCase() === 'pizza10') {
      setDiscount(10);
      setPromoSuccess('Promosyon kodu uygulandı: 10% indirim');
      setPromoError('');
    } else if (promoCode.toLowerCase() === 'pizza50') {
      setDiscount(50);
      setPromoSuccess('Promosyon kodu uygulandı: 50TL indirim');
      setPromoError('');
    } else {
      setPromoError('Geçersiz promosyon kodu.');
      setPromoSuccess('');
      setDiscount(0);
    }
  };

  // Toplam hesaplama
  const subtotal = cartItems.reduce((sum, item) => {
    const itemExtrasTotal = item.extras.reduce((extrasSum, extra) => extrasSum + extra.price, 0);
    return sum + (item.price + itemExtrasTotal) * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 150 ? 0 : 15;
  
  // İndirim hesaplama (yüzde veya sabit)
  const discountAmount = discount < 20 
    ? (subtotal * discount) / 100  // Yüzde indirim (örn. %10)
    : discount;                    // Sabit indirim (örn. 50 TL)
  
  const total = subtotal + deliveryFee - discountAmount;

  // Ürün boyutu Türkçe çevirisi
  const getSizeText = (size: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'small': return 'Küçük';
      case 'medium': return 'Orta';
      case 'large': return 'Büyük';
      default: return size;
    }
  };

  // Sepet boş durumu
  if (cartItems.length === 0 && !isLoading) {
    return (
      <div className="container mx-auto px-4 pt-36 sm:pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sepetiniz Boş</h2>
            <p className="text-gray-600 mb-8">Lezzetli pizzalarımızı ve yan ürünlerimizi keşfedin.</p>
            <Link 
              href="/menu" 
              className="inline-flex items-center bg-red-700 hover:bg-red-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
              </svg>
              Menüye Git
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Yükleniyor durumu
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 pt-36 sm:pt-32 pb-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 pt-36 sm:pt-32 pb-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sepetim</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Taraf - Sepet Öğeleri */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="divide-y divide-gray-200">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="py-6 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-800">
                              {item.name} <span className="text-sm text-gray-500">({getSizeText(item.size)})</span>
                            </h3>
                            {item.extras.length > 0 && (
                              <div className="mt-1">
                                <p className="text-sm text-gray-500">
                                  Ekstralar: {item.extras.map(extra => extra.name).join(', ')}
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">
                              {(item.price + item.extras.reduce((sum, extra) => sum + extra.price, 0)).toFixed(2)} TL
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          {/* Miktar Ayarı */}
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button 
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="py-1 px-3 text-gray-700 hover:bg-gray-100 rounded-l-lg"
                              aria-label="Azalt"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                              </svg>
                            </button>
                            <span className="py-1 px-3 text-gray-800">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="py-1 px-3 text-gray-700 hover:bg-gray-100 rounded-r-lg"
                              aria-label="Artır"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                              </svg>
                            </button>
                          </div>
                          
                          {/* Kaldır Butonu */}
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                            Kaldır
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Alışverişe Devam Et Butonu */}
            <Link 
              href="/menu" 
              className="inline-flex items-center text-red-700 hover:text-red-800"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Alışverişe Devam Et
            </Link>
          </div>

          {/* Sağ Taraf - Sipariş Özeti */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Sipariş Özeti</h2>
              
              {/* Özet Satırları */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ara Toplam:</span>
                  <span className="font-medium">{subtotal.toFixed(2)} TL</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Teslimat Ücreti:</span>
                  <span className="font-medium">
                    {deliveryFee === 0 ? 'Ücretsiz' : `${deliveryFee.toFixed(2)} TL`}
                    {deliveryFee > 0 && (
                      <span className="block text-xs text-gray-500">
                        (150 TL üzeri ücretsiz teslimat)
                      </span>
                    )}
                  </span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>İndirim:</span>
                    <span className="font-medium">-{discountAmount.toFixed(2)} TL</span>
                  </div>
                )}
              </div>
              
              <div className="h-px bg-gray-200 my-4"></div>
              
              {/* Toplam */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium text-gray-800">Toplam:</span>
                <span className="text-xl font-bold text-red-700">{total.toFixed(2)} TL</span>
              </div>
              
              {/* Promosyon Kodu */}
              <div className="mb-6">
                <div className="flex">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promosyon kodu"
                    className="flex-1 border border-gray-300 rounded-l-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-r-lg hover:bg-gray-200 transition-colors"
                  >
                    Uygula
                  </button>
                </div>
                
                {promoError && (
                  <p className="text-red-600 text-sm mt-2">{promoError}</p>
                )}
                
                {promoSuccess && (
                  <p className="text-green-600 text-sm mt-2">{promoSuccess}</p>
                )}
              </div>
              
              {/* Sipariş Ver Butonu */}
              <Link 
                href="/siparis"
                className="block w-full bg-red-700 hover:bg-red-800 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
              >
                Siparişi Tamamla
              </Link>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                Siparişinizi tamamlayarak hizmet şartlarını kabul etmiş olursunuz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 