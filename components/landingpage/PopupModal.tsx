// components/PopupModal.tsx
import React from 'react';

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

function PopupModal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true
}: PopupModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-transparent bg-opacity-30 flex items-center justify-center z-50 p-4"
      style={{
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)'
      }}
      onClick={handleBackdropClick}
    >
      <div className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden`}>
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {title && <h2 className="text-xl font-semibold text-gray-900">{title}</h2>}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 text-2xl font-light leading-none p-1 rounded-full hover:bg-gray-100 w-8 h-8 flex items-center justify-center"
                aria-label="Close modal"
              >
                &times;
              </button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default PopupModal;