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
    gradient: "from-emerald-400 to-green-300",
    bgGradient: "from-emerald-500 to-green-400",
    lightColor: "rgba(16, 185, 129, 0.2)",
    darkColor: "#10b981",
    badgeColor: "bg-gradient-to-r from-emerald-500 to-green-600",
    label: "Premium"
  },
  gold: {
    icon: Gem,
    gradient: "from-amber-400 to-yellow-300",
    bgGradient: "from-amber-500 to-yellow-500",
    lightColor: "rgba(245, 158, 11, 0.2)",
    darkColor: "#d97706",
    badgeColor: "bg-gradient-to-r from-amber-500 to-yellow-600",
    label: "Gold"
  },
  diamond: {
    icon: Crown,
    gradient: "from-blue-400 to-indigo-300",
    bgGradient: "from-blue-500 to-indigo-600",
    lightColor: "rgba(59, 130, 246, 0.2)",
    darkColor: "#3b82f6",
    badgeColor: "bg-gradient-to-r from-blue-500 to-indigo-600",
    label: "Diamond"
  }
};

export const ServicesSection: React.FC = () => {
  const { isMobile, isTablet } = useResponsive();
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

  const renderTierBadge = (tier: 'premium' | 'gold' | 'diamond') => {
    const config = TIER_CONFIG[tier];
    return (
      <div className="flex items-center justify-center mb-4">
        <div className={`px-4 py-1.5 rounded-full ${config.badgeColor} text-white text-sm font-semibold uppercase tracking-wider shadow-md`}>
          {config.label} Tier
        </div>
      </div>
    );
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="services" className="border-t ds-border-primary ds-bg-section-primary">
      <SectionHeader 
        title="Services" 
        subtitle="what I offer" 
        swap={false}
      />

      <div className="mx-auto px-4 sm:px-6 lg:px-16 py-6 lg:py-12">
        <div className="mb-12 lg:mb-20">
          <div className="text-center mb-8 lg:mb-12">
            <h3 className="text-xl sm:ds-heading-4 lg:text-4xl lg:leading-tight font-bold mb-3 lg:mb-4 ds-text-primary">
              Professional
              <span className="font-semibold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> Photography </span>
              Packages
            </h3>
            <p className="hidden lg:block text-lg  ds-text-secondary max-w-3xl mx-auto">
              Tailored photography experiences designed to capture your unique story with premium, gold, and diamond tier options
            </p>
            <p className="lg:hidden ds-body-xs ds-text-secondary max-w-md mx-auto px-4">
              Premium, Gold & Diamond service tiers available
            </p>
          </div>

          {!isMobile ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {SERVICES.map((service, idx) => {
                const config = TIER_CONFIG[service.tier];
                const IconComponent = config.icon;
                
                return (
                  <div
                    key={idx}
                    className={`ds-card ds-card-p-lg group relative overflow-hidden h-full flex flex-col ${
                      service.popular ? 'ring-2 ring-amber-400 ring-offset-2' : ''
                    }`}
                  >
                    {service.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-lg flex items-center gap-2">
                          <Sparkles className="w-4 h-4 fill-current" />
                          <span>Most Popular</span>
                        </div>
                      </div>
                    )}

                    {renderTierBadge(service.tier)}

                    <div className="flex justify-center mb-8">
                      <div 
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 ds-transition-slow bg-gradient-to-br ${config.bgGradient}`}
                      >
                        <IconComponent className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                      </div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-center mb-2 ds-text-primary">
                      {service.name}
                    </h3>
                    <p className="text-base text-center mb-6  ds-text-secondary">
                      {service.description}
                    </p>

                    <div className="text-center mb-8">
                      {/* <div className={`text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                        {service.price}
                      </div>
                      <p className="text-sm text-gray-500">
                        Contact for custom quote
                      </p> */}
                    </div>

                    <div className="space-y-3 mb-8 flex-grow">
                      {service.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3">
                          <div 
                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: config.lightColor }}
                          >
                            <CheckCircle className="w-4 h-4" style={{ color: config.darkColor }} />
                          </div>
                                                    <span className="ds-body-xs lg:ds-body-sm ds-text-secondary leading-tight flex-1">

                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={scrollToContact}
                      className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300 group/btn mt-auto flex items-center justify-center gap-3 ${
                        service.popular 
                          ? 'ds-btn-primary bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:opacity-90' 
                          : 'ds-btn-outline border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50'
                      }`}
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Get Custom Quote</span>
                      {service.popular && (
                        <Sparkles className="w-5 h-5 animate-pulse" />
                      )}
                    </button>

                    <div 
                      className="absolute bottom-0 left-0 right-0 h-1.5"
                      style={{ 
                        background: `linear-gradient(to right, ${config.darkColor}33, ${config.darkColor}, ${config.darkColor}33)` 
                      }}
                    ></div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="relative" ref={carouselRef}>
              <div 
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {SERVICES.map((service, idx) => {
                  const config = TIER_CONFIG[service.tier];
                  const IconComponent = config.icon;
                  
                  return (
                    <div
                      key={idx}
                      className="w-full flex-shrink-0 px-3"
                    >
                      <div className={`ds-card ds-card-p-sm group relative mx-auto max-w-sm h-full flex flex-col ${
                        service.popular ? 'ring-1 ring-amber-400' : ''
                      }`}>
                        {service.popular && (
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                            <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                              <Sparkles className="w-3 h-3 fill-current" />
                              <span>Popular</span>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-center mb-4">
                          <div 
                            className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 ds-transition-slow bg-gradient-to-br ${config.bgGradient}`}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                        </div>

                        <h3 className="ds-heading-5 text-center mb-1 ds-text-primary px-2">
                          {service.name}
                        </h3>
                        <p className="ds-body-xs text-center mb-3 ds-text-secondary px-2">
                          {service.description}
                        </p>

                        <div className="text-center mb-4">
                          {/* <div className={`text-2xl font-bold mb-1 bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                            {service.price}
                          </div>
                          <p className="ds-body-xs ds-text-secondary">
                            Contact for quote
                          </p> */}
                        </div>

                        <div className="space-y-2 mb-4 flex-grow max-h-40 overflow-y-auto pr-1">
                          {service.features.map((feature, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2">
                              <div 
                                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{ background: config.lightColor }}
                              >
                                <CheckCircle className="w-3 h-3" style={{ color: config.darkColor }} />
                              </div>
                              <span className="ds-body-xs ds-text-secondary leading-tight flex-1">
                                {feature} 
                              </span>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={scrollToContact}
                          className={`w-full ds-btn ds-btn-sm group/btn mt-auto ${
                            service.popular 
                              ? 'ds-btn-primary' 
                              : 'ds-btn-outline'
                          }`}
                          style={service.popular ? { 
                            background: `linear-gradient(to right, ${config.darkColor}, ${config.darkColor}cc)` 
                          } : {}}
                        >
                          <Calendar className="w-3 h-3" />
                          <span className="text-sm">Get Quote</span>
                        </button>

                        <div 
                          className="absolute bottom-0 left-0 right-0 h-0.5"
                          style={{ 
                            background: `linear-gradient(to right, ${config.darkColor}33, ${config.darkColor}, ${config.darkColor}33)` 
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

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

              <div className="flex justify-center gap-1.5 mt-6">
                {SERVICES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`w-2 h-2 rounded-full ds-transition-slow ${
                      currentSlide === idx 
                        ? `w-6 ${TIER_CONFIG[SERVICES[idx].tier].badgeColor.split(' ')[2]}` 
                        : 'bg-gray-300 opacity-60'
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
                <h3 className="text-3xl font-bold ds-text-primary">
                  My Process
                </h3>
              </div>
              <p className="text-lg  ds-text-secondary max-w-2xl mx-auto">
                A streamlined approach for seamless photography experiences
              </p>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-8  mx-auto">
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
                      <span className="text-white font-bold text-xl">{step.number}</span>
                    </div>
                    <div 
                      className="h-12 w-0.5 rounded-full"
                      style={{ background: 'linear-gradient(to bottom, transparent, var(--color-brand-primary), transparent)', opacity: 0.6 }}
                    ></div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold mb-3 group-hover:text-emerald-400 ds-transition-slow ds-text-primary">
                      {step.title}
                    </h4>
                    <p className=" ds-text-secondary">
                      {step.description}
                    </p>
                  </div>

                  {idx < PROCESS_STEPS.length - 1 && (
                    <>
                      <div 
                        className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5"
                        style={{ background: 'linear-gradient(to right, var(--color-brand-primary), transparent)' }}
                      ></div>
                      <div 
                        className="hidden lg:block absolute top-1/2 -right-3 w-2 h-2 rounded-full transform -translate-y-1/2"
                        style={{ background: 'var(--color-brand-primary)' }}
                      ></div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={scrollToContact}
                className="ds-btn ds-btn-primary ds-btn-lg ds-transition-slow hover:scale-105 shadow-lg py-4 px-8 text-lg"
              >
                <Calendar className="w-5 h-5" />
                <span className="font-semibold text-lg">Contact for Custom Quote</span>
              </button>
              <p className=" ds-text-secondary mt-3">
                Get personalized pricing for your photography needs
              </p>
            </div>
          </div>
        )}

        {/* Mobile CTA Button */}
        {isMobile && (
          <div className="text-center mt-8 pt-6 border-t ds-border-primary">
            <button
              onClick={scrollToContact}
              className="ds-btn ds-btn-primary ds-btn-md ds-transition-slow hover:scale-105 shadow-lg mx-auto"
            >
              <Calendar className="w-4 h-4" />
              <span className="font-semibold">Contact for Quote</span>
            </button>
            <p className="ds-body-xs ds-text-secondary mt-2">
              Get personalized pricing
            </p>
          </div>
        )}
      </div>
    </section>
  );
};