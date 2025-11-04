// src/components/home/PortfolioSection.tsx
import React, { useState, useEffect } from 'react';
import { ChevronRight, Calendar, Star, Users, Camera, Award } from 'lucide-react';
import { Button } from '../ui/Button';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_IMAGES } from '../../constants/portfolio';
import type { PortfolioCategory } from '../../types/portfolio';
import type { ThemeClasses } from '../../types';

interface PortfolioSectionProps {
  themeClasses: ThemeClasses;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ themeClasses }) => {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory | 'All'>('Event');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get images based on active category
  const getDisplayImages = () => {
    if (activeCategory === 'All') {
      return Object.values(PORTFOLIO_IMAGES).flat().slice(0, 12);
    }
    return PORTFOLIO_IMAGES[activeCategory as PortfolioCategory] || [];
  };

  const displayImages = getDisplayImages();

  const stats = [
    { icon: Award, value: '5+', label: 'Years Experience' },
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: Camera, value: '1000+', label: 'Photos Captured' },
    { icon: Star, value: '50+', label: 'Events Covered' }
  ];

  const mobileLayouts = [
    "row-span-2 col-span-2",
    "row-span-1 col-span-1",
    "row-span-1 col-span-1",
    "row-span-2 col-span-2",
    "row-span-1 col-span-2",
    "row-span-2 col-span-1",
    "row-span-2 col-span-1",
    "row-span-1 col-span-2",
  ];

  const desktopLayouts = [
    "row-span-2 col-span-1",
    "row-span-1 col-span-1",
    "row-span-1 col-span-1",
    "row-span-2 col-span-1",
    "row-span-3 col-span-1",
    "row-span-1 col-span-1",
    "row-span-2 col-span-1",
    "row-span-2 col-span-2",
    "row-span-1 col-span-1",
    "row-span-1 col-span-1",
    "row-span-2 col-span-1",
    "row-span-2 col-span-1",
  ];

  return (
    <section id="portfolio" className={`border-t ${themeClasses.border} min-h-screen`}>
      <div className="mx-auto">
        {/* Section Header */}
        <div className={`p-4 sm:p-8 lg:px-16 border-b ${themeClasses.border}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
              <p className="text-sm text-gray-400 uppercase tracking-wider">Featured Work</p>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light">Portfolio</h2>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-16 min-h-[calc(100vh-80px)]">
        {/* Main Content Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-[300px_1fr] h-full gap-6 lg:gap-8 py-">
          
          {/* Left Sidebar - Categories & Info */}
          <div className={`flex flex-col gap-6 lg:gap-8 border-r ${themeClasses.border} `}>
            {/* Categories Card */}
            <div className="bg-gradient-to-b from-gray-900/50 to-black/30 backdrop-blur-sm  py-6 pr-6 ">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <h3 className="text-lg font-semibold text-white">Categories</h3>
              </div>
              
              <div className="space-y-2">
                {PORTFOLIO_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-300 flex items-center gap-3 group ${
                      activeCategory === category
                        ? 'bg-orange-500/20 border border-orange-500/30 text-orange-500'
                        : 'bg-black/20 border border-white/5 hover:bg-white/5 text-gray-300 hover:text-white'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full transition-colors ${
                      activeCategory === category ? 'bg-orange-500' : 'bg-gray-600 group-hover:bg-orange-500'
                    }`} />
                    <span className="text-sm font-medium">{category}</span>
                    <div className="ml-auto text-xs opacity-60">
                      {PORTFOLIO_IMAGES[category]?.length || 0}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="hidden lg:block bg-gradient-to-br from-orange-500/10 to-amber-600/5 backdrop-blur-sm rounded-2xl my-6 mr-6 p-6 border border-orange-500/20">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Ready to Begin?</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Let's create something beautiful together. Book your session today.
                  </p>
                </div>
                <Button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Book Session
                  </span>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Content - Portfolio Grid */}
          <div className="flex-1 min-h-[600px]">
            {/* Portfolio Header */}
            <div className="mb-6 lg:mt-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                    {activeCategory} Photography
                  </h3>
                  <p className="text-gray-400 text-sm max-w-2xl">
                    Explore my work across different photography categories. Each image tells a unique story of authentic moments captured with passion and precision.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-black/40 rounded-full px-4 py-2 border border-white/10">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-white/80">
                    {displayImages.length} {displayImages.length === 1 ? 'Image' : 'Images'}
                  </span>
                </div>
              </div>
            </div>

            {/* Portfolio Grid */}
            <div className="h-[calc(100vh-280px)] lg:h-[calc(100vh-0px)] overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 auto-rows-[120px] sm:auto-rows-[140px] lg:auto-rows-[180px]">
                {displayImages.map((img, idx) => {
                  const layout = isMobile 
                    ? mobileLayouts[idx % mobileLayouts.length] 
                    : desktopLayouts[idx % desktopLayouts.length];

                  return (
                    <div
                      key={idx}
                      className={`relative ${layout} rounded-xl hover:scale-[1.02] transition-all duration-500 cursor-pointer overflow-hidden group`}
                    >
                      <img
                        src={img}
                        alt={`${activeCategory} photography ${idx + 1}`}
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      />
                      
                      {/* Overlay Effects */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/5 transition-all duration-500"></div>
                      
                      {/* Info Panel */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                        <div className="flex items-center justify-between">
                          <p className="text-xs lg:text-sm text-white font-medium">
                            {activeCategory} #{idx + 1}
                          </p>
                          <div className="w-6 h-6 lg:w-8 lg:h-8 bg-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                            <ChevronRight size={12} className="text-black lg:w-4 lg:h-4" />
                          </div>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/20">
                          {activeCategory}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Empty State */}
              {displayImages.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-gray-600" />
                  </div>
                  <h4 className="text-white text-lg font-semibold mb-2">No Images Found</h4>
                  <p className="text-gray-400 text-sm">
                    No images available for {activeCategory} category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};