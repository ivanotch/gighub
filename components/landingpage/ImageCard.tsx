// components/ImageCard.tsx
import React from 'react';
import Card from './Card';
import CardHeader from './CardHeader';

interface ImageCardProps {
  imageUrl: string;
  imageAlt?: string;
  title: string;
  subtitle?: React.ReactNode;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
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

  const imageHeightClasses = {
    sm: 'h-40',
    md: 'h-48',
    lg: 'h-56',
    xl: 'h-64'
  };

  const imageFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain'
  };

  return (
    <Card 
      className={`flex flex-col overflow-hidden ${className} h-full`} // h-full lets flex grow in grid
      hover 
      onClick={onClick}
      padding="none"
    >
      {/* Image */}
      <div className={`w-full ${imageHeightClasses[size]} overflow-hidden bg-gray-100`}>
        <img 
          src={imageUrl} 
          alt={imageAlt}
          className={`w-full h-full ${imageFitClasses[imageFit]} transition-transform duration-300 hover:scale-105`}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="mb-4">
          <CardHeader title={title} subtitle={subtitle} />
          {description && (
            <p className="text-gray-600 text-sm mt-2 line-clamp-3">
              {description}
            </p>
          )}
        </div>

        {/* Bottom-aligned button */}
        {action && <div className="mt-auto">{action}</div>}
      </div>
    </Card>
  );
}

export default ImageCard;
