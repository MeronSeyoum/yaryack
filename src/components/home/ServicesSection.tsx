// src/components/home/ServicesSection.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, CheckCircle, Clock, Sparkles, Gem, Crown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useResponsive } from '../../hooks/useResponsive';
import { SectionHeader } from '../ui/SectionHeader';

interface Service {
  name: string;
  price: string;
  features: string[];
  description: string;
  tier: 'premium' | 'gold' | 'diamond';
  popular?: boolean;
}

const SERVICES: Service[] = [
  {
    name: "Premium",
    price: "Custom",
    description: "Professional photography for personal and business needs",
    tier: 'premium',
    features: [
      "1-2 hour session",
      "1 location",
      "25+ edited photos",
      "Online gallery",
      "High-resolution downloads",
      "Basic retouching",
      "7-day delivery"
    ],
  },
  {
    name: "Gold",
    price: "Custom",
    description: "Enhanced coverage with premium features",
    tier: 'gold',
    popular: true,
    features: [
      "3-4 hour coverage",
      "Multiple locations",
      "75+ edited photos",
      "Priority gallery access",
      "Advanced editing",
      "3-day turnaround",
      "Social media previews",
      "$50 print credit"
    ],
  },
  {
    name: "Diamond",
    price: "Custom",
    description: "Ultimate luxury photography experience",
    tier: 'diamond',
    features: [
      "Full day coverage",
      "Dedicated photographer team",
      "Unlimited locations",
      "300+ edited photos",
      "Premium online gallery",
      "Professional album design",
      "48-hour sneak peeks",
      "Custom print package"
    ],
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Consultation & Booking",
    description: "We discuss your vision, timeline, and requirements to create the perfect photography plan.",
  },
  {
    number: "02",
    title: "The Photoshoot",
    description: "A comfortable and professional session where we capture authentic moments and creative compositions.",
  },
  {
    number: "03",
    title: "Editing & Enhancement",
    description: "Professional editing and color correction to bring out the best in your photographs.",
  },
  {
    number: "04",
    title: "Delivery & Support",
    description: "Your final photos delivered through a private online gallery with options for prints.",
  },
];

const TIER_CONFIG = {
  premium: {
    icon: Sparkles,
    bgGradient: "from-emerald-500 to-green-400",
    lightColor: "rgba(16, 185, 129, 0.2)",
    darkColor: "#10b981",
    badgeColor: "bg-gradient-to-r from-emerald-500 to-green-600",
    label: "Premium"
  },
  gold: {
    icon: Gem,
    bgGradient: "from-amber-500 to-yellow-500",
    lightColor: "rgba(245, 158, 11, 0.2)",
    darkColor: "#d97706",
    badgeColor: "bg-gradient-to-r from-amber-500 to-yellow-600",
    label: "Gold"
  },
  diamond: {
    icon: Crown,
    bgGradient: "from-blue-500 to-indigo-600",
    lightColor: "rgba(59, 130, 246, 0.2)",
    darkColor: "#3b82f6",
    badgeColor: "bg-gradient-to-r from-blue-500 to-indigo-600",
    label: "Diamond"
  }
};

