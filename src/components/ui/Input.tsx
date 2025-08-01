import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  tooltip?: string;
}

const Input: React.FC<InputProps> = ({ label, tooltip, className = '', ...props }) => {
  return (
    <div className="flex flex-col justify-start items-stretch mb-3">
      <label className="text-sm mb-1 text-gray-700 font-normal flex items-center">
        {tooltip && (
          <span 
            className="inline-flex items-center justify-center w-4 h-4 mr-1 text-xs bg-blue-500 text-white rounded-full cursor-help"
            title={tooltip}
          >
            i
          </span>
        )}
        {label}
      </label>
      <input
        className={`
          rounded-lg 
          border border-gray-300 
          px-3 py-2 
          transition-all 
          duration-200 
          w-full 
          focus:border-[#2E7D32] 
          focus:shadow-[0_0_0_2px_rgba(46,125,50,0.2)] 
          focus:outline-none
          text-sm
          ${className}
        `}
        {...props}
      />
    </div>
  );
};

export default Input;
