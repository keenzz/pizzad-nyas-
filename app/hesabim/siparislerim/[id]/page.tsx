'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// Sipariş durumuna göre renk belirleme
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Teslim Edildi':
      return 'bg-green-100 text-green-800';
    case 'Hazırlanıyor':
      return 'bg-blue-100 text-blue-800';
    case 'Yolda':
      return 'bg-orange-100 text-orange-800';
    case 'İptal Edildi':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Mock sipariş verileri
const mockOrders = [
  {
    id: 'ORD-5432',
    date: '12 Mayıs 2023',
    status: 'Teslim Edildi',
    total: 129.90,
    items: [
      { id: 1, name: 'Karışık Pizza (Büyük)', quantity: 1, price: 89.90, totalPrice: 89.90 },
      { id: 2, name: 'Coca Cola 1L', quantity: 2, price: 20.00, totalPrice: 40.00 },
    ],
    address: {
      title: 'Ev',
      fullAddress: 'Atatürk Mah. Cumhuriyet Cad. No:123 D:5, Kadıköy, İstanbul, 34700',
    },
    payment: {
      method: 'Kredi Kartı',
      cardInfo: '**** **** **** 4587',
      isPaid: true,
    },
    deliveryFee: 0,
    discount: 0,
    subtotal: 129.90,
    orderNotes: 'Kapıda ödeme yapılacak, lütfen kapı zilini çalın.',
    deliveryTime: '30-40 dk',
    estimatedDeliveryTime: '13:45',
    actualDeliveryTime: '13:38',
    trackingEvents: [
      { status: 'Sipariş Alındı', time: '13:05', date: '12 Mayıs 2023' },
      { status: 'Hazırlanıyor', time: '13:10', date: '12 Mayıs 2023' },
      { status: 'Yola Çıktı', time: '13:25', date: '12 Mayıs 2023' },
      { status: 'Teslim Edildi', time: '13:38', date: '12 Mayıs 2023' },
    ],
  },
  {
    id: 'ORD-3254',
    date: '25 Nisan 2023',
    status: 'Teslim Edildi',
    total: 74.50,
    items: [
      { id: 3, name: 'Margherita Pizza (Orta)', quantity: 1, price: 59.90, totalPrice: 59.90 },
      { id: 4, name: 'Patates Kızartması', quantity: 1, price: 14.60, totalPrice: 14.60 },
    ],
    address: {
      title: 'İş',
      fullAddress: 'Barbaros Bulvarı No:45 Kat:3, Beşiktaş, İstanbul, 34353',
    },
    payment: {
      method: 'Online Ödeme',
      cardInfo: '**** **** **** 6214',
      isPaid: true,
    },
    deliveryFee: 0,
    discount: 0,
    subtotal: 74.50,
    orderNotes: '',
    deliveryTime: '30-40 dk',
    estimatedDeliveryTime: '19:15',
    actualDeliveryTime: '19:22',
    trackingEvents: [
      { status: 'Sipariş Alındı', time: '18:40', date: '25 Nisan 2023' },
      { status: 'Hazırlanıyor', time: '18:45', date: '25 Nisan 2023' },
      { status: 'Yola Çıktı', time: '19:05', date: '25 Nisan 2023' },
      { status: 'Teslim Edildi', time: '19:22', date: '25 Nisan 2023' },
    ],
  },
  {
    id: 'ORD-2187',
    date: '10 Mart 2023',
    status: 'Teslim Edildi',
    total: 148.75,
    items: [
      { id: 5, name: 'Sucuklu Pizza (Büyük)', quantity: 1, price: 79.90, totalPrice: 79.90 },
      { id: 6, name: 'Tavuk Kanat (8 Adet)', quantity: 1, price: 49.90, totalPrice: 49.90 },
      { id: 7, name: 'Sprite 1L', quantity: 1, price: 18.95, totalPrice: 18.95 },
    ],
    address: {
      title: 'Ev',
      fullAddress: 'Atatürk Mah. Cumhuriyet Cad. No:123 D:5, Kadıköy, İstanbul, 34700',
    },
    payment: {
      method: 'Kapıda Ödeme (Nakit)',
      cardInfo: '',
      isPaid: true,
    },
    deliveryFee: 0,
    discount: 0,
    subtotal: 148.75,
    orderNotes: 'Baharat paketi ekleyin lütfen.',
    deliveryTime: '30-40 dk',
    estimatedDeliveryTime: '20:30',
    actualDeliveryTime: '20:25',
    trackingEvents: [
      { status: 'Sipariş Alındı', time: '19:55', date: '10 Mart 2023' },
      { status: 'Hazırlanıyor', time: '20:00', date: '10 Mart 2023' },
      { status: 'Yola Çıktı', time: '20:15', date: '10 Mart 2023' },
      { status: 'Teslim Edildi', time: '20:25', date: '10 Mart 2023' },
    ],
  },
  {
    id: 'ORD-1456',
    date: '15 Şubat 2023',
    status: 'İptal Edildi',
    total: 94.80,
    items: [
      { id: 8, name: 'Mantarlı Pizza (Orta)', quantity: 1, price: 64.90, totalPrice: 64.90 },
      { id: 9, name: 'Fanta 1L', quantity: 1, price: 19.90, totalPrice: 19.90 },
      { id: 10, name: 'Soğan Halkası', quantity: 1, price: 9.90, totalPrice: 9.90 },
    ],
    address: {
      title: 'Ev',
      fullAddress: 'Atatürk Mah. Cumhuriyet Cad. No:123 D:5, Kadıköy, İstanbul, 34700',
    },
    payment: {
      method: 'Kapıda Ödeme (Kredi Kartı)',
      cardInfo: '',
      isPaid: false,
    },
    deliveryFee: 0,
    discount: 0,
    subtotal: 94.80,
    orderNotes: '',
    deliveryTime: '30-40 dk',
    estimatedDeliveryTime: '21:10',
    actualDeliveryTime: '',
    trackingEvents: [
      { status: 'Sipariş Alındı', time: '20:35', date: '15 Şubat 2023' },
      { status: 'İptal Edildi', time: '20:42', date: '15 Şubat 2023', reason: 'Müşteri tarafından iptal edildi.' },
    ],
  }
];

