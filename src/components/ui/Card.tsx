// src/components/ui/Card.tsx
import React from 'react';
 import { DESIGN_SYSTEM } from '../../config/designSystem';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  hover = false 
}) => {
  const baseClasses = `rounded-lg border transition-all duration-300`;
  const hoverClasses = hover ? `hover:border-orange-500 hover:-translate-y-2` : '';
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};