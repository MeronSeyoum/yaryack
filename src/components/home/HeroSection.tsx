// src/components/home/HeroSection.tsx
import React, { useState, useEffect, useCallback } from "react";
import { ChevronRight, Calendar, Eye } from "lucide-react";
import { useImageLoader } from "../../hooks/useImageLoader";
import { Button } from "../ui/Button";
import { VerticalFilmRoll } from "./VerticalFilmRoll";

// Import images
import heroMain from "../../assets/images/hero-main.jpg";
import heroMobile from "../../assets/images/hero-mobile.jpg";
import heroThumb1 from "../../assets/images/hero-thumb-1.jpg";
import heroThumb2 from "../../assets/images/hero-thumb-2.jpeg";
import heroThumb3 from "../../assets/images/hero-thumb-3.jpeg";
import heroThumb4 from "../../assets/images/hero-thumb-4.jpeg";
import heroMobile1 from "../../assets/images/event-4.jpg";
import heroMobile2 from "../../assets/images/hero-thumb-5.jpeg";  
import heroMobile3 from "../../assets/images/hero-thumb-6.jpeg";

import type { ThemeClasses } from "../../types";

interface HeroSectionProps {
  themeClasses: ThemeClasses;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ themeClasses }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const heroImages = [heroThumb1, heroThumb2, heroThumb3, heroThumb4];
  const mobileSlides = [heroMobile1, heroMobile2, heroMobile3];

  // Load both desktop and mobile images
  const imagesLoaded = useImageLoader([heroMain, heroMobile, ...heroImages, ...mobileSlides]);

  // Determine if we're in dark mode
  const isDarkMode =
    themeClasses.bg.primary.includes("black") ||
    themeClasses.bg.primary.includes("gray-900") ||
    themeClasses.bg.primary.includes("gray-800") ||
    themeClasses.text.primary.includes("white");

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-slide for mobile slideshow
  useEffect(() => {
    if (!isAutoPlaying || !isMobile) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mobileSlides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [mobileSlides.length, isAutoPlaying, isMobile]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % mobileSlides.length);
  }, [currentSlide, mobileSlides.length, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + mobileSlides.length) % mobileSlides.length);
  }, [currentSlide, mobileSlides.length, goToSlide]);

  if (!imagesLoaded) return null;

  return (
    <section className={`relative min-h-screen ${themeClasses.bg.primary}`}>
      {/* Background Image with Dark Green Gradient Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Desktop Image - hidden on mobile */}
        <img
          src={heroMain}
          alt="Professional photography by Yaryack"
          className="hidden lg:block w-full h-full object-cover"
        />
        
        {/* Mobile Slideshow - hidden on desktop */}
        <div className="lg:hidden w-full h-full relative">
          <div 
            className="flex w-full h-full transition-transform duration-500 ease-in-out" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {mobileSlides.map((slide, index) => (
              <div key={index} className="w-full h-full flex-shrink-0">
                <img
                  src={slide}
                  alt={`Professional photography by Yaryack - Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* Slide indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {mobileSlides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' 
                    : 'bg-white/60 backdrop-blur-sm'
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Desktop Gradient - Dark Green */}
        <div
          className="hidden lg:block absolute inset-0"
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, rgba(6, 78, 59, 0.85) 0%, rgba(6, 78, 59, 0.4) 20%, rgba(6, 78, 59, 0.2) 100%)"
              : "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 78, 59, 0.1) 50%, transparent 100%)",
          }}
        />

        {/* Mobile Gradient - Dark Green */}
        <div
          className="lg:hidden absolute inset-0"
          style={{
            background: isDarkMode
              ? "radial-gradient(ellipse at center, transparent 0%, rgba(6, 78, 59, 0.6) 60%, rgba(6, 78, 59, 0.8) 100%)"
              : "radial-gradient(ellipse at center, transparent 0%, rgba(16, 185, 129, 0.2) 50%, rgba(6, 78, 59, 0.3) 100%)",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_300px] min-h-screen gap-6 lg:gap-8">
          {/* Main Content Area */}
          <div className="flex flex-col justify-end lg:justify-center py-8 sm:py-12 lg:py-16 min-h-[80vh] lg:min-h-auto">
            {/* Header Section */}
            <div className="space-y-6 sm:space-y-8 lg:space-y-12">
              {/* Location Badge - Desktop */}
              <div
                className="hidden lg:flex items-center gap-3 backdrop-blur-sm rounded-full max-w-md px-6 py-3 border border-emerald-500/30"
                style={{
                  background: isDarkMode
                    ? "rgba(6, 78, 59, 0.4)"
                    : "rgba(16, 185, 129, 0.15)",
                }}
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full  animate-pulse"></div>
                <p className="text-base font-medium text-white">
                  Professional Photography • Calgary
                </p>
              </div>

              {/* Mobile Location Badge */}
             

              {/* Main Heading */}
              <div className="space-y-4  text-left">
                <div className="border-l-4 border-emerald-400 pl-4 sm:pl-6 lg:pl-8">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-white">
                    Yaryack
                    <br />
                    <span className="font-medium bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                      Photography
                    </span>
                  </h1>
                </div>
                <p className="text-xl sm:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 lg:pl-8">
                  Capturing authentic moments and creating timeless memories
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="space-y-6 sm:space-y-8 mt-8 sm:mt-12 lg:mt-16">
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                <Button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  size="lg"
                  className="w-full sm:w-auto group bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-white"
                >
                  <span className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-base sm:text-lg font-semibold">
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
                  className="lg:block hidden w-full sm:w-auto backdrop-blur-sm border-white/40 text-white hover:bg-white/10 hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <Eye className="w-5 h-5" />
                    <span className="text-base sm:text-lg font-semibold">
                      View Portfolio
                    </span>
                  </span>
                </Button>
              </div>

              {/* Trust Indicator - Desktop */}
              <div
                className="hidden lg:flex gap-4 items-center backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/30 max-w-2xl"
                style={{
                  background: isDarkMode
                    ? "rgba(6, 78, 59, 0.4)"
                    : "rgba(16, 185, 129, 0.15)",
                }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <p className="text-white text-base leading-relaxed">
                  Trusted by clients across Calgary for professional portrait,
                  event, and commercial photography.
                </p>
              </div>

              {/* Trust Indicator - Mobile */}
              <div
                className="hidden  gap-3 items-center backdrop-blur-sm rounded-xl p-4 border border-emerald-400/30 mx-auto max-w-md"
                style={{
                  background: isDarkMode
                    ? "rgba(6, 78, 59, 0.5)"
                    : "rgba(16, 185, 129, 0.2)",
                }}
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <p className="text-white text-sm leading-relaxed">
                  Trusted by clients across Calgary for professional photography services.
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Vertical Film Roll */}
          <div className="hidden lg:flex flex-col justify-center border-l border-emerald-500/30 pl-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2 w-fit border border-emerald-500/30"
                style={{
                  background: "rgba(6, 78, 59, 0.3)",
                }}
              >
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-white font-medium">
                  Live Preview
                </span>
              </div>

              {/* Vertical Film Roll Component */}
              <VerticalFilmRoll
                images={heroImages}
                themeClasses={themeClasses}
              />
            </div>
          </div>
        </div>

        {/* Mobile Portfolio Preview */}
        <div className="lg:hidden py-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold text-white mb-2">
              Featured Work
            </h3>
            <p className="text-white/80">Swipe to view more portfolio samples</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {heroImages.slice(0, 4).map((image, index) => (
              <div key={index} className="aspect-square rounded-xl overflow-hidden border-2 border-emerald-400/30 shadow-lg">
                <img
                  src={image}
                  alt={`Portfolio sample ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};