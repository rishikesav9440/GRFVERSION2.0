import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchInput from './search/SearchInput';

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-gradient-to-r items-center from-pink-300 via-purple-300 to-blue-300">
     <div className="flex justify-center items-center p-4">
        <img 
          src="logowhite.png" 
          alt="Grf Logo" 
          className="h-16 object-contain" 
        />
</div>

      <SearchInput onClick={() => navigate('/chat')} />
    </div>
  );
}