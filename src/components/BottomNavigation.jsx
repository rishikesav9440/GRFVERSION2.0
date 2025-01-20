import React from 'react';
import { HomeIcon, BookmarkIcon, PlusCircleIcon, InformationCircleIcon, ExploreIcon } from './Icons'; // Ensure ExploreIcon is imported
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BottomNavigation() {
  const location = useLocation();

  const navItems = [
    { icon: <HomeIcon />, label: 'Feed', path: '/' },
    { icon: <BookmarkIcon />, label: 'Wishlist', path: '/wishlist' },
    { icon: <ExploreIcon />, label: 'Explore', path: '/explore' }, // New item added here
    { icon: <InformationCircleIcon />, label: 'About Us', path: '/chat' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50" style={{ position: 'sticky', bottom: 0 }}>
      <div className="flex justify-between px-8 py-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link to={item.path} key={item.path} className="flex flex-col items-center gap-1">
              <motion.div whileTap={{ scale: 0.95 }} className={isActive ? 'text-purple-600' : 'text-gray-600'}>
                {item.icon}
              </motion.div>
              <span className={`text-[11px] ${isActive ? 'text-purple-600' : 'text-gray-600'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
