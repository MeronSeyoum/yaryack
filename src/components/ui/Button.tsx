// src/components/ui/Button.tsx
import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
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
  // Base classes using design system
  const baseClasses = 'ds-btn';
  
  // Variant classes
  const variantClasses = {
    primary: 'ds-btn-primary',
    outline: 'ds-btn-outline',
    ghost: 'bg-transparent hover:bg-white/5 text-white',
  };

  // Size classes
  const sizeClasses = {
    sm: 'ds-btn-sm',
    md: 'ds-btn-md',
    lg: 'ds-btn-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {Icon && <Icon className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} />}
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
      {Icon && <Icon className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'} />}
      {children}
    </button>
  );
};