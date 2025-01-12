import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const WishlistContext = createContext(null);

const Toast = ({ message, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.3 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    className="flex items-center gap-2 bg-black text-white px-4 py-3 rounded-full shadow-lg"
  >
    <span className="text-lg">{icon}</span>
    <span className="text-sm font-medium">{message}</span>
  </motion.div>
);

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (outfit) => {
    setWishlist((prev) => {
      if (!prev.some(item => item.id === outfit.id)) {
        toast.custom(() => (
          <Toast message="Added to wishlist" icon="❤️" />
        ), {
          duration: 2000,
          position: 'bottom-center',
        });
        return [...prev, outfit];
      }
      return prev;
    });
  };

  const removeFromWishlist = (outfitId) => {
    setWishlist((prev) => {
      toast.custom(() => (
        <Toast message="Removed from wishlist" icon="💔" />
      ), {
        duration: 2000,
        position: 'bottom-center',
      });
      return prev.filter(item => item.id !== outfitId);
    });
  };

  const isInWishlist = (outfitId) => {
    return wishlist.some(item => item.id === outfitId);
  };

  const value = useMemo(() => ({
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  }), [wishlist]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

export { WishlistProvider, useWishlist };