import React from 'react';
import { motion } from 'framer-motion';

export default function NavItem({ icon, label, onClick, index }) {
  return (
    <motion.button 
      className="flex flex-col items-center gap-1.5 z-10"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
    >
      <motion.div 
        className="text-purple-600"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      <span className="text-[13px] text-gray-600 font-medium">{label}</span>
    </motion.button>
  );
}