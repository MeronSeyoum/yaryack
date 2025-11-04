// src/components/ui/Button.tsx
import React from 'react';
 import { DESIGN_SYSTEM } from '../../config/designSystem';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  icon?: LucideIcon;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  icon: Icon,
  className = '',
  disabled = false,
  type = 'button',
}) => {
  const baseClasses = `inline-flex items-center justify-center font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2`;
  
  const variantClasses = {
    primary: `bg-orange-500 text-black hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed focus:ring-orange-500`,
    secondary: `bg-white text-gray-900 hover:bg-gray-100 focus:ring-gray-300`,
    outline: `border border-white text-white hover:bg-white hover:text-black focus:ring-white`,
  };

  const sizeClasses = {
    sm: `px-4 py-2 text-sm rounded-md`,
    md: `px-6 py-3 text-sm rounded-lg`,
    lg: `px-8 py-4 text-base rounded-lg`,
  };

  const transitionClass = `duration-200`;

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${transitionClass} ${className}`;
  if (href) {
    return (
      <a href={href} className={classes}>
        {Icon && <Icon className="w-4 h-4 mr-2" />}
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
};