import React from 'react';
import { motion } from 'framer-motion';

export default function ComingSoonModal({ feature, onDismiss }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute top-24 left-4 right-4 bg-white rounded-xl shadow-lg p-4 z-20"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-1">{feature} Coming Soon</h3>
          <p className="text-sm text-gray-500">We're working on bringing you an amazing experience!</p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="mt-3 text-sm text-purple-600"
            onClick={onDismiss}
          >
            Dismiss
          </motion.button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 z-10"
        onClick={onDismiss}
      />
    </>
  );
}