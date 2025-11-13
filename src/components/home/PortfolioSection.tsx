// src/components/home/PortfolioSection.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Calendar, X, ZoomIn, ZoomOut, RotateCcw, Camera, Video, Play } from 'lucide-react';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_IMAGES } from '../../constants/portfolio';

type PortfolioCategory = "Event" | "Engagement" | "Wedding" | "Maternity" | "Portrait";

export const PortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory | 'Video'>('Event');
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
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

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
        {/* Section Header */}
        <div className="ds-section-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-2 h-8 rounded-full"
                style={{ background: 'var(--color-brand-primary)' }}
              />
              <p className="ds-body-sm ds-text-secondary uppercase tracking-wider font-medium">
                Featured Work
              </p>
            </div>
            <h2 className="ds-heading-3 lg:ds-heading-2 ds-text-primary">
              Portfolio
            </h2>
          </div>
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-16 py-12">
          {/* Mobile Horizontal Menu */}
          <div className="lg:hidden mb-8">
            <div className="flex overflow-x-auto gap-2 pb-4 scrollbar-hide">
              {filteredCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full ds-body-sm font-medium ds-transition-slow border ${
                    activeCategory === category
                      ? 'border-0 shadow-lg'
                      : 'ds-border-primary ds-text-secondary hover:bg-emerald-700/40'
                  }`}
                  style={{
                    background: activeCategory === category 
                      ? 'var(--color-brand-primary)' 
                      : 'var(--color-bg-card)',
                    color: activeCategory === category 
                      ? 'var(--color-text-primary)' 
                      : undefined,
                    boxShadow: activeCategory === category 
                      ? 'var(--shadow-brand)' 
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
            
            {/* Left Sidebar - Categories (Desktop) */}
            <div className="hidden lg:flex flex-col gap-6">
              {/* Categories Card */}
              <div className="ds-card ds-card-p-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--color-brand-primary)' }}
                  >
                    <div className="w-5 h-5 bg-white rounded-full" />
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
                      className={`w-full text-left p-3 rounded-xl ds-transition-slow flex items-center gap-3 group border ${
                        activeCategory === category
                          ? 'ds-border-accent'
                          : 'ds-border-light hover:bg-white/5'
                      }`}
                      style={{
                        background: activeCategory === category 
                          ? 'rgba(2, 156, 72, 0.2)' 
                          : 'rgba(0, 0, 0, 0.6)',
                        color: activeCategory === category 
                          ? 'var(--color-brand-secondary)' 
                          : 'var(--color-text-tertiary)'
                      }}
                    >
                      <div 
                        className="w-2 h-2 rounded-full ds-transition-slow"
                        style={{
                          background: activeCategory === category 
                            ? 'var(--color-brand-primary)' 
                            : 'var(--color-text-muted)'
                        }}
                      />
                      <span className="ds-body-sm font-medium flex items-center gap-2">
                        {category}
                      </span>
                      <div 
                        className="ml-auto ds-body-sm"
                        style={{
                          color: activeCategory === category 
                            ? 'var(--color-brand-secondary)' 
                            : 'var(--color-text-tertiary)'
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
                      Let's create something beautiful together. Book your session today.
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

            {/* Right Content - Portfolio Grid */}
            <div className="flex-1">
              {/* Portfolio Header */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <h3 className="ds-heading-3 ds-text-primary">
                    {isVideoCategory ? 'Video Productions' : `${activeCategory} Photography`}
                  </h3>
                  <div 
                    className="flex items-center gap-2 rounded-full px-4 py-2 border ds-border-primary"
                    style={{ background: 'var(--color-bg-card)' }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ background: 'var(--color-brand-primary)' }}
                    />
                    <span className="ds-body-sm ds-text-secondary">
                      {displayImages.length} {displayImages.length === 1 ? 'Image' : 'Images'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Masonry Image Grid */}
              {!isVideoCategory && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 auto-rows-[200px] sm:auto-rows-[200px]">
                  {displayImages.map((img, idx) => {
                    const mobileLayout = masonryLayouts.mobile[idx % masonryLayouts.mobile.length];
                    const desktopLayout = masonryLayouts.desktop[idx % masonryLayouts.desktop.length];
                    const layout = isMobile ? mobileLayout : desktopLayout;

                    return (
                      <div
                        key={idx}
                        onClick={() => openImageModal(idx)}
                        className={`relative ${layout} rounded-xl hover:scale-[1.02] ds-transition-slower cursor-pointer overflow-hidden group`}
                        style={{ boxShadow: 'var(--shadow-xl)' }}
                      >
                        <img
                          src={img}
                          alt={`${activeCategory} photography ${idx + 1}`}
                          className="w-full h-full lg:object-cover object-cover rounded-xl ds-transition-slower group-hover:scale-105"
                        />
                        
                        {/* Info Panel - Hover */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 ds-transition-slower bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                          <div className="flex items-center justify-between">
                            <p className="ds-body-sm ds-text-primary font-medium">
                              {activeCategory} #{idx + 1}
                            </p>
                            <div 
                              className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 ds-transition-slow delay-200"
                              style={{ background: 'var(--color-brand-primary)' }}
                            >
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
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
          style={{ background: 'var(--color-bg-modal)' }}
        >
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full flex items-center justify-center ds-text-secondary hover:ds-text-primary ds-transition-base border ds-border-light"
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full flex items-center justify-center ds-text-secondary hover:ds-text-primary ds-transition-base border ds-border-light"
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full flex items-center justify-center ds-text-secondary hover:ds-text-primary ds-transition-base border ds-border-light"
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2 border ds-border-light"
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
          >
            <button
              onClick={zoomOut}
              className="w-8 h-8 flex items-center justify-center ds-text-secondary hover:ds-text-primary ds-transition-base disabled:opacity-30"
              disabled={modalState.scale <= 0.5}
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            
            <button
              onClick={resetZoom}
              className="w-8 h-8 flex items-center justify-center ds-text-secondary hover:ds-text-primary ds-transition-base ds-body-sm font-medium"
            >
              {Math.round(modalState.scale * 100)}%
            </button>
            
            <button
              onClick={zoomIn}
              className="w-8 h-8 flex items-center justify-center ds-text-secondary hover:ds-text-primary ds-transition-base disabled:opacity-30"
              disabled={modalState.scale >= 3}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            
            <button
              onClick={resetZoom}
              className="w-8 h-8 flex items-center justify-center ds-text-secondary hover:ds-text-primary ds-transition-base"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div 
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50 backdrop-blur-sm ds-text-primary px-4 py-2 rounded-full border ds-border-light ds-body-sm"
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
          >
            {modalState.imageIndex + 1} / {displayImages.length}
          </div>

          <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center overflow-hidden">
            <img
              ref={imageRef}
              src={displayImages[modalState.imageIndex]}
              alt={`${activeCategory} photography ${modalState.imageIndex + 1}`}
              className={`max-w-full max-h-full object-contain ds-transition-base ${
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