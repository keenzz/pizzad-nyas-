'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// Mock kullanıcı verisi
const mockUser = {
  id: 1,
  firstName: 'Ahmet',
  lastName: 'Yılmaz',
  email: 'ahmet.yilmaz@example.com',
  phone: '0555 123 4567',
  joinDate: '15 Nisan 2023',
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<typeof mockUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [error, setError] = useState('');

  // Form durumları
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    // Mock API çağrısı
    const fetchUserData = async () => {
      try {
        // Gerçek bir API çağrısını simüle etmek için timeout kullanıyoruz
        await new Promise(resolve => setTimeout(resolve, 800));
        setUser(mockUser);
        setFormData({
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          email: mockUser.email,
          phone: mockUser.phone,
        });
      } catch (error) {
        console.error('Kullanıcı bilgileri alınamadı:', error);
        setError('Kullanıcı bilgileri yüklenirken bir hata oluştu.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });

    // Şifre kontrolü
    if (name === 'confirmPassword' || name === 'newPassword') {
      if (name === 'confirmPassword' && passwordForm.newPassword !== value) {
        setPasswordError('Şifreler eşleşmiyor.');
      } else if (name === 'newPassword' && passwordForm.confirmPassword && passwordForm.confirmPassword !== value) {
        setPasswordError('Şifreler eşleşmiyor.');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setProfileSaved(false);

    try {
      // Simüle edilmiş API gecikmesi
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock profil güncelleme başarılı
      setUser({ ...user!, ...formData });
      setProfileSaved(true);
      
      // Başarı mesajını 3 saniye sonra kaldır
      setTimeout(() => {
        setProfileSaved(false);
      }, 3000);
    } catch (err) {
      setError('Profil güncelleme sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Şifreler eşleşmiyor.');
      return;
    }

    setIsSaving(true);
    setError('');
    setPasswordSaved(false);

    try {
      // Simüle edilmiş API gecikmesi
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock şifre güncelleme başarılı
      setPasswordSaved(true);
      
      // Başarı mesajını 3 saniye sonra kaldır
      setTimeout(() => {
        setPasswordSaved(false);
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }, 3000);
    } catch (err) {
      setError('Şifre güncelleme sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      console.error(err);
    } finally {
      setIsSaving(false);
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

  // Kullanıcı bulunamadı durumu
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-36 sm:pt-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
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
            <h1 className="text-2xl font-bold text-gray-900">Profil Bilgilerim</h1>
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

          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="font-semibold text-lg text-gray-800">Bilgilerimi Güncelle</h2>
            </div>
            <div className="p-6">
              {profileSaved && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 text-green-800 p-4 rounded-lg mb-6 text-sm flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Profil bilgileriniz başarıyla güncellendi.
                </motion.div>
              )}

              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      Adınız
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Soyadınız
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-posta Adresi
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon Numarası
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:bg-red-300 disabled:cursor-not-allowed"
                  >
                    {isSaving && (
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    )}
                    {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="font-semibold text-lg text-gray-800">Şifre Değiştir</h2>
            </div>
            <div className="p-6">
              {passwordSaved && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 text-green-800 p-4 rounded-lg mb-6 text-sm flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Şifreniz başarıyla güncellendi.
                </motion.div>
              )}

              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mevcut Şifre
                  </label>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Yeni Şifre
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm"
                    required
                    minLength={8}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Şifreniz en az 8 karakter uzunluğunda olmalıdır.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Yeni Şifre Tekrar
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    className={`appearance-none block w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm ${
                      passwordError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    required
                    minLength={8}
                  />
                  {passwordError && (
                    <p className="mt-1 text-xs text-red-600">{passwordError}</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSaving || !!passwordError}
                    className="inline-flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:bg-red-300 disabled:cursor-not-allowed"
                  >
                    {isSaving ? 'Kaydediliyor...' : 'Şifremi Değiştir'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 