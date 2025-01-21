import React from 'react';
import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import OutfitGrid from '../components/OutfitGrid';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pb-20 flex flex-col w-full max-w-7xl mx-auto"
    >
      {/* Responsive Header */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10 border-b">
        <div className="flex items-center p-4 max-w-7xl mx-auto">
          <motion.button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 mr-4 md:mr-6"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </motion.button>
          <h1 className="text-xl md:text-2xl font-semibold">Wishlist</h1>
        </div>
      </div>

      {/* Responsive Main Content */}
      <div className="pt-20 px-4 md:px-6 lg:px-8 flex-grow">
        {wishlist.length === 0 ? (
          <div className="text-center py-8 md:py-12">
            <p className="text-gray-500 text-base md:text-lg">Your wishlist is empty</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-2 md:px-8 md:py-3 bg-black text-white rounded-full 
                         text-sm md:text-base hover:bg-gray-800 transition-colors"
              onClick={() => navigate('/')}
            >
              Explore Outfits
            </motion.button>
          </div>
        ) : (
          <div className="w-full max-w-6xl mx-auto">
            <OutfitGrid outfits={wishlist} />
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:static">
        <BottomNavigation />
      </div>
    </motion.div>
  );
}
