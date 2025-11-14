// src/components/home/hero/VerticalImageRoll.tsx
import React, { useState, useEffect } from 'react';

interface VerticalImageRollProps {
  images: string[];
  isDarkMode: boolean;
  isMobile: boolean;
}

export const VerticalImageRoll: React.FC<VerticalImageRollProps> = ({ 
  images, 
  isDarkMode, 
  isMobile 
}) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || isMobile) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length, isPaused, isMobile]);

  const scrollTo = (direction: 'up' | 'down') => {
    setIsPaused(true);
    if (direction === 'up') {
      setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    } else {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }
    setTimeout(() => setIsPaused(false), 4000);
  };

  const getImageStyle = (offset: number) => {
    const isCenterTop = offset === 0;
    const isCenterBottom = offset === 1;
    const isCenter = isCenterTop || isCenterBottom;
    
    return {
      opacity: isCenter ? 1 : 0.35,
      transform: `scale(${isCenter ? 1 : 0.88})`,
      filter: isCenter 
        ? 'grayscale(0%) brightness(1)' 
        : isDarkMode 
          ? 'grayscale(70%) brightness(0.5)' 
          : 'grayscale(70%) brightness(1.15)',
    };
  };

  if (isMobile) return null;

  return (
    <div 
      className="hidden lg:flex flex-col justify-center relative"
      style={{ marginTop: '130px' }}
    >
      <div className="relative h-[750px] w-full overflow-hidden">
        {/* Top fade gradient */}
        <div 
          className="absolute top-0 left-0 right-0 h-56 z-20 pointer-events-none"
          style={{
            background: isDarkMode
              ? 'linear-gradient(to bottom, rgba(10,10,10,1) 0%, rgba(10,10,10,0.98) 8%, rgba(16,185,129,0.12) 45%, transparent 100%)'
              : 'linear-gradient(to bottom, rgba(245,245,245,1) 0%, rgba(245,245,245,0.98) 8%, rgba(16,185,129,0.08) 45%, transparent 100%)'
          }}
        />
        
        {/* Bottom fade gradient */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-56 z-20 pointer-events-none"
          style={{
            background: isDarkMode
              ? 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.98) 8%, rgba(16,185,129,0.12) 45%, transparent 100%)'
              : 'linear-gradient(to top, rgba(245,245,245,1) 0%, rgba(245,245,245,0.98) 8%, rgba(16,185,129,0.08) 45%, transparent 100%)'
          }}
        />

        {/* Images container */}
        <div className="relative h-full flex flex-col items-center justify-center gap-5 px-6">
          {[0, 1, 2].map((offset) => {
            const imageIndex = (activeIndex + offset) % images.length;
            const style = getImageStyle(offset);
            
            return (
              <div
                key={`${imageIndex}-${offset}`}
                className="w-full ds-transition-slow"
                style={{
                  opacity: style.opacity,
                  transform: style.transform,
                  filter: style.filter,
                }}
              >
                <div 
                  className="aspect-[4/5] overflow-hidden shadow-2xl"
                  style={{ 
                    border: offset === 1
                      ? '4px solid #10b981' 
                      : isDarkMode 
                        ? '2px solid rgba(255,255,255,0.12)' 
                        : '2px solid rgba(0,0,0,0.12)',
                  }}
                >
                  <img
                    src={images[imageIndex]}
                    alt={`Portfolio ${imageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation arrows */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
          <button
            onClick={() => scrollTo('up')}
            className="w-10 h-10 rounded-full ds-transition-slow hover:scale-110 flex items-center justify-center shadow-xl"
            style={{ background: 'var(--color-brand-primary)' }}
            aria-label="Previous image"
          >
            <svg 
              className="w-5 h-5 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
          <button
            onClick={() => scrollTo('down')}
            className="w-10 h-10 rounded-full ds-transition-slow hover:scale-110 flex items-center justify-center shadow-xl"
            style={{ background: 'var(--color-brand-primary)' }}
            aria-label="Next image"
          >
            <svg 
              className="w-5 h-5 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};