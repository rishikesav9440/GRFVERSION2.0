import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { usePosts } from '../hooks/usePosts';
import { useWishlist } from '../context/WishlistContext';

const ShimmerCard = () => (
  <div className="relative rounded-2xl overflow-hidden bg-white aspect-[3/4] shadow-sm">
    <div className="w-full h-full bg-gray-200 animate-[shimmer_1.5s_infinite]" 
      style={{
        background: 'linear-gradient(90deg, #f0f0f0 25%, #f7f7f7 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite linear'
      }}
    />
  </div>
);

export default function IdeasGrid() {
  const navigate = useNavigate();
  const { posts, loading, error } = usePosts();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  if (loading) {
    return (
      <div className="px-4 mt-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[15px] font-bold mb-3 tracking-wide"
        >
          IDEAS FOR YOU
        </motion.h2>
        <div className="grid grid-cols-2 gap-3">
          {[...Array(6)].map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="px-4 mt-6">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[15px] font-bold mb-3 tracking-wide"
      >
        IDEAS FOR YOU
      </motion.h2>
      <div className="grid grid-cols-2 gap-3">
        {posts.map((post, index) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative rounded-2xl overflow-hidden bg-white aspect-[3/4] shadow-sm"
            onClick={() => navigate(`/outfit/${post.id}`)}
          >
            <img 
              src={post.thumbnail} 
              alt={`Outfit ${post.id}`} 
              className="w-full h-full object-cover"
            />
            <motion.div 
              className="absolute top-3 right-3 flex gap-2" 
              onClick={e => e.stopPropagation()}
            >
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 bg-white rounded-full shadow-md"
                onClick={() => {
                  if (isInWishlist(post.id)) {
                    removeFromWishlist(post.id);
                  } else {
                    addToWishlist(post);
                  }
                }}
              >
                {isInWishlist(post.id) ? (
                  <HeartSolid className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartOutline className="w-5 h-5" />
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}