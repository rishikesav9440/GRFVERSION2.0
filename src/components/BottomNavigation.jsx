import React from 'react';
import { HomeIcon, BookmarkIcon, PlusCircleIcon, ChatIcon, ExploreIcon } from './Icons'; // Ensure ExploreIcon is imported
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <HomeIcon />, label: 'Feed', path: '/' },
    { icon: <BookmarkIcon />, label: 'Wishlist', path: '/wishlist' },
    { icon: <ExploreIcon />, label: 'Explore', path: '/explore' }, // New item added here
    { icon: <PlusCircleIcon />, label: 'Create', path: '/create' },
    { icon: <ChatIcon />, label: 'Chat', path: '/chat' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-between px-8 py-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.button
              key={item.path}
              className="flex flex-col items-center gap-1"
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(item.path)}
            >
              <div className={isActive ? 'text-purple-600' : 'text-gray-600'}>
                {item.icon}
              </div>
              <span className={`text-[11px] ${isActive ? 'text-purple-600' : 'text-gray-600'}`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