export default function OrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<(typeof mockOrders)[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // ID'ye göre siparişi bul
        const foundOrder = mockOrders.find(order => order.id === id);
        
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          setError('Sipariş bulunamadı.');
        }
      } catch (err) {
        setError('Sipariş bilgileri yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleReorder = () => {
    // Burada sepete ekleme işlemi yapılacak ve sepet sayfasına yönlendirilecek
    alert('Ürünler sepete eklendi!');
    router.push('/sepet');
  };

  // Yükleniyor durumu
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
      </div>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h2 className="text-lg font-semibold text-red-800 mb-2">{error}</h2>
        <p className="text-red-600 mb-4">Lütfen daha sonra tekrar deneyiniz.</p>
        <Link
          href="/hesabim/siparislerim"
          className="inline-flex items-center text-sm px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Siparişlerim'e Dön
        </Link>
      </div>
    );
  }

  // Sipariş bulunamadı durumu
  if (!order) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
        <svg className="w-12 h-12 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <h2 className="text-lg font-semibold text-yellow-800 mb-2">Sipariş Bulunamadı</h2>
        <p className="text-yellow-700 mb-4">Aradığınız sipariş sistemde bulunamadı.</p>
        <Link
          href="/hesabim/siparislerim"
          className="inline-flex items-center text-sm px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Siparişlerim'e Dön
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Başlık ve Geri Butonu */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link
            href="/hesabim/siparislerim"
            className="mr-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Sipariş #{order.id}
          </h1>
        </div>
        
        {order.status !== 'İptal Edildi' && (
          <button
            onClick={handleReorder}
            className="inline-flex items-center bg-red-700 hover:bg-red-800 text-white text-sm py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Tekrar Sipariş Ver
          </button>
        )}
      </div>
      
      {/* Sipariş Özeti */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Sipariş Tarihi</p>
            <p className="text-gray-800">{order.date}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Durum</p>
            <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Teslimat Adresi</p>
            <p className="text-gray-800">
              <span className="inline-block bg-gray-200 text-gray-800 text-xs font-medium px-2 py-0.5 rounded mr-1">
                {order.address.title}
              </span>
              {order.address.fullAddress}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Ödeme Yöntemi</p>
            <p className="text-gray-800">
              {order.payment.method}
              {order.payment.cardInfo && ` (${order.payment.cardInfo})`}
            </p>
          </div>
        </div>
      </div>
      
      {/* Sipariş Ürünleri */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-lg text-gray-800">Sipariş Ürünleri</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3 font-medium">Ürün</th>
                <th className="px-6 py-3 font-medium">Adet</th>
                <th className="px-6 py-3 font-medium">Birim Fiyat</th>
                <th className="px-6 py-3 font-medium text-right">Toplam</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {order.items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {item.price.toFixed(2)} TL
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-gray-800 font-medium">
                    {item.totalPrice.toFixed(2)} TL
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <td colSpan={3} className="px-6 py-4 text-right font-medium text-gray-600">
                  Ara Toplam:
                </td>
                <td className="px-6 py-4 text-right font-medium text-gray-800">
                  {order.subtotal.toFixed(2)} TL
                </td>
              </tr>
              {order.deliveryFee > 0 && (
                <tr className="bg-gray-50">
                  <td colSpan={3} className="px-6 py-4 text-right font-medium text-gray-600">
                    Teslimat Ücreti:
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-gray-800">
                    {order.deliveryFee.toFixed(2)} TL
                  </td>
                </tr>
              )}
              {order.discount > 0 && (
                <tr className="bg-gray-50">
                  <td colSpan={3} className="px-6 py-4 text-right font-medium text-gray-600">
                    İndirim:
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-green-600">
                    -{order.discount.toFixed(2)} TL
                  </td>
                </tr>
              )}
              <tr className="bg-gray-100">
                <td colSpan={3} className="px-6 py-4 text-right font-bold text-gray-800">
                  Genel Toplam:
                </td>
                <td className="px-6 py-4 text-right font-bold text-gray-900">
                  {order.total.toFixed(2)} TL
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      
      {/* Sipariş Notları */}
      {order.orderNotes && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-lg text-gray-800">Sipariş Notu</h2>
          </div>
          <div className="px-6 py-4">
            <p className="text-gray-700">{order.orderNotes}</p>
          </div>
        </div>
      )}
      
      {/* Teslimat Takibi */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-lg text-gray-800">Sipariş Durumu Takibi</h2>
        </div>
        <div className="px-6 py-4">
          <div className="relative">
            {order.trackingEvents.map((event, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="rounded-full h-10 w-10 flex items-center justify-center bg-red-100 text-red-600">
                      {event.status === 'Sipariş Alındı' && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                      {event.status === 'Hazırlanıyor' && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                      )}
                      {(event.status === 'Yola Çıktı' || event.status === 'Yola Çıktı') && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
                        </svg>
                      )}
                      {event.status === 'Teslim Edildi' && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                      )}
                      {event.status === 'İptal Edildi' && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      )}
                    </div>
                    {index < order.trackingEvents.length - 1 && (
                      <div className="h-full border-l border-dashed border-gray-300 mx-auto"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-800 font-medium">{event.status}</h3>
                    <p className="text-gray-500 text-sm">{event.date}, {event.time}</p>
                    {'reason' in event && event.reason && (
                      <p className="text-red-600 text-sm mt-1">{event.reason}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 