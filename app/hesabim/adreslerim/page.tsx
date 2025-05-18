'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Mock adres verileri
const mockAddresses = [
  {
    id: '1',
    name: 'Ev',
    fullAddress: 'Atatürk Mah. Cumhuriyet Cad. No:123 D:5',
    district: 'Kadıköy',
    city: 'İstanbul',
    postalCode: '34000',
    phone: '0555 123 4567',
    isDefault: true,
  },
  {
    id: '2',
    name: 'İş',
    fullAddress: 'Barbaros Bulvarı No:45 Kat:3',
    district: 'Beşiktaş',
    city: 'İstanbul',
    postalCode: '34353',
    phone: '0555 765 4321',
    isDefault: false,
  },
];

type Address = {
  id: string;
  name: string;
  fullAddress: string;
  district: string;
  city: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
};

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Address, 'id'>>({
    name: '',
    fullAddress: '',
    district: '',
    city: '',
    postalCode: '',
    phone: '',
    isDefault: false,
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Mock API çağrısı
    const fetchAddresses = async () => {
      try {
        // Gerçek bir API çağrısını simüle etmek için timeout kullanıyoruz
        await new Promise(resolve => setTimeout(resolve, 800));
        setAddresses(mockAddresses);
      } catch (error) {
        console.error('Adresler yüklenemedi:', error);
        setError('Adresleriniz yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      fullAddress: '',
      district: '',
      city: '',
      postalCode: '',
      phone: '',
      isDefault: false,
    });
    setEditingAddressId(null);
    setShowAddForm(false);
    setFormError('');
  };

  const handleAddNewClick = () => {
    resetForm();
    setShowAddForm(true);
  };

  const handleEditAddress = (address: Address) => {
    setFormData(address);
    setEditingAddressId(address.id);
    setShowAddForm(true);
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (!window.confirm('Bu adresi silmek istediğinize emin misiniz?')) return;
    
    try {
      // Mock API çağrısı
      await new Promise(resolve => setTimeout(resolve, 500));
      setAddresses(addresses.filter(address => address.id !== addressId));
      
      // Başarı mesajını göster
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error('Adres silinemedi:', error);
      setError('Adres silinirken bir hata oluştu.');
    }
  };

  const handleSetDefault = async (addressId: string) => {
    try {
      // Mock API çağrısı
      await new Promise(resolve => setTimeout(resolve, 500));
      setAddresses(
        addresses.map(address => ({
          ...address,
          isDefault: address.id === addressId,
        }))
      );
      
      // Başarı mesajını göster
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error('Varsayılan adres değiştirilemedi:', error);
      setError('Varsayılan adres değiştirilirken bir hata oluştu.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');

    // Basit form doğrulama
    if (!formData.name || !formData.fullAddress || !formData.district || !formData.city || !formData.phone) {
      setFormError('Lütfen tüm zorunlu alanları doldurun.');
      setFormSubmitting(false);
      return;
    }

    try {
      // Mock API çağrısı
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (editingAddressId) {
        // Adres güncelleme
        setAddresses(
          addresses.map(address => 
            address.id === editingAddressId 
              ? { ...formData, id: editingAddressId } 
              : formData.isDefault 
                ? { ...address, isDefault: false } 
                : address
          )
        );
      } else {
        // Yeni adres ekleme
        const newId = Math.random().toString(36).substring(2, 9);
        const newAddress = { ...formData, id: newId };
        
        // Eğer yeni adres varsayılan olarak işaretlendiyse, diğer adresleri varsayılan olmaktan çıkar
        if (newAddress.isDefault) {
          setAddresses(addresses.map(address => ({ ...address, isDefault: false })).concat(newAddress));
        } else {
          setAddresses([...addresses, newAddress]);
        }
      }

      resetForm();
      
      // Başarı mesajını göster
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error('Form gönderilirken hata oluştu:', error);
      setFormError('İşlem sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setFormSubmitting(false);
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
          {/* Başlık ve Geri Dön butonu */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Adreslerim</h1>
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
              İşlem başarıyla tamamlandı.
            </motion.div>
          )}

          {/* Adresler listesi */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-semibold text-lg text-gray-800">Kayıtlı Adreslerim</h2>
              <button
                onClick={handleAddNewClick}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Yeni Adres Ekle
              </button>
            </div>
            
            {addresses.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {addresses.map((address) => (
                  <div key={address.id} className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div className="mb-4 sm:mb-0">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-gray-900">{address.name}</h3>
                          {address.isDefault && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                              Varsayılan
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{address.fullAddress}</p>
                        <p className="text-sm text-gray-600">
                          {address.district}, {address.city} {address.postalCode}
                        </p>
                        <p className="mt-1 text-sm text-gray-600">{address.phone}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleEditAddress(address)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <svg className="-ml-1 mr-1 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                          </svg>
                          Düzenle
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <svg className="-ml-1 mr-1 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                          Sil
                        </button>
                        {!address.isDefault && (
                          <button
                            onClick={() => handleSetDefault(address.id)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <svg className="-ml-1 mr-1 h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Varsayılan Yap
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Henüz adres eklemediniz</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Sipariş verebilmek için adres eklemelisiniz.
                </p>
                <div className="mt-6">
                  <button
                    onClick={handleAddNewClick}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Yeni Adres Ekle
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Adres ekleme/düzenleme formu */}
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden mb-6"
            >
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="font-semibold text-lg text-gray-800">
                  {editingAddressId ? 'Adres Düzenle' : 'Yeni Adres Ekle'}
                </h2>
              </div>
              <div className="p-6">
                {formError && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Adres Başlığı*
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Örn: Ev, İş, Yazlık"
                          className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="fullAddress" className="block text-sm font-medium text-gray-700">
                        Açık Adres*
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="fullAddress"
                          name="fullAddress"
                          rows={3}
                          value={formData.fullAddress}
                          onChange={handleInputChange}
                          placeholder="Mahalle, Sokak, Bina No, Daire No"
                          className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                        İlçe*
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="district"
                          id="district"
                          value={formData.district}
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        Şehir*
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                        Posta Kodu
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="postalCode"
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Telefon Numarası*
                      </label>
                      <div className="mt-1">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="0555 123 4567"
                          className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="isDefault"
                            name="isDefault"
                            type="checkbox"
                            checked={formData.isDefault}
                            onChange={handleInputChange}
                            className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="isDefault" className="font-medium text-gray-700">
                            Varsayılan adres olarak ayarla
                          </label>
                          <p className="text-gray-500">Bu adres siparişlerinizde otomatik olarak seçilecektir.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                        formSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {formSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          İşleniyor...
                        </>
                      ) : editingAddressId ? (
                        'Adresi Güncelle'
                      ) : (
                        'Adresi Kaydet'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 