'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Şifre kontrolü
    if (name === 'password' || name === 'confirmPassword') {
      if (name === 'confirmPassword' && formData.password !== value) {
        setPasswordError('Şifreler eşleşmiyor.');
      } else if (name === 'password' && formData.confirmPassword && formData.confirmPassword !== value) {
        setPasswordError('Şifreler eşleşmiyor.');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validasyonu
    if (!agreedToTerms) {
      setError('Devam etmek için kullanım şartlarını ve gizlilik politikasını kabul etmelisiniz.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Şifreler eşleşmiyor.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simüle edilmiş API gecikmesi
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock kayıt işlemi başarılı
      // Gerçek uygulamada API isteği yapılır
      window.location.href = '/kayit-basarili';
    } catch (err) {
      setError('Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-36 sm:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="px-6 py-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Hesap Oluştur</h1>
                <p className="text-gray-600">Pizza Dünyası ailesine katılın ve özel fırsatlardan yararlanın</p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      Adınız
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm"
                      placeholder="Adınız"
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
                      autoComplete="family-name"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm"
                      placeholder="Soyadınız"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-posta Adresi
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm"
                    placeholder="ornek@email.com"
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
                    autoComplete="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm"
                    placeholder="5XX XXX XX XX"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Şifre
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm"
                    placeholder="En az 8 karakter"
                  />
                  <p className="mt-1 text-xs text-gray-500">Şifreniz en az 8 karakter uzunluğunda olmalıdır.</p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Şifre Tekrar
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm ${
                      passwordError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Şifrenizi tekrar girin"
                  />
                  {passwordError && (
                    <p className="mt-1 text-xs text-red-600">{passwordError}</p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    id="terms-agreement"
                    name="terms-agreement"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms-agreement" className="ml-2 block text-sm text-gray-700">
                    <span>
                      <Link href="/kullanim-kosullari" className="text-red-700 hover:text-red-800">
                        Kullanım Koşulları
                      </Link>{' '}
                      ve{' '}
                      <Link href="/gizlilik-politikasi" className="text-red-700 hover:text-red-800">
                        Gizlilik Politikası
                      </Link>
                      &apos;nı okudum ve kabul ediyorum.
                    </span>
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading || !!passwordError}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:bg-red-300 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : null}
                    {isLoading ? 'Kaydınız Yapılıyor...' : 'Hesap Oluştur'}
                  </button>
                </div>
              </form>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Veya şununla kaydolun</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg className="h-5 w-5 mr-2" fill="#4285F4" viewBox="0 0 24 24">
                      <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.798-1.677-4.198-2.701-6.735-2.701-5.539 0-10.036 4.497-10.036 10.036s4.497 10.036 10.036 10.036c8.358 0 10.261-7.826 9.428-11.789h-9.428z"></path>
                    </svg>
                    <span>Google</span>
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg className="h-5 w-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"></path>
                    </svg>
                    <span>Facebook</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-center">
              <p className="text-sm text-gray-600">
                Zaten hesabınız var mı?{' '}
                <Link href="/giris" className="font-medium text-red-700 hover:text-red-800">
                  Giriş Yapın
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 