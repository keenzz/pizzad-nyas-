'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Mock ürün verileri
const mockProducts = [
  {
    id: 'margherita',
    name: 'Margherita',
    description: 'Domates sosu, mozzarella peyniri, taze fesleğen yaprakları ve zeytinyağı',
    category: 'pizza',
    price: {
      small: 89,
      medium: 99,
      large: 119
    },
    image: 'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Margherita Pizza',
    ingredients: ['Domates Sosu', 'Mozzarella Peyniri', 'Taze Fesleğen', 'Zeytinyağı'],
    preparationTime: '15-20 dk',
    isPopular: true,
    isVegetarian: true,
    isSpicy: false,
    extras: [
      { id: 'ex1', name: 'Ekstra Peynir', price: 10.00 },
      { id: 'ex3', name: 'Ekstra Domates', price: 8.00 },
      { id: 'ex5', name: 'Sarımsaklı Sos', price: 5.00 }
    ],
    nutritionalInfo: {
      calories: '265 kcal',
      protein: '10g',
      carbs: '32g',
      fat: '8g'
    },
    relatedProducts: ['pepperoni', 'vegetarian', 'four-cheese']
  },
  {
    id: 'pepperoni',
    name: 'Pepperoni',
    description: 'Domates sosu, mozzarella peyniri ve dilimlenmiş pepperoni',
    category: 'pizza',
    price: {
      small: 99,
      medium: 109,
      large: 129
    },
    image: 'https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Pepperoni Pizza',
    ingredients: ['Domates Sosu', 'Mozzarella Peyniri', 'Pepperoni'],
    preparationTime: '15-20 dk',
    isPopular: true,
    isVegetarian: false,
    isSpicy: true,
    extras: [
      { id: 'ex1', name: 'Ekstra Peynir', price: 10.00 },
      { id: 'ex2', name: 'Ekstra Pepperoni', price: 15.00 },
      { id: 'ex4', name: 'Acı Sos', price: 5.00 },
      { id: 'ex5', name: 'Sarımsaklı Sos', price: 5.00 }
    ],
    nutritionalInfo: {
      calories: '295 kcal',
      protein: '14g',
      carbs: '33g',
      fat: '11g'
    },
    relatedProducts: ['margherita', 'four-cheese', 'prosciutto']
  },
  {
    id: 'vegetarian',
    name: 'Vejetaryen',
    description: 'Domates sosu, mozzarella, biber, mantar, soğan, mısır ve zeytin',
    category: 'pizza',
    price: {
      small: 99,
      medium: 119,
      large: 139
    },
    image: 'https://images.pexels.com/photos/2909822/pexels-photo-2909822.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Vejetaryen Pizza',
    ingredients: ['Domates Sosu', 'Mozzarella', 'Biber', 'Mantar', 'Soğan', 'Mısır', 'Zeytin'],
    preparationTime: '15-20 dk',
    isPopular: false,
    isVegetarian: true,
    isSpicy: false,
    extras: [
      { id: 'ex1', name: 'Ekstra Peynir', price: 10.00 },
      { id: 'ex3', name: 'Ekstra Mantar', price: 8.00 },
      { id: 'ex5', name: 'Sarımsaklı Sos', price: 5.00 }
    ],
    nutritionalInfo: {
      calories: '245 kcal',
      protein: '9g',
      carbs: '30g',
      fat: '7g'
    },
    relatedProducts: ['margherita', 'four-cheese']
  },
  {
    id: 'four-cheese',
    name: 'Dört Peynirli',
    description: 'Domates sosu, mozzarella, parmesan, gorgonzola ve ricotta peyniri',
    category: 'pizza',
    price: {
      small: 109,
      medium: 129,
      large: 149
    },
    image: 'https://images.pexels.com/photos/4193862/pexels-photo-4193862.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Dört Peynirli Pizza',
    ingredients: ['Domates Sosu', 'Mozzarella', 'Parmesan', 'Gorgonzola', 'Ricotta'],
    preparationTime: '15-20 dk',
    isPopular: true,
    isVegetarian: true,
    isSpicy: false,
    extras: [
      { id: 'ex1', name: 'Ekstra Peynir', price: 10.00 },
      { id: 'ex5', name: 'Sarımsaklı Sos', price: 5.00 }
    ],
    nutritionalInfo: {
      calories: '320 kcal',
      protein: '15g',
      carbs: '28g',
      fat: '14g'
    },
    relatedProducts: ['margherita', 'vegetarian', 'prosciutto']
  },
  {
    id: 'prosciutto',
    name: 'Prosciutto',
    description: 'Domates sosu, mozzarella, prosciutto jambon ve roka',
    category: 'pizza',
    price: {
      small: 119,
      medium: 139,
      large: 159
    },
    image: 'https://images.pexels.com/photos/8663465/pexels-photo-8663465.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Prosciutto Pizza',
    ingredients: ['Domates Sosu', 'Mozzarella', 'Prosciutto Jambon', 'Roka'],
    preparationTime: '20-25 dk',
    isPopular: true,
    isVegetarian: false,
    isSpicy: false,
    extras: [
      { id: 'ex1', name: 'Ekstra Peynir', price: 10.00 },
      { id: 'ex3', name: 'Ekstra Jambon', price: 15.00 },
      { id: 'ex5', name: 'Sarımsaklı Sos', price: 5.00 }
    ],
    nutritionalInfo: {
      calories: '280 kcal',
      protein: '16g',
      carbs: '30g',
      fat: '10g'
    },
    relatedProducts: ['pepperoni', 'four-cheese', 'seafood']
  },
  {
    id: 'seafood',
    name: 'Deniz Ürünlü',
    description: 'Domates sosu, mozzarella, karışık deniz ürünleri ve maydanoz',
    category: 'pizza',
    price: {
      small: 129,
      medium: 149,
      large: 169
    },
    image: 'https://images.pexels.com/photos/14391069/pexels-photo-14391069.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Deniz Ürünlü Pizza',
    ingredients: ['Domates Sosu', 'Mozzarella', 'Karışık Deniz Ürünleri', 'Maydanoz'],
    preparationTime: '20-25 dk',
    isPopular: false,
    isVegetarian: false,
    isSpicy: false,
    extras: [
      { id: 'ex1', name: 'Ekstra Peynir', price: 10.00 },
      { id: 'ex4', name: 'Acı Sos', price: 5.00 },
      { id: 'ex5', name: 'Sarımsaklı Sos', price: 5.00 }
    ],
    nutritionalInfo: {
      calories: '285 kcal',
      protein: '18g',
      carbs: '30g',
      fat: '9g'
    },
    relatedProducts: ['prosciutto', 'pepperoni']
  },
  // Yan ürünler
  {
    id: 'garlic-bread',
    name: 'Sarımsaklı Ekmek',
    description: 'Tereyağı ve sarımsak soslu, fırınlanmış İtalyan ekmeği',
    category: 'side',
    price: {
      small: 29,
      medium: 39,
      large: 49
    },
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Sarımsaklı Ekmek',
    ingredients: ['İtalyan Ekmeği', 'Tereyağı', 'Sarımsak', 'Maydanoz'],
    preparationTime: '10-15 dk',
    isPopular: true,
    isVegetarian: true,
    isSpicy: false,
    extras: [
      { id: 'ex1', name: 'Ekstra Peynir', price: 8.00 }
    ],
    nutritionalInfo: {
      calories: '180 kcal',
      protein: '4g',
      carbs: '22g',
      fat: '8g'
    },
    relatedProducts: ['margherita', 'pepperoni']
  },
  // İçecek ve tatlı ürünlerini de bu şekilde ekleyebilirsiniz
  // İçecekler
  {
    id: 'cola',
    name: 'Kola',
    description: '330ml',
    category: 'drink',
    price: {
      small: 15,
      medium: 15,
      large: 15
    },
    image: 'https://images.pexels.com/photos/2668308/pexels-photo-2668308.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Kola',
    ingredients: ['Gazlı İçecek'],
    preparationTime: '1 dk',
    isPopular: true,
    isVegetarian: true,
    isSpicy: false,
    extras: [],
    nutritionalInfo: {
      calories: '140 kcal',
      protein: '0g',
      carbs: '35g',
      fat: '0g'
    },
    relatedProducts: ['water', 'ayran']
  },
  {
    id: 'ayran',
    name: 'Ayran',
    description: '300ml',
    category: 'drink',
    price: {
      small: 10,
      medium: 10,
      large: 10
    },
    image: 'https://images.pexels.com/photos/8472734/pexels-photo-8472734.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Ayran',
    ingredients: ['Yoğurt', 'Su', 'Tuz'],
    preparationTime: '1 dk',
    isPopular: true,
    isVegetarian: true,
    isSpicy: false,
    extras: [],
    nutritionalInfo: {
      calories: '70 kcal',
      protein: '4g',
      carbs: '6g',
      fat: '3g'
    },
    relatedProducts: ['cola', 'water']
  },
  // Tatlılar
  {
    id: 'tiramisu',
    name: 'Tiramisu',
    description: 'Geleneksel İtalyan tatlısı, mascarpone kreması ve kahve ile',
    category: 'dessert',
    price: {
      small: 45,
      medium: 45,
      large: 45
    },
    image: 'https://images.pexels.com/photos/6163263/pexels-photo-6163263.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Tiramisu',
    ingredients: ['Mascarpone Peyniri', 'Kahve', 'Lady Finger Bisküvi', 'Kakao'],
    preparationTime: '5 dk',
    isPopular: true,
    isVegetarian: true,
    isSpicy: false,
    extras: [],
    nutritionalInfo: {
      calories: '350 kcal',
      protein: '5g',
      carbs: '30g',
      fat: '22g'
    },
    relatedProducts: ['chocolate-souffle', 'cheesecake']
  }
];

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<typeof mockProducts[number] | null>(null);
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // İlgili ürünleri al
  const [relatedProducts, setRelatedProducts] = useState<typeof mockProducts | []>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Mock API çağrısı
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Ürünü ID'ye göre bul
        const foundProduct = mockProducts.find(p => p.id === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
          // İlgili ürünleri filtrele
          if (foundProduct.relatedProducts?.length) {
            const relatedItems = mockProducts.filter(p => 
              foundProduct.relatedProducts?.includes(p.id)
            );
            setRelatedProducts(relatedItems);
          }
        } else {
          setError('Ürün bulunamadı.');
        }
      } catch (err) {
        setError('Ürün bilgileri yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Toplam fiyatı hesapla
  useEffect(() => {
    if (product) {
      let price = product.price[selectedSize];
      
      // Ekstra malzemelerin fiyatını ekle
      if (selectedExtras.length > 0) {
        const extrasCost = selectedExtras.reduce((total, extraId) => {
          const extra = product.extras.find(ex => ex.id === extraId);
          return total + (extra?.price || 0);
        }, 0);
        
        price += extrasCost;
      }
      
      // Miktar ile çarp
      price *= quantity;
      
      setTotalPrice(price);
    }
  }, [product, selectedSize, quantity, selectedExtras]);

  const handleSizeChange = (size: 'small' | 'medium' | 'large') => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtras(prev => {
      if (prev.includes(extraId)) {
        return prev.filter(id => id !== extraId);
      } else {
        return [...prev, extraId];
      }
    });
  };

  const handleAddToCart = () => {
    // Burada sepete ekleme işlemi yapılır
    // Mock için sadece bir bildirim gösteriyoruz
    setAddedToCart(true);
    
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
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

  // Hata durumu
  if (error) {
    return (
      <div className="container mx-auto px-4 pt-36 sm:pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h2 className="text-lg font-semibold text-red-800 mb-2">{error}</h2>
            <p className="text-red-600 mb-4">Bu ürün mevcut değil veya kaldırılmış olabilir.</p>
            <Link
              href="/menu"
              className="inline-flex items-center text-sm px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Menüye Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Ürün bulunamadı durumu
  if (!product) {
    return (
      <div className="container mx-auto px-4 pt-36 sm:pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
            <svg className="w-12 h-12 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">Ürün Bulunamadı</h2>
            <p className="text-yellow-700 mb-4">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
            <Link
              href="/menu"
              className="inline-flex items-center text-sm px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Menüye Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-36 sm:pt-32 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Sepete eklendi bildirimi */}
        {addedToCart && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-24 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Ürün sepetinize eklendi!</span>
          </motion.div>
        )}
        
        {/* Geri Butonu ve Kategori Bilgisi */}
        <div className="mb-6">
          <div className="flex items-center">
            <Link
              href="/menu"
              className="mr-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
            </Link>
            <div className="text-sm text-gray-500">
              <Link href="/menu" className="hover:text-red-700">Menü</Link>
              <span className="mx-2">/</span>
              <Link href={`/menu/${product.category}`} className="hover:text-red-700">
                {product.category === 'pizza' ? 'Pizzalar' : 
                 product.category === 'drink' ? 'İçecekler' : 
                 product.category === 'side' ? 'Yan Ürünler' : 'Ürünler'}
              </Link>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Ürün Resmi */}
          <div className="bg-gray-100 rounded-xl overflow-hidden relative aspect-square">
            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            
            {/* Rozet */}
            {product.isPopular && (
              <div className="absolute top-4 left-4 bg-red-700 text-white text-xs py-1 px-3 rounded-full font-medium">
                Popüler
              </div>
            )}
            {product.isVegetarian && (
              <div className="absolute top-4 left-4 bg-green-700 text-white text-xs py-1 px-3 rounded-full font-medium">
                Vejetaryen
              </div>
            )}
            {product.isSpicy && (
              <div className="absolute top-4 right-4 bg-orange-700 text-white text-xs py-1 px-3 rounded-full font-medium">
                Acılı
              </div>
            )}
          </div>
          
          {/* Ürün Detayları */}
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <button 
                onClick={toggleFavorite} 
                className={`p-2 rounded-full ${isFavorite ? 'text-red-700' : 'text-gray-400 hover:text-red-700'} transition-colors`}
                aria-label="Favorilere Ekle"
              >
                {isFavorite ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                )}
              </button>
            </div>
            
            <p className="text-2xl font-bold text-red-700 mt-2">{totalPrice.toFixed(2)} TL</p>
            
            <p className="text-gray-600 mt-4">{product.description}</p>
            
            {/* Hazırlama Süresi */}
            <div className="flex items-center mt-4">
              <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-sm text-gray-500">Hazırlama Süresi: {product.preparationTime}</span>
            </div>
            
            <div className="h-px bg-gray-200 my-6"></div>
            
            {/* Boyut Seçimi */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Boyut Seçin</h3>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => handleSizeChange('small')}
                  className={`border py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    selectedSize === 'small' 
                      ? 'border-red-700 bg-red-50 text-red-700' 
                      : 'border-gray-300 text-gray-700 hover:border-red-700'
                  }`}
                >
                  Küçük ({product.price.small.toFixed(2)} TL)
                </button>
                <button 
                  onClick={() => handleSizeChange('medium')}
                  className={`border py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    selectedSize === 'medium' 
                      ? 'border-red-700 bg-red-50 text-red-700' 
                      : 'border-gray-300 text-gray-700 hover:border-red-700'
                  }`}
                >
                  Orta ({product.price.medium.toFixed(2)} TL)
                </button>
                <button 
                  onClick={() => handleSizeChange('large')}
                  className={`border py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    selectedSize === 'large' 
                      ? 'border-red-700 bg-red-50 text-red-700' 
                      : 'border-gray-300 text-gray-700 hover:border-red-700'
                  }`}
                >
                  Büyük ({product.price.large.toFixed(2)} TL)
                </button>
              </div>
            </div>
            
            {/* Ekstra Malzemeler */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Ekstra Malzemeler</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.extras.map((extra) => (
                  <label key={extra.id} className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={selectedExtras.includes(extra.id)}
                      onChange={() => handleExtraToggle(extra.id)}
                      className="h-4 w-4 text-red-700 focus:ring-red-700 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {extra.name} (+{extra.price.toFixed(2)} TL)
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Miktar */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Adet</h3>
              <div className="flex items-center">
                <button 
                  onClick={() => handleQuantityChange(-1)} 
                  disabled={quantity <= 1}
                  className="border border-gray-300 rounded-l-lg py-2 px-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                  </svg>
                </button>
                <span className="border-t border-b border-gray-300 py-2 px-4 text-center w-12">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)} 
                  className="border border-gray-300 rounded-r-lg py-2 px-3"
                >
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Sepete Ekle Butonu */}
            <button 
              onClick={handleAddToCart}
              className="w-full bg-red-700 hover:bg-red-800 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-sm flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Sepete Ekle
            </button>
          </div>
        </div>
        
        {/* İçindekiler ve Besin Değerleri */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* İçindekiler */}
          <div className="bg-white shadow-sm rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">İçindekiler</h2>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ingredient, index) => (
                <span 
                  key={index}
                  className="bg-gray-100 text-gray-800 text-xs py-1 px-3 rounded-full"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
          
          {/* Besin Değerleri */}
          <div className="bg-white shadow-sm rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Besin Değerleri (1 Dilim)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Kalori</p>
                <p className="font-medium text-gray-800">{product.nutritionalInfo.calories}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Protein</p>
                <p className="font-medium text-gray-800">{product.nutritionalInfo.protein}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Karbonhidrat</p>
                <p className="font-medium text-gray-800">{product.nutritionalInfo.carbs}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Yağ</p>
                <p className="font-medium text-gray-800">{product.nutritionalInfo.fat}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Benzer Ürünler */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Benzer Ürünler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link 
                  key={relatedProduct.id} 
                  href={`/urun/${relatedProduct.id}`}
                  className="bg-white shadow-sm rounded-xl overflow-hidden transition-transform hover:scale-[1.02]"
                >
                  <div className="aspect-video bg-gray-200 relative">
                    <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">{relatedProduct.name}</h3>
                    <p className="text-red-700 font-medium mt-1">{relatedProduct.price.medium.toFixed(2)} TL</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 