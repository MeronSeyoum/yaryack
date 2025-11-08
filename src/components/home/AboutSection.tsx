// src/components/home/AboutSection.tsx
import React, { useState, useEffect } from 'react';
import { Calendar, Star, Award, Users, Camera } from 'lucide-react';
import { useImageLoader } from '../../hooks/useImageLoader';
import { Button } from '../ui/Button';
import photographerPortrait from "../../assets/images/photographer-portrait.jpg";
import heroThumb2 from "../../assets/images/hero-thumb-2.jpeg";
import type { ThemeClasses } from '../../types';

interface AboutSectionProps {
  themeClasses: ThemeClasses;
  isVisible: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ themeClasses, isVisible }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const imagesLoaded = useImageLoader([photographerPortrait, heroThumb2]);

  // Handle render logic for smooth animations
  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    } else {
      // Delay unmounting to allow fade-out animation
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!shouldRender || !imagesLoaded) return null;

  const stats = [
    { icon: Award, value: '5+', label: 'Years Experience' },
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: Camera, value: '1000+', label: 'Photos Captured' },
    { icon: Star, value: '50+', label: 'Events Covered' }
  ];

  return (
    <section 
      id="about" 
      className={`border-t border-emerald-500/20 transition-all duration-500 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
      style={{
        background: 'linear-gradient(to bottom, rgba(6, 78, 59, 0.95) 0%, rgba(4, 47, 46, 0.98) 100%)'
      }}
    >
      <div className="mx-auto">
        {/* Section Header */}
        <div className="p-4 sm:p-4 lg:px-16 border-b border-emerald-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-emerald-400 rounded-full"></div>
              <p className="text-xs sm:text-sm text-white/80 uppercase tracking-wider">Get to Know Me</p>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-light text-white">About</h2>
          </div>
        </div>
      </div>

      {/* MOBILE & TABLET LAYOUT (< 1024px) */}
      <div className="lg:hidden">
        <div className="mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Stats Grid - Mobile First */}
          <div className="mb-8 sm:mb-12">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-emerald-900/40 backdrop-blur-sm border border-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-500/20 rounded-xl p-4 sm:p-6 text-center hover:border-emerald-400/50 transition-all duration-300"
                >
                  <div className="flex flex-col items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg mx-auto">
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-white/80 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portrait Image */}
          <div className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden mb-8 sm:mb-12 group">
            <img
              src={photographerPortrait}
              alt="Yaryack - Professional Photographer"
              className="w-full h-full object-cover filter grayscale contrast-110 transition-all duration-700 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-900/50 to-transparent"></div>
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(6,78,59,0.8)]" />
          </div>

          {/* About Content */}
          <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-2xl sm:text-3xl font-light text-white leading-tight">
                Capturing Your Story
              </h3>
              
              <div className="space-y-4 text-white/90">
                <p className="text-sm sm:text-base leading-relaxed">
                  Calgary-based photographer with <span className="text-emerald-400 font-semibold">5+ years</span> of expertise 
                  specializing in authentic portrait, event, and wedding photography. Passionate about 
                  transforming moments into timeless visual narratives.
                </p>
                <p className="text-sm sm:text-base leading-relaxed">
                  My approach blends technical mastery with artistic intuition to capture genuine emotions 
                  and create compositions that tell your unique story—images you'll cherish for generations.
                </p>
              </div>

              {/* Signature */}
              <div className="pt-4 border-t border-emerald-500/30">
                <p className="text-lg sm:text-xl text-emerald-400 font-light italic">
                  - Yaryack Photography
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-emerald-900/40 backdrop-blur-sm border border-emerald-500/20 rounded-2xl hover:border-emerald-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 p-6 sm:p-8 mb-8 sm:mb-12">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">Client Stories</h3>
              </div>
              <p className="text-xs sm:text-sm text-white/70">What people say about their experience</p>
            </div>

            <div className="space-y-6">
              {/* Rating Stars */}
              <div className="flex gap-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-emerald-400 text-emerald-400" />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-white/90 text-sm sm:text-base leading-relaxed italic text-center">
                "You can really feel comfortable with these guys. They know what they do, completely enjoyed the process. A perfect love story for me & my beloved one, Justin to be photographed."
              </p>
              
              {/* Client Info */}
              <div className="flex items-center justify-center gap-3 pt-4 border-t border-emerald-500/30">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">JW</span>
                </div>
                <div>
                  <p className="text-emerald-400 font-semibold text-sm sm:text-base">Meron seyoum</p>
                  <p className="text-white/70 text-xs sm:text-sm">Graduations Photo</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-4 sm:space-y-6">
            {/* Sample Image */}
            <div className="relative group/image mx-auto w-full max-w-md h-48 sm:h-56 rounded-2xl overflow-hidden">
              <img
                src={heroThumb2}
                alt="Photography sample"
                className="w-full h-full object-cover filter grayscale transition-all duration-500 group-hover/image:grayscale-0 group-hover/image:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent"></div>
              <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(6,78,59,0.7)]" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm sm:text-base font-medium">Ready to capture your moments?</p>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full max-w-md mx-auto bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              <span className="flex items-center justify-center gap-3">
                <Calendar className="w-5 h-5" />
                <span className="text-sm sm:text-base font-semibold">Book Your Session</span>
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT (>= 1024px) */}
      <div className="hidden lg:block mx-auto px-4 sm:px-6 lg:px-16 min-h-screen py-12">
        {/* Main Content Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_20%] h-full gap-6">
          {/* Left Content - Portrait & Main Content */}
          <div className="relative min-h-[600px] rounded-2xl overflow-hidden group my-3">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={photographerPortrait}
                alt="Yaryack - Professional Photographer"
                className="w-full h-full object-cover rounded-2xl filter grayscale contrast-110 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-emerald-900/40 to-emerald-900/70"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/50 to-transparent"></div>
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(6,78,59,0.8)]" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col justify-between p-10">
              {/* Stats Section - Top */}
              <div className="grid grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group/stat">
                    <div className="flex justify-center mb-3 gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                        <stat.icon className="w-5 h-5 text-white" />
                      </div> 
                      <div className="text-3xl font-bold text-white">
                        {stat.value}
                      </div>
                    </div>
                    <div className="text-sm text-white/80 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* About Content - Bottom */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-3xl font-light text-white leading-tight">
                    Capturing Your Story
                  </h3>
                  
                  <div className="space-y-4 text-white/90">
                    <p className="text-sm leading-relaxed">
                      Calgary-based photographer with <span className="text-emerald-400 font-semibold">5+ years</span> of expertise 
                      specializing in authentic portrait, event, and wedding photography. Passionate about 
                      transforming moments into timeless visual narratives.
                    </p>
                    <p className="text-sm leading-relaxed">
                      My approach blends technical mastery with artistic intuition to capture genuine emotions 
                      and create compositions that tell your unique story—images you'll cherish for generations.
                    </p>
                  </div>

                  {/* Signature */}
                  <div className="pt-4 border-t border-emerald-500/30">
                    <p className="text-xl text-emerald-400 font-light italic">
                      - Yaryack Photography
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Testimonials & CTA */}
          <div className="flex flex-col pl-4 border-l border-emerald-500/20">
            <div className="p-3 gap-8 border border-emerald-500/20 rounded-2xl bg-emerald-900/40 backdrop-blur-sm my-3">
              {/* Section Header */}
              <div className="text-center">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Client Stories</h3>
                </div>
                <p className="text-sm text-white/80">What people say about their experience</p>
              </div>

              {/* Testimonial Card */}
              <div className="flex-1 space-y-6">
                <div className="bg-emerald-900/60 rounded-xl p-3 border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                    ))}
                  </div>
                  
                  {/* Testimonial Text */}
                  <p className="text-white/90 text-base leading-relaxed italic mb-6">
                    "You can really feel comfortable with these guys. They know what they do, completely enjoyed the process. A perfect love story for me & my beloved one, Justin to be photographed."
                  </p>
                  
                  {/* Client Info */}
                  <div className="flex items-center gap-3 pt-4 border-t border-emerald-500/30">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">JW</span>
                    </div>
                    <div>
                      <p className="text-emerald-400 font-semibold">Jasmine Williams</p>
                      <p className="text-white/70 text-xs">Wedding Photography</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center space-y-4 pt-4 border-t border-emerald-500/30">
                {/* Sample Image */}
                <div className="relative group/image mx-auto w-full h-32 rounded-xl overflow-hidden">
                  <img
                    src={heroThumb2}
                    alt="Photography sample"
                    className="w-full h-full object-cover filter grayscale transition-all duration-500 group-hover/image:grayscale-0 group-hover/image:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(6,78,59,0.7)]" />
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <span className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm font-semibold">Book Session</span>
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};