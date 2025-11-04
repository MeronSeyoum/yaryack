// src/components/home/HeroSection.tsx
import React, { useState, useEffect, useCallback } from "react";
import { ChevronRight, Calendar, Eye } from "lucide-react";
import { useImageLoader } from "../../hooks/useImageLoader";
import { Button } from "../ui/Button";
import { VerticalFilmRoll } from "./VerticalFilmRoll";

// Import images
import heroMain from "../../assets/images/hero-main.jpg";
import heroThumb1 from "../../assets/images/hero-thumb-1.jpg";
import heroThumb2 from "../../assets/images/hero-thumb-2.jpeg";
import heroThumb3 from "../../assets/images/hero-thumb-3.jpeg";
import heroThumb4 from "../../assets/images/hero-thumb-4.jpeg";
// import heroThumb5 from "../../assets/images/hero-thumb-5.jpeg";
// import heroThumb6 from "../../assets/images/hero-thumb-6.jpeg";

import type { ThemeClasses } from "../../types";

interface HeroSectionProps {
  themeClasses: ThemeClasses;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ themeClasses }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const heroImages = [heroThumb1, heroThumb2, heroThumb3, heroThumb4 ];
  const imagesLoaded = useImageLoader([heroMain, ...heroImages]);

  // Determine if we're in dark mode
  const isDarkMode = themeClasses.bg.primary.includes('black') || 
                    themeClasses.bg.primary.includes('gray-900') ||
                    themeClasses.bg.primary.includes('gray-800') ||
                    themeClasses.text.primary.includes('white');

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
    <section className={`relative min-h-screen  ${themeClasses.bg.primary}`}>
      {/* Background Image with Theme Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroMain}
          alt="Professional photography by Yaryack"
          className="w-full h-full object-cover filter grayscale"
        />
        {/* Dynamic gradient based on theme */}
        <div 
          className="absolute inset-0"
          style={{
            background: isDarkMode 
              ? 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.6) 45%, black 85%)'
              : 'radial-gradient(ellipse at center, transparent 20%, rgba(255,255,255,0.7) 45%, rgba(255,255,255,0.95) 85%)'
          }}
        />
      </div>

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_20%] min-h-screen gap-6 lg:gap-8">
          {/* Main Content Area */}
          <div className="flex flex-col justify-between py-6 sm:py-8 lg:py-12 min-h-[90vh] lg:min-h-auto">
            {/* Header Section */}
            <div className="space-y-6 sm:space-y-8 lg:space-y-16  mt-16">
              {/* Location Badge */}
              <div 
                className={`inline-flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2 border ${
                  themeClasses.border
                }`}
                style={{
                  background: isDarkMode 
                    ? 'rgba(0,0,0,0.3)' 
                    : 'rgba(255,255,255,0.5)'
                }}
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <p className={`text-sm sm:text-base lg:text-lg tracking-wide ${
                  themeClasses.text.primary
                }`}>
                  Professional Photography • Calgary
                </p>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <div className="border-l-2 sm:border-l-4 border-orange-500 pl-4 sm:pl-6 lg:pl-8">
                  <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight ${
                    themeClasses.text.primary
                  }`}>
                    Yaryack
                    <br />
                    <span className="font-medium bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                      Photography
                    </span>
                  </h1>
                </div>
                <p className={`text-lg sm:text-xl max-w-xl leading-relaxed pl-4 sm:pl-6 lg:pl-8 ${
                  themeClasses.text.primary
                }`}>
                  Capturing authentic moments and creating timeless memories
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="space-y-6 sm:space-y-8 mt-8 sm:mt-0">
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
                <Button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  size="lg"
                  className="w-full sm:w-auto group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-base sm:text-lg font-medium">
                      Book a Session
                    </span>
                  </span>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    document
                      .getElementById("portfolio")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  size="lg"
                  className={`w-full sm:w-auto backdrop-blur-sm ${
                    isDarkMode
                      ? 'border-white/40 text-white hover:bg-white/10'
                      : 'border-gray-400 text-gray-700  hover:bg-gray-100'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-gray-500" />
                    <span className="text-base sm:text-lg  text-gray-500">View Portfolio</span>
                  </span>
                </Button>
              </div>

              {/* Trust Indicator */}
              <div 
                className={`flex gap-4 items-center backdrop-blur-sm rounded-2xl p-4 border ${
                  themeClasses.border
                }`}
                style={{
                  background: isDarkMode 
                    ? 'rgba(0,0,0,0.3)' 
                    : 'rgba(255,255,255,0.5)'
                }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      themeClasses.bg.primary
                    }`}>
                      <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <p className={`text-sm sm:text-base leading-relaxed ${
                  themeClasses.text.primary
                }`}>
                  Trusted by clients across Calgary for professional portrait,
                  event, and commercial photography.
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Vertical Film Roll */}
          <div
            className={`hidden lg:flex flex-col justify-center border-l mt-[72px] px-4  ${
              themeClasses.border
            }`}
          >
            <div className="py-4  rounded-lg -mt-16">
              <div className="mb-4">
                <h3 className={`text-sm font-medium uppercase tracking-wider mb-2 ${
                  themeClasses.text.secondary
                }`}>
                  Featured Gallery
                </h3>
                <div className={`flex items-center gap-2 ${
                  themeClasses.bg.secondary
                } rounded-full px-3 py-1 w-fit`}>
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className={`text-xs ${themeClasses.text.secondary}`}>
                    Live Preview
                  </span>
                </div>
              </div>

              {/* Vertical Film Roll Component */}
              <VerticalFilmRoll 
                images={heroImages} 
                themeClasses={themeClasses}
              />
            </div>
          </div>
        </div>

        {/* Mobile Enhanced Slideshow */}
        <div className="lg:hidden pb-8 pt-6">
          <div className="max-w-2xl mx-auto px-2">
            {/* Slideshow Header */}
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className={`text-lg font-medium ${themeClasses.text.primary}`}>
                Featured Work
              </h3>
              <div 
                className={`flex items-center gap-2 rounded-full px-3 py-1 ${
                  themeClasses.bg.secondary
                }`}
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className={`text-sm ${themeClasses.text.secondary}`}>
                  {currentSlide + 1}/{heroImages.length}
                </span>
              </div>
            </div>

            {/* Main Slideshow Container */}
            <div 
              className={`relative backdrop-blur-sm rounded-2xl p-4 border shadow-2xl ${
                themeClasses.border
              }`}
              style={{
                background: isDarkMode 
                  ? 'rgba(0,0,0,0.4)' 
                  : 'rgba(255,255,255,0.6)'
              }}
            >
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className={`absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10 border backdrop-blur-sm ${
                  themeClasses.border
                } ${
                  isDarkMode
                    ? 'bg-black/60 hover:bg-black/80 text-white/80 hover:text-white'
                    : 'bg-white/60 hover:bg-white/80 text-gray-800 hover:text-gray-900'
                }`}
                aria-label="Previous image"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>

              <button
                onClick={nextSlide}
                className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-10 border backdrop-blur-sm ${
                  themeClasses.border
                } ${
                  isDarkMode
                    ? 'bg-black/60 hover:bg-black/80 text-white/80 hover:text-white'
                    : 'bg-white/60 hover:bg-white/80 text-gray-800 hover:text-gray-900'
                }`}
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Main Image Display */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={heroImages[currentSlide]}
                  alt={`Featured photography ${currentSlide + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 filter grayscale"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                {/* Progress Bar */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{
                    background: isDarkMode 
                      ? 'rgba(255,255,255,0.2)' 
                      : 'rgba(0,0,0,0.2)'
                  }}
                >
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-4000 ease-linear"
                    style={{
                      width: isAutoPlaying ? "100%" : "0%",
                      animation: isAutoPlaying ? "progress 4s linear" : "none",
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
                        ? "border-orange-500 shadow-lg scale-110"
                        : `${themeClasses.border} hover:border-orange-400 scale-100`
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        idx === currentSlide
                          ? "filter-none"
                          : "filter grayscale"
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
                    className={`h-3 rounded-full transition-all duration-300 ${
                      idx === currentSlide
                        ? "bg-orange-500 w-8 shadow-lg shadow-orange-500/30"
                        : `${
                            isDarkMode
                              ? 'bg-white/30 hover:bg-white/50'
                              : 'bg-gray-400 hover:bg-gray-500'
                          } w-3`
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
      <style>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};