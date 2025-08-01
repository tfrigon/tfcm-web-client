import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div 
      className={`
        bg-gradient-to-b from-white to-gray-50 
        border border-gray-300 
        rounded-xl 
        p-4 
        mb-6 
        shadow-lg 
        hover:shadow-xl 
        hover:-translate-y-0.5 
        transition-all 
        duration-200 
        ${className}
      `}
    >
      {title && (
        <h3 className="text-[#2E7D32] font-light text-3xl mb-6">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default Card;
