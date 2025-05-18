# Pizza Dünyası 🍕

Pizza Dünyası, modern ve kullanıcı dostu bir pizza sipariş ve yemek teslimat web uygulamasıdır. Next.js, React ve TailwindCSS ile geliştirilmiş bu platform, müşterilerin pizza ve diğer lezzetleri kolayca sipariş etmelerini sağlar.

## 🌐 Canlı Demo

Uygulamanın canlı versiyonunu görmek için [buraya tıklayın](https://restoran-roan.vercel.app/).

## ✨ Özellikler

- **Responsive Tasarım**: Mobil, tablet ve masaüstü cihazlarda mükemmel görünüm
- **Kullanıcı Hesabı Yönetimi**:
  - Kayıt ve giriş sayfaları
  - Şifre sıfırlama
  - Profil düzenleme
- **Menü Sistemi**:
  - Kategorilere ayrılmış menü (pizzalar, yan ürünler, içecekler, tatlılar)
  - Detaylı ürün sayfaları
  - Ürün özelleştirme (boyut seçimi, ekstra malzemeler)
- **Sipariş İşlemleri**:
  - Sepet yönetimi
  - Adres ve teslimat bilgileri
  - Ödeme seçenekleri
  - Sipariş takibi
- **Kullanıcı Paneli**:
  - Sipariş geçmişi
  - Adres yönetimi
  - Favori ürünler

## 🛠️ Kullanılan Teknolojiler

- **Frontend**:
  - [Next.js 15](https://nextjs.org/)
  - [React](https://reactjs.org/)
  - [TailwindCSS](https://tailwindcss.com/)
  - [Framer Motion](https://www.framer.com/motion/)
- **Deployment**:
  - [Vercel](https://vercel.com/)
- **Version Control**:
  - [Git](https://git-scm.com/)
  - [GitHub](https://github.com/)

## 🚀 Başlangıç

Bu proje şu an demo amaçlı hazırlanmış ve gerçek bir backend API'ye bağlı değildir. Tüm veriler istemci tarafında simüle edilmektedir.

### Kurulum

1. Repoyu klonlayın:
   ```bash
   git clone https://github.com/keenzz/pizzamia.git
   cd pizzamia
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

4. Tarayıcınızda şu adresi açın: `http://localhost:3000`

### Demo Giriş Bilgileri

Web uygulamasında oturum açmak için şu bilgileri kullanabilirsiniz:
- **E-posta**: test@example.com
- **Şifre**: password

## 📋 Proje Yapısı

```
pizzamia/
├── app/                  # Next.js App Router yapılandırması
│   ├── components/       # Paylaşılan UI bileşenleri
│   ├── giris/            # Giriş sayfası
│   ├── hesabim/          # Kullanıcı hesap yönetimi sayfaları
│   ├── menu/             # Menü sayfası
│   ├── siparis/          # Sipariş ve ödeme sayfaları
│   ├── urun/             # Ürün detay sayfaları
│   └── ...
├── public/               # Statik dosyalar
└── ...
```

## 🧪 Uygulamayı Test Etme

Uygulama şu özellikleri test etmenize olanak tanır:
1. Menüyü görüntüleme ve ürün detaylarına bakma
2. Sepete ürün ekleme ve sepet yönetimi
3. Demo hesap ile giriş yapma
4. Sipariş oluşturma süreci
5. Hesap yönetimi (adresler, geçmiş siparişler, favoriler)

## 🔍 Notlar

- Bu uygulama tamamen eğitim ve demo amaçlıdır.
- Görseller stok fotoğraf sitelerinden alınmıştır.
- Uygulama gerçek bir ödeme sistemi içermemektedir.
- Gerçek bir backend API'ye bağlı değildir, tüm veriler istemci tarafında simüle edilmektedir.

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır. 