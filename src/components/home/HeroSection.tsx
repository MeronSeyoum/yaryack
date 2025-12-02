// src/components/home/HeroSection.tsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Calendar, Eye, ArrowRight } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useResponsive } from "../../hooks/useResponsive";
import { VerticalImageRoll } from "./VerticalImageRoll";

import heroMain from "../../assets/images/hero-main.jpg";
import heroMobileBottom from "../../assets/images/bg-hero-mobile.jpg";
import heroThumb1 from "../../assets/images/hero-thumb-1.jpg";
import heroThumb2 from "../../assets/images/hero-thumb-2.jpg";
import heroThumb3 from "../../assets/images/hero-thumb-3.jpg";
import heroThumb4 from "../../assets/images/hero-thumb-4.jpg";
import heroMobile1 from "../../assets/images/21.48.03_c06b995a.jpg";
import heroMobile2 from "../../assets/images/21.51.45_5eaa075f.jpg";  
import heroMobile3 from "../../assets/images/21.51.45_3a86605b.jpg";
import heroMobile4 from "../../assets/images/21.51.45_80edf31d.jpg";
import heroMobile5 from "../../assets/images/21.48.03_19aa522d.jpg";
import heroMobile6 from "../../assets/images/21.51.45_87751dc7.jpg";
import heroMobile7 from "../../assets/images/IMG-20251108-WA0043.jpg";

import heroMobileThumb1 from "../../assets/images/21.48.02_7ba4943d.jpg";
import heroMobileThumb2 from "../../assets/images/hero-thumb-5.jpg";
import heroMobileThumb3 from "../../assets/images/hero-thumb-4.jpg";
import heroMobileThumb4 from "../../assets/images/21.48.03_72814712.jpg";

