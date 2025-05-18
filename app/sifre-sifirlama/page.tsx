'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

// SearchParams'ı alan bir client komponenti
function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Token validasyonu - gerçek uygulamada API'den kontrol edilir
  useEffect(() => {
    if (!token) {
      setError('Geçersiz veya eksik şifre sıfırlama bağlantısı. Lütfen yeni bir şifre sıfırlama bağlantısı talep edin.');
    }
  }, [token]);

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
    
    if (confirmPassword && newPassword !== confirmPassword) {
      setPasswordError('Şifreler eşleşmiyor.');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmValue = e.target.value;
    setConfirmPassword(confirmValue);
    
    if (password && confirmValue && password !== confirmValue) {
      setPasswordError('Şifreler eşleşmiyor.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setPasswordError('Şifreler eşleşmiyor.');
      return;
    }
    
    if (passwordStrength < 3) {
      setError('Lütfen daha güçlü bir şifre belirleyin.');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      // Simüle edilmiş API gecikmesi
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock başarılı şifre değişimi
      setSuccess(true);
      
      // 3 saniye sonra giriş sayfasına yönlendir
      setTimeout(() => {
        router.push('/giris');
      }, 3000);
    } catch (err) {
      setError('Şifre sıfırlama işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-200';
    if (passwordStrength === 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-yellow-500';
    if (passwordStrength === 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (!password) return '';
    if (passwordStrength === 1) return 'Zayıf';
    if (passwordStrength === 2) return 'Orta';
    if (passwordStrength === 3) return 'İyi';
    if (passwordStrength === 4) return 'Güçlü';
    return '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Yeni Şifre Oluştur</h1>
          <p className="text-gray-600">
            Hesabınız için güçlü bir şifre belirleyin
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

        {!token && !error && (
          <div className="bg-yellow-50 text-yellow-800 p-3 rounded-lg mb-6 text-sm">
            Geçersiz şifre sıfırlama bağlantısı. Lütfen{' '}
            <Link href="/sifremi-unuttum" className="font-medium underline">
              yeni bir şifre sıfırlama talebi oluşturun
            </Link>
            .
          </div>
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">Şifreniz Başarıyla Güncellendi</h3>
            <p className="text-sm text-gray-600 mb-4">
              Yeni şifreniz başarıyla kaydedildi. Birkaç saniye içinde giriş sayfasına yönlendirileceksiniz.
            </p>
            <Link
              href="/giris"
              className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Giriş Yap
            </Link>
          </motion.div>
        ) : (
          token && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Yeni Şifre
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm"
                  placeholder="En az 8 karakter"
                />
                
                {password && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${getStrengthColor()}`}
                          style={{ width: `${(passwordStrength / 4) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 w-14">{getStrengthText()}</span>
                    </div>
                    <ul className="mt-2 text-xs space-y-1 text-gray-500">
                      <li className={password.length >= 8 ? 'text-green-600' : ''}>
                        • En az 8 karakter
                      </li>
                      <li className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>
                        • En az bir büyük harf
                      </li>
                      <li className={/[0-9]/.test(password) ? 'text-green-600' : ''}>
                        • En az bir rakam
                      </li>
                      <li className={/[^A-Za-z0-9]/.test(password) ? 'text-green-600' : ''}>
                        • En az bir özel karakter
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Şifre Tekrar
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={`appearance-none block w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm ${
                    passwordError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Şifrenizi tekrar girin"
                />
                {passwordError && (
                  <p className="mt-1 text-xs text-red-600">{passwordError}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading || !!passwordError || passwordStrength < 3}
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
                  {isLoading ? 'İşleniyor...' : 'Şifremi Güncelle'}
                </button>
              </div>
            </form>
          )
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
  );
}

// Loading durumu için fallback komponenti
function LoadingForm() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

// Ana sayfa komponenti
export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-36 sm:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <Suspense fallback={<LoadingForm />}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
} 