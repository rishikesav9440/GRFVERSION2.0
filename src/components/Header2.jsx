import React from 'react';

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 p-4 z-50" style={{ backgroundColor: '#222131' }}> {/* Dark purple background */}
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
