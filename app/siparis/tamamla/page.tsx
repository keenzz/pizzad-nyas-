'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

// Sahte sipariş verileri
const mockOrderDetails = {
  orderNumber: 'ORD-12345',
  date: new Date().toLocaleDateString('tr-TR'),
  time: new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'}),
  status: 'Hazırlanıyor',
  items: [
    { id: 'p1', name: 'Karışık Pizza (Orta)', quantity: 1, price: 89.90, extras: ['Ekstra Peynir', 'Acı Sos'] },
    { id: 'p3', name: 'Margarita Pizza (Küçük)', quantity: 2, price: 69.90, extras: [] }
  ],
  subtotal: 229.70,
  deliveryFee: 0,
  discount: 0,
  total: 229.70,
  deliveryAddress: {
    title: 'Ev',
    fullName: 'Ahmet Yılmaz',
    address: 'Atatürk Mah. Cumhuriyet Cad. No:123 D:5',
    district: 'Kadıköy',
    city: 'İstanbul',
    postalCode: '34700',
    phone: '0555 123 4567'
  },
  paymentMethod: 'Kredi Kartı',
  estimatedDelivery: '30-45 dakika'
};

// SearchParams kullanarak sipariş detaylarını gösteren bileşen
function OrderDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(mockOrderDetails);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // API çağrısı yapılacak yer - Gerçek uygulamada
        // const orderNumber = searchParams.get('order');
        // if (!orderNumber) throw new Error('Sipariş numarası bulunamadı');
        // const response = await fetch(`/api/orders/${orderNumber}`);
        // if (!response.ok) throw new Error('Sipariş detayları alınamadı');
        // const data = await response.json();
        // setOrderDetails(data);
        
        // Mock veri kullanımı - bunu API bağlandığında kaldırın
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Aşağıdaki satırı gerçek uygulamada kaldırın - sadece demo amacıyla
        const randomOrderNum = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
        setOrderDetails(prev => ({...prev, orderNumber: randomOrderNum}));
        
      } catch (err: any) {
        setError(err.message || 'Bir hata oluştu');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Bir Sorun Oluştu</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/sepet"
              className="inline-flex items-center justify-center bg-red-700 hover:bg-red-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Sepete Dön
            </Link>
            <Link 
              href="/"
              className="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Ana Sayfa
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        {/* Sipariş Başarılı Başlık */}
        <div className="bg-green-50 p-8 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Siparişiniz Alındı!</h2>
          <p className="text-gray-600">Siparişiniz başarıyla alındı ve mutfağımız tarafından hazırlanıyor.</p>
        </div>
        
        {/* Sipariş Detayları */}
        <div className="p-8">
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Sipariş Bilgileri</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Sipariş No</p>
                <p className="font-medium">{orderDetails.orderNumber}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Tarih</p>
                <p className="font-medium">{orderDetails.date}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Saat</p>
                <p className="font-medium">{orderDetails.time}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Durum</p>
                <p className="font-medium">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {orderDetails.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Sipariş Edilen Ürünler</h3>
            <div className="space-y-3">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.quantity}x {item.name}</p>
                    {item.extras.length > 0 && (
                      <p className="text-xs text-gray-500">Ekstralar: {item.extras.join(', ')}</p>
                    )}
                  </div>
                  <p className="font-medium">{(item.price * item.quantity).toFixed(2)} TL</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ara Toplam:</span>
                <span className="font-medium">{orderDetails.subtotal.toFixed(2)} TL</span>
              </div>
              
              <div className="flex justify-between items-center mt-1">
                <span className="text-gray-600">Teslimat Ücreti:</span>
                <span className="font-medium">
                  {orderDetails.deliveryFee === 0 ? 'Ücretsiz' : `${orderDetails.deliveryFee.toFixed(2)} TL`}
                </span>
              </div>
              
              {orderDetails.discount > 0 && (
                <div className="flex justify-between items-center mt-1 text-green-600">
                  <span>İndirim:</span>
                  <span className="font-medium">-{orderDetails.discount.toFixed(2)} TL</span>
                </div>
              )}
              
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                <span className="font-medium text-lg">Toplam:</span>
                <span className="font-bold text-lg text-red-700">{orderDetails.total.toFixed(2)} TL</span>
              </div>
            </div>
          </div>
          
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Teslimat Bilgileri</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 mb-1">Adres</p>
                <p className="font-medium">{orderDetails.deliveryAddress.title}</p>
                <p className="text-sm text-gray-600">{orderDetails.deliveryAddress.fullName}</p>
                <p className="text-sm text-gray-600">{orderDetails.deliveryAddress.address}</p>
                <p className="text-sm text-gray-600">
                  {orderDetails.deliveryAddress.district}, {orderDetails.deliveryAddress.city}, {orderDetails.deliveryAddress.postalCode}
                </p>
                <p className="text-sm text-gray-600 mt-1">{orderDetails.deliveryAddress.phone}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Tahmini Teslimat Süresi</p>
                <p className="font-medium">{orderDetails.estimatedDelivery}</p>
                
                <p className="text-gray-500 mb-1 mt-3">Ödeme Yöntemi</p>
                <p className="font-medium">{orderDetails.paymentMethod}</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Siparişinizin durumu hakkında bilgi almak için "Siparişlerim" sayfasını ziyaret edebilirsiniz.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/hesabim/siparislerim"
                className="inline-flex items-center justify-center bg-red-700 hover:bg-red-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                Siparişlerim
              </Link>
              <Link 
                href="/"
                className="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Ana Sayfa
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Yükleme bileşeni
function OrderLoadingFallback() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="animate-pulse">
          <div className="bg-gray-200 p-8 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-300 rounded-full mb-6 mx-auto"></div>
            <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
          
          <div className="p-8">
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-3"></div>
              <div className="grid grid-cols-4 gap-4">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
            
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-3"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
            
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-3"></div>
            <div className="h-24 bg-gray-200 rounded mb-8"></div>
            
            <div className="flex justify-center gap-4">
              <div className="h-12 bg-gray-200 rounded w-32"></div>
              <div className="h-12 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Ana sayfa bileşeni
export default function OrderCompletePage() {
  return (
    <div className="container mx-auto px-4 pt-36 sm:pt-32 pb-16">
      <Suspense fallback={<OrderLoadingFallback />}>
        <OrderDetails />
      </Suspense>
    </div>
  );
} 