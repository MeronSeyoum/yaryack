// src/components/layout/ScrollToTop.tsx
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useScrollToTop } from '../../hooks/useScrollToTop';
 import { DESIGN_SYSTEM } from '../../config/designSystem';

export const ScrollToTop: React.FC = () => {
  const { showScrollTop, scrollToTop } = useScrollToTop();

  if (!showScrollTop) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-green-900 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 z-40"
      aria-label="Scroll to top"
    >
      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-270" />
    </button>
  );
};