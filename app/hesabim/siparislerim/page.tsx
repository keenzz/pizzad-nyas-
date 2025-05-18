'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Mock sipariş verileri
const mockOrders = [
  {
    id: 'ORD-5432',
    date: '12 Mayıs 2023',
    status: 'Teslim Edildi',
    total: 129.90,
    items: [
      { id: 1, name: 'Karışık Pizza (Büyük)', price: 89.90, quantity: 1 },
      { id: 2, name: 'Cola (1L)', price: 20.00, quantity: 2 },
    ],
    address: 'Atatürk Mah. Cumhuriyet Cad. No:123 D:5, Kadıköy, İstanbul',
    paymentMethod: 'Kredi Kartı',
  },
  {
    id: 'ORD-3254',
    date: '25 Nisan 2023',
    status: 'Teslim Edildi',
    total: 74.50,
    items: [
      { id: 3, name: 'Margarita Pizza (Orta)', price: 59.90, quantity: 1 },
      { id: 4, name: 'Sezar Salata', price: 14.60, quantity: 1 },
    ],
    address: 'Atatürk Mah. Cumhuriyet Cad. No:123 D:5, Kadıköy, İstanbul',
    paymentMethod: 'Nakit',
  },
  {
    id: 'ORD-2187',
    date: '10 Mart 2023',
    status: 'Teslim Edildi',
    total: 148.75,
    items: [
      { id: 5, name: 'Sucuklu Pizza (Büyük)', price: 79.90, quantity: 1 },
      { id: 6, name: 'Karışık Pizza (Orta)', price: 54.90, quantity: 1 },
      { id: 7, name: 'Çikolatalı Sufle', price: 13.95, quantity: 1 },
    ],
    address: 'Barbaros Bulvarı No:45 Kat:3, Beşiktaş, İstanbul',
    paymentMethod: 'Kredi Kartı',
  },
  {
    id: 'ORD-1098',
    date: '2 Şubat 2023',
    status: 'Teslim Edildi',
    total: 84.90,
    items: [
      { id: 8, name: 'Tavuklu Pizza (Büyük)', price: 84.90, quantity: 1 },
    ],
    address: 'Barbaros Bulvarı No:45 Kat:3, Beşiktaş, İstanbul',
    paymentMethod: 'Online Ödeme',
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<typeof mockOrders>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    // Mock API çağrısı
    const fetchOrders = async () => {
      try {
        // Gerçek bir API çağrısını simüle etmek için timeout kullanıyoruz
        await new Promise(resolve => setTimeout(resolve, 800));
        setOrders(mockOrders);
      } catch (error) {
        console.error('Siparişler yüklenemedi:', error);
        setError('Siparişleriniz yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  // Sipariş durumuna göre badge rengini belirle
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Teslim Edildi':
        return 'bg-green-100 text-green-800';
      case 'Hazırlanıyor':
        return 'bg-blue-100 text-blue-800';
      case 'Yolda':
        return 'bg-yellow-100 text-yellow-800';
      case 'İptal Edildi':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-36 sm:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Siparişlerim</h1>
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

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm"
            >
              {error}
            </motion.div>
          )}

          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="font-semibold text-lg text-gray-800">Son Siparişleriniz</h2>
            </div>
            
            {orders.length > 0 ? (
              <div>
                <div className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <div key={order.id} className="divide-y divide-gray-100">
                      <div 
                        className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => toggleOrderDetails(order.id)}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <div className="mb-2 sm:mb-0">
                            <span className="font-medium text-gray-900">{order.id}</span>
                            <p className="text-sm text-gray-500 mt-1">
                              {order.date} • {order.items.reduce((sum, item) => sum + item.quantity, 0)} ürün
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)}`}>
                              {order.status}
                            </span>
                            <span className="text-gray-900 font-medium ml-6">{order.total.toFixed(2)} TL</span>
                            <svg 
                              className={`ml-3 h-5 w-5 text-gray-400 transition-transform ${expandedOrder === order.id ? 'transform rotate-180' : ''}`} 
                              xmlns="http://www.w3.org/2000/svg" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {expandedOrder === order.id && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 py-4 bg-gray-50"
                        >
                          <h3 className="text-sm font-medium text-gray-900 mb-3">Sipariş Detayı</h3>
                          <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Ürün
                                  </th>
                                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                    Adet
                                  </th>
                                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                    Fiyat
                                  </th>
                                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                                    Toplam
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {order.items.map((item) => (
                                  <tr key={item.id}>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                                      {item.name}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 text-right">
                                      {item.quantity}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 text-right">
                                      {item.price.toFixed(2)} TL
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 text-right font-medium">
                                      {(item.price * item.quantity).toFixed(2)} TL
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                              <tfoot className="bg-gray-50">
                                <tr>
                                  <td colSpan={3} className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                                    Genel Toplam
                                  </td>
                                  <td className="px-4 py-3 text-right text-sm font-bold text-gray-900">
                                    {order.total.toFixed(2)} TL
                                  </td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Teslimat Adresi</h4>
                              <p className="text-sm text-gray-800">{order.address}</p>
                            </div>
                            <div>
                              <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Ödeme Bilgisi</h4>
                              <p className="text-sm text-gray-800">{order.paymentMethod}</p>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-between">
                            <Link 
                              href={`/hesabim/siparislerim/${order.id}`}
                              className="text-sm font-medium text-red-700 hover:text-red-800 flex items-center"
                            >
                              Sipariş Detayı
                              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                            <button 
                              className="text-sm font-medium text-red-700 hover:text-red-800 flex items-center"
                              onClick={() => window.confirm("Aynı ürünleri sepete eklemek istediğinize emin misiniz?") && console.log('Tekrar sipariş verildi:', order.id)}
                            >
                              <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              Tekrar Sipariş Ver
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Henüz sipariş vermediniz</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Siparişleriniz burada listelenecektir.
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
        </div>
      </div>
    </div>
  );
} 