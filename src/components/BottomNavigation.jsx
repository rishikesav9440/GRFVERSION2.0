import React from 'react';
import { 
  Home, 
  Bookmark, 
  Globe, 
  Info,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Feed', path: '/' },
    { icon: Globe, label: 'Explore', path: '/explore' },
    { icon: Bookmark, label: 'Wishlist', path: '/wishlist' },
    { icon: Info, label: 'About', path: '/chat' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-lg mx-auto bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-between items-center px-6 py-2">
          {navItems.map(({ icon: Icon, label, path, className }) => {
            const isActive = location.pathname === path;
            const activeClass = isActive ? 'text-purple-600' : 'text-gray-600';
            
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center gap-1 p-2 transition-colors duration-200 ${className || ''}`}
              >
                <Icon
                  size={24}
                  className={`${activeClass} transition-transform duration-200 hover:scale-110`}
                />
                <span className={`text-xs font-medium ${activeClass}`}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
