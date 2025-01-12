import React from 'react';

export default function SearchInput({ onClick }) {
  return (
    <div 
      className="relative bg-white/90 backdrop-blur-sm rounded-full shadow-sm cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4-4-4z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Chat with GRF Ai"
        className="w-full py-3.5 px-4 rounded-full bg-transparent pl-12 text-[16px] placeholder:text-gray-500 focus:outline-none pointer-events-none"
        readOnly
      />
    </div>
  );
}