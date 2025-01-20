import React from 'react';
import { HomeIcon, BookmarkIcon, PlusCircleIcon, InformationCircleIcon, ExploreIcon } from './Icons';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNavigation() {
  const location = useLocation();

  const navItems = [
    { icon: <HomeIcon />, label: 'Feed', path: '/' },
    { icon: <BookmarkIcon />, label: 'Wishlist', path: '/wishlist' },
    { icon: <ExploreIcon />, label: 'Explore', path: '/explore' },
    { icon: <InformationCircleIcon />, label: 'About Us', path: '/chat' },
  ];

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around py-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link to={item.path} key={item.path} className="flex flex-col items-center">
              <div className={isActive ? 'text-purple-600' : 'text-gray-600'}>
                {item.icon}
              </div>
              <span className={`text-xs ${isActive ? 'text-purple-600' : 'text-gray-600'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
