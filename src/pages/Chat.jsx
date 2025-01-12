import React from 'react';
import { motion } from 'framer-motion';
import { ChatIcon } from '../components/Icons';
import BottomNavigation from '../components/BottomNavigation';

export default function Chat() {
  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-screen px-4 pb-20"
      >
        <div className="text-gray-400 mb-4">
          <ChatIcon />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Chat Coming Soon</h1>
        <p className="text-gray-500 text-center">
          We're working on bringing you an amazing chat experience. Stay tuned!
        </p>
      </motion.div>
      <BottomNavigation />
    </div>
  );
}