import React from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import IdeasGrid from '../components/IdeasGrid';
import BottomNavigation from '../components/BottomNavigation';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <IdeasGrid />
   
      <BottomNavigation />
    </div>
  );
}

export default Home;
