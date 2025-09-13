import React, { useState } from 'react';
import { ShoppingCart, ChevronLeft, ChevronRight, Cake, Sprout, IceCream, Cookie } from 'lucide-react';
import img1 from '../../assets/products/p1.png'
import img2 from '../../assets/products/p2.png'
import img3 from '../../assets/products/p3.png'
import img4 from '../../assets/products/p4.png'
import img5 from '../../assets/products/p5.png'
import img6 from '../../assets/products/p6.png'
import img7 from '../../assets/products/p11.png'
import img8 from '../../assets/products/p12.png'
import img9 from '../../assets/products/p13.png'
import img10 from '../../assets/products/p21.png'
import img11 from '../../assets/products/p22.png'
import img12 from '../../assets/products/p23.png'
import img13 from '../../assets/products/p32.png'
import img14 from '../../assets/products/p33.png'
import img15 from '../../assets/products/p34.png'
import imgH from '../../assets/products/show_divider_3_92x48.png'
import bgHero from '../../assets/bg-hero.png';


interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  type: string;
  vendor: string;
  imageUrl: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Angel Food Cake',
    price: 150.00,
    type: 'Layer Cake',
    vendor: 'Biscoff',
    imageUrl: img1,
    category: 'layer-cakes',
  },
  {
    id: 2,
    name: 'Gourmet Cup Cake',
    price: 100.00,
    originalPrice: 117.00,
    type: 'Cookies',
    vendor: 'Kaya Farms',
    imageUrl: img2,
    category: 'cup-cakes',
  },
  {
    id: 3,
    name: 'Ellen Cup Cake',
    price: 300.00,
    type: 'Crumble',
    vendor: 'Bingo',
    imageUrl: img7,
    category: 'cup-cakes',
  },
  {
    id: 4,
    name: 'Chocolate Chip Cake',
    price: 250.00,
    type: 'Layer Cake',
    vendor: 'Sweet Delights',
    imageUrl: img4,
    category: 'layer-cakes',
  },
  {
    id: 5,
    name: 'Fruit Croissant',
    price: 50.00,
    type: 'Pastry',
    vendor: 'Bonjour Bakery',
    imageUrl: img5,
    category: 'pastries',
  },
  {
    id: 6,
    name: 'Ice Cream Sundae',
    price: 75.00,
    type: 'Dessert',
    vendor: 'Sundae House',
    imageUrl: img6,
    category: 'desserts',
  },
  {
    id: 7,
    name: 'Vanilla Bean Cupcake',
    price: 120.00,
    type: 'Vanilla',
    vendor: 'The Cakery',
    imageUrl: img3,
    category: 'cup-cakes',
  },
  {
    id: 8,
    name: 'Red Velvet Cupcake',
    price: 135.00,
    type: 'Velvet',
    vendor: 'Red Oven',
    imageUrl: img8,
    category: 'cup-cakes',
  },
  {
    id: 9,
    name: 'Lemon Meringue Cake',
    price: 210.00,
    type: 'Layer Cake',
    vendor: 'Citrus Corner',
    imageUrl: img9,
    category: 'layer-cakes',
  },
  {
    id: 10,
    name: 'Raspberry Swirl Croissant',
    price: 65.00,
    type: 'Pastry',
    vendor: 'Bake Haven',
    imageUrl: img10,
    category: 'pastries',
  },
  {
    id: 11,
    name: 'Tiramisu',
    price: 90.00,
    type: 'Dessert',
    vendor: 'Italian Sweets',
    imageUrl: img11,
    category: 'desserts',
  },
  {
    id: 12,
    name: 'Strawberry Shortcake',
    price: 180.00,
    type: 'Layer Cake',
    vendor: 'Berry Bliss',
    imageUrl: img12,
    category: 'layer-cakes',
  },
  {
    id: 13,
    name: 'Oreo Fudge Cupcake',
    price: 145.00,
    type: 'Fudge',
    vendor: 'Choco Factory',
    imageUrl: img13,
    category: 'cup-cakes',
  },
  {
    id: 14,
    name: 'Apple Turnover',
    price: 55.00,
    type: 'Pastry',
    vendor: 'Orchard Bakes',
    imageUrl: img14,
    category: 'pastries',
  },
  {
    id: 15,
    name: 'Cheesecake',
    price: 110.00,
    type: 'Dessert',
    vendor: 'Creamy Delights',
    imageUrl: img15,
    category: 'desserts',
  },
  {
    id: 16,
    name: 'Carrot Cake',
    price: 195.00,
    type: 'Layer Cake',
    vendor: 'Farmhouse Kitchen',
    imageUrl: img11,
    category: 'layer-cakes',
  },
  {
    id: 17,
    name: 'Chocolate Croissant',
    price: 70.00,
    type: 'Pastry',
    vendor: 'Bonjour Bakery',
    imageUrl: img5,
    category: 'pastries',
  },
  {
    id: 18,
    name: 'Chocolate Lava Cake',
    price: 85.00,
    type: 'Dessert',
    vendor: 'Sweet Delights',
    imageUrl: img1,
    category: 'desserts',
  },
];

