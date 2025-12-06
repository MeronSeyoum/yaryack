import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  rightContent?: React.ReactNode;
  swap?: boolean; // true = subtitle left, title right
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  icon: Icon,
  rightContent,
  swap = false,
}) => {
  return (
    <div className="ds-section-header">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8 w-full">
          {Icon && (
            <div 
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
              style={{ 
                background: 'linear-gradient(to bottom right, var(--color-brand-primary-light), var(--color-brand-primary))' 
              }}
            >
              <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
          )}
          
          {/* Main content area - responsive flex container */}
          <div className={`flex items-center justify-between flex-1 ${swap ? 'flex-row-reverse' : ''}`}>
            {/* Title element */}
            <h2 className="ds-heading-4 lg:ds-heading-3 xl:ds-heading-2 ds-text-primary font-bold">
              {title}
            </h2>
            
            {/* Subtitle element with colored bar */}
            {subtitle && (
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <div 
                  className="w-1 h-4 sm:h-5 lg:w-2 lg:h-8 rounded-full" 
                  style={{ background: 'var(--color-brand-primary)' }}
                ></div>
                <p className="ds-body-xs lg:ds-body-sm ds-text-secondary uppercase tracking-wider font-semibold">
                  {subtitle}
                </p>
              </div>
            )}
          </div>
        </div>
        
        {rightContent && (
          <div className="ml-4 flex-shrink-0">
            {rightContent}
          </div>
        )}
      </div>
    </div>
  );
};