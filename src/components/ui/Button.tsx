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
  fullWidth?: boolean;
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
  fullWidth = false,
}) => {
  const baseClasses = 'ds-btn';
  
  const variantClasses = {
    primary: 'ds-btn-primary',
    outline: 'ds-btn-outline',
    ghost: 'bg-transparent hover:bg-white/5 text-white',
  };

  const sizeClasses = {
    sm: 'ds-btn-sm',
    md: 'ds-btn-md',
    lg: 'ds-btn-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const iconSizeClass = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {Icon && <Icon className={iconSizeClass} />}
        <span>{children}</span>
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
      {Icon && <Icon className={iconSizeClass} />}
      <span>{children}</span>
    </button>
  );
};