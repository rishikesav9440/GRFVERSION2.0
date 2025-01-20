import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from './Icons'; // Ensure ArrowLeftIcon is imported
import BottomNavigation from '../components/BottomNavigation';
import OutfitGrid from '../components/OutfitGrid'; // Ensure OutfitGrid is imported

export default function Wishlist({ wishlist }) {
  const navigate = useNavigate();

  return (
    <motion.div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 bg-white z-50 p-4 shadow">
        <div className="flex items-center">
          <motion.button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 mr-4"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </motion.button>
          <h1 className="text-xl font-semibold">Wishlist</h1>
        </div>
      </div>

      <div className="pt-20 px-4 flex-grow">
        {wishlist.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Your wishlist is empty</p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-2 bg-black text-white rounded-full"
              onClick={() => navigate('/')}
            >
              Explore Outfits
            </motion.button>
          </div>
        ) : (
          <OutfitGrid outfits={wishlist} />
        )}
      </div>

      <BottomNavigation />
    </motion.div>
  );
}
