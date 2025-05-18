'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  // Popup'ı sayfa yüklendikten sonra göster
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1500); // 1.5 saniye sonra göster

    return () => clearTimeout(timer);
  }, []);

  // WhatsApp bağlantısını oluştur
  const whatsappLink = "https://wa.me/905401001080";

  return (
    <main>
      {/* Demo Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full z-10 overflow-hidden">
            <div className="bg-red-700 text-white p-4">
              <h2 className="text-xl font-bold">Önemli Bilgilendirme</h2>
            </div>
            <div className="p-6">
              <div className="mb-4 text-gray-700">
                <p className="font-medium text-red-700 mb-2">🚧 Demo Sürüm</p>
                <p className="mb-2">Bu site bir demo çalışmasıdır. Gerçek bir restoran ve hizmet bulunmamaktadır.</p>
                
                <p className="font-medium text-red-700 mb-2 mt-4">🖼️ Görseller</p>
                <p className="mb-2">Kullanılan tüm görseller stok fotoğraflardır. Uygun görseller telif hakları gereği nihai sürümde değiştirilecektir.</p>
                
                <p className="font-medium text-red-700 mb-2 mt-4">📋 KVKK ve Yasal Bilgiler</p>
                <p className="mb-2">KVKK ve telif hakları nedeniyle bu sitede yer alan içerikler nihai sürümü temsil etmemektedir.</p>
                
                <p className="font-medium text-red-700 mb-2 mt-4">📱 İletişim</p>
                <p className="mb-2">Daha fazla bilgi ve sorularınız için WhatsApp üzerinden iletişime geçebilirsiniz:</p>
                <a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors mt-2"
                >
                  <svg 
                    className="w-5 h-5 mr-2" 
                    fill="currentColor" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp ile İletişim
                </a>
              </div>
              <div className="flex justify-end mt-6">
                <button 
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-medium transition-colors"
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Lezzetli Pizza"
            fill
            style={{ objectFit: 'cover' }}
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="container mx-auto px-4 z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              En Lezzetli Pizzalar <span className="text-yellow-400">Pizza Dünyası</span>'nda!
            </h1>
            <p className="text-xl mb-8">
              İtalyan usulü, odun ateşinde pişen, taptaze malzemelerle hazırlanan eşsiz pizzaların tadını çıkarın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/menu" 
                className="bg-red-700 text-white px-8 py-4 rounded-full font-bold hover:bg-red-600 transition duration-300 text-center"
              >
                Menüyü Gör
              </Link>
              <Link 
                href="/siparis" 
                className="bg-yellow-500 text-red-900 px-8 py-4 rounded-full font-bold hover:bg-yellow-400 transition duration-300 text-center"
              >
                Hemen Sipariş Ver
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Neden <span className="text-red-700">Pizza Dünyası</span>?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-red-50 rounded-lg shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-700 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Taze Malzemeler</h3>
              <p className="text-gray-600">Her gün taze malzemelerle hazırlanan, sağlıklı ve lezzetli pizzalar.</p>
            </div>
            
            <div className="text-center p-6 bg-red-50 rounded-lg shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-700 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hızlı Teslimat</h3>
              <p className="text-gray-600">30 dakika içinde siparişinizi kapınıza getiriyoruz veya sipariş ücretsiz!</p>
            </div>
            
            <div className="text-center p-6 bg-red-50 rounded-lg shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-700 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Özel Tarifler</h3>
              <p className="text-gray-600">İtalyan ustalardan öğrendiğimiz özel reçetelerle hazırlanan eşsiz lezzetler.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Pizzas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">En Popüler Pizzalarımız</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Müşterilerimizin en çok tercih ettiği pizzalarımızı keşfedin.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-60">
                <Image
                  src="https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Margherita Pizza"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Margherita</h3>
                <p className="text-gray-600 mb-4">
                  Domates sosu, mozzarella peyniri, taze fesleğen yaprakları ve zeytinyağı
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-red-700 font-bold text-xl">99 ₺</span>
                  <Link href="/siparis" className="bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition duration-300">
                    Sipariş Ver
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-60">
                <Image
                  src="https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Pepperoni Pizza"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Pepperoni</h3>
                <p className="text-gray-600 mb-4">
                  Domates sosu, mozzarella peyniri ve dilimlenmiş pepperoni
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-red-700 font-bold text-xl">109 ₺</span>
                  <Link href="/siparis" className="bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition duration-300">
                    Sipariş Ver
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-60">
                <Image
                  src="https://images.pexels.com/photos/2909822/pexels-photo-2909822.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Vejetaryen Pizza"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Vejetaryen</h3>
                <p className="text-gray-600 mb-4">
                  Domates sosu, mozzarella, biber, mantar, soğan, mısır ve zeytin
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-red-700 font-bold text-xl">119 ₺</span>
                  <Link href="/siparis" className="bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition duration-300">
                    Sipariş Ver
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/menu" className="inline-block bg-yellow-500 text-red-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition duration-300">
              Tüm Menüyü Gör
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-red-700 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Müşterilerimiz Ne Diyor?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-red-800 p-6 rounded-lg">
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <svg className="w-8 h-8 text-yellow-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                  </svg>
                  <p className="mb-4">
                    "Hayatımda yediğim en lezzetli pizza! Hamuru tam kıvamında, malzemeleri taptaze. Favorim kesinlikle Pepperoni!"
                  </p>
                </div>
                <div>
                  <p className="font-bold">Ahmet Yılmaz</p>
                  <p className="text-sm text-red-300">İstanbul</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-800 p-6 rounded-lg">
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <svg className="w-8 h-8 text-yellow-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                  </svg>
                  <p className="mb-4">
                    "Siparişim söz verildiği gibi 30 dakika içinde geldi ve pizzalar hala sıcaktı! Hizmet ve lezzet muhteşem."
                  </p>
                </div>
                <div>
                  <p className="font-bold">Zeynep Kaya</p>
                  <p className="text-sm text-red-300">Ankara</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-800 p-6 rounded-lg">
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <svg className="w-8 h-8 text-yellow-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                  </svg>
                  <p className="mb-4">
                    "Vejetaryen seçenekleri çok lezzetli! Özellikle mantar ve peynirli pizza harika. Kesinlikle tavsiye ederim."
                  </p>
                </div>
                <div>
                  <p className="font-bold">Burak Şahin</p>
                  <p className="text-sm text-red-300">İzmir</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-yellow-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-red-900 mb-6">Acıktınız mı?</h2>
          <p className="text-red-900 text-xl mb-8 max-w-2xl mx-auto">
            Hemen sipariş verin, lezzetli pizzanız 30 dakika içinde kapınızda olsun!
          </p>
          <Link 
            href="/siparis" 
            className="inline-block bg-red-700 text-white px-8 py-4 rounded-full font-bold hover:bg-red-600 transition duration-300 text-lg"
          >
            Şimdi Sipariş Ver
          </Link>
        </div>
      </section>
    </main>
  );
}
