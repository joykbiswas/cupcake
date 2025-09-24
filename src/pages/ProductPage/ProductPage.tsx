import { useState, useEffect } from 'react';
import type { Cake } from '../../data/cakes';
import { CakeService } from '../../services/cakeService';
import { motion } from 'framer-motion';
import { COLORS, COLOR_COMBINATIONS } from '../../constants/colors';
import useAddToCart from "../../hooks/useAddToCart"; 
const ProductPage = () => {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const { addToCart } = useAddToCart();

  // Use the addToCart function directly from the hook
  const handleAddToCart = (product: Cake) => {
    // Transform the product to match the expected format for addToCart
    addToCart({
      _id: product.id.toString(),
      name: product.name,
      price: product.price,
      rating: 0,
      category: product.type,
      images: product.images,
      inStock: true,
      description: product.description,
      tags: []
    });
  };

  useEffect(() => {
    // Fetch cakes using the service
    const fetchCakes = async () => {
      try {
        const fetchedCakes = await CakeService.getAllCakes();
        setCakes(fetchedCakes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cakes:', error);
        setLoading(false);
      }
    };

    fetchCakes();
  }, []);

  const filteredCakes = filterType === 'all' 
    ? cakes 
    : cakes.filter(cake => cake.type === filterType);

  const uniqueTypes = ['all', ...Array.from(new Set(cakes.map(cake => cake.type)))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.BG_PRIMARY }}>
        <div className="text-2xl font-semibold" style={{ color: COLORS.TEXT_SECONDARY }}>Loading delicious cakes...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: COLORS.BG_PRIMARY }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-4 font-light italic" style={{ color: COLORS.TEXT_PRIMARY }}>
            Our Delicious Cakes
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: COLORS.TEXT_SECONDARY }}>
            Discover our handcrafted selection of premium cakes, each made with love and the finest ingredients
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {uniqueTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filterType === type
                  ? 'text-white shadow-lg transform scale-105'
                  : 'bg-white hover:shadow-md border'
              }`}
              style={{
                backgroundColor: filterType === type ? COLORS.BUTTON_PRIMARY : COLORS.BUTTON_SECONDARY,
                color: filterType === type ? COLORS.TEXT_WHITE : COLORS.TEXT_PRIMARY,
                borderColor: filterType === type ? 'transparent' : COLORS.BORDER_PRIMARY,
                boxShadow: filterType === type ? `0 10px 15px -3px ${COLORS.SHADOW_PRIMARY}` : 'none',
              }}
              onMouseEnter={(e) => {
                if (filterType !== type) {
                  e.currentTarget.style.backgroundColor = COLORS.BUTTON_SECONDARY_HOVER;
                }
              }}
              onMouseLeave={(e) => {
                if (filterType !== type) {
                  e.currentTarget.style.backgroundColor = COLORS.BUTTON_SECONDARY;
                }
              }}
            >
              {type === 'all' ? 'All Cakes' : type}
            </button>
          ))}
        </motion.div>

        {/* Cakes Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredCakes.map((cake, index) => (
                         <motion.div
               key={cake.id}
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.1 * index }}
               whileHover={{ y: -10, scale: 1.02 }}
               className="rounded-2xl shadow-xl overflow-hidden transition-all duration-300 border"
               style={{
                 backgroundColor: COLOR_COMBINATIONS.CARD.background,
                 borderColor: COLOR_COMBINATIONS.CARD.border,
                 boxShadow: `0 20px 25px -5px ${COLOR_COMBINATIONS.CARD.shadow}`,
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.boxShadow = `0 25px 50px -12px ${COLOR_COMBINATIONS.CARD.hoverShadow}`;
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.boxShadow = `0 20px 25px -5px ${COLOR_COMBINATIONS.CARD.shadow}`;
               }}
             >
               {/* Cake Image */}
               <div className="relative h-64 overflow-hidden">
                 <img
                   src={cake.images}
                   alt={cake.name}
                   className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                 />
                 <div className="absolute top-4 right-4">
                   <span 
                     className="px-3 py-1 rounded-full text-sm font-medium shadow-lg"
                     style={{
                       backgroundColor: COLORS.BUTTON_PRIMARY,
                       color: COLORS.TEXT_WHITE,
                       boxShadow: `0 4px 6px -1px ${COLORS.SHADOW_PRIMARY}`,
                     }}
                   >
                     {cake.type}
                   </span>
                 </div>
               </div>

               {/* Cake Details */}
               <div className="p-6">
                 <h3 className="text-2xl font-bold mb-2 font-leagueGothic" style={{ color: COLORS.TEXT_PRIMARY }}>
                   {cake.name}
                 </h3>
                 <p className="mb-4 line-clamp-3" style={{ color: COLORS.TEXT_SECONDARY }}>
                   {cake.description}
                 </p>
                 
                 {/* Price and Order Button */}
                 <div className="flex items-center justify-between">
                   <div className="text-3xl font-bold" style={{ color: COLORS.TEXT_SECONDARY }}>
                     ${cake.price}
                   </div>
                   <button 
                   onClick={() => handleAddToCart(cake)}
                     className="px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                     style={{
                       backgroundColor: COLORS.BUTTON_PRIMARY,
                       color: COLORS.TEXT_WHITE,
                       boxShadow: `0 10px 15px -3px ${COLORS.SHADOW_PRIMARY}`,
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.backgroundColor = COLORS.BUTTON_PRIMARY_HOVER;
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.backgroundColor = COLORS.BUTTON_PRIMARY;
                     }}
                   >
                     Order Now
                   </button>
                 </div>
               </div>
             </motion.div>
          ))}
        </motion.div>

        {/* No Results Message */}
        {filteredCakes.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-2xl font-semibold mb-4" style={{ color: COLORS.TEXT_SECONDARY }}>
              No cakes found for this category
            </div>
            <button
              onClick={() => setFilterType('all')}
              className="hover:underline font-medium transition-colors duration-300"
              style={{ color: COLORS.TEXT_SECONDARY }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = COLORS.TEXT_PRIMARY;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = COLORS.TEXT_SECONDARY;
              }}
            >
              View all cakes
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
