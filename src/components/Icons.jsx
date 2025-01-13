import React from 'react';
import { 
  ClockIcon as HeroClockIcon,
  HeartIcon as HeroHeartIcon,
  ShareIcon as HeroShareIcon,
  HomeIcon as HeroHomeIcon,
  BookmarkIcon as HeroBookmarkIcon,
  PlusCircleIcon as HeroPlusCircleIcon,
  InformationCircleIcon as HeroInformationCircleIcon, // New icon for About Us
  GlobeAltIcon as HeroGlobeAltIcon // Import the Globe icon for Explore
} from '@heroicons/react/24/outline';

export const ClockIcon = () => <HeroClockIcon className="w-6 h-6" />;
export const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
    />
  </svg>
);
export const HeartIcon = () => <HeroHeartIcon className="w-5 h-5" />;
export const ShareIcon = () => <HeroShareIcon className="w-5 h-5" />;
export const HomeIcon = () => <HeroHomeIcon className="w-6 h-6" />;
export const BookmarkIcon = () => <HeroBookmarkIcon className="w-6 h-6" />;
export const PlusCircleIcon = () => <HeroPlusCircleIcon className="w-6 h-6" />;
export const InformationCircleIcon = () => <HeroInformationCircleIcon className="w-6 h-6" />; // Added InformationCircleIcon
export const ExploreIcon = () => <HeroGlobeAltIcon className="w-6 h-6" />;
