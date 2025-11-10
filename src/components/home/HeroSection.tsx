// src/components/home/HeroSection.tsx
import React, { useState, useEffect, useCallback } from "react";
import { Calendar, Eye } from "lucide-react";
import { VerticalFilmRoll } from "./VerticalFilmRoll";

// Import images
import heroMain from "../../assets/images/hero-main.jpg";
import heroMobileBottom from "../../assets/images/bg-hero-mobile.jpg";
import heroThumb1 from "../../assets/images/hero-thumb-1.jpg";
import heroThumb2 from "../../assets/images/hero-thumb-2.jpg";
import heroThumb3 from "../../assets/images/hero-thumb-3.jpg";
import heroThumb4 from "../../assets/images/hero-thumb-4.jpg";
import heroMobile1 from "../../assets/images/event-4.jpg";
import heroMobile2 from "../../assets/images/hero-thumb-5.jpg";  
import heroMobile3 from "../../assets/images/hero-thumb-6.jpeg";

import heroMobileThumb1 from "../../assets/images/hero-thumb-mobile-5.jpg";
import heroMobileThumb2 from "../../assets/images/hero-thumb-mobile-6.jpg";
import heroMobileThumb3 from "../../assets/images/hero-thumb-mobile-3.jpg";
import heroMobileThumb4 from "../../assets/images/hero-thumb-mobile-4.jpg";
import type { ThemeClasses } from "../../types";

interface HeroSectionProps {
  themeClasses?: ThemeClasses;
}

