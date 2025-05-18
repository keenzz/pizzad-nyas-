import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Menü | Pizza Dünyası',
  description: 'Pizza Dünyası\'nın özel İtalyan pizzaları ve lezzetli menüsü.',
};

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface MenuCategory {
  id: string;
  title: string;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    id: 'pizzalar',
    title: 'Pizzalar',
    items: [
      {
        id: 'margherita',
        name: 'Margherita',
        description: 'Domates sosu, mozzarella peyniri, taze fesleğen yaprakları ve zeytinyağı',
        price: 99,
        image: 'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 'pepperoni',
        name: 'Pepperoni',
        description: 'Domates sosu, mozzarella peyniri ve dilimlenmiş pepperoni',
        price: 109,
        image: 'https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 'vegetarian',
        name: 'Vejetaryen',
        description: 'Domates sosu, mozzarella, biber, mantar, soğan, mısır ve zeytin',
        price: 119,
        image: 'https://images.pexels.com/photos/2909822/pexels-photo-2909822.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 'four-cheese',
        name: 'Dört Peynirli',
        description: 'Domates sosu, mozzarella, parmesan, gorgonzola ve ricotta peyniri',
        price: 129,
        image: 'https://images.pexels.com/photos/4193862/pexels-photo-4193862.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 'prosciutto',
        name: 'Prosciutto',
        description: 'Domates sosu, mozzarella, prosciutto jambon ve roka',
        price: 139,
        image: 'https://images.pexels.com/photos/8663465/pexels-photo-8663465.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 'seafood',
        name: 'Deniz Ürünlü',
        description: 'Domates sosu, mozzarella, karışık deniz ürünleri ve maydanoz',
        price: 149,
        image: 'https://images.pexels.com/photos/14391069/pexels-photo-14391069.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  {
    id: 'yan-urunler',
    title: 'Yan Ürünler',
    items: [
      {
        id: 'garlic-bread',
        name: 'Sarımsaklı Ekmek',
        description: 'Tereyağı ve sarımsak soslu, fırınlanmış İtalyan ekmeği',
        price: 39,
        image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 'chicken-wings',
        name: 'Tavuk Kanatları',
        description: 'Baharatlı, ızgara tavuk kanatları, özel soslarla',
        price: 59,
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 'italian-salad',
        name: 'İtalyan Salatası',
        description: 'Marul, domates, salatalık, siyah zeytin, mozzarella ve balzamik sos',
        price: 49,
        image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  {
    id: 'icecekler',
    title: 'İçecekler',
    items: [
      {
        id: 'cola',
        name: 'Kola',
        description: '330ml',
        price: 15,
        image: 'https://images.pexels.com/photos/2668308/pexels-photo-2668308.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 'soda',
        name: 'Soda',
        description: '330ml',
        price: 12,
        image: 'https://images.pexels.com/photos/8148587/pexels-photo-8148587.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 'ayran',
        name: 'Ayran',
        description: '300ml',
        price: 10,
        image: 'https://images.pexels.com/photos/8472734/pexels-photo-8472734.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 'water',
        name: 'Su',
        description: '500ml',
        price: 5,
        image: 'https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  {
    id: 'tatlilar',
    title: 'Tatlılar',
    items: [
      {
        id: 'tiramisu',
        name: 'Tiramisu',
        description: 'Geleneksel İtalyan tatlısı, mascarpone kreması ve kahve ile',
        price: 45,
        image: 'https://images.pexels.com/photos/6163263/pexels-photo-6163263.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 'chocolate-souffle',
        name: 'Çikolatalı Sufle',
        description: 'Sıcak, akışkan çikolatalı sufle, dondurma ile servis edilir',
        price: 49,
        image: 'https://images.pexels.com/photos/3992131/pexels-photo-3992131.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 'cheesecake',
        name: 'Cheesecake',
        description: 'Kremsi cheesecake, orman meyveleri sosu ile',
        price: 42,
        image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  }
];

export default function MenuPage() {
  return (
    <main className="pt-8 pb-16">
      {/* Menu Hero */}
      <section className="bg-red-700 text-white py-12 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Menümüz</h1>
          <p className="text-xl max-w-3xl mx-auto">
            En kaliteli malzemelerle hazırlanan özel İtalyan pizzalarımız ve lezzetli menü seçeneklerimizi keşfedin.
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {menuData.map((category) => (
            <a 
              key={category.id}
              href={`#${category.id}`}
              className="bg-red-700 text-white px-6 py-3 rounded-full font-medium hover:bg-red-600 transition duration-200"
            >
              {category.title}
            </a>
          ))}
        </div>
      </div>

      {/* Menu Categories */}
      {menuData.map((category) => (
        <section key={category.id} id={category.id} className="py-12 scroll-mt-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 relative">
              <span className="bg-white px-4 relative z-10">{category.title}</span>
              <span className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-200 -z-0"></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition duration-300">
                  <Link href={`/urun/${item.id}`}>
                    <div className="relative h-48">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="p-6 pb-2">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{item.name}</h3>
                        <span className="text-red-700 font-bold">{item.price} ₺</span>
                      </div>
                      <p className="text-gray-600 mb-4 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                  <div className="px-6 pb-6">
                    <Link 
                      href={`/urun/${item.id}`}
                      className="block w-full bg-red-700 text-white text-center px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition duration-300"
                    >
                      Ürünü İncele
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Call to Action */}
      <section className="mt-16 py-12 bg-yellow-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-red-900 mb-6">Özel Pizza Oluşturun!</h2>
          <p className="text-red-900 text-xl mb-8 max-w-2xl mx-auto">
            Kendi pizzanızı tasarlayın! Hamur, sos ve malzemeleri seçerek size özel lezzet oluşturun.
          </p>
          <Link 
            href="/siparis/ozel-pizza" 
            className="inline-block bg-red-700 text-white px-8 py-4 rounded-full font-bold hover:bg-red-600 transition duration-300 text-lg"
          >
            Pizza Tasarla
          </Link>
        </div>
      </section>
    </main>
  );
} 