// src/components/ui/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'glass';
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  variant = 'default',
  padding = 'md',
  hover = true
}) => {
  // Base classes using design system
  const baseClasses = 'ds-card';
  
  // Variant classes
  const variantClasses = {
    default: '',
    elevated: 'ds-card-elevated',
    glass: 'backdrop-blur-md bg-white/5 border-white/20',
  };

  // Padding classes
  const paddingClasses = {
    sm: 'ds-card-p-sm',
    md: 'ds-card-p-md',
    lg: 'ds-card-p-lg',
  };

  // Disable hover effect if specified
  const hoverClass = hover ? '' : 'hover:bg-[var(--color-bg-card)] hover:border-[var(--color-border-primary)] hover:shadow-none hover:transform-none';
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};