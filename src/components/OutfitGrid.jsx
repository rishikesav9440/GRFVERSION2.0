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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
      {outfits.map((outfit) => (
        <motion.div 
          key={outfit.id}
          className="aspect-[3/4] relative group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(`/outfit/${outfit.id}`)}
        >
          <img
            src={outfit.thumbnail}
            alt={`Outfit ${outfit.id}`}
            className="w-full h-full object-cover rounded-lg shadow-sm 
                     transition-transform duration-200 ease-in-out"
            loading="lazy"
          />
          <motion.button 
            className="absolute top-2 right-2 p-1.5 md:p-2 bg-white rounded-full shadow-md
                       hover:shadow-lg transition-shadow duration-200
                       sm:opacity-0 sm:group-hover:opacity-100"
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              isInWishlist(outfit.id) 
                ? removeFromWishlist(outfit.id)
                : addToWishlist(outfit);
            }}
          >
            {isInWishlist(outfit.id) ? (
              <HeartSolid className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
            ) : (
              <HeartOutline className="w-5 h-5 md:w-6 md:h-6" />
            )}
          </motion.button>

          {/* Optional: Add hover overlay with outfit details */}
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10
                        transition-opacity duration-200 rounded-lg" />
        </motion.div>
      ))}
    </div>
  );
}
