import React, { useState } from 'react';
import { TbHanger, TbRulerMeasure } from 'react-icons/tb';
import { BsFillCameraFill } from 'react-icons/bs';
import { RiUserSettingsLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { icon: <TbHanger size={26} />, label: 'Pairing' },
  { icon: <BsFillCameraFill size={24} />, label: 'Face Shape' },
  { icon: <TbRulerMeasure size={26} />, label: 'Fit Check' },
  { icon: <RiUserSettingsLine size={26} />, label: 'Style Analysis' }
];

const ComingSoonModal = ({ feature, onClose }) => (
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
        onClick={onClose}
      >
        Dismiss
      </motion.button>
    </div>
  </motion.div>
);

export default function Navigation() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <div className="relative">
      <div className="flex justify-between px-8 py-5">
        {navItems.map((item, index) => (
          <motion.button 
            key={index} 
            className="flex flex-col items-center gap-1.5 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedFeature(selectedFeature === item.label ? null : item.label)}
          >
            <motion.div 
              className="text-purple-600"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {item.icon}
            </motion.div>
            <span className="text-[13px] text-gray-600 font-medium">{item.label}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedFeature && (
          <>
            <ComingSoonModal 
              feature={selectedFeature} 
              onClose={() => setSelectedFeature(null)} 
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-10"
              onClick={() => setSelectedFeature(null)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}