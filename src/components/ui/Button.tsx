import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'add' | 'remove';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'default', 
  children, 
  className = '',
  ...props 
}) => {
  const baseClasses = `
    px-6 py-2.5 
    text-base 
    rounded-lg 
    text-center 
    leading-6 
    mx-4 my-4 
    border 
    inline-block 
    transition-all 
    duration-300 
    outline-none 
    cursor-pointer
    font-medium
  `;

  const variantClasses = {
    default: `
      bg-gray-300 
      border-gray-400 
      text-gray-800 
      hover:bg-gray-400 
      hover:text-gray-900
    `,
    add: `
      bg-[#2E7D32] 
      text-white 
      border-[#2E7D32]
      hover:bg-[#c8e6c9] 
      hover:text-[#1b5e20] 
      hover:border-[#1b5e20]
    `,
    remove: `
      bg-[#ef9a9a] 
      text-black 
      border-[#ef9a9a]
      hover:bg-[#ef5350] 
      hover:text-white 
      hover:border-[#b71c1c]
    `
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
