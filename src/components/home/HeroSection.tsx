// src/components/home/HeroSection.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, Calendar, Eye } from 'lucide-react';
import { useImageLoader } from '../../hooks/useImageLoader';
import { Button } from '../ui/Button';

// Import images
import heroMain from "../../assets/images/hero-main.jpg";
import heroThumb1 from "../../assets/images/hero-thumb-1.jpg";
import heroThumb2 from "../../assets/images/hero-thumb-2.jpeg";
import heroThumb3 from "../../assets/images/hero-thumb-3.jpeg";

import type { ThemeClasses } from '../../types';

interface HeroSectionProps {
  themeClasses: ThemeClasses;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ themeClasses }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const heroImages = [heroThumb1, heroThumb2, heroThumb3];
  const imagesLoaded = useImageLoader([heroMain, ...heroImages]);

  // Auto-slide with pause on user interaction
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [heroImages.length, isAutoPlaying]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 8 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 8000);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % heroImages.length);
  }, [currentSlide, heroImages.length, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + heroImages.length) % heroImages.length);
  }, [currentSlide, heroImages.length, goToSlide]);

  if (!imagesLoaded) return null;

  return (
    <section className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroMain}
          alt="Professional photography by Yaryack"
          className="w-full h-full object-cover filter grayscale"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.6)_65%,black_85%)]"></div>
      </div>

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_19%] min-h-screen gap-6 lg:gap-2">
          
          {/* Main Content Area */}
          <div className="flex flex-col justify-between py-6 sm:py-8 lg:py-12 xl:mt-16 min-h-[85vh] lg:min-h-auto">
            {/* Header Section */}
            <div className="space-y-6 sm:space-y-8 lg:space-y-16 mt-12 sm:mt-0">
              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <p className="text-sm sm:text-base lg:text-lg text-white/90 tracking-wide">
                  Professional Photography • Calgary
                </p>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <div className="border-l-2 sm:border-l-4 border-orange-500 pl-4 sm:pl-6 lg:pl-8">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight text-white">
                    Yaryack
                    <br />
                    <span className="font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Photography
                    </span>
                  </h1>
                </div>
                <p className="text-lg sm:text-xl text-white/80 max-w-xl leading-relaxed pl-4 sm:pl-6 lg:pl-8">
                  Capturing authentic moments and creating timeless memories
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="space-y-6 sm:space-y-8 mt-8 sm:mt-0">
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
                <Button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  size="lg"
                  className="w-full sm:w-auto group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-base sm:text-lg font-medium">Book a Session</span>
                  </span>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                  size="lg"
                  className="w-full sm:w-auto border-white/40 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  <span className="flex items-center gap-3">
                    <Eye className="w-5 h-5" />
                    <span className="text-base sm:text-lg">View Portfolio</span>
                  </span>
                </Button>
              </div>

              {/* Trust Indicator */}
              <div className="flex gap-4 items-center bg-black/30 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                  Trusted by clients across Calgary for professional portrait, event, and commercial photography.
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Film Strip Slideshow */}
          <div className={`hidden lg:flex flex-col justify-center px-4 border-l mt-[72px] ${themeClasses.border}`}>
            <div className="bg-black/90 p-3 border-2 border-gray-700 shadow-2xl border-l-2 rounded-lg">
              <div className="space-y-3 lg:space-y-4">
                {heroImages.map((img, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex justify-between px-1 mb-1">
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-gray-600 rounded-sm"></div>
                      ))}
                    </div>
                    
                    <div 
                      className={`relative w-full aspect-auto rounded-lg overflow-hidden cursor-pointer transition-all duration-500 ${
                        idx === currentSlide 
                          ? 'ring-2 ring-orange-500 shadow-lg scale-105 opacity-100' 
                          : 'opacity-50 hover:opacity-75 hover:scale-102'
                      }`}
                      onClick={() => goToSlide(idx)}
                    >
                      <img
                        src={img}
                        alt={`Photography sample ${idx + 1}`}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          idx === currentSlide 
                            ? 'filter-none'
                            : 'filter grayscale hover:grayscale-0'
                        }`}
                      />
                      {idx === currentSlide && (
                        <div className="absolute top-2 right-2 bg-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                          {idx + 1}/{heroImages.length}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between px-1 mt-1">
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-gray-600 rounded-sm"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Enhanced Slideshow */}
        <div className="lg:hidden pb-8 pt-6">
          <div className="max-w-2xl mx-auto px-2">
            {/* Slideshow Header */}
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-lg font-medium text-white/90">Featured Work</h3>
              <div className="flex items-center gap-2 bg-black/40 rounded-full px-3 py-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-white/80">{currentSlide + 1}/{heroImages.length}</span>
              </div>
            </div>

            {/* Main Slideshow Container */}
            <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-white/10 shadow-2xl">
              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 z-10 border border-white/20 backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              
              <button 
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 z-10 border border-white/20 backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Main Image Display */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={heroImages[currentSlide]}
                  alt={`Featured photography ${currentSlide + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-4000 ease-linear"
                    style={{ 
                      width: isAutoPlaying ? '100%' : '0%',
                      animation: isAutoPlaying ? 'progress 4s linear' : 'none'
                    }}
                  ></div>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex justify-center gap-3 mt-4 px-4">
                {heroImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      idx === currentSlide
                        ? 'border-orange-500 shadow-lg scale-110'
                        : 'border-white/20 hover:border-white/40 scale-100'
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        idx === currentSlide ? 'filter-none' : 'filter grayscale'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Enhanced Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === currentSlide 
                        ? 'bg-orange-500 w-8 shadow-lg shadow-orange-500/30' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animation for progress bar */}
      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};