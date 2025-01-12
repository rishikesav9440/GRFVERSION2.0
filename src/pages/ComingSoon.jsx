import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import BottomNavigation from '../components/BottomNavigation';

export default function ComingSoon({ feature }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 bg-white z-10 border-b">
        <div className="flex items-center p-4">
          <motion.button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 mr-4"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </motion.button>
          <h1 className="text-xl font-semibold">{feature}</h1>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-screen px-4 pb-20"
      >
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{feature} Coming Soon</h1>
        <p className="text-gray-500 text-center">
          We're working on bringing you an amazing experience. Stay tuned!
        </p>
      </motion.div>
      <BottomNavigation />
    </div>
  );
}