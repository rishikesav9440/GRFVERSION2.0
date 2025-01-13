import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import BottomNavigation from '../components/BottomNavigation';

export default function AboutUs() {
  const navigate = useNavigate();

  useEffect(() => {
    // Reset scroll position to the top when the page is loaded
    window.scrollTo(0, 0);
  }, []);

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
          <h1 className="text-xl font-semibold">About Us</h1>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-screen px-4 pb-20"
      >
        <div className="text-gray-400 mb-9">
          <br /><br /><br /><br />
        </div>

        <div className="max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-500 mb-6">
            GetReadyFast was born out of a simple idea: to make shopping a smoother and more enjoyable experience. As a solo developer, I wanted to create a platform that makes it easy for people to find and buy outfits that match their style, all without the stress and complexity often associated with online shopping.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Why GetReadyFast?</h2>
          <p className="text-gray-500 mb-6">
            The vision behind GetReadyFast is to provide a simplified, user-friendly shopping experience that saves you time and effort. Whether you're looking for a quick outfit for an event or something casual for daily wear, we aim to make the entire process hassle-free and enjoyable. 
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Who Am I?</h2>
          <p className="text-gray-500 mb-6">
            I'm a passionate developer who believes in the power of technology to transform everyday tasks. My journey into fashion and app development led me to create GetReadyFast, and I'm constantly working to improve it with new features and improvements. This project is very personal to me, and I’m dedicated to making it the best it can be.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Get In Touch</h2>
          <p className="text-gray-500">
            We’d love to hear from you! If you have any feedback or suggestions, feel free to reach out via email at <a href="mailto:feedback@getreadyfast.in" className="text-blue-600">feedback@getreadyfast.in</a>.
          </p>
        </div>
      </motion.div>
      
      <BottomNavigation />
    </div>
  );
}