export const HeroSection: React.FC<HeroSectionProps> = ({themeClasses}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  const heroImages = [heroThumb1, heroThumb2, heroThumb3, heroThumb4];
  const heroMobileImages = [heroMobileThumb1, heroMobileThumb2, heroMobileThumb3, heroMobileThumb4];
  const mobileSlides = [heroMobile1, heroMobile2, heroMobile3];

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

  return (
    <section className="relative min-h-screen bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Desktop Image */}
        <img
          src={heroMain}
          alt="Professional photography by Yaryack"
          className="hidden lg:block w-full h-full object-cover"
        />
        
        {/* Mobile Slideshow */}
        <div className="lg:hidden w-full h-full relative">
          <div 
            className="flex w-full h-[100vh] ds-transition-slow ease-in-out" 
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
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
            {mobileSlides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ds-transition-slow ${
                  currentSlide === index 
                    ? 'w-8 shadow-lg' 
                    : 'opacity-60'
                }`}
                style={{
                  background: currentSlide === index 
                    ? 'var(--color-brand-primary)' 
                    : 'var(--color-text-primary)',
                  boxShadow: currentSlide === index 
                    ? 'var(--shadow-brand)' 
                    : 'none'
                }}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Gradients */}
        <div
          className="hidden lg:block absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(0,0,0, 0.3) 0%, rgba(0,0,0, 0.3) 30%, rgba(0,0,0, 0.2) 90%)",
          }}
        />
        <div
          className="lg:hidden absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.4) 100%)",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_22%] min-h-screen gap-8">
          {/* Main Content Area */}
          <div className="flex flex-col justify-end lg:justify-center pt-12 lg:py-16 min-h-[95vh] lg:min-h-0">
            {/* Header Section */}
            <div className="space-y-4 lg:space-y-12">
              {/* Location Badge - Desktop */}
              <div
                className="hidden lg:flex items-center gap-3 backdrop-blur-sm rounded-full max-w-md border ds-transition-slow hover:border-emerald-400/40"
                style={{
                  background: 'var(--color-bg-card)',
                  borderColor: 'var(--color-border-primary)',
                  padding: 'var(--spacing-3) var(--spacing-6)',
                }}
              >
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: 'var(--color-brand-primary)' }}
                />
                <p className="ds-body-base ds-text-primary font-medium">
                  Professional Photography • Calgary
                </p>
              </div>

              {/* Main Heading */}
              <div className="space-y-6 text-left">
                <div 
                  className="border-l-4 pl-6 sm:pl-8 lg:pl-10"
                  style={{ borderColor: 'var(--color-brand-primary)' }}
                >
                  <h1 className="lg:ds-heading-1 ds-heading-3 ds-text-primary ">
                    Yaryack
                    <br />
                    <span 
                      className="font-semibold bg-gradient-to-r bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(to right, var(--color-text-primary), var(--color-text-primary))`
                      }}
                    >
                      Photography
                    </span>
                  </h1>
                </div>
                <p className="lg:ds-body-lg ds-body-sm ds-text-secondary max-w-2xl mx-auto lg:mx-0 lg:pl-10">
                  Capturing authentic moments and creating timeless memories
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="space-y-8 mt-8 lg:mt-16">
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="w-full sm:w-auto ds-btn ds-btn-primary lg:ds-btn-lg ds-btn-md group"
                >
                  <Calendar className="w-6 h-6" />
                  <span>Book a Session</span>
                  <svg 
                    className="w-5 h-5 ds-transition-base group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <button
                  onClick={() =>
                    document
                      .getElementById("portfolio")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="hidden lg:flex w-full sm:w-auto ds-btn ds-btn-outline ds-btn-lg"
                >
                  <Eye className="w-5 h-5" />
                  <span>View Portfolio</span>
                </button>
              </div>

              {/* Trust Indicator - Desktop */}
              <div
                className="hidden lg:flex gap-4 items-center backdrop-blur-sm rounded-2xl border max-w-2xl ds-transition-slow hover:border-emerald-400/40"
                style={{
                  background: 'var(--color-bg-card)',
                  borderColor: 'var(--color-border-primary)',
                  padding: 'var(--spacing-6)',
                }}
              >
                <div className="flex-shrink-0">
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background: `linear-gradient(to bottom right, var(--color-brand-primary-light), var(--color-brand-primary))`
                    }}
                  >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <div 
                        className="w-5 h-5 rounded-full"
                        style={{ background: 'var(--color-brand-primary)' }}
                      />
                    </div>
                  </div>
                </div>
                <p className="ds-body-base ds-text-primary">
                  Trusted by clients across Calgary for professional portrait,
                  event, and commercial photography.
                </p>
              </div>

              {/* Trust Indicator - Mobile */}
              <div
                className="lg:hidden flex gap-3 items-center backdrop-blur-sm rounded-xl border mx-auto max-w-md"
                style={{
                  background: 'var(--color-bg-card)',
                  borderColor: 'var(--color-border-light)',
                  padding: 'var(--spacing-3)',
                }}
              >
                <div className="flex-shrink-0">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
                    style={{
                      background: `linear-gradient(to bottom right, var(--color-brand-primary-light), var(--color-brand-primary))`
                    }}
                  >
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ background: 'var(--color-brand-primary)' }}
                      />
                    </div>
                  </div>
                </div>
                <p className="ds-body-sm ds-text-primary">
                  Trusted by clients across Calgary for professional photography services.
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Vertical Film Roll */}
          <div 
            className="hidden lg:flex flex-col justify-center border-l pl-6 mt-[72px]"
            style={{ borderColor: 'var(--color-border-primary)' }}
          >
            <div className="space-y-4">
              <div 
                className="flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2 w-fit border"
                style={{
                  background: 'var(--color-bg-card)',
                  borderColor: 'var(--color-border-primary)',
                }}
              >
                <div 
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: 'var(--color-brand-primary)' }}
                />
                <span className="ds-body-sm ds-text-primary font-medium">
                  Live Preview
                </span>
              </div>

              <VerticalFilmRoll
                images={heroImages}
                themeClasses={{} as ThemeClasses}
              />
            </div>
          </div>
        </div>

        {/* Mobile Portfolio Preview */}
        <div className="lg:hidden -mx-4 ">
         <div 
            className="absolute -z-10 w-full h-[100vh] " 
          >
              <div  className="w-full h-full flex-shrink-0">
                <img
                  src={heroMobileBottom}
                  alt={`Professional photography by Yaryack - Slide `}
                  className="w-full h-full object-cover grayscale "
                />
              </div>
          </div>
        <div className="p-3 ">
           <div className="text-center mb-8 py-12 ">
            <h3 className="ds-heading-3 ds-text-primary mb-3">
              Featured Work
            </h3>
            <p className="ds-body-base ds-text-secondary">
              Swipe to view more portfolio samples
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {heroMobileImages.slice(0, 4).map((image, index) => (
              <div 
                key={index} 
                className="aspect-square rounded-xl overflow-hidden border-2 shadow-lg ds-transition-slow hover:scale-105"
                style={{ borderColor: 'var(--color-border-light)' }}
              >
                <img
                  src={image}
                  alt={`Portfolio sample ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};