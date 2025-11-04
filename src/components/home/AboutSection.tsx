// src/components/home/AboutSection.tsx
import React from 'react';
import { Calendar, Star, Award, Users, Camera } from 'lucide-react';
import { useImageLoader } from '../../hooks/useImageLoader';
import { Button } from '../ui/Button';
import photographerPortrait from "../../assets/images/photographer-portrait.jpg";
import heroThumb2 from "../../assets/images/hero-thumb-2.jpeg";
import type { ThemeClasses } from '../../types';

interface AboutSectionProps {
  themeClasses: ThemeClasses;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ themeClasses }) => {
  const imagesLoaded = useImageLoader([photographerPortrait, heroThumb2]);

  if (!imagesLoaded) return null;

  const stats = [
    { icon: Award, value: '5+', label: 'Years Experience' },
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: Camera, value: '1000+', label: 'Photos Captured' },
    { icon: Star, value: '50+', label: 'Events Covered' }
  ];

  return (
    <section id="about" className={`border-t ${themeClasses.border} min-h-screen`}>
      <div className="mx-auto">
        {/* Section Header */}
        <div className={`p-6 sm:p-8 lg:px-16 border-b ${themeClasses.border}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
              <p className="text-sm text-gray-400 uppercase tracking-wider">Get to Know Me</p>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light">About</h2>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-16 min-h-[calc(100vh-80px)]">
        {/* Main Content Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_300px] h-full gap-6">
          {/* Left Content - Portrait & Main Content */}
          <div className="relative h-full min-h-[500px] lg:min-h-auto rounded-2xl overflow-hidden group">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={photographerPortrait}
                alt="Yaryack - Professional Photographer"
                className="w-full h-full object-cover filter grayscale contrast-110 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70"></div>
              {/* Enhanced gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent lg:bg-gradient-to-b lg:from-transparent lg:to-black/60"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10">
              {/* Stats Section - Top */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 ">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group/stat">
                    <div className="flex justify-center mb-2 gap-3">
                      <div className="w-8 h-8  bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                        <stat.icon className="w-4 h-4 text-white" />
                      </div> 
                      <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    </div>
                   
                    <div className="text-xs sm:text-sm text-gray-300 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* About Content - Bottom */}
              <div className="space-y-6 sm:space-y-8 py-6 sm:py-8">
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-tight">
                    Capturing Your Story
                    <br />
                    {/* <span className="font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Unique Story
                    </span> */}
                  </h3>
                  
                  <div className="space-y-4 text-white/90">
                    <p className="text-base sm:text-lg leading-relaxed">
                      Calgary-based photographer with <span className="text-orange-500 font-semibold">5+ years</span> of expertise 
                      specializing in authentic portrait, event, and wedding photography. Passionate about 
                      transforming moments into timeless visual narratives.
                    </p>
                    <p className="text-base sm:text-lg leading-relaxed">
                      My approach blends technical mastery with artistic intuition to capture genuine emotions 
                      and create compositions that tell your unique story—images you'll cherish for generations.
                    </p>
                  </div>

                  {/* Signature */}
                  <div className="pt-4 border-t border-white/20">
                    <p className="text-xl sm:text-2xl text-orange-500 font-light italic">
                      - Yaryack Photography
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Testimonials & CTA */}
          <div className={`flex flex-col gap-6 lg:gap-8 p-6 sm:p-8  border-l ${themeClasses.border} bg-gradient-to-b from-gray-900/50 to-black/30 backdrop-blur-sm`}>
            {/* Section Header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">Client Stories</h3>
              </div>
              <p className="text-sm text-gray-400">What people say about their experience</p>
            </div>

            {/* Testimonial Card */}
            <div className="flex-1 space-y-6">
              <div className="bg-black/40 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <p className="text-white/90 text-sm sm:text-base leading-relaxed italic mb-6">
                  "You can really feel comfortable with these guys. They know what they do, completely enjoyed the process. A perfect love story for me & my beloved one, Justin to be photographed."
                </p>
                
                {/* Client Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">JW</span>
                  </div>
                  <div>
                    <p className="text-orange-500 font-semibold text-sm">Jasmine Williams</p>
                    <p className="text-gray-400 text-xs">Mike KG</p>
                  </div>
                </div>
              </div>

              {/* Additional Testimonial Placeholder */}
              {/* <div className="bg-black/20 rounded-xl p-6 border border-dashed border-white/20 text-center group hover:border-white/30 transition-all duration-300">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white/40" />
                </div>
                <p className="text-white/60 text-sm">More client stories available</p>
                <p className="text-orange-500 text-xs mt-1">Scroll down to portfolio</p>
              </div> */}
            </div>

            {/* CTA Section */}
            <div className="text-center space-y-4 pt-4 border-t border-white/10">
              {/* Sample Image */}
              <div className="relative group/image mx-auto w-32 h-20 sm:w-40 sm:h-24 rounded-xl overflow-hidden">
                <img
                  src={heroThumb2}
                  alt="Photography sample"
                  className="w-full h-full object-cover filter grayscale transition-all duration-500 group-hover/image:grayscale-0 group-hover/image:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                size="lg"
              >
                <span className="flex items-center gap-3">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-semibold">Book Session</span>
                </span>
              </Button>
              
              {/* <p className="text-xs text-gray-400">
                Let's create something beautiful together
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};