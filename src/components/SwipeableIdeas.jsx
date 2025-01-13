import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { useWishlist } from '../context/WishlistContext';

const ShimmerCard = () => (
  <div className="relative h-[70vh] w-full rounded-2xl bg-white mx-auto my-4">
    <div
      className="w-full h-full bg-gray-200 animate-[shimmer_1.5s_infinite]"
      style={{
        background: 'linear-gradient(90deg, #f0f0f0 25%, #f7f7f7 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite linear',
      }}
    />
  </div>
);

export default function TinderOutfits() {
  const navigate = useNavigate();
  const { posts, loading, error } = usePosts();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Apply styles to disable scrolling
  React.useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  if (loading) return <div className="flex justify-center w-full p-8"><ShimmerCard /></div>;
  if (error) return <div className="w-full p-8 text-red-500">Error: {error}</div>;

  const handleDragStart = (e) => {
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setIsDragging(false);
  };

  const handleDragMove = (e) => {
    if (!dragStart.x || !dragStart.y) return;
    const touch = e.touches[0];
    const newOffset = {
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y,
    };
    setOffset(newOffset);
    
    // If the user has dragged more than 10px, consider it a drag rather than a tap
    if (Math.abs(newOffset.x) > 10 || Math.abs(newOffset.y) > 10) {
      setIsDragging(true);
    }
  };

  const handleDragEnd = () => {
    const threshold = 100;
    if (offset.x > threshold) {
      if (currentIndex < posts.length) {
        addToWishlist(posts[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }
    } else if (offset.x < -threshold) {
      if (currentIndex < posts.length) {
        setCurrentIndex(currentIndex + 1);
      }
    }
    setDragStart({ x: 0, y: 0 });
    setOffset({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const handleClick = () => {
    if (!isDragging && currentIndex < posts.length) {
      navigate(`/outfit/${posts[currentIndex].id}`);
    }
  };

  if (currentIndex >= posts.length) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-50 p-8">
        <h2 className="text-2xl font-semibold mb-6">No more outfits!</h2>
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-lg"
          onClick={() => setCurrentIndex(0)}
        >
          Start Over
        </button>
      </div>
    );
  }

  const rotation = (offset.x / 10).toFixed(1);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-50 p-8">
      <br />
      <div
        className="relative h-[70vh] w-full mx-auto"
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onClick={handleClick}
      >
        <div
          className={`absolute inset-0 rounded-2xl overflow-hidden bg-white shadow-lg ${
            !isDragging ? 'cursor-pointer' : ''
          }`}
          style={{
            transform: `rotate(${rotation}deg) translateX(${offset.x}px)`,
            transition: dragStart.x ? 'none' : 'all 0.5s',
          }}
        >
          <img
            src={posts[currentIndex].thumbnail}
            alt={`Outfit ${posts[currentIndex].id}`}
            className="w-full h-full object-cover"
          />
          {offset.x > 0 && (
            <div className="absolute top-8 left-8 transform -rotate-12 border-4 border-green-500 rounded-lg p-2">
              <span className="text-green-500 text-4xl font-bold">LIKE</span>
            </div>
          )}
          {offset.x < 0 && (
            <div className="absolute top-8 right-8 transform rotate-12 border-4 border-red-500 rounded-lg p-2">
              <span className="text-red-500 text-4xl font-bold">PASS</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}