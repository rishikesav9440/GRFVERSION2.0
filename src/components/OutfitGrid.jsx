import React from 'react';
import { motion } from 'framer-motion';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';

export default function OutfitGrid({ outfits }) {
  const navigate = useNavigate();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="grid grid-cols-2 gap-3">
      {outfits.map((outfit) => (
        <motion.div 
          key={outfit.id}
          className="aspect-[3/4] relative"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(`/outfit/${outfit.id}`)}
        >
          <img
            src={outfit.thumbnail}
            alt={`Outfit ${outfit.id}`}
            className="w-full h-full object-cover rounded-lg"
          />
          <motion.button 
            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md"
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              isInWishlist(outfit.id) 
                ? removeFromWishlist(outfit.id)
                : addToWishlist(outfit);
            }}
          >
            {isInWishlist(outfit.id) ? (
              <HeartSolid className="w-5 h-5 text-red-500" />
            ) : (
              <HeartOutline className="w-5 h-5" />
            )}
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
}