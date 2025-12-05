// src/components/home/hero/VerticalImageRoll.tsx
import React, { useState, useEffect, useCallback } from 'react';

interface VerticalImageRollProps {
  images: string[];
  isDarkMode: boolean;
  isMobile: boolean;
}

const AUTO_SCROLL_INTERVAL = 4000;
const PAUSE_DURATION = 5000;
const TRANSITION_DURATION = 600;

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
      const timer = setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const jumpToImage = useCallback((index: number) => {
    if (index === activeIndex) return;
    
    setIsPaused(true);
    setIsTransitioning(true);
    setActiveIndex(index);
    
    setTimeout(() => setIsPaused(false), PAUSE_DURATION);
  }, [activeIndex]);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <div 
      className="hidden lg:flex flex-col justify-start relative h-full"
      style={{ 
        paddingTop: '20px',
        paddingBottom: '20px',
      }}
    >
      <div className="relative w-full" style={{ height: '500px' }}>
        {/* Top fade gradient */}
        <div 
          className="absolute top-0 left-0 right-0 h-20 z-20 pointer-events-none"
          style={{
            background: isDarkMode
              ? 'linear-gradient(to bottom, rgba(10,10,10,1) 0%, rgba(10,10,10,0.9) 20%, transparent 100%)'
              : 'linear-gradient(to bottom, rgba(248,249,250,1) 0%, rgba(248,249,250,0.9) 20%, transparent 100%)'
          }}
        />
        
        {/* Bottom fade gradient */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-20 z-20 pointer-events-none"
          style={{
            background: isDarkMode
              ? 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.9) 20%, transparent 100%)'
              : 'linear-gradient(to top, rgba(248,249,250,1) 0%, rgba(248,249,250,0.9) 20%, transparent 100%)'
          }}
        />

        {/* Images container - always keeps active image at top */}
        <div 
          className="absolute top-0 left-0 right-0"
        >
          <div className="flex flex-col items-center gap-6 w-full">
            {/* Only show current and next image */}
            {[0, 1].map((offset) => {
              const imageIndex = (activeIndex + offset) % images.length;
              const isActive = offset === 0;
              
              return (
                <div
                  key={imageIndex}
                  className="w-full transition-all duration-500 ease-out"
                  style={{
                    opacity: isActive ? 1 : 0.4,
                    transform: `scale(${isActive ? 1 : 0.88})`,
                    filter: isActive 
                      ? 'grayscale(0%) brightness(1)' 
                      : isDarkMode 
                        ? 'grayscale(40%) brightness(0.75)' 
                        : 'grayscale(40%) brightness(1.05)',
                  }}
                >
                  <div 
                    className="aspect-[3/4] overflow-hidden rounded-xl transition-all duration-300"
                    style={{ 
                      border: isActive
                        ? `2px solid var(--color-brand-primary)` 
                        : isDarkMode 
                          ? '1px solid rgba(255,255,255,0.15)' 
                          : '1px solid rgba(0,0,0,0.15)',
                      boxShadow: isActive
                        ? isDarkMode
                          ? '0 20px 48px rgba(0, 0, 0, 0.6), 0 8px 20px rgba(6, 95, 70, 0.3)'
                          : '0 20px 48px rgba(0, 0, 0, 0.2), 0 8px 20px rgba(6, 95, 70, 0.25)'
                        : isDarkMode
                          ? '0 8px 20px rgba(0, 0, 0, 0.4)'
                          : '0 8px 20px rgba(0, 0, 0, 0.12)',
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

        {/* Progress Indicators */}
        <div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30 px-3 py-2 rounded-full"
          style={{
            background: isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => jumpToImage(index)}
              className="transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
              style={{
                width: activeIndex === index ? '24px' : '8px',
                height: '8px',
                background: activeIndex === index 
                  ? 'var(--color-brand-primary)' 
                  : isDarkMode 
                    ? 'rgba(255, 255, 255, 0.4)' 
                    : 'rgba(0, 0, 0, 0.3)',
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