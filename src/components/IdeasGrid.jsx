import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { usePosts } from '../hooks/usePosts';
import { useWishlist } from '../context/WishlistContext';

const ShimmerCard = () => (
  <div className="relative rounded-2xl overflow-hidden bg-white aspect-[3/4] shadow-sm">
    <div
      className="w-full h-full bg-gray-200 animate-[shimmer_1.5s_infinite]" 
      style={{
        background: 'linear-gradient(90deg, #f0f0f0 25%, #f7f7f7 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite linear',
      }}
    />
  </div>
);

// Check if it's actually the first visit to the app
const isActualFirstVisit = () => {
  const hasVisited = localStorage.getItem('hasVisitedBefore');
  if (!hasVisited) {
    localStorage.setItem('hasVisitedBefore', 'true');
    return true;
  }
  return false;
};

export default function IdeasGrid() {
  const navigate = useNavigate();
  const { posts, loading, error } = usePosts();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [cachedPosts, setCachedPosts] = useState(() => {
    const savedPosts = sessionStorage.getItem('cachedPosts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  // Use localStorage instead of sessionStorage for first load state
  const [isFirstLoad] = useState(isActualFirstVisit);
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    if (posts.length > 0) {
      const reversedPosts = posts.slice().reverse();
      setCachedPosts(reversedPosts);
      sessionStorage.setItem('cachedPosts', JSON.stringify(reversedPosts));
    }
  }, [posts]);

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }

    const handleScroll = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigate = (postId) => {
    navigate(`/outfit/${postId}`);
  };

  const handleImageLoad = (postId) => {
    setLoadingStates(prev => ({
      ...prev,
      [postId]: false
    }));
  };

  const isToday = (dateTime) => {
    const today = new Date().toISOString().split('T')[0];
    return dateTime.startsWith(today);
  };

  if (loading && cachedPosts.length === 0) {
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
        {cachedPosts.map((post, index) => (
          <motion.div 
            key={post.id}
            initial={isFirstLoad ? { opacity: 0, y: 20 } : false}
            animate={isFirstLoad ? { opacity: 1, y: 0 } : false}
            transition={isFirstLoad ? { delay: index * 0.1 } : {}}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative rounded-2xl overflow-hidden bg-white aspect-[3/4] shadow-sm"
            onClick={() => handleNavigate(post.id)}
          >
            {loadingStates[post.id] !== false && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            <img
              src={post.thumbnail}
              alt={`Outfit ${post.id}`}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                loadingStates[post.id] === false ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => handleImageLoad(post.id)}
            />

            {isToday(post.date_time) && (
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                Added Today!
              </div>
            )}

            <motion.div 
              className="absolute top-3 right-3" 
              onClick={(e) => e.stopPropagation()}
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