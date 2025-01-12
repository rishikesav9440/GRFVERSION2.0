import React from 'react';
import { motion } from 'framer-motion';
import { HeartIcon } from '@heroicons/react/24/outline';

export default function ProductCard({ image, price, store, onHeartClick }) {
  return (
    <motion.div 
      className="flex-shrink-0 w-32"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative">
        <img
          src={image}
          alt="Product"
          className="w-full aspect-square object-cover rounded-lg mb-2"
        />
        {onHeartClick && (
          <motion.button 
            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md"
            whileTap={{ scale: 0.95 }}
            onClick={onHeartClick}
          >
            <HeartIcon className="w-5 h-5" />
          </motion.button>
        )}
      </div>
      <div className="text-sm font-medium">{price}</div>
      <div className="text-xs text-gray-500">{store}</div>
    </motion.div>
  );
}