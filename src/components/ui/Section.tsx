// src/components/ui/Section.tsx
import React from 'react';
 import { DESIGN_SYSTEM } from '../../config/designSystem';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: 'primary' | 'secondary';
  padding?: 'sm' | 'md' | 'lg';
}

export const Section: React.FC<SectionProps> = ({
  children,
  id,
  className = '',
  background = 'primary',
  padding = 'md',
}) => {
  const backgroundClasses = {
    primary: `bg-black`,
    secondary: `bg-gray-900`,
  };

  const paddingClasses = {
    sm: 'py-8',
    md: 'py-12 sm:py-16 lg:py-20',
    lg: 'py-16 sm:py-20 lg:py-24',
  };

  return (
    <section
      id={id}
      className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};