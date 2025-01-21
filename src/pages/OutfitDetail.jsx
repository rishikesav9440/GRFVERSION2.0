import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { usePost, usePosts } from '../hooks/usePosts';
import { useWishlist } from '../context/WishlistContext';
import ShareModal from '../components/share/ShareModal';

const ShimmerEffect = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.15 }}
    className="min-h-screen bg-white"
  >
    <div className="fixed top-0 left-0 right-0 bg-white z-10">
      <div className="flex items-center justify-between p-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full animate-[shimmer_1.5s_infinite]" />
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-[shimmer_1.5s_infinite]" />
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-[shimmer_1.5s_infinite]" />
        </div>
      </div>
    </div>

    <div className="pt-16 lg:pt-20">
      <div className="lg:max-w-6xl lg:mx-auto lg:flex lg:gap-8 lg:px-4">
        <div 
          className="w-full lg:w-1/2 aspect-[3/4] lg:aspect-[3/3.5] bg-gray-200 animate-[shimmer_1.5s_infinite]"
          style={{
            background: 'linear-gradient(90deg, #f0f0f0 25%, #f7f7f7 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%'
          }}
        />
        <div className="lg:w-1/2">
          <div className="h-6 w-48 bg-gray-200 rounded mb-3 animate-[shimmer_1.5s_infinite]" />
          <div className="grid grid-cols-4 lg:grid-cols-2 gap-2">
            {[...Array(4)].map((_, index) => (
              <div 
                key={index}
                className="aspect-square rounded-lg bg-gray-200 animate-[shimmer_1.5s_infinite]"
                style={{
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #f7f7f7 50%, #f0f0f0 75%)',
                  backgroundSize: '200% 100%',
                  animationDelay: `${index * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function OutfitDetail() {
  // ... (previous hooks and logic remain the same)

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="min-h-screen bg-white"
      >
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 bg-white z-10">
          <div className="flex items-center justify-between p-4 max-w-6xl mx-auto">
            <motion.button 
              onClick={handleBackClick}
              className="p-2 rounded-full hover:bg-gray-100"
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </motion.button>
            <div className="flex gap-4">
              <motion.button 
                className="p-2 rounded-full hover:bg-gray-100"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsShareModalOpen(true)}
              >
                <ShareIcon className="w-6 h-6" />
              </motion.button>
              <motion.button 
                className="p-2 rounded-full hover:bg-gray-100"
                whileTap={{ scale: 0.95 }}
                onClick={handleWishlistClick}
              >
                {isInWishlist(post.id) ? (
                  <HeartSolid className="w-6 h-6 text-red-500" />
                ) : (
                  <HeartOutline className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-16 lg:pt-20">
          <div className="lg:max-w-6xl lg:mx-auto lg:flex lg:gap-12 lg:px-4">
            {/* Main Image */}
            <motion.div 
              className="lg:w-1/2 lg:flex lg:items-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
            >
              <img 
                src={post.thumbnail}
                alt="Outfit detail"
                className="w-full aspect-[3/4] lg:aspect-[3/3.5] object-cover rounded-none lg:rounded-xl"
              />
            </motion.div>

            {/* Side Content */}
            <motion.div 
              className="lg:w-1/2 p-4 lg:p-0 lg:pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: 0.1 }}
            >
              {items.length > 0 && (
                <>
                  <h2 className="text-xl font-semibold mb-6">Items in this outfit</h2>
                  <div className="grid grid-cols-4 lg:grid-cols-2 gap-4 lg:gap-6">
                    {items.map((item, index) => (
                      item.src && item.link && (
                        <motion.a
                          key={index}
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative aspect-square rounded-xl overflow-hidden shadow-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img
                            src={item.src}
                            alt={item.type}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white py-2 text-center text-sm font-medium">
                            {item.type}
                          </div>
                        </motion.a>
                      )
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* Recommended Posts */}
          {recommendedPosts.length > 0 && (
            <div className="mt-8 p-4 lg:p-0 lg:mt-16 lg:mb-12 lg:max-w-6xl lg:mx-auto">
              <h2 className="text-xl font-semibold mb-4">You might also like</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
                {recommendedPosts.map((recommendedPost, index) => (
                  <motion.div 
                    key={recommendedPost.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative rounded-xl overflow-hidden bg-white aspect-[3/4] shadow-sm cursor-pointer"
                    onClick={() => navigate(`/outfit/${recommendedPost.id}`)}
                  >
                    <img 
                      src={recommendedPost.thumbnail} 
                      alt={`Outfit ${recommendedPost.id}`} 
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
                          if (isInWishlist(recommendedPost.id)) {
                            removeFromWishlist(recommendedPost.id);
                          } else {
                            addToWishlist(recommendedPost);
                          }
                        }}
                      >
                        {isInWishlist(recommendedPost.id) ? (
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
          )}
        </div>

        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          outfitId={post.id}
        />
      </motion.div>
    </AnimatePresence>
  );
}
