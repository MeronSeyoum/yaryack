// src/components/home/AboutSection.tsx
import React, { useState, useEffect } from 'react';
import { Calendar, Star, Award, Users, Camera } from 'lucide-react';
import photographerPortrait from "../../assets/images/photographer-portrait.jpg";
import heroThumb2 from "../../assets/images/hero-thumb-2.jpg";

interface AboutSectionProps {
  isVisible?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ isVisible = true }) => {
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
    { icon: Award, value: '5+', label: 'Years Experience' },
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: Camera, value: '1000+', label: 'Photos Captured' },
    { icon: Star, value: '50+', label: 'Events Covered' }
  ];

  return (
    <section 
      id="about" 
      className={`border-t ds-border-primary ds-transition-slow ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
      style={{
        background: 'linear-gradient(to bottom, rgba(6, 78, 59, 0.95) 0%, rgba(4, 47, 46, 0.98) 100%)'
      }}
    >
      {/* Section Header */}
      <div className="ds-section-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-2 h-8 rounded-full"
              style={{ background: 'var(--color-brand-primary)' }}
            />
            <p className="ds-body-sm ds-text-secondary uppercase tracking-wider font-medium">
              Get to Know Me
            </p>
          </div>
          <h2 className="ds-heading-3 lg:ds-heading-2 ds-text-primary">
            About
          </h2>
        </div>
      </div>

      {/* MOBILE & TABLET LAYOUT */}
      <div className="lg:hidden">
        <div className="mx-auto px-4 sm:px-6 py-12">
          {/* Stats Grid */}
          <div className="mb-12">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="ds-card ds-card-p-md text-center group"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md mx-auto group-hover:scale-105 ds-transition-slow"
                      style={{
                        background: `linear-gradient(to bottom right, var(--color-brand-primary-light), var(--color-brand-primary))`
                      }}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ds-heading-3 ds-text-primary">
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

          {/* Portrait Image */}
          <div className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden mb-12 group">
            <img
              src={photographerPortrait}
              alt="Yaryack - Professional Photographer"
              className="w-full h-full object-cover filter grayscale contrast-110 ds-transition-slower group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-900/50 to-transparent" />
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(6,78,59,0.8)]" />
          </div>

          {/* About Content */}
          <div className="space-y-8 mb-12">
            <div className="space-y-6">
              <h3 className="ds-heading-3 ds-text-primary">
                Capturing Your Story
              </h3>
              
              <div className="space-y-4 ds-text-secondary">
                <p className="ds-body-base">
                  Calgary-based photographer with{' '}
                  <span 
                    className="font-semibold"
                    style={{ color: 'var(--color-brand-primary-light)' }}
                  >
                    5+ years
                  </span>{' '}
                  of expertise specializing in authentic portrait, event, and wedding photography. 
                  Passionate about transforming moments into timeless visual narratives.
                </p>
                <p className="ds-body-base">
                  My approach blends technical mastery with artistic intuition to capture genuine emotions 
                  and create compositions that tell your unique story—images you'll cherish for generations.
                </p>
              </div>

              {/* Signature */}
              <div 
                className="pt-6 border-t"
                style={{ borderColor: 'var(--color-border-accent)' }}
              >
                <p 
                  className="text-xl italic font-light"
                  style={{ color: 'var(--color-brand-primary-light)' }}
                >
                  - Yaryack Photography
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="ds-card ds-card-elevated ds-card-p-lg mb-12">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-3 mb-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--color-brand-primary)' }}
                >
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="ds-heading-4 ds-text-primary">
                  Client Stories
                </h3>
              </div>
              <p className="ds-body-sm ds-text-tertiary">
                What people say about their experience
              </p>
            </div>

            <div className="space-y-6">
              {/* Rating Stars */}
              <div className="flex gap-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5"
                    style={{ 
                      fill: 'var(--color-brand-primary-light)',
                      color: 'var(--color-brand-primary-light)'
                    }}
                  />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="ds-body-base ds-text-secondary italic text-center">
                "You can really feel comfortable with these guys. They know what they do, 
                completely enjoyed the process. A perfect love story for me & my beloved one, 
                Justin to be photographed."
              </p>
              
              {/* Client Info */}
              <div 
                className="flex items-center justify-center gap-3 pt-4 border-t"
                style={{ borderColor: 'var(--color-border-accent)' }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(to bottom right, var(--color-brand-primary-light), var(--color-brand-primary))`
                  }}
                >
                  <span className="text-white font-semibold">MS</span>
                </div>
                <div>
                  <p 
                    className="font-semibold ds-body-base"
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

          {/* CTA Section */}
          <div className="text-center space-y-6">
            {/* Sample Image */}
            <div className="relative group/image mx-auto w-full max-w-md h-56 rounded-2xl overflow-hidden">
              <img
                src={heroThumb2}
                alt="Photography sample"
                className="w-full h-full object-cover filter grayscale ds-transition-slower group-hover/image:grayscale-0 group-hover/image:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent" />
              <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(6,78,59,0.7)]" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="ds-body-base ds-text-primary font-medium">
                  Ready to capture your moments?
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full max-w-md mx-auto ds-btn ds-btn-primary ds-btn-lg"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Your Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:block mx-auto px-4 sm:px-6 lg:px-16 min-h-screen py-16">
        {/* Main Content Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_20%] h-full gap-8">
          {/* Left Content - Portrait & Main Content */}
          <div className="relative min-h-[600px] rounded-2xl overflow-hidden group my-3">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={photographerPortrait}
                alt="Yaryack - Professional Photographer"
                className="w-full h-full object-cover rounded-2xl filter grayscale contrast-110 ds-transition-slower group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-emerald-900/40 to-emerald-900/70" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/50 to-transparent" />
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(6,78,59,0.8)]" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col justify-between p-10">
              {/* Stats Section - Top */}
              <div className="grid grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group/stat">
                    <div className="flex justify-center mb-3 gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover/stat:scale-105 ds-transition-slow"
                        style={{
                          background: `linear-gradient(to bottom right, var(--color-brand-primary-light), var(--color-brand-primary))`
                        }}
                      >
                        <stat.icon className="w-6 h-6 text-white" />
                      </div> 
                      <div className="ds-heading-3 ds-text-primary">
                        {stat.value}
                      </div>
                    </div>
                    <div className="ds-body-sm ds-text-secondary leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* About Content - Bottom */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="ds-heading-3 ds-text-primary">
                    Capturing Your Story
                  </h3>
                  
                  <div className="space-y-4 ds-text-secondary">
                    <p className="ds-body-base">
                      Calgary-based photographer with{' '}
                      <span 
                        className="font-semibold"
                        style={{ color: 'var(--color-brand-primary-light)' }}
                      >
                        5+ years
                      </span>{' '}
                      of expertise specializing in authentic portrait, event, and wedding photography. 
                      Passionate about transforming moments into timeless visual narratives.
                    </p>
                    <p className="ds-body-base">
                      My approach blends technical mastery with artistic intuition to capture genuine emotions 
                      and create compositions that tell your unique story—images you'll cherish for generations.
                    </p>
                  </div>

                  {/* Signature */}
                  <div 
                    className="pt-4 border-t"
                    style={{ borderColor: 'var(--color-border-accent)' }}
                  >
                    <p 
                      className="text-xl italic font-light"
                      style={{ color: 'var(--color-brand-primary-light)' }}
                    >
                      - Yaryack Photography
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Testimonials & CTA */}
          <div 
            className="flex flex-col pl-6 border-l my-3"
            style={{ borderColor: 'var(--color-border-primary)' }}
          >
            <div className="ds-card ds-card-elevated p-6 gap-8 flex flex-col h-full">
              {/* Section Header */}
              <div className="text-center">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--color-brand-primary)' }}
                  >
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="ds-heading-4 ds-text-primary">
                    Client Stories
                  </h3>
                </div>
                <p className="ds-body-sm ds-text-secondary">
                  What people say about their experience
                </p>
              </div>

              {/* Testimonial Card */}
              <div className="flex-1 space-y-6">
                <div 
                  className="rounded-xl p-4 border ds-transition-slow hover:border-emerald-400/50"
                  style={{
                    background: 'rgba(6, 95, 70, 0.6)',
                    borderColor: 'var(--color-border-primary)'
                  }}
                >
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-4 h-4"
                        style={{ 
                          fill: 'var(--color-brand-primary-light)',
                          color: 'var(--color-brand-primary-light)'
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="ds-body-base ds-text-secondary italic mb-6">
                    "You can really feel comfortable with these guys. They know what they do, 
                    completely enjoyed the process. A perfect love story for me & my beloved one, 
                    Justin to be photographed."
                  </p>
                  
                  {/* Client Info */}
                  <div 
                    className="flex items-center gap-3 pt-4 border-t"
                    style={{ borderColor: 'var(--color-border-accent)' }}
                  >
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(to bottom right, var(--color-brand-primary-light), var(--color-brand-primary))`
                      }}
                    >
                      <span className="text-white font-semibold">JW</span>
                    </div>
                    <div>
                      <p 
                        className="font-semibold"
                        style={{ color: 'var(--color-brand-primary-light)' }}
                      >
                        Jasmine Williams
                      </p>
                      <p className="ds-body-sm ds-text-tertiary">
                        Wedding Photography
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div 
                className="text-center space-y-4 pt-4 border-t"
                style={{ borderColor: 'var(--color-border-accent)' }}
              >
                {/* Sample Image */}
                <div className="relative group/image mx-auto w-full h-32 rounded-xl overflow-hidden">
                  <img
                    src={heroThumb2}
                    alt="Photography sample"
                    className="w-full h-full object-cover filter grayscale ds-transition-slower group-hover/image:grayscale-0 group-hover/image:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent opacity-0 group-hover/image:opacity-100 ds-transition-slow" />
                  <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(6,78,59,0.7)]" />
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full ds-btn ds-btn-primary ds-btn-lg"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Session</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};