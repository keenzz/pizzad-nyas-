import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingAnimation from "./components/LoadingAnimation";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from 'react-hot-toast';

// Font tanımlamaları
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#b91c1c'
};

export const metadata: Metadata = {
  title: {
    default: "Pizza Dünyası | En Lezzetli İtalyan Pizzaları",
    template: "%s | Pizza Dünyası"
  },
  description: "En lezzetli İtalyan pizzaları, taptaze malzemeler ve hızlı teslimat seçenekleriyle Pizza Dünyası'nda sizi bekliyor.",
  keywords: ["pizza", "italian pizza", "food delivery", "restaurant", "takeaway", "pizzeria"],
  authors: [{ name: "Pizza Dünyası" }],
  creator: "Pizza Dünyası",
  openGraph: {
    title: "Pizza Dünyası | En Lezzetli İtalyan Pizzaları",
    description: "En lezzetli İtalyan pizzaları, taptaze malzemeler ve hızlı teslimat seçenekleriyle Pizza Dünyası'nda sizi bekliyor.",
    url: "https://pizzadunyasi.com",
    siteName: "Pizza Dünyası",
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        {/* Loading Animation */}
        <LoadingAnimation />
        
        {/* Header: Sticky header that changes on scroll */}
        <Header />
        
        {/* Main Content */}
        <main className="flex-grow pt-24">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Scroll to top button */}
        <ScrollToTop />
        
        {/* Toast notifications */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#FFF',
              color: '#333',
              border: '1px solid #E2E8F0',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#FFF',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#FFF',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
