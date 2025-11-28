// components/CardHeader.tsx
import React from 'react';

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  align?: 'start' | 'center' | 'between';
}

function CardHeader({ 
  title, 
  subtitle, 
  action, 
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  align = 'between'
}: CardHeaderProps) {
  const alignClasses = {
    start: 'justify-start',
    center: 'justify-center',
    between: 'justify-between'
  };

  return (
    <div className={`flex items-center ${alignClasses[align]} ${className}`}>
      <div className={`${align === 'center' ? 'text-center' : ''}`}>
        <h3 className={`text-lg font-semibold text-gray-900 ${titleClassName}`}>
          {title}
        </h3>
        {subtitle && (
          <p className={`text-sm text-gray-500 mt-1 ${subtitleClassName}`}>
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className={`${align === 'center' ? 'absolute right-0' : ''}`}>
          {action}
        </div>
      )}
    </div>
  );
}

export default CardHeader;