interface HeroSectionProps {
  activeSection?: string;
  onNavClick?: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const SLIDE_INTERVAL = 4000;
const AUTO_PLAY_RESUME_DELAY = 8000;

const HERO_IMAGES = [heroThumb1, heroThumb2, heroThumb3, heroThumb4];
const MOBILE_THUMB_IMAGES = [heroMobileThumb1, heroMobileThumb2, heroMobileThumb3, heroMobileThumb4];
const MOBILE_SLIDES = [heroMobile1,heroMobile7, heroMobile2, heroMobile3, heroMobile4, heroMobile5, heroMobile6];

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeSection = 'home',
  onNavClick
}) => {
  const { isDarkMode } = useTheme();
  const { isMobile } = useResponsive();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const overlayStyles = useMemo(() => ({
    desktop: isDarkMode 
      ? "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 15%, rgba(0,0,0,0.01) 65%, transparent 100%)"
      : "linear-gradient(to right, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.45) 20%, rgba(255,255,255,0.05) 55%, rgba(255,255,255,0.15) 80%, transparent 100%)",
    mobile: isDarkMode 
      ? "linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.75) 12%, rgba(0,0,0,0.50) 25%, rgba(0,0,0,0.20) 45%, transparent 100%)"
      : "linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 8%, rgba(255,255,255,0.60) 20%, rgba(255,255,255,0.30) 35%, rgba(255,255,255,0.10) 50%, transparent 100%)",
  }), [isDarkMode]);

  useEffect(() => {
    if (!isAutoPlaying || !isMobile) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % MOBILE_SLIDES.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isMobile]);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    
    setTimeout(() => setIsAutoPlaying(true), AUTO_PLAY_RESUME_DELAY);
  }, [currentSlide]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <section 
      className="relative" 
      style={{ 
        background: isDarkMode ? '#0a0a0a' : '#f5f5f5',
        minHeight: '100vh'
      }}
      aria-label="Hero section"
    >
      <div className="relative">
        <div 
          className="relative overflow-hidden" 
          style={{ height: isMobile ? '100dvh' : '100vh' }}
        >
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <img
              src={heroMain}
              alt="Professional photography showcase"
              className="hidden lg:block w-full h-full object-cover"
              loading="eager"
            />
            
            <div className="lg:hidden w-full h-full relative">
              <div 
                className="flex w-full h-full transition-transform duration-700 ease-out" 
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {MOBILE_SLIDES.map((slide, index) => (
                  <div key={index} className="w-full h-full flex-shrink-0">
                    <img
                      src={slide}
                      alt={`Photography showcase ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                ))}
              </div>
              
              <div 
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10"
                role="group"
                aria-label="Slideshow navigation"
              >
                {MOBILE_SLIDES.map((_, index) => (
                  <button
                    key={index}
                    className={`h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      currentSlide === index 
                        ? 'w-8 shadow-lg' 
                        : 'w-3 opacity-60 hover:opacity-80'
                    }`}
                    style={{
                      background: currentSlide === index 
                        ? 'var(--color-brand-primary)' 
                        : 'var(--color-text-primary)',
                      boxShadow: currentSlide === index 
                        ? '0 4px 12px rgba(6, 95, 70, 0.4)' 
                        : 'none',
                    }}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={currentSlide === index}
                  />
                ))}
              </div>
            </div>

            <div
              className="hidden lg:block absolute inset-0 pointer-events-none"
              style={{ background: overlayStyles.desktop }}
            />
            <div
              className="lg:hidden absolute inset-0 pointer-events-none"
              style={{ background: overlayStyles.mobile }}
            />
          </div>

          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-16 h-full">
            <div className="flex flex-col lg:grid lg:grid-cols-[1fr_340px] lg:mt-20 h-full gap-0">
              <div 
                className="flex flex-col justify-end lg:justify-center lg:pr-12"
                style={{
                  paddingTop: isMobile ? '80px' : '0',
                  paddingBottom: isMobile ? '5rem' : '0',
                  minHeight: isMobile ? '100%' : 'auto',
                }}
              >
                <div className="space-y-4 lg:space-y-12">
                  <div
                    className="hidden lg:flex items-center gap-3 backdrop-blur-xl rounded-full max-w-md border transition-all duration-300 hover:border-emerald-400/70 hover:shadow-2xl"
                    style={{
                      background: isDarkMode 
                        ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.85), rgba(15, 15, 15, 0.75))' 
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(250, 250, 250, 0.92))',
                      borderColor: isDarkMode 
                        ? 'rgba(16, 185, 129, 0.5)' 
                        : 'rgba(16, 185, 129, 0.4)',
                      padding: '16px 32px',
                      boxShadow: isDarkMode
                        ? '0 10px 40px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 3px rgba(255, 255, 255, 0.08)'
                        : '0 10px 40px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.06), inset 0 1px 3px rgba(255, 255, 255, 0.9)',
                    }}
                    role="status"
                    aria-label="Location and service type"
                  >
                    <div 
                      className="w-2.5 h-2.5 rounded-full animate-pulse"
                      style={{ 
                        background: 'var(--color-brand-primary)',
                        boxShadow: '0 0 12px var(--color-brand-primary), 0 0 24px rgba(6, 95, 70, 0.5)',
                      }}
                      aria-hidden="true"
                    />
                    <p 
                      className="font-semibold text-base" 
                      style={{ 
                        color: isDarkMode ? '#ffffff' : '#111827',
                        letterSpacing: '0.02em',
                        textShadow: isDarkMode ? '0 1px 2px rgba(0, 0, 0, 0.5)' : '0 1px 2px rgba(255, 255, 255, 0.8)',
                      }}
                    >
                      Professional Photography • Calgary
                    </p>
                  </div>

                  <div className="space-y-6 text-left">
                    <div 
                      className="border-l-4 pl-6 sm:pl-8 lg:pl-10"
                      style={{ borderColor: 'var(--color-brand-primary)' }}
                    >
                      <h1 
                        className="text-3xl lg:text-7xl font-bold leading-tight"
                        style={{ color: isDarkMode ? '#ffffff' : 'var(--color-brand-primary)' }}
                      >
                        Yaryack
                        <br />
                        <span className="font-semibold">Photography</span>
                      </h1>
                    </div>
                    <p 
                      className="hidden lg:block text-lg lg:text-xl max-w-2xl lg:pl-10"
                      style={{ 
                        color: isDarkMode ? '#e5e7eb' : '#374151',
                        textShadow: isDarkMode ? '0 2px 4px rgba(0, 0, 0, 0.5)' : '0 1px 2px rgba(255, 255, 255, 0.8)',
                      }}
                    >
                      Capturing authentic moments and creating timeless memories
                    </p>
                  </div>

                  <div className="space-y-8 mt-8 lg:mt-16 mr-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                      <button
                        onClick={() => scrollToSection("contact")}
                        className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 group"
                        style={{
                          background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-primary-dark))',
                          color: '#ffffff',
                        }}
                        aria-label="Book a photography session"
                      >
                        <Calendar className="w-6 h-6" aria-hidden="true" />
                        <span>Book a Session</span>
                        <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                      </button>
                      
                      <button
                        onClick={() => scrollToSection("portfolio")}
                        className="hidden lg:flex w-full sm:w-auto items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold border-2 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{
                          borderColor: 'var(--color-brand-primary)',
                          color: isDarkMode ? '#ffffff' : 'var(--color-brand-primary)',
                          background: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
                          backdropFilter: 'blur(8px)',
                        }}
                        aria-label="View photography portfolio"
                      >
                        <Eye className="w-5 h-5" aria-hidden="true" />
                        <span>View Portfolio</span>
                      </button>
                    </div>

                    <div
                      className="hidden lg:flex gap-5 items-center backdrop-blur-xl rounded-2xl border max-w-2xl transition-all duration-300 hover:border-emerald-400/70 hover:shadow-2xl"
                      style={{
                        background: isDarkMode 
                          ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.85), rgba(15, 15, 15, 0.75))' 
                          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(250, 250, 250, 0.92))',
                        borderColor: isDarkMode 
                          ? 'rgba(16, 185, 129, 0.5)' 
                          : 'rgba(16, 185, 129, 0.4)',
                        padding: '32px',
                        boxShadow: isDarkMode
                          ? '0 16px 48px rgba(0, 0, 0, 0.6), 0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.08)'
                          : '0 16px 48px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.08), inset 0 1px 3px rgba(255, 255, 255, 0.9)',
                      }}
                    >
                      <div className="flex-shrink-0" aria-hidden="true">
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, var(--color-brand-primary-light), var(--color-brand-primary))',
                            boxShadow: '0 10px 30px rgba(6, 95, 70, 0.4), 0 4px 12px rgba(6, 95, 70, 0.3)',
                          }}
                        >
                          <div 
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
                            style={{
                              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                          >
                            <div 
                              className="w-6 h-6 rounded-full"
                              style={{ 
                                background: 'var(--color-brand-primary)',
                                boxShadow: '0 0 16px var(--color-brand-primary), 0 0 32px rgba(6, 95, 70, 0.4)',
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <p 
                        className="text-base leading-relaxed font-medium"
                        style={{ 
                          color: isDarkMode ? '#ffffff' : '#111827',
                          letterSpacing: '0.02em',
                          textShadow: isDarkMode ? '0 1px 2px rgba(0, 0, 0, 0.5)' : '0 1px 2px rgba(255, 255, 255, 0.8)',
                        }}
                      >
                        Trusted by clients across Calgary for professional portrait, event, and commercial photography.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <VerticalImageRoll 
                images={HERO_IMAGES}
                isDarkMode={isDarkMode}
                isMobile={isMobile}
              />
            </div>
          </div>
        </div>

        {isMobile && (
          <div className="lg:hidden relative min-h-[60vh]">
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <img
                src={heroMobileBottom}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
                aria-hidden="true"
              />
              <div 
                className="absolute inset-0"
                style={{
                  background: isDarkMode
                    ? 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.88) 35%, rgba(0,0,0,0.96) 100%)'
                    : 'linear-gradient(to bottom, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.88) 35%, rgba(245,245,245,0.98) 100%)'
                }}
                aria-hidden="true"
              />
            </div>

            <div className="h-full flex flex-col justify-end px-4 py-8">
              <div className="text-center mb-6">
                <div 
                  className="inline-flex items-center gap-3 backdrop-blur-xl rounded-full px-6 py-3 mb-4 border"
                  style={{
                    background: isDarkMode 
                      ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.90), rgba(15, 15, 15, 0.80))' 
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(250, 250, 250, 0.92))',
                    borderColor: isDarkMode 
                      ? 'rgba(16, 185, 129, 0.6)' 
                      : 'rgba(16, 185, 129, 0.5)',
                    boxShadow: isDarkMode
                      ? '0 10px 32px rgba(0, 0, 0, 0.7), 0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 3px rgba(255, 255, 255, 0.1)'
                      : '0 10px 32px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 3px rgba(255, 255, 255, 0.9)',
                  }}
                  role="status"
                >
                  <div 
                    className="w-2.5 h-2.5 rounded-full animate-pulse"
                    style={{ 
                      background: 'var(--color-brand-primary)',
                      boxShadow: '0 0 12px var(--color-brand-primary), 0 0 24px rgba(6, 95, 70, 0.5)',
                    }}
                    aria-hidden="true"
                  />
                  <span 
                    className="text-sm font-semibold"
                    style={{ 
                      color: isDarkMode ? '#ffffff' : '#111827',
                      textShadow: isDarkMode ? '0 1px 2px rgba(0, 0, 0, 0.5)' : '0 1px 2px rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    Portfolio Preview
                  </span>
                </div>
                <h2 
                  className="text-2xl font-bold mb-2"
                  style={{ 
                    color: isDarkMode ? '#ffffff' : '#111827',
                    textShadow: isDarkMode ? '0 2px 4px rgba(0, 0, 0, 0.5)' : '0 1px 3px rgba(255, 255, 255, 0.8)',
                  }}
                >
                  Featured Work
                </h2>
                <p 
                  className="text-base"
                  style={{ 
                    color: isDarkMode ? '#d1d5db' : '#374151',
                    textShadow: isDarkMode ? '0 1px 2px rgba(0, 0, 0, 0.5)' : 'none',
                  }}
                >
                  Recent captures from our portfolio
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-6">
                {MOBILE_THUMB_IMAGES.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection("portfolio")}
                    className="relative aspect-[3/4] rounded-lg overflow-hidden backdrop-blur-sm border-2 transition-all duration-300 hover:scale-[1.02] group focus:outline-none focus:ring-2"
                    style={{ borderColor: 'var(--color-border-primary)' }}
                    aria-label={`View portfolio sample ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt={`Portfolio sample ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3"
                      style={{
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)'
                      }}
                    >
                      <span className="text-sm font-medium text-white">
                        View Details
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={() => scrollToSection("portfolio")}
                  className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold border-2 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 group"
                  style={{
                    borderColor: 'var(--color-brand-primary)',
                    color: '#ffffff',
                    background: 'rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(8px)',
                  }}
                  aria-label="View full photography portfolio"
                >
                  <Eye className="w-5 h-5" aria-hidden="true" />
                  <span>View Full Portfolio</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};