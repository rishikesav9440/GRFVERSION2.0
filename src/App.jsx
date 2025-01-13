import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { WishlistProvider } from './context/WishlistContext';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import OutfitDetail from './pages/OutfitDetail';
import Wishlist from './pages/Wishlist';
import ComingSoon from './pages/ComingSoon';
import Explore from './pages/Explore';

function App() {
  return (
    <WishlistProvider>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/outfit/:id" element={<OutfitDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/chat" element={<ComingSoon feature="Chat" />} />
            <Route path="/create" element={<ComingSoon feature="Create" />} />
            {/* Add a catch-all route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
        <Toaster
          containerStyle={{
            bottom: 80,
          }}
        />
      </BrowserRouter>
    </WishlistProvider>
  );
}

export default App;
