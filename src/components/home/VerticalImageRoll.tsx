// src/components/home/hero/VerticalImageRoll.tsx
import React, { useState, useEffect, useCallback } from 'react';

interface VerticalImageRollProps {
  images: string[];
  isDarkMode: boolean;
  isMobile: boolean;
}

const AUTO_SCROLL_INTERVAL = 3500;
const PAUSE_DURATION = 4000;

export const VerticalImageRoll: React.FC<VerticalImageRollProps> = ({ 
  images, 
  isDarkMode, 
  isMobile 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused || isMobile) return;
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [images.length, isPaused, isMobile]);

  // Reset transition state
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const scrollTo = useCallback((direction: 'up' | 'down') => {
    setIsPaused(true);
    setIsTransitioning(true);
    
    if (direction === 'up') {
      setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    } else {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }
    
    setTimeout(() => setIsPaused(false), PAUSE_DURATION);
  }, [images.length]);

  const getImageStyle = (offset: number) => {
    const isActive = offset === 1; // Middle image is active
    const isPartiallyVisible = offset === 0 || offset === 2;
    
    return {
      opacity: isActive ? 1 : isPartiallyVisible ? 0.5 : 0.25,
      scale: isActive ? 1 : 0.92,
      filter: isActive 
        ? 'grayscale(0%) brightness(1)' 
        : isDarkMode 
          ? 'grayscale(60%) brightness(0.6)' 
          : 'grayscale(60%) brightness(1.1)',
      pointerEvents: isActive ? 'auto' : 'none',
    };
  };

  if (isMobile) return null;

  return (
    <div 
      className="hidden lg:flex flex-col justify-center relative h-full"
      style={{ 
        paddingTop: '10px',
        paddingBottom: '80px',
      }}
    >
      {/* Main container */}
      <div className="relative h-[760px] w-full overflow-hidden">
        {/* Top fade gradient - seamless integration */}
        <div 
          className="absolute top-0 left-0 right-0 h-48 z-20 pointer-events-none"
          style={{
            background: isDarkMode
              ? 'linear-gradient(to bottom, rgba(10,10,10,1) 0%, rgba(10,10,10,0.95) 15%, rgba(10,10,10,0.6) 50%, transparent 100%)'
              : 'linear-gradient(to bottom, rgba(245,245,245,1) 0%, rgba(245,245,245,0.95) 15%, rgba(245,245,245,0.6) 50%, transparent 100%)'
          }}
        />
        
        {/* Bottom fade gradient - seamless integration */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-48 z-20 pointer-events-none"
          style={{
            background: isDarkMode
              ? 'linear-gradient(to top, rgba(10,10,10,0) 0%, rgba(10,10,10,0) 5%, rgba(10,10,10,0) 50%, transparent 100%)'
              : 'linear-gradient(to top, rgba(245,245,245,1) 0%, rgba(245,245,245,0.95) 15%, rgba(245,245,245,0.6) 50%, transparent 100%)'
          }}
        />

        {/* Images container with upward movement */}
        <div 
          className="relative flex flex-col items-center justify-center"
          style={{
            height: '550px',
            transform: `translateY(-${activeIndex * 8}px)`,
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="flex flex-col items-center gap-5 w-full">
            {/* Show 3 images: prev, active, next for better visibility */}
            {[0, 1, 2].map((offset) => {
              const imageIndex = (activeIndex + offset) % images.length;
              const isActive = offset === 1;
              const isPartiallyVisible = offset === 0 || offset === 2;
              
              const opacity = isActive ? 1 : isPartiallyVisible ? 0.45 : 0;
              const scale = isActive ? 1 : 0.90;
              const filter = isActive 
                ? 'grayscale(0%) brightness(1)' 
                : isDarkMode 
                  ? 'grayscale(50%) brightness(0.7)' 
                  : 'grayscale(50%) brightness(1.05)';
              
              return (
                <div
                  key={`${imageIndex}-${offset}`}
                  className="w-full transition-all duration-500 ease-out"
                  style={{
                    opacity,
                    transform: `scale(${scale})`,
                    filter,
                  }}
                >
                  <div 
                    className="aspect-[3/4] overflow-hidden rounded-xl transition-all duration-300"
                    style={{ 
                      border: isActive
                        ? `3px solid ${isDarkMode ? '#10b981' : '#059669'}` 
                        : isPartiallyVisible
                          ? isDarkMode 
                            ? '1px solid rgba(255,255,255,0.2)' 
                            : '1px solid rgba(0,0,0,0.2)'
                          : 'none',
                      boxShadow: isActive
                        ? isDarkMode
                          ? '0 24px 64px rgba(0, 0, 0, 0.7), 0 12px 32px rgba(16, 185, 129, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.1)'
                          : '0 24px 64px rgba(0, 0, 0, 0.25), 0 12px 32px rgba(16, 185, 129, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.8)'
                        : isPartiallyVisible
                          ? isDarkMode
                            ? '0 8px 24px rgba(0, 0, 0, 0.5)'
                            : '0 8px 24px rgba(0, 0, 0, 0.15)'
                          : 'none',
                    }}
                  >
                    <img
                      src={images[imageIndex]}
                      alt={isActive ? `Featured portfolio image ${imageIndex + 1}` : ''}
                      className="w-full h-full object-cover"
                      loading={isActive ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation arrows - improved styling */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30">
          <button
            onClick={() => scrollTo('up')}
            className="w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ 
              background: isDarkMode
                ? 'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-primary-dark))'
                : 'linear-gradient(135deg, var(--color-brand-primary-light), var(--color-brand-primary))',
              boxShadow: isDarkMode
                ? '0 6px 20px rgba(6, 95, 70, 0.5), 0 3px 10px rgba(0, 0, 0, 0.4)'
                : '0 6px 20px rgba(6, 95, 70, 0.4), 0 3px 10px rgba(0, 0, 0, 0.15)',
            }}
            aria-label="View previous image"
            disabled={isTransitioning}
          >
            <svg 
              className="w-5 h-5 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
          <button
            onClick={() => scrollTo('down')}
            className="w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ 
              background: isDarkMode
                ? 'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-primary-dark))'
                : 'linear-gradient(135deg, var(--color-brand-primary-light), var(--color-brand-primary))',
              boxShadow: isDarkMode
                ? '0 6px 20px rgba(6, 95, 70, 0.5), 0 3px 10px rgba(0, 0, 0, 0.4)'
                : '0 6px 20px rgba(6, 95, 70, 0.4), 0 3px 10px rgba(0, 0, 0, 0.15)',
            }}
            aria-label="View next image"
            disabled={isTransitioning}
          >
            <svg 
              className="w-5 h-5 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsPaused(true);
                setIsTransitioning(true);
                setActiveIndex(index);
                setTimeout(() => setIsPaused(false), PAUSE_DURATION);
              }}
              className="transition-all duration-300 rounded-full focus:outline-none focus:ring-2"
              style={{
                width: activeIndex === index ? '20px' : '7px',
                height: '7px',
                background: activeIndex === index 
                  ? 'var(--color-brand-primary)' 
                  : isDarkMode 
                    ? 'rgba(255, 255, 255, 0.35)' 
                    : 'rgba(0, 0, 0, 0.35)',
                boxShadow: activeIndex === index 
                  ? '0 0 10px var(--color-brand-primary)' 
                  : 'none',
              }}
              aria-label={`Go to image ${index + 1}`}
              aria-current={activeIndex === index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};