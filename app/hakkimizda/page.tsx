import Image from 'next/image';

export const metadata = {
  title: 'Hakkımızda | Pizza Dünyası',
  description: 'Pizza Dünyası\'nın hikayesi, misyonu ve vizyonu hakkında bilgi edinin.',
};

export default function AboutPage() {
  return (
    <main className="pt-8 pb-16">
      {/* About Hero */}
      <section className="bg-red-700 text-white py-12 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hakkımızda</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Pizza Dünyası olarak, yıllardır İtalyan mutfağının eşsiz lezzetlerini sofranıza taşıyoruz.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Hikayemiz</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Pizza Dünyası, 2005 yılında İtalya'da pizza yapımı eğitimi alan şef Ali Kaya tarafından kuruldu. İtalyan ustalardan öğrendiği geleneksel tarifleri, Türk damak tadına uygun hale getirerek benzersiz lezzetler yaratmayı başardı.
                </p>
                <p>
                  İlk şubemizi İstanbul Kadıköy'de açtık ve kısa sürede müşterilerimizin beğenisini kazandık. Zamanla büyüyerek İstanbul'un farklı semtlerinde ve Türkiye'nin birçok şehrinde şubeler açtık.
                </p>
                <p>
                  Bugün, Pizza Dünyası olarak 20'den fazla şubemizle her gün binlerce müşterimize hizmet veriyoruz. Hiçbir zaman kaliteden ödün vermeden, en taze malzemelerle, özenle hazırlanan İtalyan pizzalarını sevdiklerinizle paylaşmanızı sağlıyoruz.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="https://images.pexels.com/photos/2233348/pexels-photo-2233348.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="Pizza Dünyası'nın Hikayesi"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Değerlerimiz</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-700 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Kalite</h3>
              <p className="text-gray-600">
                En kaliteli ve taze malzemeleri kullanarak, her zaman en iyi pizzaları sunuyoruz. Kalite standartlarımızdan asla taviz vermiyoruz.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-700 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Uygun Fiyat</h3>
              <p className="text-gray-600">
                Herkesin kaliteli ve lezzetli pizzalara erişebilmesi için makul fiyatlandırma politikası uyguluyoruz.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-700 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Müşteri Memnuniyeti</h3>
              <p className="text-gray-600">
                Müşterilerimizin memnuniyeti bizim için her şeyden önemlidir. Sizden gelen her türlü geri bildirimi değerlendirerek kendimizi sürekli geliştiriyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section id="misyon" className="py-12 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-red-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-red-700">Misyonumuz</h2>
              <p className="text-gray-700 mb-4">
                Geleneksel İtalyan pizza yapım teknikleri ile modern yaklaşımları birleştirerek, en kaliteli malzemelerle hazırlanan pizzaları müşterilerimize sunmak ve pizza deneyimini bir üst seviyeye taşımak.
              </p>
              <p className="text-gray-700">
                Her bir müşterimize, İtalya'nın eşsiz pizza kültürünü ve lezzetini en iyi şekilde yaşatmak için çalışıyoruz.
              </p>
            </div>
            
            <div className="bg-red-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-red-700">Vizyonumuz</h2>
              <p className="text-gray-700 mb-4">
                Türkiye'nin pizza sektöründe öncü ve lider konumuna ulaşarak, uluslararası alanda da tanınan bir marka olmak.
              </p>
              <p className="text-gray-700">
                İnovatif yaklaşımlarla pizza sektörüne yeni soluk getirirken, geleneksel İtalyan lezzetlerinden ödün vermeden büyümeye devam etmek.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Ekibimiz</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-80">
                <Image
                  src="https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Şef Ali Kaya"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold">Ali Kaya</h3>
                <p className="text-red-700 mb-3">Kurucu ve Baş Şef</p>
                <p className="text-gray-600">
                  İtalya'da eğitim almış, 20 yılı aşkın tecrübesiyle Pizza Dünyası'nın kurucusu ve şefi.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-80">
                <Image
                  src="https://images.pexels.com/photos/3298687/pexels-photo-3298687.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Şef Ayşe Demir"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold">Ayşe Demir</h3>
                <p className="text-red-700 mb-3">Pizza Şefi</p>
                <p className="text-gray-600">
                  Napoli'de eğitim almış, geleneksel İtalyan pizzalarının uzmanı.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-80">
                <Image
                  src="https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Şef Mehmet Öz"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold">Mehmet Öz</h3>
                <p className="text-red-700 mb-3">Pastane Şefi</p>
                <p className="text-gray-600">
                  Fransız mutfağında eğitim almış, tatlı menümüzün yaratıcısı.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 