export const ServicesSection: React.FC = () => {
  const { isMobile } = useResponsive();
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SERVICES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!isMobile) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isMobile, currentSlide]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const renderServiceCard = (service: Service, idx: number, isMobileView: boolean = false) => {
    const config = TIER_CONFIG[service.tier];
    const IconComponent = config.icon;
    
    return (
      <div
        key={idx}
        className={`ds-card group relative overflow-hidde h-full flex flex-col ${
          isMobileView ? 'ds-card-p-sm mx-auto max-w-sm' : 'ds-card-p-lg'
        } ${service.popular ? 'ring-1 ring-amber-400' : ''}`}
      >
        {/* Popular Badge */}
        {service.popular && (
          <div className={`absolute ${isMobileView ? '-top-2' : '-top-4'} left-1/2 transform -translate-x-1/2 z-10`}>
            <div className={`bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold rounded-full shadow-lg flex items-center gap-2 ${
              isMobileView ? 'text-xs px-3 py-1' : 'ds-body-sm px-5 py-1'
            }`}>
              <Sparkles className={`fill-current ${isMobileView ? 'w-3 h-3' : 'w-3 h-3'}`} />
              <span>{isMobileView ? 'Popular' : 'Most Popular'}</span>
            </div>
          </div>
        )}

        {/* Tier Badge */}
        <div className={`flex items-center justify-center ${isMobileView ? 'my-4' : 'mb-4'}`}>
          <div 
            className={`rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 ds-transition-slow bg-gradient-to-br ${config.bgGradient} ${
              isMobileView ? 'w-12 h-12' : 'w-10 h-10'
            }`}
          >
            <IconComponent className={`text-white ${isMobileView ? 'w-6 h-6' : 'w-5 h-5'}`} />
          </div>
        </div>

        {/* Title & Description */}
        <h3 className={`font-bold text-center ds-text-primary ${
          isMobileView ? 'ds-heading-5 mb-1 px-2' : 'text-xl lg:text-2xl mb-2'
        }`}>
          {service.name}
        </h3>
        <p className={`ds-body-sm text-center ds-text-secondary ${
          isMobileView ? 'mb-3 px-2' : 'mb-6'
        }`}>
          {service.description}
        </p>

        {/* Features List */}
        <div className={`flex-grow ${isMobileView ? 'space-y-2 mb-4' : 'space-y-3 mb-4'}`}>
          {service.features.map((feature, fIdx) => (
            <div key={fIdx} className="flex items-start gap-3">
              <div 
                className={`rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  isMobileView ? 'w-4 h-4' : 'w-6 h-6'
                }`}
                style={{ background: config.lightColor }}
              >
                <CheckCircle 
                  className={isMobileView ? 'w-3 h-3' : 'w-4 h-4'} 
                  style={{ color: config.darkColor }} 
                />
              </div>
              <span className={`ds-text-secondary leading-tight flex-1 ${
                isMobileView ? 'ds-body-xs' : 'ds-body-sm pt-1.5'
              }`}>
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={scrollToContact}
          className={`w-full rounded-lg font-semibold ds-transition-slow group/btn mt-auto flex items-center justify-center gap-2 ${
            isMobileView ? 'ds-btn ds-btn-sm mt-4' : 'ds-body-base py-2 px-6 gap-3'
          } ${
            service.popular 
              ? 'ds-btn-primary text-white' 
              : 'ds-btn-outline border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50'
          }`}
          style={service.popular && !isMobileView ? { 
            background: 'linear-gradient(to right, var(--color-brand-primary-light), var(--color-brand-primary))'
          } : {}}
        >
          <Calendar className={isMobileView ? 'w-3 h-3' : 'w-5 h-5'} />
          <span className={isMobileView ? 'text-sm' : ''}>Get Quote</span>
          {service.popular && !isMobileView && (
            <Sparkles className="w-5 h-5 animate-pulse" />
          )}
        </button>
      </div>
    );
  };

  return (
    <section id="services" className="border-t ds-border-primary ds-bg-section-primary">
      <SectionHeader 
        title="Services" 
        subtitle="what I offer" 
        swap={false}
      />

      <div className="mx-auto px-4 sm:px-6 lg:px-16 py-6 lg:py-12">
        {/* Services Section */}
        <div className="mb-6 lg:mb-12">
          {/* Section Header */}
          <div className="text-center mb-8 lg:mb-12">
            <h3 className="text-xl sm:ds-heading-4 lg:text-4xl lg:leading-tight font-bold mb-3 lg:mb-4 ds-text-primary">
              Professional
              <span className="font-semibold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> Photography </span>
              Packages
            </h3>
            <p className="hidden lg:block ds-body-lg ds-text-secondary max-w-5xl mx-auto">
              Tailored photography experiences designed to capture your unique story with premium, gold, and diamond tier options
            </p>
            <p className="lg:hidden ds-body-xs ds-text-secondary max-w-md mx-auto px-4">
              Premium, Gold & Diamond service tiers available
            </p>
          </div>

          {/* Desktop Grid */}
          {!isMobile ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {SERVICES.map((service, idx) => renderServiceCard(service, idx))}
            </div>
          ) : (
            /* Mobile Carousel */
            <div className="relative overflow-hidden" ref={carouselRef}>
              <div className="overflow-hidden">
                <div 
                  className="flex ds-transition-slow mt-2"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {SERVICES.map((service, idx) => (
                    <div key={idx} className="w-full flex-shrink-0 px-4">
                      {renderServiceCard(service, idx, true)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center ds-transition-slow hover:scale-110 hover:bg-white z-10"
                aria-label="Previous service"
              >
                <ChevronLeft className="w-4 h-4 text-gray-700" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center ds-transition-slow hover:scale-110 hover:bg-white z-10"
                aria-label="Next service"
              >
                <ChevronRight className="w-4 h-4 text-gray-700" />
              </button>

              {/* Slide Indicators */}
              <div className="flex justify-center gap-1.5 mt-6">
                {SERVICES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-2 rounded-full ds-transition-slow ${
                      currentSlide === idx 
                        ? `w-6 ${TIER_CONFIG[SERVICES[idx].tier].badgeColor}` 
                        : 'w-2 bg-gray-300 opacity-60'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Process Section - Desktop Only */}
        {!isMobile && (
          <div className="border-t ds-border-primary pt-16 mt-16">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--color-brand-primary)' }}
                >
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="ds-heading-3 ds-text-primary">
                  My Process
                </h3>
              </div>
              <p className="ds-body-lg ds-text-secondary max-w-2xl mx-auto">
                A streamlined approach for seamless photography experiences
              </p>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-8 mx-auto">
              {PROCESS_STEPS.map((step, idx) => (
                <div 
                  key={idx}
                  className="ds-card ds-card-p-lg group relative"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 ds-transition-slow"
                      style={{ background: 'linear-gradient(to bottom right, var(--color-brand-primary-light), var(--color-brand-primary))' }}
                    >
                      <span className="text-white font-bold ds-body-xl">{step.number}</span>
                    </div>
                    <div 
                      className="h-12 w-0.5 rounded-full"
                      style={{ background: 'linear-gradient(to bottom, transparent, var(--color-brand-primary), transparent)', opacity: 0.6 }}
                    />
                  </div>

                  <div>
                    <h4 className="ds-body-xl font-bold mb-3 ds-text-primary group-hover:ds-text-accent ds-transition-slow">
                      {step.title}
                    </h4>
                    <p className="ds-body-sm ds-text-secondary">
                      {step.description}
                    </p>
                  </div>

                  {idx < PROCESS_STEPS.length - 1 && (
                    <>
                      <div 
                        className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5"
                        style={{ background: 'linear-gradient(to right, var(--color-brand-primary), transparent)' }}
                      />
                      <div 
                        className="hidden lg:block absolute top-1/2 -right-3 w-2 h-2 rounded-full transform -translate-y-1/2"
                        style={{ background: 'var(--color-brand-primary)' }}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={scrollToContact}
                className="ds-btn ds-btn-primary ds-btn-lg ds-transition-slow hover:scale-105 shadow-lg"
              >
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">Contact for Custom Quote</span>
              </button>
              <p className="ds-body-sm ds-text-secondary mt-3">
                Get personalized pricing for your photography needs
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};