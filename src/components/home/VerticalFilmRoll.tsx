// src/components/home/VerticalFilmRoll.tsx
import React, { useState, useEffect, useCallback } from 'react';
import type { ThemeClasses } from '../../types';

interface VerticalFilmRollProps {
  images: string[];
  themeClasses: ThemeClasses;
  className?: string;
}

export const VerticalFilmRoll: React.FC<VerticalFilmRollProps> = ({ 
  images, 
  themeClasses,
  className = '' 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3500);
    
    return () => clearInterval(timer);
  }, [images.length, isAutoPlaying]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  }, []);

  // Determine if we're in dark mode based on background color
  const isDarkMode = themeClasses.bg.primary.includes('black') || 
                    themeClasses.bg.primary.includes('gray-900') ||
                    themeClasses.bg.primary.includes('gray-800');

  return (
    <div className={`relative  ${className}`}>
      {/* Film Roll Container with Twist Effect */}
      <div 
        className={`relative p-4 rounded-lg border ${
          isDarkMode ? 'border-gray-700' : 'border-gray-300 '
        }`}
        style={{
          background: isDarkMode ? '#000000' : '#ffffff',
          transform: 'perspective(600px) rotateY(-2deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Film Roll Body */}
        <div className="relative">
          {/* Left Edge Perforations */}
          <div className="absolute -left-3 top-0 bottom-0 flex flex-col justify-around py-4 z-10">
            {[...Array(12)].map((_, i) => (
              <div 
                key={`left-${i}`}
                className={`w-2 h-2.5 rounded-sm border ${
                  isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-300 border-gray-400'
                }`}
                style={{
                  transform: `translateX(${Math.sin(i * 0.5) * 2}px)`,
                  opacity: 0.8 + Math.random() * 0.2
                }}
              />
            ))}
          </div>

          {/* Right Edge Perforations */}
          <div className="absolute -right-3 top-0 bottom-0 flex flex-col justify-around py-4 z-10">
            {[...Array(12)].map((_, i) => (
              <div 
                key={`right-${i}`}
                className={`w-2 h-2.5 rounded-sm border ${
                  isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-300 border-gray-400'
                }`}
                style={{
                  transform: `translateX(${-Math.sin(i * 0.5) * 2}px)`,
                  opacity: 0.8 + Math.random() * 0.2
                }}
              />
            ))}
          </div>

          {/* Film Strip with Natural Curve */}
          <div 
            className={`relative rounded-sm border-2 overflow-hidden ${
              isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-gray-300'
            }`}
            style={{
              boxShadow: `
                inset 0 2px 4px rgba(0,0,0,0.3),
                0 4px 8px rgba(0,0,0,0.2)
              `
            }}
          >
            {/* Film Frames Stack */}
            <div className="space-y-3 p-3 min-h-[400px] relative">
              {images.map((img, idx) => {
                const offset = (idx - currentSlide) * 100;
                const isActive = idx === currentSlide;
                const distanceFromActive = Math.abs(idx - currentSlide);
                
                return (
                  <div
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className="relative cursor-pointer transition-all duration-500"
                    style={{
                      transform: `
                        translateY(${offset}%) 
                        translateX(${Math.sin(idx * 0.8) * (isActive ? 0 : 3)}px)
                        rotateZ(${Math.sin(idx * 0.5) * (isActive ? 0 : 1.5)}deg)
                        scale(${isActive ? 1.05 : 0.95})
                      `,
                      opacity: distanceFromActive > 1 ? 0 : (isActive ? 1 : 0.4),
                      zIndex: isActive ? 10 : 5 - distanceFromActive,
                      position: idx === 0 ? 'relative' : 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                    }}
                  >
                    {/* Film Frame Border */}
                    <div className={`p-2 rounded border-2 ${
                      isActive 
                        ? 'border-orange-500 shadow-lg shadow-orange-500/30 bg-white/5' 
                        : `${isDarkMode ? 'border-gray-600 bg-gray-800/50' : 'border-gray-300 bg-gray-200/50'}`
                    }`}>
                      {/* Frame Corners */}
                      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-orange-500/50 rounded-tl" />
                      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-orange-500/50 rounded-tr" />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-orange-500/50 rounded-bl" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-orange-500/50 rounded-br" />

                      {/* Image */}
                      <div className="aspect-[3/4] rounded overflow-hidden relative">
                        <img
                          src={img}
                          alt={`Frame ${idx + 1}`}
                          className={`w-full h-full object-cover transition-all duration-500 ${
                            isActive ? 'filter-none' : 'filter grayscale brightness-75'
                          }`}
                          style={{
                            transform: isActive ? 'scale(1)' : 'scale(0.98)'
                          }}
                        />
                        
                        {/* Film Grain Overlay */}
                        <div 
                          className="absolute inset-0 pointer-events-none mix-blend-overlay"
                          style={{
                            background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.06\'/%3E%3C/svg%3E")',
                          }}
                        />

                        {/* Vintage Vignette */}
                        <div 
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 85%)'
                          }}
                        />
                      </div>

                      {/* Frame Counter */}
                      {isActive && (
                        <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs font-mono border shadow-lg ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-600 text-gray-300' 
                            : 'bg-gray-200 border-gray-300 text-gray-700'
                        }`}>
                          <span className="text-orange-500 font-bold">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>/</span>
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                            {String(images.length).padStart(2, '0')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Side Markings (Film Type) */}
                    {isActive && (
                      <>
                        <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90">
                          <span className={`text-xs font-mono tracking-widest ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            KODAK
                          </span>
                        </div>
                        <div className="absolute -right-8 top-1/2 -translate-y-1/2 rotate-90">
                          <span className={`text-xs font-mono tracking-widest ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            400
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Progress Indicator */}
            <div 
              className={`absolute bottom-0 left-0 right-0 h-1 ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            >
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-100"
                style={{
                  width: isAutoPlaying ? '100%' : '0%',
                  animation: isAutoPlaying ? 'filmProgress 3.5s linear' : 'none'
                }}
              />
            </div>
          </div>

          {/* Film Brand Label */}
          <div 
            className={`mt-3 text-center py-2 rounded text-sm font-mono tracking-wider border shadow-md ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-600' 
                : 'bg-gray-200 border-gray-300'
            }`}
          >
            <span className="text-amber-500 font-bold">PORTRA</span>
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}> 400</span>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? 'bg-orange-500 w-6 shadow-lg shadow-orange-500/30'
                    : `${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'} hover:bg-orange-500/50`
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Indicator */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className={`w-2 h-2 rounded-full ${
              isAutoPlaying 
                ? 'bg-green-500 animate-pulse' 
                : isDarkMode ? 'bg-gray-600' : 'bg-gray-400'
            }`} />
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {isAutoPlaying ? 'Auto' : 'Paused'}
            </span>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes filmProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};