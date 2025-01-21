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

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;


const ShimmerCard = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  ${shimmerBackground}
`;
const CardContainer = styled.div`
  position: fixed;




  overflow: hidden;




`;

const CardStack = styled.div`
  position: fixed;

`;



const Card = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  touch-action: none;
`;

const CardContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const ActionLabel = styled.div`
  position: absolute;
  padding: 0.5rem 1rem;
  border: 4px solid;
  border-radius: 0.75rem;
  font-size: 2rem;
  font-weight: bold;
  opacity: 0.9;
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    padding: 0.25rem 0.75rem;
    border-width: 3px;
  }

  ${props =>
    props.type === 'like'
      ? `
    top: 2rem;
    left: 2rem;
    transform: rotate(-12deg);
    border-color: #22c55e;
    color: #22c55e;
  `
      : `
    top: 2rem;
    right: 2rem;
    transform: rotate(12deg);
    border-color: #ef4444;
    color: #ef4444;
  `}
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  text-align: center;
`;

const StartOverButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
  border-radius: 0.75rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2563eb;
  }
  
  &:focus {
    outline: none;
    ring: 2px;
    ring-offset: 2px;
    ring-blue-500;
  }
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
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  
  useEffect(() => {
    localStorage.setItem('displayedOutfits', JSON.stringify(displayedOutfits));
  }, [displayedOutfits]);

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
        <EmptyStateContainer>
          <div className="text-red-500 text-lg font-medium mb-4">
            Error: {error}
          </div>
        </EmptyStateContainer>
      </CardContainer>
    );
  }

  if (activeIndex >= filteredOutfits.length) {
    return (
      <CardContainer>
        <EmptyStateContainer>
          <h2 className="text-2xl font-semibold mb-6">No more outfits!</h2>
          <StartOverButton onClick={handleStartOver}>
            Start Over
          </StartOverButton>
        </EmptyStateContainer>
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
          rotate: isTop ? x.get() * 0.05 : 0, // Add subtle rotation based on drag
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
            className="object-cover"
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
        {filteredOutfits
          .slice(activeIndex, activeIndex + 3)
          .map((_, i) => renderCard(activeIndex + i))
          .reverse()}
      </CardStack>
    </CardContainer>
  );
};

export default StackedCards;
