'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Mock sepet özeti
const mockCartSummary = {
  items: [
    { id: 'p1', name: 'Karışık Pizza (Orta)', quantity: 1, price: 89.90, extras: ['Ekstra Peynir', 'Acı Sos'] },
    { id: 'p3', name: 'Margarita Pizza (Küçük)', quantity: 2, price: 69.90, extras: [] }
  ],
  subtotal: 229.70,
  deliveryFee: 0,
  discount: 0,
  total: 229.70
};

// Mock adresler
const mockAddresses = [
  { 
    id: 1, 
    title: 'Ev', 
    fullName: 'Ahmet Yılmaz',
    address: 'Atatürk Mah. Cumhuriyet Cad. No:123 D:5', 
    district: 'Kadıköy', 
    city: 'İstanbul', 
    postalCode: '34700',
    phone: '0555 123 4567',
    isDefault: true 
  },
  { 
    id: 2, 
    title: 'İş', 
    fullName: 'Ahmet Yılmaz',
    address: 'Barbaros Bulvarı No:45 Kat:3', 
    district: 'Beşiktaş', 
    city: 'İstanbul', 
    postalCode: '34353',
    phone: '0555 123 4567',
    isDefault: false 
  }
];

// Sipariş sayfası bileşeni
export default function CheckoutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [cartSummary, setCartSummary] = useState(mockCartSummary);
  const [addresses, setAddresses] = useState(mockAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [deliveryTime, setDeliveryTime] = useState<'asap' | 'scheduled'>('asap');
  const [scheduledTime, setScheduledTime] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [isNewAddress, setIsNewAddress] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  // Form state
  const [newAddress, setNewAddress] = useState({
    title: '',
    fullName: '',
    address: '',
    district: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  // Kart bilgileri
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  // Sayfa yüklendiğinde
  useEffect(() => {
    const loadCheckoutData = async () => {
      try {
        // Mock API çağrısı - gerçekte sepet ve adres verileri burada alınır
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Varsayılan adresi seç
        const defaultAddress = addresses.find(addr => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id);
        } else if (addresses.length > 0) {
          setSelectedAddressId(addresses[0].id);
        }
      } catch (error) {
        console.error('Veriler yüklenirken hata oluştu:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCheckoutData();
  }, [addresses]);

  // Yeni adres formunu güncelle
  const handleNewAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  // Kart bilgilerini güncelle
  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Kart numarası formatlama (4 haneli gruplar)
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .substring(0, 19); // 16 digit + 3 spaces
      
      setCardInfo(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    // Son kullanma tarihi formatlama (MM/YY)
    if (name === 'expiryDate') {
      const formattedValue = value
        .replace(/\//g, '')
        .replace(/(\d{2})(\d{0,2})/, '$1/$2')
        .substring(0, 5); // MM/YY
      
      setCardInfo(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    // CVV sadece 3 veya 4 haneli rakamlar
    if (name === 'cvv') {
      const formattedValue = value.substring(0, 4);
      setCardInfo(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    setCardInfo(prev => ({ ...prev, [name]: value }));
  };

  // Yeni adres ekle
  const handleAddNewAddress = () => {
    // Form doğrulama kontrolü yapılabilir
    const newAddressObj = {
      ...newAddress, 
      id: addresses.length + 1,
      isDefault: addresses.length === 0
    };
    
    setAddresses(prev => [...prev, newAddressObj as any]);
    setSelectedAddressId(newAddressObj.id);
    setIsNewAddress(false);
  };

  // Sipariş tamamla
  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      alert('Lütfen teslimat adresi seçin');
      return;
    }

    setIsProcessing(true);

    try {
      // Mock API çağrısı - gerçekte burada sipariş oluşturma API'si çağrılır
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Başarılı sipariş
      setOrderComplete(true);
      setOrderNumber(`ORD-${Math.floor(10000 + Math.random() * 90000)}`);
    } catch (error) {
      console.error('Sipariş oluşturulurken hata:', error);
      alert('Sipariş oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsProcessing(false);
    }
  };

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

  // Sipariş tamamlandı durumu
  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 pt-36 sm:pt-32 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Siparişiniz Alındı!</h2>
            <p className="text-gray-600 mb-2">Sipariş Numaranız: <span className="font-medium text-gray-800">{orderNumber}</span></p>
            <p className="text-gray-600 mb-8">Siparişiniz hazırlanıyor. Durumunu hesabınızdan takip edebilirsiniz.</p>
            
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
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 pt-36 sm:pt-32 pb-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Siparişi Tamamla</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Taraf - Formlar */}
          <div className="lg:col-span-2">
            {/* Teslimat Adresi */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Teslimat Adresi</h2>
              
              {!isNewAddress ? (
                // Kayıtlı adresler
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {addresses.map(address => (
                      <div
                        key={address.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedAddressId === address.id 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-gray-200 hover:border-red-300'
                        }`}
                        onClick={() => setSelectedAddressId(address.id)}
                      >
                        <div className="flex items-start">
                          <input
                            type="radio"
                            checked={selectedAddressId === address.id}
                            onChange={() => setSelectedAddressId(address.id)}
                            className="mt-1 h-4 w-4 text-red-700 focus:ring-red-700 border-gray-300"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between">
                              <h3 className="text-gray-800 font-medium">
                                {address.title}
                                {address.isDefault && (
                                  <span className="ml-2 text-xs bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full">
                                    Varsayılan
                                  </span>
                                )}
                              </h3>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{address.fullName}</p>
                            <p className="text-sm text-gray-600 mt-1">{address.address}</p>
                            <p className="text-sm text-gray-600">{address.district}, {address.city}, {address.postalCode}</p>
                            <p className="text-sm text-gray-600 mt-1">{address.phone}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setIsNewAddress(true)}
                    className="text-red-700 hover:text-red-800 text-sm font-medium flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Yeni Adres Ekle
                  </button>
                </div>
              ) : (
                // Yeni adres formu
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adres Başlığı</label>
                      <input 
                        type="text" 
                        name="title"
                        value={newAddress.title}
                        onChange={handleNewAddressChange}
                        placeholder="Örn: Ev, İş"
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                      <input 
                        type="text" 
                        name="fullName"
                        value={newAddress.fullName}
                        onChange={handleNewAddressChange}
                        placeholder="Ad Soyad"
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                      <input 
                        type="text" 
                        name="address"
                        value={newAddress.address}
                        onChange={handleNewAddressChange}
                        placeholder="Sokak, Apartman, Daire No"
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">İlçe</label>
                      <input 
                        type="text" 
                        name="district"
                        value={newAddress.district}
                        onChange={handleNewAddressChange}
                        placeholder="İlçe"
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Şehir</label>
                      <input 
                        type="text" 
                        name="city"
                        value={newAddress.city}
                        onChange={handleNewAddressChange}
                        placeholder="Şehir"
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Posta Kodu</label>
                      <input 
                        type="text" 
                        name="postalCode"
                        value={newAddress.postalCode}
                        onChange={handleNewAddressChange}
                        placeholder="Posta Kodu"
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={newAddress.phone}
                        onChange={handleNewAddressChange}
                        placeholder="0555 123 4567"
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={handleAddNewAddress}
                      className="bg-red-700 hover:bg-red-800 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Adresi Kaydet
                    </button>
                    <button
                      onClick={() => setIsNewAddress(false)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      İptal
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Ödeme Bilgileri */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Ödeme Yöntemi</h2>
              
              <div className="space-y-4 mb-6">
                {/* Kredi Kartı Seçeneği */}
                <div>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-1 h-4 w-4 text-red-700 focus:ring-red-700 border-gray-300"
                    />
                    <div className="ml-3">
                      <span className="block text-gray-800 font-medium">Kredi/Banka Kartı</span>
                      <span className="block text-sm text-gray-500">Güvenli ödeme işlemi</span>
                    </div>
                  </label>
                  
                  {paymentMethod === 'card' && (
                    <div className="mt-4 pl-7">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Kart Numarası</label>
                          <input 
                            type="text" 
                            name="cardNumber"
                            value={cardInfo.cardNumber}
                            onChange={handleCardInfoChange}
                            placeholder="1234 5678 9012 3456"
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Kart Üzerindeki İsim</label>
                          <input 
                            type="text" 
                            name="cardHolder"
                            value={cardInfo.cardHolder}
                            onChange={handleCardInfoChange}
                            placeholder="AD SOYAD"
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Son Kullanma Tarihi</label>
                          <input 
                            type="text" 
                            name="expiryDate"
                            value={cardInfo.expiryDate}
                            onChange={handleCardInfoChange}
                            placeholder="MM/YY"
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                          <input 
                            type="text" 
                            name="cvv"
                            value={cardInfo.cvv}
                            onChange={handleCardInfoChange}
                            placeholder="123"
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-2">
                        Kredi kartı bilgileriniz güvenli bir şekilde işlenir. Kart bilgileriniz saklanmaz.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Kapıda Ödeme Seçeneği */}
                <div>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                      className="mt-1 h-4 w-4 text-red-700 focus:ring-red-700 border-gray-300"
                    />
                    <div className="ml-3">
                      <span className="block text-gray-800 font-medium">Kapıda Ödeme (Nakit)</span>
                      <span className="block text-sm text-gray-500">Teslimat sırasında nakit ödeme</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Teslimat Zamanı */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Teslimat Zamanı</h2>
              
              <div className="space-y-4 mb-4">
                <div>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryTime"
                      checked={deliveryTime === 'asap'}
                      onChange={() => setDeliveryTime('asap')}
                      className="mt-1 h-4 w-4 text-red-700 focus:ring-red-700 border-gray-300"
                    />
                    <div className="ml-3">
                      <span className="block text-gray-800 font-medium">En Kısa Sürede</span>
                      <span className="block text-sm text-gray-500">Tahmini teslimat: 30-45 dakika</span>
                    </div>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryTime"
                      checked={deliveryTime === 'scheduled'}
                      onChange={() => setDeliveryTime('scheduled')}
                      className="mt-1 h-4 w-4 text-red-700 focus:ring-red-700 border-gray-300"
                    />
                    <div className="ml-3">
                      <span className="block text-gray-800 font-medium">İleri Tarih/Saat</span>
                      <span className="block text-sm text-gray-500">İstediğiniz bir zamanda teslim</span>
                    </div>
                  </label>
                  
                  {deliveryTime === 'scheduled' && (
                    <div className="mt-3 pl-7">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tarih ve Saat Seçin</label>
                      <input 
                        type="datetime-local" 
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        min={new Date().toISOString().slice(0, 16)}
                        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Sipariş Notu */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sipariş Notu</h2>
              
              <textarea
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Teslimat için özel talimatlar, kapı kodu vb."
                rows={3}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              ></textarea>
            </div>
          </div>

          {/* Sağ Taraf - Sipariş Özeti */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sipariş Özeti</h2>
              
              {/* Ürün Listesi */}
              <div className="mb-4">
                <div className="divide-y divide-gray-200">
                  {cartSummary.items.map((item, index) => (
                    <div key={index} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex justify-between">
                        <span className="text-gray-800">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium">{(item.price * item.quantity).toFixed(2)} TL</span>
                      </div>
                      {item.extras.length > 0 && (
                        <div className="mt-1">
                          <p className="text-xs text-gray-500">
                            Ekstralar: {item.extras.join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="h-px bg-gray-200 my-4"></div>
              
              {/* Fiyat Detayları */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ara Toplam:</span>
                  <span className="font-medium">{cartSummary.subtotal.toFixed(2)} TL</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Teslimat Ücreti:</span>
                  <span className="font-medium">
                    {cartSummary.deliveryFee === 0 ? 'Ücretsiz' : `${cartSummary.deliveryFee.toFixed(2)} TL`}
                  </span>
                </div>
                
                {cartSummary.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>İndirim:</span>
                    <span className="font-medium">-{cartSummary.discount.toFixed(2)} TL</span>
                  </div>
                )}
              </div>
              
              <div className="h-px bg-gray-200 my-4"></div>
              
              {/* Toplam */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium text-gray-800">Toplam:</span>
                <span className="text-xl font-bold text-red-700">{cartSummary.total.toFixed(2)} TL</span>
              </div>
              
              {/* Sipariş Ver Butonu */}
              <button 
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className={`w-full ${
                  isProcessing ? 'bg-gray-400' : 'bg-red-700 hover:bg-red-800'
                } text-white font-medium py-3 px-4 rounded-lg transition-colors text-center flex items-center justify-center`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    İşleniyor...
                  </>
                ) : (
                  'Siparişi Tamamla'
                )}
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                "Siparişi Tamamla" butonuna tıklayarak hizmet şartlarını kabul etmiş olursunuz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 