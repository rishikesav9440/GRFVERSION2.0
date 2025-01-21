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

    <div className="pt-16">
      <div 
        className="w-full aspect-[3/4] bg-gray-200 animate-[shimmer_1.5s_infinite] md:max-w-2xl md:mx-auto"
        style={{
          background: 'linear-gradient(90deg, #f0f0f0 25%, #f7f7f7 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%'
        }}
      />
    </div>

    <div className="p-4 md:max-w-2xl md:mx-auto">
      <div className="h-6 w-48 bg-gray-200 rounded mb-3 animate-[shimmer_1.5s_infinite]" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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

      <div className="mt-8">
        <div className="h-6 w-48 bg-gray-200 rounded mb-3 animate-[shimmer_1.5s_infinite]" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[...Array(4)].map((_, index) => (
            <div 
              key={index}
              className="aspect-[3/4] rounded-lg bg-gray-200 animate-[shimmer_1.5s_infinite]"
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
  </motion.div>
);

export default function OutfitDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { post, loading: postLoading, error: postError } = usePost(id);
  const { posts } = usePosts();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (postLoading) {
    return (
      <AnimatePresence mode="wait">
        <ShimmerEffect key="shimmer" />
      </AnimatePresence>
    );
  }

  if (postError || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-500">Error: {postError || 'Post not found'}</p>
      </div>
    );
  }

  const handleWishlistClick = () => {
    if (isInWishlist(post.id)) {
      removeFromWishlist(post.id);
    } else {
      addToWishlist(post);
    }
  };

  const items = [
    { src: post.shirt_src, link: post.shirt_buy_link, type: 'Shirt' },
    { src: post.pants_src, link: post.pants_buy_link, type: 'Pants' },
    { src: post.shoes_src, link: post.shoes_buy_link, type: 'Shoes' },
    { src: post.jacket_src, link: post.jacket_buy_link, type: 'Jacket' }
  ].filter(item => item.src && item.link);

  const recommendedPosts = posts
    .filter(p => p.id !== parseInt(id))
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  const handleBackClick = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <AnimatePresence mode="wait">
      {postLoading ? (
        <ShimmerEffect key="shimmer" />
      ) : (
        <motion.div 
          key={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
          className="min-h-screen bg-white"
        >
          <div className="fixed top-0 left-0 right-0 bg-white z-10">
            <div className="flex items-center justify-between p-4 md:max-w-2xl md:mx-auto">
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

          <div className="pt-16 md:max-w-2xl md:mx-auto">
            <motion.img 
              src={post.thumbnail}
              alt="Outfit detail"
              className="w-full aspect-[3/4] object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
          </div>

          <motion.div 
            className="p-4 md:max-w-2xl md:mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: 0.1 }}
          >
            {items.length > 0 && (
              <>
                <h2 className="text-lg font-semibold mb-3">Items in this outfit</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {items.map((item, index) => (
                    item.src && item.link && (
                      <motion.a
                        key={index}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative aspect-square rounded-lg overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <img
                          src={item.src}
                          alt={item.type}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white py-1 text-center text-xs">
                          {item.type}
                        </div>
                      </motion.a>
                    )
                  ))}
                </div>
              </>
            )}

            {recommendedPosts.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-3">You might also like</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {recommendedPosts.map((recommendedPost, index) => (
                    <motion.div 
                      key={recommendedPost.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative rounded-2xl overflow-hidden bg-white aspect-[3/4] shadow-sm"
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
          </motion.div>

          <ShareModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            outfitId={post.id}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
