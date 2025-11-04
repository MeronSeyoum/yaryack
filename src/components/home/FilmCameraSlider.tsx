// src/components/home/FilmCameraSlider.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, ChevronLeft, Play, Pause } from 'lucide-react';

interface FilmCameraSliderProps {
  images: string[];
  className?: string;
}

export const FilmCameraSlider: React.FC<FilmCameraSliderProps> = ({ 
  images, 
  className = '' 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isRolling, setIsRolling] = useState(false);

  // Film roll effect
  const rollToSlide = useCallback(async (index: number) => {
    setIsRolling(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setCurrentSlide(index);
    setTimeout(() => setIsRolling(false), 300);
  }, []);

  // Auto-slide with pause on user interaction
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      rollToSlide((currentSlide + 1) % images.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [currentSlide, images.length, isAutoPlaying, rollToSlide]);

  const nextSlide = useCallback(() => {
    rollToSlide((currentSlide + 1) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  }, [currentSlide, images.length, rollToSlide]);

  const prevSlide = useCallback(() => {
    rollToSlide((currentSlide - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  }, [currentSlide, images.length, rollToSlide]);

  const goToSlide = useCallback((index: number) => {
    rollToSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  }, [rollToSlide]);

  return (
    <div className={`relative ${className}`}>
      {/* Analog Camera Body */}
      <div className="relative bg-gray-900 rounded-2xl p-4 sm:p-6 border-2 border-gray-700 shadow-2xl">
        
        {/* Camera Top Bar */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-24 h-3 bg-gray-800 rounded-t-lg border border-gray-600 z-20">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
        </div>

        {/* Film Strip Container */}
        <div className="relative bg-black rounded-lg p-3 sm:p-4 border border-gray-600 mt-2">
          
          {/* Film Perforations (Top) */}
          <div className="absolute -top-2 left-0 right-0 flex justify-between px-6 z-10">
            {[...Array(10)].map((_, i) => (
              <div 
                key={`top-${i}`}
                className="w-2 h-2 bg-gray-800 rounded-sm border border-gray-600"
              ></div>
            ))}
          </div>

          {/* Film Perforations (Bottom) */}
          <div className="absolute -bottom-2 left-0 right-0 flex justify-between px-6 z-10">
            {[...Array(10)].map((_, i) => (
              <div 
                key={`bottom-${i}`}
                className="w-2 h-2 bg-gray-800 rounded-sm border border-gray-600"
              ></div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 z-20 border border-gray-600 shadow-lg"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 z-20 border border-gray-600 shadow-lg"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Auto-play Toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute top-2 sm:top-3 right-2 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 z-20 border border-gray-600"
            aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isAutoPlaying ? <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
          </button>

          {/* Main Film Frame */}
          <div className="relative aspect-[3/2] rounded-sm overflow-hidden border border-gray-600 bg-black mt-3 mb-2">
            {/* Film Roll Effect Container */}
            <div 
              className={`relative w-full h-full transition-transform duration-500 ease-out ${
                isRolling ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
              }`}
            >
              <img
                src={images[currentSlide]}
                alt={`Photography ${currentSlide + 1}`}
                className="w-full h-full object-cover transition-all duration-500"
              />
              
              {/* Film Grain Overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22/%3E%3C/filter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url%28%23noise%29%22%20opacity%3D%220.08%22/%3E%3C/svg%3E')] mix-blend-overlay pointer-events-none"></div>
              
              {/* Vignette Effect */}
              <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4)_70%) pointer-events-none"></div>
            </div>

            {/* Frame Counter */}
            <div className="absolute top-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded border border-gray-600 font-mono">
              {String(currentSlide + 1).padStart(2, '0')}/{String(images.length).padStart(2, '0')}
            </div>

            {/* Progress Bar - Film Style */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-4000 ease-linear"
                style={{ 
                  width: isAutoPlaying ? '100%' : '0%',
                  animation: isAutoPlaying ? 'filmProgress 4s linear' : 'none'
                }}
              ></div>
            </div>
          </div>

          {/* Film Branding */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-black px-3 py-1 border border-gray-600 rounded-b-lg z-10">
            <div className="text-[10px] sm:text-xs text-amber-300 font-mono tracking-widest">PORTRA 400</div>
          </div>
        </div>

        {/* Thumbnail Film Strip */}
        <div className="mt-6 sm:mt-8 relative">
          {/* Film Strip Container */}
          <div className="relative bg-gray-800 rounded-lg p-2 sm:p-3 border border-gray-600">
            {/* Side Perforations */}
            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-4/5 flex flex-col justify-between">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={`left-${i}`}
                  className="w-1.5 h-1.5 bg-gray-700 rounded-sm"
                ></div>
              ))}
            </div>
            <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-4/5 flex flex-col justify-between">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={`right-${i}`}
                  className="w-1.5 h-1.5 bg-gray-700 rounded-sm"
                ></div>
              ))}
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-1.5 sm:gap-2 px-1 sm:px-2 overflow-x-auto scrollbar-hide">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`flex-shrink-0 relative transition-all duration-300 ${
                    idx === currentSlide
                      ? 'scale-105 z-10'
                      : 'scale-100 opacity-70 hover:opacity-90'
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  {/* Individual Film Frame */}
                  <div className="relative bg-black p-0.5 sm:p-1 rounded border border-gray-600">
                    <div className="w-16 h-12 sm:w-20 sm:h-16 overflow-hidden rounded-sm">
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className={`w-full h-full object-cover transition-all duration-300 ${
                          idx === currentSlide ? 'filter-none' : 'filter grayscale brightness-90'
                        }`}
                      />
                    </div>
                    
                    {/* Frame Number */}
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-amber-400 text-black text-[6px] sm:text-[8px] font-mono flex items-center justify-center rounded-sm border border-amber-600">
                      {idx + 1}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Camera Controls */}
        <div className="flex justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full border border-gray-600 shadow-inner"></div>
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-800 rounded-full border border-gray-600 shadow-inner flex items-center justify-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-full border border-gray-600"></div>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full border border-gray-600 shadow-inner"></div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes filmProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};