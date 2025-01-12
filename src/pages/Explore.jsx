import React from 'react';
import Header from '../components/Header2';
import Navigation from '../components/Navigation';
import SwipeableIdeas from '../components/SwipeableIdeas';
import BottomNavigation from '../components/BottomNavigation';

function Explore() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pb-20">
        <SwipeableIdeas />
      </div>
      <BottomNavigation />
    </div>
  );
}

export default Explore;