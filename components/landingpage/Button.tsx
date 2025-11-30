// components/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; // Updated to accept event
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  loading?: boolean;
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  loading = false
}: ButtonProps) {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500 shadow-sm',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500 shadow-sm',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 shadow-sm',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500 shadow-sm',
    success: 'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500 shadow-sm',
    outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-blue-500 bg-transparent',
    ghost: 'hover:bg-gray-100 text-gray-700 focus:ring-blue-500 bg-transparent'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      <div className="flex items-center justify-center gap-2">
        {loading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </div>
    </button>
  );
}

export default Button;