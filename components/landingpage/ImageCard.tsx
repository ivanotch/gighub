// components/ImageCard.tsx
import React from 'react';
import Card from './Card';
import CardHeader from './CardHeader';
import CardFooter from './CardFooter';

interface ImageCardProps {
  imageUrl: string;
  imageAlt?: string;
  title: string;
  subtitle?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  // Fixed card size options
  size?: 'sm' | 'md' | 'lg' | 'xl';
  // Image fitting options
  imageFit?: 'cover' | 'contain';
  onClick?: () => void;
}

function ImageCard({
  imageUrl,
  imageAlt = '',
  title,
  subtitle,
  description,
  action,
  className = '',
  size = 'md',
  imageFit = 'cover',
  onClick
}: ImageCardProps) {
  // Fixed card dimensions for each size
  const sizeClasses = {
    sm: 'w-64 h-80',      // 256px x 320px
    md: 'w-80 h-96',      // 320px x 384px  
    lg: 'w-96 h-[28rem]', // 384px x 448px
    xl: 'w-[28rem] h-[32rem]' // 448px x 512px
  };

  const imageHeightClasses = {
    sm: 'h-40', // 160px
    md: 'h-48', // 192px
    lg: 'h-56', // 224px
    xl: 'h-64'  // 256px
  };

  const imageFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain'
  };

  return (
    <Card 
      className={`${sizeClasses[size]} flex flex-col overflow-hidden ${className}`} 
      hover 
      onClick={onClick}
      padding="none" // Remove padding since we're handling layout manually
    >
      {/* Image Section - Fixed height */}
      <div className={`w-full ${imageHeightClasses[size]} overflow-hidden bg-gray-100`}>
        <img 
          src={imageUrl} 
          alt={imageAlt}
          className={`
            w-full h-full 
            ${imageFitClasses[imageFit]}
            transition-transform duration-300 hover:scale-105
          `}
        />
      </div>
      
      {/* Content Section - Flexible height that fills remaining space */}
      <div className="flex-1 p-4 flex flex-col">
        <CardHeader 
          title={title}
          subtitle={subtitle}
          action={action}
          className="mb-2"
        />
        
        {description && (
          <p className="text-gray-600 text-sm mt-2 line-clamp-3 flex-1">
            {description}
          </p>
        )}
      </div>
    </Card>
  );
}

export default ImageCard;