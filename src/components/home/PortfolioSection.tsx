// src/components/home/PortfolioSection.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, X, ZoomIn, ZoomOut, RotateCcw, Camera } from 'lucide-react';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_IMAGES } from '../../constants/portfolio';

type PortfolioCategory = "Wedding" | "Engagement" | "Maternity" | "Portrait" | "Event";

export const PortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory | 'Video'>('Wedding');
  const [isMobile, setIsMobile] = useState(false);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    imageIndex: number;
    scale: number;
    position: { x: number; y: number };
    isDragging: boolean;
  }>({
    isOpen: false,
    imageIndex: 0,
    scale: 1,
    position: { x: 0, y: 0 },
    isDragging: false
  });
  
  const imageRef = useRef<HTMLImageElement>(null);

  // Filter out Maternity category
  const filteredCategories = PORTFOLIO_CATEGORIES.filter(cat => cat !== 'Maternity');

  // Masonry layout classes
  const masonryLayouts = {
    mobile: ["row-span-2", "row-span-1", "row-span-1", "row-span-2", "row-span-1", "row-span-1"],
    desktop: ["row-span-3", "row-span-2 col-span-2", "row-span-1", "row-span-2", "row-span-1", "row-span-1"]
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getDisplayImages = () => {
    if (activeCategory === 'Video') return [];
    return PORTFOLIO_IMAGES[activeCategory as PortfolioCategory] || [];
  };

  const displayImages = getDisplayImages();
  const isVideoCategory = activeCategory === 'Video';

  // Image modal functions
  const openImageModal = (index: number) => {
    setModalState({
      isOpen: true,
      imageIndex: index,
      scale: 1,
      position: { x: 0, y: 0 },
      isDragging: false
    });
  };

  const closeImageModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const nextImage = () => {
    setModalState(prev => ({
      ...prev,
      imageIndex: (prev.imageIndex + 1) % displayImages.length,
      scale: 1,
      position: { x: 0, y: 0 }
    }));
  };

  const prevImage = () => {
    setModalState(prev => ({
      ...prev,
      imageIndex: (prev.imageIndex - 1 + displayImages.length) % displayImages.length,
      scale: 1,
      position: { x: 0, y: 0 }
    }));
  };

  const zoomIn = () => {
    setModalState(prev => ({ ...prev, scale: Math.min(prev.scale + 0.5, 3) }));
  };

  const zoomOut = () => {
    setModalState(prev => ({
      ...prev,
      scale: Math.max(prev.scale - 0.5, 0.5),
      position: { x: 0, y: 0 }
    }));
  };

  const resetZoom = () => {
    setModalState(prev => ({ ...prev, scale: 1, position: { x: 0, y: 0 } }));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalState.isOpen) return;
      switch (e.key) {
        case 'Escape': closeImageModal(); break;
        case 'ArrowLeft': prevImage(); break;
        case 'ArrowRight': nextImage(); break;
        case '+': case '=': zoomIn(); break;
        case '-': zoomOut(); break;
        case '0': resetZoom(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalState.isOpen]);

  return (
    <>
      <section id="portfolio" className="min-h-screen ds-bg-section-primary">
        {/* Section Header - Compact */}
        <div className="ds-section-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 lg:gap-3">
              <div 
                className="w-1.5 h-6 lg:w-2 lg:h-8 rounded-full"
                style={{ background: 'var(--color-brand-primary)' }}
              />
              <p className="ds-body-sm lg:ds-body-base ds-text-secondary uppercase tracking-wider font-semibold">
                Featured Work
              </p>
            </div>
            <h2 className="ds-body-lg lg:ds-heading-3 xl:ds-heading-2 ds-text-primary font-bold">
              Portfolio
            </h2>
          </div>
        </div>

        <div className="mx-auto px-3 sm:px-4 lg:px-16 py-8 lg:pb-12">
          {/* Mobile Horizontal Menu - Fixed Colors */}
          <div className="lg:hidden mb-6">
            <div className="flex overflow-x-auto gap-2 pb-3 scrollbar-hide -mx-3 px-3">
              {filteredCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                    activeCategory === category
                      ? 'border-0 shadow-lg'
                      : 'ds-border-primary hover:border-emerald-500/50'
                  }`}
                  style={{
                    background: activeCategory === category 
                      ? 'var(--color-brand-primary)' 
                      : 'var(--color-bg-card)',
                    color: activeCategory === category 
                      ? '#ffffff' 
                      : 'var(--color-text-primary)',
                    boxShadow: activeCategory === category 
                      ? '0 4px 16px rgba(6, 95, 70, 0.4)' 
                      : undefined
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-8">
            
            {/* Left Sidebar - Categories (Desktop) - Fixed Colors */}
            <div className="hidden lg:flex flex-col gap-6">
              {/* Categories Card */}
              <div className="ds-card ds-card-p-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--color-brand-primary)' }}
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="ds-heading-4 ds-text-primary">
                    Categories
                  </h3>
                </div>
                
                <div className="space-y-2">
                  {filteredCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-3 group border ${
                        activeCategory === category
                          ? 'border-emerald-500/50 shadow-lg'
                          : 'ds-border-primary hover:border-emerald-500/30'
                      }`}
                      style={{
                        background: activeCategory === category 
                          ? 'var(--color-brand-primary)' 
                          : 'var(--color-bg-card)',
                        color: activeCategory === category 
                          ? '#ffffff' 
                          : 'var(--color-text-primary)',
                        boxShadow: activeCategory === category 
                          ? '0 4px 16px rgba(6, 95, 70, 0.3)' 
                          : undefined
                      }}
                    >
                      <div 
                        className="w-2 h-2 rounded-full transition-all duration-200"
                        style={{
                          background: activeCategory === category 
                            ? '#ffffff' 
                            : 'var(--color-brand-primary)'
                        }}
                      />
                      <span className="ds-body-base font-semibold flex-1">
                        {category}
                      </span>
                      <div 
                        className="ds-body-sm font-medium"
                        style={{
                          color: activeCategory === category 
                            ? 'rgba(255, 255, 255, 0.8)' 
                            : 'var(--color-text-secondary)'
                        }}
                      >
                        {PORTFOLIO_IMAGES[category]?.length || 0}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <div className="ds-card ds-card-p-lg">
                <div className="text-center space-y-4">
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto shadow-lg"
                    style={{ background: 'var(--color-brand-primary)' }}
                  >
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="ds-heading-4 mb-2 ds-text-primary">
                      Ready to Begin?
                    </h4>
                    <p className="ds-body-sm ds-text-secondary">
                      Let's create something beautiful together.
                    </p>
                  </div>
                  <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full ds-btn ds-btn-primary ds-btn-md"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Session</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Content - Portfolio Grid - No Extra Text */}
            <div className="flex-1">
              {/* Masonry Image Grid - No Curves */}
              {!isVideoCategory && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 lg:gap-3 auto-rows-[180px] sm:auto-rows-[200px] lg:auto-rows-[200px]">
                  {displayImages.map((img, idx) => {
                    const mobileLayout = masonryLayouts.mobile[idx % masonryLayouts.mobile.length];
                    const desktopLayout = masonryLayouts.desktop[idx % masonryLayouts.desktop.length];
                    const layout = isMobile ? mobileLayout : desktopLayout;

                    return (
                      <div
                        key={idx}
                        onClick={() => openImageModal(idx)}
                        className={`relative ${layout} overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:z-10`}
                        style={{ 
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        <img
                          src={img}
                          alt={`${activeCategory} photography ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"
                            style={{ background: 'var(--color-brand-primary)' }}
                          >
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Empty State */}
              {displayImages.length === 0 && !isVideoCategory && (
                <div className="text-center py-16">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'var(--color-bg-card)' }}
                  >
                    <Camera className="w-8 h-8" style={{ color: 'var(--color-brand-primary)' }} />
                  </div>
                  <h4 className="ds-heading-4 mb-2 ds-text-primary">
                    No Images Found
                  </h4>
                  <p className="ds-body-sm ds-text-secondary">
                    No images available for {activeCategory} category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Image Preview Modal */}
      {modalState.isOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0, 0, 0, 0.95)' }}
          onClick={closeImageModal}
        >
          {/* Close Button */}
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors duration-200 border border-white/20 hover:border-white/40"
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 border border-white/20 hover:border-white/40 hover:scale-110"
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 border border-white/20 hover:border-white/40 hover:scale-110"
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Zoom Controls */}
          <div 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 backdrop-blur-md rounded-full px-4 py-2 border border-white/20"
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={zoomOut}
              className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={modalState.scale <= 0.5}
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            
            <button
              onClick={resetZoom}
              className="w-12 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              {Math.round(modalState.scale * 100)}%
            </button>
            
            <button
              onClick={zoomIn}
              className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={modalState.scale >= 3}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            
            <div className="w-px h-6 bg-white/20 mx-1" />
            
            <button
              onClick={resetZoom}
              className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-200"
              title="Reset zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Image Counter */}
          <div 
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/20 text-sm font-medium"
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
          >
            {modalState.imageIndex + 1} / {displayImages.length}
          </div>

          {/* Image Container */}
          <div 
            className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              ref={imageRef}
              src={displayImages[modalState.imageIndex]}
              alt={`${activeCategory} photography ${modalState.imageIndex + 1}`}
              className={`max-w-full max-h-full object-contain transition-transform duration-200 ${
                modalState.isDragging ? 'cursor-grabbing' : modalState.scale > 1 ? 'cursor-grab' : 'cursor-default'
              }`}
              style={{
                transform: `scale(${modalState.scale}) translate(${modalState.position.x}px, ${modalState.position.y}px)`,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};