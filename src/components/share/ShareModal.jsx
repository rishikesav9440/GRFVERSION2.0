import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function ShareModal({ isOpen, onClose, outfitId }) {
  const shareUrl = `${window.location.origin}/outfit/${outfitId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.custom((t) => (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="flex items-center gap-2 bg-black text-white px-4 py-3 rounded-full shadow-lg"
        >
          <span className="text-lg">✨</span>
          <span className="text-sm font-medium">Link copied to clipboard</span>
        </motion.div>
      ), {
        duration: 2000,
        position: 'bottom-center',
      });
      onClose();
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this outfit!',
          url: shareUrl
        });
        onClose();
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 z-50"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Share this outfit</h3>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <XMarkIcon className="w-6 h-6" />
              </motion.button>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleShare}
              className="w-full bg-black text-white rounded-full py-3 font-medium mb-3"
            >
              Share outfit
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleCopyLink}
              className="w-full border border-gray-300 rounded-full py-3 font-medium"
            >
              Copy link
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}