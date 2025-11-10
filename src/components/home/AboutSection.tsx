// src/components/home/AboutSection.tsx
import React, { useState, useEffect } from 'react';
import { Calendar, Star, Award, Users, Camera, TrendingUp } from 'lucide-react';
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
    { icon: Award, value: '5+', label: 'Years Experience', color: 'from-yellow-500 to-orange-500' },
    { icon: Users, value: '500+', label: 'Happy Clients', color: 'from-blue-500 to-indigo-500' },
    { icon: Camera, value: '1000+', label: 'Photos Captured', color: 'from-purple-500 to-pink-500' },
    { icon: TrendingUp, value: '50+', label: 'Events Covered', color: 'from-green-500 to-emerald-500' }
  ];

  return (
    <section 
      id="about" 
      className={`border-t-2 ds-border-accent ds-transition-slow ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
      style={{
        background: 'linear-gradient(to bottom, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%)'
      }}
    >
      {/* Section Header */}
      <div className="ds-section-header border-b-2 ds-border-accent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div 
              className="w-2 h-10 rounded-full shadow-lg"
              style={{ background: 'var(--color-brand-primary)' }}
            />
            <div>
              <p className="ds-body-sm ds-text-tertiary uppercase tracking-wider font-semibold mb-0.5">
                Get to Know Me
              </p>
              <h2 className="ds-heading-3 lg:ds-heading-2 ds-text-primary font-bold">
                About
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE & TABLET LAYOUT */}
      <div className="lg:hidden">
        <div className="mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {/* Stats Grid */}
          <div className="mb-12">
            <h3 className="ds-heading-3 ds-text-primary text-center mb-8 font-bold">
              By The Numbers
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="ds-card ds-card-p-md text-center group shadow-xl"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div 
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 ds-transition-slow bg-gradient-to-br ${stat.color}`}
                    >
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="ds-heading-2 ds-text-primary font-bold">
                      {stat.value}
                    </div>
                    <div className="ds-body-sm ds-text-secondary leading-tight font-semibold">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portrait Image */}
          <div className="relative h-[450px] sm:h-[550px] rounded-3xl overflow-hidden mb-12 group shadow-2xl">
            <img
              src={photographerPortrait}
              alt="Yaryack - Professional Photographer"
              className="w-full h-full object-cover filter grayscale contrast-110 ds-transition-slower group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div 
                className="inline-block px-4 py-2 rounded-full mb-3 backdrop-blur-md border-2"
                style={{
                  background: 'var(--color-bg-card)',
                  borderColor: 'var(--color-brand-primary)'
                }}
              >
                <span className="ds-body-sm ds-text-primary font-bold">
                  Yaryack Photography
                </span>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-8 mb-12">
            <div className="space-y-6">
              <h3 className="ds-heading-2 ds-text-primary font-bold">
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

              {/* Signature */}
              <div 
                className="pt-6 border-t-2"
                style={{ borderColor: 'var(--color-border-accent)' }}
              >
                <p 
                  className="text-2xl italic font-light"
                  style={{ color: 'var(--color-brand-primary)' }}
                >
                  - Yaryack Photography
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="ds-card ds-card-elevated ds-card-p-lg mb-12 shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-3 mb-4">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ 
                    background: `linear-gradient(135deg, var(--color-brand-primary-light), var(--color-brand-primary))`
                  }}
                >
                  <Star className="w-7 h-7 text-white fill-current" />
                </div>
                <h3 className="ds-heading-3 ds-text-primary font-bold">
                  Client Stories
                </h3>
              </div>
              <p className="ds-body-sm ds-text-tertiary">
                What people say about their experience
              </p>
            </div>

            <div className="space-y-6">
              {/* Rating Stars */}
              <div className="flex gap-2 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-6 h-6"
                    style={{ 
                      fill: 'var(--color-brand-primary)',
                      color: 'var(--color-brand-primary)'
                    }}
                  />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="ds-body-lg ds-text-primary italic text-center leading-relaxed font-medium">
                "You can really feel comfortable with these guys. They know what they do, 
                completely enjoyed the process. A perfect love story for me & my beloved one, 
                Justin to be photographed."
              </p>
              
              {/* Client Info */}
              <div 
                className="flex items-center justify-center gap-4 pt-6 border-t-2"
                style={{ borderColor: 'var(--color-border-accent)' }}
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, var(--color-brand-primary-light), var(--color-brand-primary))`
                  }}
                >
                  <span className="text-white font-bold text-lg">MS</span>
                </div>
                <div>
                  <p 
                    className="font-bold ds-body-lg"
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
            {/* Sample Image */}
            <div className="relative group/image mx-auto w-full max-w-md h-64 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroThumb2}
                alt="Photography sample"
                className="w-full h-full object-cover filter grayscale ds-transition-slower group-hover/image:grayscale-0 group-hover/image:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-center">
                <p className="ds-heading-4 ds-text-primary font-bold mb-2">
                  Ready to capture your moments?
                </p>
                <p className="ds-body-sm ds-text-secondary">
                  Let's create something amazing together
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full max-w-md mx-auto ds-btn ds-btn-primary ds-btn-lg shadow-2xl"
            >
              <Calendar className="w-6 h-6" />
              <span className="font-bold">Book Your Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:block mx-auto px-4 sm:px-6 lg:px-16 min-h-screen py-16">
        {/* Main Content Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_25%] h-full gap-10">
          {/* Left Content - Portrait & Main Content */}
          <div className="relative min-h-[700px] rounded-3xl overflow-hidden group my-3 shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={photographerPortrait}
                alt="Yaryack - Professional Photographer"
                className="w-full h-full object-cover rounded-3xl filter grayscale contrast-110 ds-transition-slower group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col justify-between p-12">
              {/* Stats Section - Top */}
              <div>
                <h3 className="ds-heading-3 ds-text-primary mb-8 font-bold">
                  By The Numbers
                </h3>
                <div className="grid grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center group/stat">
                      <div className="flex flex-col items-center gap-3 mb-3">
                        <div 
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl group-hover/stat:scale-110 ds-transition-slow bg-gradient-to-br ${stat.color}`}
                        >
                          <stat.icon className="w-8 h-8 text-white" />
                        </div> 
                        <div className="ds-heading-2 ds-text-primary font-bold">
                          {stat.value}
                        </div>
                      </div>
                      <div className="ds-body-sm ds-text-secondary leading-tight font-semibold">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* About Content - Bottom */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="ds-heading-2 ds-text-primary font-bold">
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
                      and create compositions that tell your unique story.
                    </p>
                  </div>

                  {/* Signature */}
                  <div 
                    className="pt-6 border-t-2"
                    style={{ borderColor: 'var(--color-border-accent)' }}
                  >
                    <p 
                      className="text-2xl italic font-light"
                      style={{ color: 'var(--color-brand-primary)' }}
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
            className="flex flex-col pl-8 border-l-2 my-3"
            style={{ borderColor: 'var(--color-border-accent)' }}
          >
            <div className="ds-card ds-card-elevated p-8 gap-8 flex flex-col h-full shadow-2xl">
              {/* Section Header */}
              <div className="text-center">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
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
                <p className="ds-body-sm ds-text-secondary">
                  What people say about their experience
                </p>
              </div>

              {/* Testimonial Card */}
              <div className="flex-1 space-y-6">
                <div 
                  className="rounded-2xl p-6 border-2 ds-transition-slow hover:border-opacity-80 shadow-lg"
                  style={{
                    background: 'rgba(6, 95, 70, 0.4)',
                    borderColor: 'var(--color-border-accent)'
                  }}
                >
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
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
                  
                  {/* Testimonial Text */}
                  <p className="ds-body-base ds-text-primary italic mb-6 leading-relaxed">
                    "You can really feel comfortable with these guys. They know what they do, 
                    completely enjoyed the process."
                  </p>
                  
                  {/* Client Info */}
                  <div 
                    className="flex items-center gap-3 pt-4 border-t-2"
                    style={{ borderColor: 'var(--color-border-accent)' }}
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                      style={{
                        background: `linear-gradient(135deg, var(--color-brand-primary-light), var(--color-brand-primary))`
                      }}
                    >
                      <span className="text-white font-bold">JW</span>
                    </div>
                    <div>
                      <p 
                        className="font-bold ds-body-base"
                        style={{ color: 'var(--color-brand-primary)' }}
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
                className="text-center space-y-4 pt-6 border-t-2"
                style={{ borderColor: 'var(--color-border-accent)' }}
              >
                {/* Sample Image */}
                <div className="relative group/image mx-auto w-full h-40 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={heroThumb2}
                    alt="Photography sample"
                    className="w-full h-full object-cover filter grayscale ds-transition-slower group-hover/image:grayscale-0 group-hover/image:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full ds-btn ds-btn-primary ds-btn-lg shadow-xl"
                >
                  <Calendar className="w-5 h-5" />
                  <span className="font-bold">Book Session</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};