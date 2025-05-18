'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Simüle edilmiş API gecikmesi
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock başarılı işlem - gerçek uygulamada API isteği yapılır
      setSuccess(true);
    } catch (err) {
      setError('İşlem sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
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
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Şifrenizi mi Unuttunuz?</h1>
                <p className="text-gray-600">
                  E-posta adresinizi girin, şifre sıfırlama bağlantısını size gönderelim
                </p>
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

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 p-6 rounded-lg text-center"
                >
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <svg
                      className="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">E-posta Gönderildi</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Şifre sıfırlama bağlantısı <strong>{email}</strong> adresine gönderildi. 
                    Lütfen e-posta kutunuzu kontrol edin.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    E-postayı bulamıyor musunuz? Spam klasörünü kontrol edin veya{' '}
                    <button
                      onClick={handleSubmit}
                      className="text-red-700 hover:text-red-800 font-medium"
                    >
                      tekrar gönderin
                    </button>
                    .
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      E-posta Adresi
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm"
                      placeholder="ornek@email.com"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:bg-red-300 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
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
                      ) : null}
                      {isLoading ? 'İşleniyor...' : 'Şifre Sıfırlama Bağlantısı Gönder'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-center">
              <p className="text-sm text-gray-600">
                <Link href="/giris" className="font-medium text-red-700 hover:text-red-800">
                  Giriş sayfasına dön
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 