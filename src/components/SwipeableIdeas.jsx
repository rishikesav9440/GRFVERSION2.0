import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { useWishlist } from '../context/WishlistContext';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import styled from '@emotion/styled';

const shimmerBackground = `
  background: linear-gradient(90deg, #f0f0f0 25%, #f7f7f7 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
`;

const ShimmerCard = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  ${shimmerBackground}
`;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #f9fafb;
  overflow: hidden;
`;

const CardStack = styled.div`
  position: relative;
  width: 100%;
  max-width: 23rem;
  height: 65vh;
  margin: 4rem auto;
`;

const Card = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  touch-action: none;
`;

const CardContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ActionLabel = styled.div`
  position: absolute;
  padding: 0.25rem 0.75rem;
  border: 3px solid;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  ${props =>
    props.type === 'like'
      ? `
    top: 1rem;
    left: 1rem;
    transform: rotate(-12deg);
    border-color: #22c55e;
    color: #22c55e;
  `
      : `
    top: 1rem;
    right: 1rem;
    transform: rotate(12deg);
    border-color: #ef4444;
    color: #ef4444;
  `}
`;

const StackedCards = () => {
  const navigate = useNavigate();
  const { posts, loading, error } = usePosts();
  const { addToWishlist } = useWishlist();
  const [activeIndex, setActiveIndex] = useState(0);
  const [allOutfits, setAllOutfits] = useState([]);
  const [displayedOutfits, setDisplayedOutfits] = useState(() => {
    const saved = localStorage.getItem('displayedOutfits');
    return saved ? JSON.parse(saved) : [];
  });
  const [filteredOutfits, setFilteredOutfits] = useState([]);

  const controls = useAnimation();
  const x = useMotionValue(0);

  useEffect(() => {
    if (posts.length > 0) {
      const filtered = posts.filter(post => !displayedOutfits.includes(post.id));
      setAllOutfits(posts);
      setFilteredOutfits(filtered);
    }
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('displayedOutfits', JSON.stringify(displayedOutfits));
  }, [displayedOutfits]);

  if (loading) {
    return (
      <CardContainer>
        <CardStack>
          <ShimmerCard />
        </CardStack>
      </CardContainer>
    );
  }

  if (error) {
    return (
      <CardContainer>
        <div className="flex items-center justify-center h-full text-red-500">
          Error: {error}
        </div>
      </CardContainer>
    );
  }

  const handleDragEnd = async (_, info) => {
    const threshold = 100;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (Math.abs(offset) > threshold || Math.abs(velocity) > 800) {
      const direction = offset > 0 || velocity > 800;
      const distance = direction ? window.innerWidth : -window.innerWidth;

      await controls.start({
        x: distance,
        transition: { duration: 0.2 }
      });

      if (direction) {
        addToWishlist(filteredOutfits[activeIndex]);
      }
      setDisplayedOutfits(prev => [...prev, filteredOutfits[activeIndex].id]);
      setActiveIndex(prev => prev + 1);
      x.set(0);
      controls.set({ x: 0 });
    } else {
      controls.start({
        x: 0,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      });
    }
  };

  const handleStartOver = () => {
    setDisplayedOutfits([]);
    setFilteredOutfits(allOutfits);
    setActiveIndex(0);
    localStorage.removeItem('displayedOutfits');
  };

  if (activeIndex >= filteredOutfits.length) {
    return (
      <CardContainer>
        <div className="flex flex-col items-center justify-center h-full p-8">
          <h2 className="text-2xl font-semibold mb-6">No more outfits!</h2>
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleStartOver}
          >
            Start Over
          </button>
        </div>
      </CardContainer>
    );
  }

  const renderCard = (index) => {
    const card = filteredOutfits[index];
    if (!card) return null;

    const isTop = index === activeIndex;
    const offset = (index - activeIndex) * 10;

    return (
      <Card
        key={card.id}
        style={{
          x: isTop ? x : 0,
          y: offset,
          zIndex: filteredOutfits.length - index,
        }}
        animate={isTop ? controls : undefined}
        drag={isTop ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={isTop ? handleDragEnd : undefined}
        whileTap={isTop ? { cursor: 'grabbing' } : undefined}
        onClick={() => {
          if (isTop && Math.abs(x.get()) < 5) {
            navigate(`/outfit/${card.id}`);
          }
        }}
      >
        <CardContent>
          <img
            src={card.thumbnail}
            alt={`Outfit ${card.id}`}
            className="w-full h-full object-cover"
            draggable="false"
          />
          {isTop && x.get() > 50 && (
            <ActionLabel type="like">LIKE</ActionLabel>
          )}
          {isTop && x.get() < -50 && (
            <ActionLabel type="pass">PASS</ActionLabel>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <CardContainer>
      <CardStack>
        {filteredOutfits.slice(activeIndex, activeIndex + 3).map((_, i) => renderCard(activeIndex + i)).reverse()}
      </CardStack>
    </CardContainer>
  );
};

export default StackedCards;