const categories = [
  { name: 'cup-cakes', icon: Cookie, label: 'Cup Cakes' },
  { name: 'layer-cakes', icon: Cake, label: 'Layer Cakes' },
  { name: 'pastries', icon: Sprout, label: 'Pastries' },
  { name: 'desserts', icon: IceCream, label: 'Desserts' },
];

// Helper function to get products by category
const getProductsByCategory = (category: string) => {
  return products.filter(p => p.category === category);
};

const ProductNavigation: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState('layer-cakes');
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const filteredProducts = getProductsByCategory(currentCategory);
  const currentProduct = filteredProducts[currentProductIndex];

  const handleNextProduct = () => {
    setCurrentProductIndex((prevIndex) =>
      (prevIndex + 1) % filteredProducts.length
    );
  };

  const handlePrevProduct = () => {
    setCurrentProductIndex((prevIndex) =>
      (prevIndex - 1 + filteredProducts.length) % filteredProducts.length
    );
  };

  const handleSelectCategory = (category: string) => {
    setCurrentCategory(category);
    setCurrentProductIndex(0); // Reset index when category changes
  };

  if (!currentProduct) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-700">No products found for this category.</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundImage: `url(${bgHero})`, backgroundAttachment: 'fixed', backgroundSize: 'cover' }} className="min-h-screen max-w-screen-2xl mx-auto p-12 py-20 font-sans flex flex-col items-center">
      
      {/* Header and Title */}
      <header className="py-8 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-4 font-light italic">Layer cakes</h1>
        <div className='flex items-center justify-center'>
          <img src= {imgH} alt="" />
        </div>
      </header>

      {/* Main Product Container */}
      <main className="container p-4 md:p-8 flex flex-col md:flex-row items-start justify-center">

        {/* Left Sidebar */}
        <div className="flex flex-col items-end gap-6 p-4 md:w-1/5 w-full mb-8 md:mb-0">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = currentCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => handleSelectCategory(cat.name)}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center 
                            transition-all duration-300 transform hover:scale-105
                            ${isActive ? 'bg-white shadow-lg border-2 border-pink-400' : 'bg-pink-100'}`}
              >
                <div className={`p-4 rounded-full ${isActive ? 'bg-gradient-to-bl from-pink-400 to-teal-200' : 'bg-gradient-to-bl from-teal-100 via-[#FFFFFF] to-pink-200'} `}>
                  <Icon size={32} className={`
                    ${isActive ? 'text-pink-600' : 'text-pink-400'} 
                  `} />
                </div>
                {isActive && (
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rotate-45 border-r-2 border-t-2 border-teal-400"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Product Details and Image */}
        <div className="md:w-4/5 w-full flex flex-col md:flex-row items-center justify-center p-6  ">
          
          {/* Details Section */}
          <div className="flex-1 flex flex-col items-start p-4 md:p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">{currentProduct.name}</h2>
            <div className="text-[#7C5228] font-bold text-4xl flex items-baseline">
              ${currentProduct.price.toFixed(2)}
              {currentProduct.originalPrice && (
                <span className="ml-4 text-xl text-gray-400 line-through">${currentProduct.originalPrice.toFixed(2)}</span>
              )}
            </div>
            {/*  */}
            <div className="mt-4 text-gray-600">
              <span className="font-medium">Type:</span> {currentProduct.type}
            </div>
            <div className="text-gray-600">
              <span className="font-medium">Vendor:</span> {currentProduct.vendor}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 ">
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#7C5228] hover:bg-[#553329] text-white rounded-xl shadow-lg  transition-colors duration-300">
                <ShoppingCart size={20} /> Add to Cart
              </button>
             
            </div>
            
            {/* Navigation Arrows */}
            <div className="flex justify-between space-x-5 mt-8">
              <button
                onClick={handlePrevProduct}
                className="p-4 rounded-full bg-pink-100 text-pink-500 transition-colors duration-200 hover:bg-pink-200"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNextProduct}
                className="p-4 rounded-full bg-pink-100 text-pink-500 transition-colors duration-200 hover:bg-pink-200"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          
          {/* Image Section */}
          <div className="flex-shrink-0 w-full md:w-auto mt-8 md:mt-0 md:ml-8">
            <img 
              src={currentProduct.imageUrl} 
              alt={currentProduct.name} 
              className="w-full max-w-sm md:max-w-md rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105" 
            />
          </div>
        </div>

      </main>
    </div>
  );
};

export default ProductNavigation;
