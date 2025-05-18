'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Mock kullanıcı verisi
const mockUser = {
  id: 1,
  firstName: 'Ahmet',
  lastName: 'Yılmaz',
  email: 'ahmet.yilmaz@example.com',
  phone: '0555 123 4567',
  joinDate: '15 Nisan 2023',
  orders: [
    { id: 'ORD-5432', date: '12 Mayıs 2023', status: 'Teslim Edildi', total: 129.90 },
    { id: 'ORD-3254', date: '25 Nisan 2023', status: 'Teslim Edildi', total: 74.50 },
    { id: 'ORD-2187', date: '10 Mart 2023', status: 'Teslim Edildi', total: 148.75 },
  ],
  addresses: [
    { 
      id: 1, 
      title: 'Ev', 
      address: 'Atatürk Mah. Cumhuriyet Cad. No:123 D:5', 
      district: 'Kadıköy', 
      city: 'İstanbul', 
      postalCode: '34700', 
      isDefault: true 
    },
    { 
      id: 2, 
      title: 'İş', 
      address: 'Barbaros Bulvarı No:45 Kat:3', 
      district: 'Beşiktaş', 
      city: 'İstanbul', 
      postalCode: '34353', 
      isDefault: false 
    },
  ],
  favorites: [
    { id: 1, name: 'Karışık Pizza', image: '/images/pizza-1.jpg', price: 89.90 },
    { id: 2, name: 'Sucuklu Pizza', image: '/images/pizza-2.jpg', price: 79.90 },
    { id: 3, name: 'Margarita Pizza', image: '/images/pizza-3.jpg', price: 69.90 },
  ]
};

export default function AccountPage() {
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

  // Sayfa yükleniyor durumu
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
      </div>
    );
  }

  // Kullanıcı bulunamadı durumu
  if (!user) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Kullanıcı Bulunamadı</h1>
        <p className="text-gray-600 mb-6">Hesabınızı görüntülemek için lütfen giriş yapın.</p>
        <Link
          href="/giris"
          className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Giriş Yap
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Hesap Özeti</h1>
      
      {/* Profil Bilgileri */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-semibold text-lg text-gray-800">Profil Bilgileri</h2>
          <Link href="/hesabim/profil" className="text-sm text-red-700 hover:text-red-800 font-medium">
            Düzenle
          </Link>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Ad Soyad</h3>
              <p className="text-gray-800">{user.firstName} {user.lastName}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">E-posta</h3>
              <p className="text-gray-800">{user.email}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Telefon</h3>
              <p className="text-gray-800">{user.phone}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Üyelik Tarihi</h3>
              <p className="text-gray-800">{user.joinDate}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Son Siparişler */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-semibold text-lg text-gray-800">Son Siparişlerim</h2>
          <Link href="/hesabim/siparislerim" className="text-sm text-red-700 hover:text-red-800 font-medium">
            Tümünü Gör
          </Link>
        </div>
        <div className="p-6">
          {user.orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-3 font-medium">Sipariş No</th>
                    <th className="pb-3 font-medium">Tarih</th>
                    <th className="pb-3 font-medium">Durum</th>
                    <th className="pb-3 font-medium text-right">Tutar</th>
                    <th className="pb-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {user.orders.slice(0, 3).map((order) => (
                    <tr key={order.id} className="border-b border-gray-100">
                      <td className="py-4 text-gray-800">{order.id}</td>
                      <td className="py-4 text-gray-800">{order.date}</td>
                      <td className="py-4">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 text-right text-gray-800 font-medium">{order.total.toFixed(2)} TL</td>
                      <td className="py-4 text-right">
                        <Link href={`/hesabim/siparislerim/${order.id}`} className="text-sm text-red-700 hover:text-red-800 font-medium">
                          Detay
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Henüz sipariş vermediniz.</p>
              <Link
                href="/menu"
                className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Menüyü İncele
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Adresler ve Favoriler yan yana */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-semibold text-lg text-gray-800">Adreslerim</h2>
            <Link href="/hesabim/adreslerim" className="text-sm text-red-700 hover:text-red-800 font-medium">
              Düzenle
            </Link>
          </div>
          <div className="p-6">
            {user.addresses.length > 0 ? (
              <div>
                {user.addresses.filter(addr => addr.isDefault).map((address) => (
                  <div key={address.id} className="mb-4 last:mb-0">
                    <div className="flex items-start">
                      <div className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full mr-2 mt-1">
                        {address.title}
                      </div>
                      <div>
                        <p className="text-gray-800">{address.address}</p>
                        <p className="text-gray-600 text-sm">{address.district}, {address.city}, {address.postalCode}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <p className="text-sm text-gray-500 mt-3">
                  Toplam {user.addresses.length} adres kayıtlı
                </p>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 mb-4">Henüz kayıtlı adresiniz yok.</p>
                <Link
                  href="/hesabim/adreslerim"
                  className="text-sm text-red-700 hover:text-red-800 font-medium"
                >
                  Adres Ekle
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Favoriler */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-semibold text-lg text-gray-800">Favorilerim</h2>
            <Link href="/hesabim/favorilerim" className="text-sm text-red-700 hover:text-red-800 font-medium">
              Tümünü Gör
            </Link>
          </div>
          <div className="p-6">
            {user.favorites.length > 0 ? (
              <div className="space-y-4">
                {user.favorites.slice(0, 2).map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4 relative overflow-hidden flex-shrink-0">
                      <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-800 font-medium">{item.name}</h3>
                      <p className="text-red-700 font-medium">{item.price.toFixed(2)} TL</p>
                    </div>
                    <Link
                      href={`/menu/pizzalar/${item.id}`}
                      className="text-sm text-red-700 hover:text-red-800 font-medium"
                    >
                      İncele
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 mb-4">Henüz favori ürününüz yok.</p>
                <Link
                  href="/menu"
                  className="text-sm text-red-700 hover:text-red-800 font-medium"
                >
                  Menüyü İncele
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 