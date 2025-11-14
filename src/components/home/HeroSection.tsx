// src/components/home/HeroSection.tsx
import React, { useState, useEffect, useCallback } from "react";
import { Calendar, Eye } from "lucide-react";

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

interface HeroSectionProps {
  isDarkMode?: boolean;
  toggleTheme?: () => void;
  activeSection?: string;
  onNavClick?: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isDarkMode: externalIsDarkMode,
  toggleTheme: externalToggleTheme,
  activeSection = 'home',
  onNavClick
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [internalIsDarkMode, setInternalIsDarkMode] = useState(true);
  
  const isDarkMode = externalIsDarkMode ?? internalIsDarkMode;
  const toggleTheme = externalToggleTheme ?? (() => setInternalIsDarkMode(!internalIsDarkMode));
  
  const heroImages = [heroThumb1, heroThumb2, heroThumb3, heroThumb4];
  const heroMobileImages = [heroMobileThumb1, heroMobileThumb2, heroMobileThumb3, heroMobileThumb4];
  const mobileSlides = [heroMobile1, heroMobile2, heroMobile3];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    <section className="relative" style={{ 
      background: isDarkMode ? '#0a0a0a' : '#f5f5f5',
      minHeight: '100vh'
    }}>
      <div className="relative">
        {/* Hero Section */}
        <div className="relative overflow-hidden" style={{
          height: isMobile ? '100dvh' : '100vh'
        }}>
          {/* Background Image */}
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
                className="flex w-full h-full ds-transition-slow ease-in-out" 
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

