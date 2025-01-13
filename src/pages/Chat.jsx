import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import BottomNavigation from '../components/BottomNavigation';

export default function Feedback() {
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
          <h1 className="text-xl font-semibold">About</h1>
        </div>
        <div className="text-center py-2 text-sm text-gray-500">
          <p>Email: <a href="mailto:feedback@getreadyfast.in" className="text-blue-600">feedback@getreadyfast.in</a></p>
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
        <p className="text-gray-500 text-center">
          GetReadyFast was born from a simple idea: to simplify shopping. As a single developer with a passion for fashion and technology, I wanted to create a platform that makes it easy to browse, explore, and purchase outfits—all from the comfort of your home. My goal is to make sure you feel confident in what you wear while solving the challenges many people face when shopping online. I'm constantly working to improve the app and bring you new features to enhance your experience. Thank you for being a part of this journey with me, and I appreciate any feedback you can provide to help make GetReadyFast even better!
        </p>
      </motion.div>
      <BottomNavigation />
    </div>
  );
}
