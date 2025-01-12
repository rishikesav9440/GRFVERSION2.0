import React from 'react';

export default function Header() {
  return (
    <div className="p-4" style={{ backgroundColor: '#222131' }}> {/* Dark purple background */}
      <div className="flex justify-center items-center">
        <img 
          src="logo.jpeg" 
          alt="Grf Logo" 
          className="h-16 object-contain" 
        />
      </div>
    </div>
  );
}