            {/* Overlay Gradients */}
            <div
              className="hidden lg:block absolute inset-0"
              style={{
                background: isDarkMode 
                  ? "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.3) 100%)"
                  : "linear-gradient(to right, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)",
              }}
            />
            <div
              className="lg:hidden absolute inset-0"
              style={{
                background: isDarkMode 
                  ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.3) 60%, transparent 100%)"
                  : "linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.6) 35%, rgba(255,255,255,0.3) 60%, transparent 100%)",
              }}
            />
          </div>

          {/* Main Content */}
          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] h-full gap-0">
              {/* Content Area */}
              <div 
                className="flex flex-col lg:border-r lg:ds-border-primary justify-end lg:justify-center lg:pr-8"
                style={{
                  paddingTop: isMobile ? '80px' : '0',
                  paddingBottom: isMobile ? '5rem' : '0',
                  minHeight: isMobile ? '100%' : 'auto'
                }}
              >
                {/* Header Section */}
                <div className="space-y-4 lg:space-y-12">
                  {/* Location Badge - Desktop */}
                  <div
                    className="hidden lg:flex items-center gap-3 backdrop-blur-sm rounded-full max-w-md border ds-transition-slow hover:border-emerald-400/40"
                    style={{
                      background: isDarkMode 
                        ? 'rgba(0, 0, 0, 0.5)' 
                        : 'rgba(255, 255, 255, 0.7)',
                      borderColor: isDarkMode 
                        ? 'rgba(16, 185, 129, 0.3)' 
                        : 'rgba(16, 185, 129, 0.5)',
                      padding: 'var(--spacing-3) var(--spacing-6)',
                    }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ background: 'var(--color-brand-primary)' }}
                    />
                    <p className="ds-body-base font-medium" style={{
                      color: isDarkMode ? '#ffffff' : '#1f2937'
                    }}>
                      Professional Photography • Calgary
                    </p>
                  </div>

                  {/* Main Heading */}
                  <div className="space-y-6 text-left">
                    <div 
                      className="border-l-4 pl-6 sm:pl-8 lg:pl-10"
                      style={{ borderColor: 'var(--color-brand-primary)' }}
                    >
                      <h1 className="lg:ds-heading-1 ds-heading-3" style={{
                        color: isDarkMode ? '#ffffff' : 'var(--color-brand-primary)'
                      }}>
                        Yaryack
                        <br />
                        <span className="font-semibold">
                          Photography
                        </span>
                      </h1>
                    </div>
                    <p className="lg:ds-body-lg ds-body-sm max-w-2xl mx-auto lg:mx-0 lg:pl-10" style={{
                      color: isDarkMode ? '#d1d5db' : 'var(--color-brand-secondary)'
                    }}>
                      Capturing authentic moments and creating timeless memories
                    </p>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="space-y-8 mt-8 lg:mt-16 mr-4">
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
                      className="hidden lg:flex w-full sm:w-auto ds-btn ds-btn-outline ds-btn-md"
                    >
                      <Eye className="w-5 h-5" />
                      <span>View Portfolio</span>
                    </button>
                  </div>

                  {/* Trust Indicator - Desktop */}
                  <div
                    className="hidden lg:flex gap-4 items-center backdrop-blur-sm rounded-2xl border max-w-2xl ds-transition-slow hover:border-emerald-400/40"
                    style={{
                      background: isDarkMode 
                        ? 'rgba(0, 0, 0, 0.5)' 
                        : 'rgba(255, 255, 255, 0.7)',
                      borderColor: isDarkMode 
                        ? 'rgba(16, 185, 129, 0.3)' 
                        : 'rgba(16, 185, 129, 0.5)',
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
                    <p className="ds-body-base" style={{
                      color: isDarkMode ? '#ffffff' : '#1f2937'
                    }}>
                      Trusted by clients across Calgary for professional portrait,
                      event, and commercial photography.
                    </p>
                  </div>

                  {/* Trust Indicator - Mobile */}
                  <div
                    className="lg:hidden flex gap-3 items-center backdrop-blur-sm rounded-xl border mx-auto max-w-md ds-transition-slow hover:border-emerald-400/40"
                    style={{
                      background: isDarkMode 
                        ? 'rgba(0, 0, 0, 0.6)' 
                        : 'rgba(255, 255, 255, 0.8)',
                      borderColor: isDarkMode 
                        ? 'rgba(16, 185, 129, 0.3)' 
                        : 'rgba(16, 185, 129, 0.5)',
                      padding: 'var(--spacing-4)',
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
                    <p className="ds-body-sm" style={{
                      color: isDarkMode ? '#ffffff' : '#1f2937'
                    }}>
                      Trusted by clients across Calgary for professional photography services.
                    </p>
                  </div>
                </div>
              </div>

              {/* Desktop Vertical Film Roll */}
              <VerticalImageRoll 
                images={heroImages}
                isDarkMode={isDarkMode}
                isMobile={isMobile}
              />
            </div>
          </div>
        </div>

        {/* Mobile Portfolio Preview */}
        {isMobile && (
          <div className="lg:hidden relative min-h-[60vh] bg-gradient-to-b from-transparent to-gray-900">
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <img
                src={heroMobileBottom}
                alt="Background"
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%)'
                }}
              />
            </div>

            <div className="h-full flex flex-col justify-end px-4 py-8">
              <div className="text-center mb-6">
                <div 
                  className="inline-flex items-center gap-2 backdrop-blur-md rounded-full px-4 py-2 mb-4 border"
                  style={{
                    background: isDarkMode 
                      ? 'rgba(0,0,0,0.4)' 
                      : 'rgba(255,255,255,0.6)',
                    borderColor: 'var(--color-brand-primary)',
                  }}
                >
                  <div 
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: 'var(--color-brand-primary)' }}
                  />
                  <span className="ds-body-sm font-medium" style={{
                    color: isDarkMode ? '#ffffff' : '#1f2937'
                  }}>
                    Portfolio Preview
                  </span>
                </div>
                <h3 className="ds-heading-3 mb-2" style={{
                  color: isDarkMode ? '#ffffff' : '#1f2937'
                }}>
                  Featured Work
                </h3>
                <p className="ds-body-base" style={{
                  color: isDarkMode ? '#d1d5db' : '#4b5563'
                }}>
                  Recent captures from our portfolio
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-6">
                {heroMobileImages.slice(0, 4).map((image, index) => (
                  <div 
                    key={index} 
                    className="relative aspect-[3/4] rounded-lg overflow-hidden backdrop-blur-sm border-2 ds-transition-slow hover:scale-[1.02] group"
                    style={{ borderColor: 'var(--color-border-primary)' }}
                  >
                    <img
                      src={image}
                      alt={`Portfolio sample ${index + 1}`}
                      className="w-full h-full object-cover ds-transition-slow group-hover:scale-110"
                    />
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 ds-transition-slow flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)'
                      }}
                    >
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="ds-body-sm ds-text-primary font-medium">
                          View Details
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={() =>
                    document
                      .getElementById("portfolio")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="ds-btn ds-btn-outline ds-btn-md group"
                >
                  <Eye className="w-5 h-5" />
                  <span>View Full Portfolio</span>
                  <svg 
                    className="w-4 h-4 ds-transition-base group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Vertical Image Roll Component
interface VerticalImageRollProps {
  images: string[];
  isDarkMode: boolean;
  isMobile: boolean;
}

const VerticalImageRoll: React.FC<VerticalImageRollProps> = ({ images, isDarkMode, isMobile }) => {
  if (isMobile) return null;

  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

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

  return (
    <div 
      className="hidden lg:flex flex-col justify-center relative"
      style={{ marginTop: '70px' }}
    >
      <div className="relative h-[750px] w-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 right-0 h-56 z-20 pointer-events-none"
          style={{
            background: isDarkMode
              ? 'linear-gradient(to bottom, rgba(10,10,10,1) 0%, rgba(10,10,10,0.98) 8%, rgba(16,185,129,0.12) 45%, transparent 100%)'
              : 'linear-gradient(to bottom, rgba(245,245,245,1) 0%, rgba(245,245,245,0.98) 8%, rgba(16,185,129,0.08) 45%, transparent 100%)'
          }}
        />
        
        <div 
          className="absolute bottom-0 left-0 right-0 h-56 z-20 pointer-events-none"
          style={{
            background: isDarkMode
              ? 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.98) 8%, rgba(16,185,129,0.12) 45%, transparent 100%)'
              : 'linear-gradient(to top, rgba(245,245,245,1) 0%, rgba(245,245,245,0.98) 8%, rgba(16,185,129,0.08) 45%, transparent 100%)'
          }}
        />

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