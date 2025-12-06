// src/components/home/HeroSection.tsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Calendar, Eye, ArrowRight, MapPin } from "lucide-react";
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

const SLIDE_INTERVAL = 5000;
const AUTO_PLAY_RESUME_DELAY = 8000;
const TRANSITION_DURATION = 700;

const HERO_IMAGES = [heroThumb1, heroThumb2, heroThumb3, heroThumb4];
const MOBILE_THUMB_IMAGES = [heroMobileThumb1, heroMobileThumb2, heroMobileThumb3, heroMobileThumb4];
const MOBILE_SLIDES = [heroMobile1, heroMobile7, heroMobile2, heroMobile3, heroMobile4, heroMobile5, heroMobile6];

export const HeroSection: React.FC<HeroSectionProps> = ({ activeSection = 'home', onNavClick }) => {
  const { isDarkMode } = useTheme();
  const { isMobile } = useResponsive();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Memoized overlay gradients - IMPROVE
  const overlayStyles = useMemo(() => ({
    desktop: isDarkMode 
      ? "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.55) 20%, rgba(0,0,0,0.2) 35%, transparent 100%)"
      : "linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 25%, rgba(255,255,255,0.2) 35%, transparent 100%)",
    mobile: isDarkMode 
      ? "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.4) 40%, transparent 100%)"
      : "linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 20%, rgba(255,255,255,0.3) 40%, transparent 100%)",
  }), [isDarkMode]);

  // Auto-play slideshow effect
  useEffect(() => {
    if (!isAutoPlaying || !isMobile) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % MOBILE_SLIDES.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isMobile]);

  // Reset transition state
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Manual slide navigation
  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    
    setTimeout(() => setIsAutoPlaying(true), AUTO_PLAY_RESUME_DELAY);
  }, [currentSlide]);

  // Smooth scroll to section
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
        background: 'var(--color-bg-page)',
        minHeight: '100vh'
      }}
      aria-label="Hero section"
    >
      {/* Main Hero Container */}
      <div className="relative">
        <div 
          className="relative overflow-hidden" 
          style={{ height: isMobile ? '100dvh' : '100vh' }}
        >
          {/* Background Images */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            {/* Desktop Hero Image */}
            <img
              src={heroMain}
              alt="Professional photography showcase"
              className="hidden lg:block w-full h-full object-cover"
              loading="eager"
            />
            
            {/* Mobile Slideshow */}
            <div className="lg:hidden w-full h-full relative">
              <div 
                className="flex w-full h-full ds-transition-slow" 
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
              
              {/* Slideshow Indicators */}
              <div 
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10 px-4 py-2 rounded-full backdrop-blur-md"
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border-light)',
                }}
                role="group"
                aria-label="Slideshow navigation"
              >
                {MOBILE_SLIDES.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 rounded-full ds-transition-base focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      currentSlide === index 
                        ? 'w-8' 
                        : 'w-2 opacity-50 hover:opacity-75'
                    }`}
                    style={{
                      background: currentSlide === index 
                        ? 'var(--color-brand-primary)' 
                        : 'var(--color-text-tertiary)',
                      focusRingColor: 'var(--color-brand-primary)',
                    }}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={currentSlide === index}
                  />
                ))}
              </div>
            </div>

            {/* Gradient Overlays */}
            <div
              className="hidden lg:block absolute inset-0 pointer-events-none"
              style={{ background: overlayStyles.desktop }}
            />
            <div
              className="lg:hidden absolute inset-0 pointer-events-none"
              style={{ background: overlayStyles.mobile }}
            />
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-16 h-full">
            <div className="flex flex-col lg:grid lg:grid-cols-[1fr_340px] lg:mt-20 h-full gap-0">
              {/* Main Content Area */}
              <div 
                className="flex flex-col justify-end lg:justify-center lg:pr-12"
                style={{
                  paddingTop: isMobile ? '80px' : '0',
                  paddingBottom: isMobile ? '5rem' : '0',
                  minHeight: isMobile ? '100%' : 'auto',
                }}
              >
                <div className="space-y-6 lg:space-y-12">
                  {/* Location Badge - Desktop Only */}
                  <div
                    className="hidden lg:inline-flex items-center gap-2 ds-card ds-card-p-sm max-w-fit"
                    role="status"
                    aria-label="Location and service type"
                  >
                    <MapPin 
                      className="w-4 h-4" 
                      style={{ color: 'var(--color-brand-primary)' }}
                      aria-hidden="true"
                    />
                    <p className="ds-body-sm ds-text-secondary font-semibold">
                      Professional Photography • Calgary, AB
                    </p>
                  </div>

                  {/* Main Heading */}
                  <div className="space-y-4">
                    <div 
                      className="border-l-4 pl-6 sm:pl-8 lg:pl-10"
                      style={{ borderColor: 'var(--color-brand-primary)' }}
                    >
                      <h1 className={`ds-heading-2   ds-text-primary leading-tight`}
                      style={{ 
                        fontFamily: `${isMobile ? ' "Brush Script MT", cursive' : ''}`,
                      }}
                      >
                        Yaryack
                        <br />
                          Photography
                      </h1>
                    </div>
                    
                    {/* Subtitle - Desktop Only */}
                    <p className="hidden lg:block ds-body-lg ds-text-secondary max-w-2xl lg:pl-0">
                      Capturing authentic moments and creating timeless memories that tell your unique story
                    </p>
                  </div>

                  {/* Call-to-Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 lg:pl-0">
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="ds-btn ds-btn-primary ds-btn-lg group"
                      aria-label="Book a photography session"
                    >
                      <Calendar className="w-5 h-5" aria-hidden="true" />
                      <span>Book a Session</span>
                      <ArrowRight className="w-4 h-4 ds-transition-base group-hover:translate-x-1" aria-hidden="true" />
                    </button>
                    
                    <button
                      onClick={() => scrollToSection("portfolio")}
                      className="hidden lg:flex ds-btn ds-btn-outline ds-btn-lg"
                      aria-label="View photography portfolio"
                    >
                      <Eye className="w-5 h-5" aria-hidden="true" />
                      <span>View Portfolio</span>
                    </button>
                  </div>

                  {/* Trust Badge - Desktop Only */}
                  <div
                    className="hidden lg:flex gap-4 items-center ds-card ds-card-p-md max-w-2xl lg:ml-0"
                  >
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, var(--color-brand-primary-light), var(--color-brand-primary))',
                      }}
                      aria-hidden="true"
                    >
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                    <p className="ds-body-sm ds-text-secondary">
                      Trusted by clients across Calgary for professional portrait, event, and commercial photography
                    </p>
                  </div>
                </div>
              </div>

              {/* Vertical Image Roll - Desktop Only */}
              <VerticalImageRoll 
                images={HERO_IMAGES}
                isDarkMode={isDarkMode}
                isMobile={isMobile}
              />
            </div>
          </div>
        </div>

        {/* Mobile Portfolio Preview Section */}
        {isMobile && (
          <div className="relative min-h-[60vh] py-12 ds-bg-section-primary">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <img
                src={heroMobileBottom}
                alt=""
                className="w-full h-full object-cover opacity-20"
                loading="lazy"
                aria-hidden="true"
              />
            </div>

            {/* Portfolio Content */}
            <div className="relative px-4 space-y-8">
              {/* Section Header */}
              <div className="text-center space-y-3">
                <div 
                  className="inline-flex items-center gap-2 ds-card ds-card-p-sm"
                  role="status"
                >
                  <Eye 
                    className="w-4 h-4" 
                    style={{ color: 'var(--color-brand-primary)' }}
                    aria-hidden="true"
                  />
                  <span className="ds-body-sm ds-text-primary font-semibold">
                    Portfolio Preview
                  </span>
                </div>
                
                <h2 className="ds-heading-3 ds-text-primary">
                  Featured Work
                </h2>
                
                <p className="ds-body-base ds-text-secondary">
                  Recent captures from our portfolio
                </p>
              </div>
              
              {/* Thumbnail Grid */}
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {MOBILE_THUMB_IMAGES.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSection("portfolio")}
                    className="relative aspect-[3/4] rounded-lg overflow-hidden ds-card group focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ 
                      focusRingColor: 'var(--color-brand-primary)',
                    }}
                    aria-label={`View portfolio sample ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt={`Portfolio sample ${index + 1}`}
                      className="w-full h-full object-cover ds-transition-slow group-hover:scale-110"
                      loading="lazy"
                    />
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 ds-transition-base flex items-center justify-center"
                      style={{
                        background: 'var(--color-overlay-heavy)'
                      }}
                    >
                      <span className="ds-body-sm font-semibold text-white">
                        View Details
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* View Portfolio Button */}
              <div className="text-center">
                <button
                  onClick={() => scrollToSection("portfolio")}
                  className="ds-btn ds-btn-outline ds-btn-md group"
                  aria-label="View full photography portfolio"
                >
                  <Eye className="w-5 h-5" aria-hidden="true" />
                  <span>View Full Portfolio</span>
                  <ArrowRight className="w-4 h-4 ds-transition-base group-hover:translate-x-1" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};