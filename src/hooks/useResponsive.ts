// src/hooks/useResponsive.ts
import { useState, useEffect } from 'react';
import { DESIGN_SYSTEM } from '../config/designSystem';
import type { ResponsiveState } from '../types';

export const useResponsive = (): ResponsiveState => {
  const [width, setWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 1024; // Default to desktop width
  });

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: width < DESIGN_SYSTEM.breakpoints.mobile,
    isTablet: width >= DESIGN_SYSTEM.breakpoints.mobile && width < DESIGN_SYSTEM.breakpoints.desktop,
    isDesktop: width >= DESIGN_SYSTEM.breakpoints.desktop,
    width,
  };
};