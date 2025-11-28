// components/CardFooter.tsx
import React from 'react';

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  justify?: 'start' | 'end' | 'between' | 'center';
  direction?: 'row' | 'col';
  padding?: 'none' | 'sm' | 'md';
}

function CardFooter({ 
  children, 
  className = '', 
  justify = 'end',
  direction = 'row',
  padding = 'md'
}: CardFooterProps) {
  const justifyClasses = {
    start: 'justify-start',
    end: 'justify-end',
    between: 'justify-between',
    center: 'justify-center'
  };

  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col'
  };

  const paddingClasses = {
    none: '',
    sm: 'pt-4',
    md: 'pt-6'
  };

  return (
    <div className={`flex ${directionClasses[direction]} ${justifyClasses[justify]} gap-3 ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
}

export default CardFooter;