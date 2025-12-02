// src/components/home/AboutSection.tsx
import React, { useState, useEffect } from 'react';
import { Calendar, Star, Award, Users, Camera, TrendingUp } from 'lucide-react';
import { useResponsive } from '../../hooks/useResponsive';
import { SectionHeader } from '../ui/SectionHeader';
import photographerPortrait from "../../assets/images/photographer-portrait.jpg";
import heroThumb2 from "../../assets/images/about-thumb.jpg";

interface AboutSectionProps {
  isVisible?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ isVisible = true }) => {
  const { isMobile } = useResponsive();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  const stats = [
    { icon: Award, value: '5+', label: 'Years Experience', color: 'from-teal-500 to-teal-700' },
    { icon: Users, value: '500+', label: 'Happy Clients', color: 'from-teal-500 to-teal-700' },
    { icon: Camera, value: '1000+', label: 'Photos Captured', color: 'from-teal-500 to-teal-700' },
    { icon: TrendingUp, value: '50+', label: 'Events Covered', color: 'from-teal-500 to-teal-700' }
  ];

  return (
    <section 
      id="about" 
      className={`border-t ds-border-primary ds-bg-section-primary ds-transition-slow ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      <SectionHeader 
        title="About" 
        subtitle="Get to know me" 
        swap={false}
      />

      <div className="mx-auto px-4 sm:px-6 lg:px-16 py-8">
        {isMobile ? (
          <div className="space-y-12">
            {/* Stats Section */}
            <div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="ds-card ds-card-p-sm text-center group"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div 
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 ds-transition-slow bg-gradient-to-br ${stat.color}`}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="ds-heading-3 ds-text-primary font-bold">
                        {stat.value}
                      </div>
                      <div className="ds-body-sm ds-text-secondary leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo and Description */}
            <div className="space-y-6">
              <div className="relative h-[400px] rounded-2xl overflow-hidden mb-6 group shadow-lg">
                <img
                  src={photographerPortrait}
                  alt="Yaryack - Professional Photographer"
                  className="w-full h-full object-cover filter grayscale contrast-110 ds-transition-slower group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              <div className="space-y-4">
                <h3 className="ds-heading-3 ds-text-primary font-bold">
                  Capturing Your Story
                </h3>
                
                <div className="space-y-3 ds-text-secondary">
                  <p className="ds-body-base leading-relaxed">
                    Calgary-based photographer with{' '}
                    <span 
                      className="font-bold"
                      style={{ color: 'var(--color-brand-primary)' }}
                    >
                      5+ years
                    </span>{' '}
                    of expertise specializing in authentic portrait, event, and wedding photography.
                  </p>
                  <p className="ds-body-base leading-relaxed">
                    My approach blends <strong className="ds-text-primary">technical mastery</strong> with{' '}
                    <strong className="ds-text-primary">artistic intuition</strong> to capture genuine emotions 
                    and create compositions that tell your unique story.
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="ds-card ds-card-p-lg">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                    style={{ 
                      background: `linear-gradient(135deg, var(--color-brand-primary-light), var(--color-brand-primary))`
                    }}
                  >
                    <Star className="w-6 h-6 text-white fill-current" />
                  </div>
                  <h3 className="ds-heading-4 ds-text-primary font-bold">
                    Client Stories
                  </h3>
                </div>
                <p className="ds-body-sm ds-text-tertiary">
                  What people say about their experience
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-1 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5"
                      style={{ 
                        fill: 'var(--color-brand-primary)',
                        color: 'var(--color-brand-primary)'
                      }}
                    />
                  ))}
                </div>
                
                <p className="ds-body-base ds-text-primary italic text-center leading-relaxed">
                  "You can really feel comfortable with these guys. They know what they do, 
                  completely enjoyed the process. A perfect love story for me & my beloved one."
                </p>
                
                <div className="flex items-center justify-center gap-3 pt-4">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                    style={{
                      background: `linear-gradient(135deg, var(--color-brand-primary-light), var(--color-brand-primary))`
                    }}
                  >
                    <span className="text-white font-bold text-sm">MS</span>
                  </div>
                  <div>
                    <p 
                      className="font-bold ds-body-base"
                      style={{ color: 'var(--color-brand-primary)' }}
                    >
                      Meron Seyoum
                    </p>
                    <p className="ds-body-sm ds-text-tertiary">
                      Graduations Photo
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center space-y-6">
              <div className="relative group/image mx-auto w-full max-w-md h-48 rounded-xl overflow-hidden">
                <img
                  src={heroThumb2}
                  alt="Photography sample"
                  className="w-full h-full object-cover filter grayscale ds-transition-slower group-hover/image:grayscale-0 group-hover/image:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full max-w-md mx-auto ds-btn ds-btn-primary ds-btn-lg"
              >
                <Calendar className="w-5 h-5" />
                <span className="font-bold">Book Your Session</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Stats Section */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="ds-card ds-card-p-md text-center group"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div 
                      className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-xl group-hover:scale-110 ds-transition-slow bg-gradient-to-br ${stat.color}`}
                    >
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="ds-heading-3 ds-text-primary font-bold">
                      {stat.value}
                    </div>
                    <div className="ds-body-sm ds-text-secondary leading-tight font-semibold">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Photo and Description */}
            <div className="flex gap-12">
              <div className="flex-1">
                <div className="relative h-[500px] rounded-2xl overflow-hidden mb-6 group shadow-xl">
                  <img
                    src={photographerPortrait}
                    alt="Yaryack - Professional Photographer"
                    className="w-full h-full object-cover filter grayscale contrast-110 ds-transition-slower group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <h3 className="ds-heading-3 ds-text-primary font-bold">
                  Capturing Your Story
                </h3>
                
                <div className="space-y-4 ds-text-secondary">
                  <p className="ds-body-lg leading-relaxed">
                    Calgary-based photographer with{' '}
                    <span 
                      className="font-bold text-xl"
                      style={{ color: 'var(--color-brand-primary)' }}
                    >
                      5+ years
                    </span>{' '}
                    of expertise specializing in authentic portrait, event, and wedding photography.
                  </p>
                  <p className="ds-body-base leading-relaxed">
                    My approach blends <strong className="ds-text-primary">technical mastery</strong> with{' '}
                    <strong className="ds-text-primary">artistic intuition</strong> to capture genuine emotions 
                    and create compositions that tell your unique story—images you'll cherish for generations.
                  </p>
                </div>

                <div className="pt-6 border-t ds-border-primary">
                  <p 
                    className="text-xl italic font-light"
                    style={{ color: 'var(--color-brand-primary-light)' }}
                  >
                    - Yaryack Photography
                  </p>
                </div>

                {/* Testimonial */}
                <div className="ds-card ds-card-p-lg mt-8">
                  <div className="space-y-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-5 h-5"
                          style={{ 
                            fill: 'var(--color-brand-primary)',
                            color: 'var(--color-brand-primary)'
                          }}
                        />
                      ))}
                    </div>
                    
                    <p className="ds-body-base ds-text-primary italic leading-relaxed">
                      "You can really feel comfortable with these guys. They know what they do, 
                      completely enjoyed the process. A perfect love story for me & my beloved one."
                    </p>
                    
                    <div className="flex items-center gap-3 pt-4 border-t ds-border-primary">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                        style={{
                          background: `linear-gradient(135deg, var(--color-brand-primary-light), var(--color-brand-primary))`
                        }}
                      >
                        <span className="text-white font-bold">MS</span>
                      </div>
                      <div>
                        <p 
                          className="font-bold ds-body-base"
                          style={{ color: 'var(--color-brand-primary-light)' }}
                        >
                          Meron Seyoum
                        </p>
                        <p className="ds-body-sm ds-text-tertiary">
                          Graduations Photo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center space-y-8">
              <div className="relative group/image mx-auto w-full max-w-2xl h-64 rounded-2xl overflow-hidden">
                <img
                  src={heroThumb2}
                  alt="Photography sample"
                  className="w-full h-full object-cover filter grayscale ds-transition-slower group-hover/image:grayscale-0 group-hover/image:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-8">
                  <div>
                    <p className="ds-heading-4 ds-text-primary font-bold mb-2">
                      Ready to capture your moments?
                    </p>
                    <p className="ds-body-base ds-text-secondary">
                      Let's create something amazing together
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="max-w-md mx-auto ds-btn ds-btn-primary ds-btn-lg"
              >
                <Calendar className="w-6 h-6" />
                <span className="font-bold">Book Your Session</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};