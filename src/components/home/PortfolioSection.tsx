// src/components/home/PortfolioSection.tsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Calendar, X, ZoomIn, ZoomOut, RotateCcw, Play, Video, Camera } from 'lucide-react';
import { Button } from '../ui/Button';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_IMAGES } from '../../constants/portfolio';
import type { PortfolioCategory } from '../../types/portfolio';
import type { ThemeClasses } from '../../types';

interface PortfolioSectionProps {
  themeClasses: ThemeClasses;
}

// Sample video data - replace with your actual video URLs
const PORTFOLIO_VIDEOS = [
  {
    id: 1,
    title: "Wedding Highlights",
    thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&h=500&fit=crop",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    duration: "2:45",
    category: "Event" as PortfolioCategory
  },
  {
    id: 2,
    title: "Portrait Session",
    thumbnail: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&h=500&fit=crop",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "1:30",
    category: "Portrait" as PortfolioCategory
  },
  {
    id: 3,
    title: "Commercial Ad",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    duration: "3:15",
    category: "Commercial" as PortfolioCategory
  },
];

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ themeClasses }) => {
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
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; video: typeof PORTFOLIO_VIDEOS[0] | null }>({ isOpen: false, video: null });
  
  const imageRef = useRef<HTMLImageElement>(null);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Determine if we're in dark mode
  const isDarkMode = themeClasses.bg.primary.includes('black') || 
                    themeClasses.bg.primary.includes('gray-900') ||
                    themeClasses.bg.primary.includes('gray-800') ||
                    themeClasses.text.primary.includes('white');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get images based on active category
  const getDisplayImages = () => {
    if (activeCategory === 'Video') {
      return [];
    }
    return PORTFOLIO_IMAGES[activeCategory as PortfolioCategory] || [];
  };

  // Get videos based on active category
  const getDisplayVideos = () => {
    if (activeCategory === 'Video') {
      return PORTFOLIO_VIDEOS;
    }
    return PORTFOLIO_VIDEOS.filter(video => video.category === activeCategory);
  };

  const displayImages = getDisplayImages();
  const displayVideos = getDisplayVideos();
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

  const openVideoModal = (video: typeof PORTFOLIO_VIDEOS[0]) => {
    setVideoModal({ isOpen: true, video });
  };

  const closeImageModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const closeVideoModal = () => {
    setVideoModal({ isOpen: false, video: null });
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
    setModalState(prev => ({
      ...prev,
      scale: Math.min(prev.scale + 0.5, 3)
    }));
  };

  const zoomOut = () => {
    setModalState(prev => ({
      ...prev,
      scale: Math.max(prev.scale - 0.5, 0.5),
      position: { x: 0, y: 0 }
    }));
  };

  const resetZoom = () => {
    setModalState(prev => ({
      ...prev,
      scale: 1,
      position: { x: 0, y: 0 }
    }));
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (modalState.scale <= 1) return;
    
    setModalState(prev => ({ ...prev, isDragging: true }));
    dragStartRef.current = {
      x: e.clientX - modalState.position.x,
      y: e.clientY - modalState.position.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!modalState.isDragging || modalState.scale <= 1) return;

    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;

    setModalState(prev => ({
      ...prev,
      position: { x: newX, y: newY }
    }));
  };

  const handleMouseUp = () => {
    setModalState(prev => ({ ...prev, isDragging: false }));
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (modalState.scale <= 1) return;
    
    const touch = e.touches[0];
    setModalState(prev => ({ ...prev, isDragging: true }));
    dragStartRef.current = {
      x: touch.clientX - modalState.position.x,
      y: touch.clientY - modalState.position.y
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!modalState.isDragging || modalState.scale <= 1) return;

    const touch = e.touches[0];
    const newX = touch.clientX - dragStartRef.current.x;
    const newY = touch.clientY - dragStartRef.current.y;

    setModalState(prev => ({
      ...prev,
      position: { x: newX, y: newY }
    }));
  };

  const handleTouchEnd = () => {
    setModalState(prev => ({ ...prev, isDragging: false }));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalState.isOpen) return;

      switch (e.key) {
        case 'Escape':
          closeImageModal();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case '+':
        case '=':
          zoomIn();
          break;
        case '-':
          zoomOut();
          break;
        case '0':
          resetZoom();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalState.isOpen]);

  // Masonry layout classes for different sizes
  const masonryLayouts = [
    "row-span-2",
    "row-span-1",
    "row-span-1",
    "row-span-3",
    "row-span-2",
    "row-span-1",
    "row-span-1",
    "row-span-1",
  ];

  return (
    <>
      <section  id="portfolio" className={`min-h-screen  ${themeClasses.bg.primary}`}>
        <div className="mx-auto">
          {/* Section Header */}
          <div className={`p-4 lg:px-16 border-b border-t ${themeClasses.border}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider`}>
                  Featured Work
                </p>
              </div>
              <h2 className={`text-3xl lg:text-4xl font-light ${themeClasses.text.primary}`}>
                Portfolio
              </h2>
            </div>
          </div>
        </div>

        <div className="mx-auto px-6 lg:px-16 py-8">
          {/* Main Content Grid */}
          <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] gap-8">
            
            {/* Left Sidebar - Categories */}
            <div className="flex flex-col gap-4 lg:gap-6">
              {/* Categories Card */}
              <div className={`backdrop-blur-lg rounded-xl border p-6 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-orange-900/50 to-orange-800/50 border-orange-900/30' 
                  : 'bg-gradient-to-r from-orange-100 to-orange-50 border-orange-200'
              }`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Categories
                  </h3>
                </div>
                
                <div className="space-y-2">
                  {[...PORTFOLIO_CATEGORIES, 'Video'].map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-300 flex items-center gap-3 group ${
                        activeCategory === category
                          ? 'bg-orange-500/20 border border-orange-500/30 text-orange-500'
                          : `${
                              isDarkMode 
                                ? 'bg-black/60 border border-white/20 hover:bg-white/5 text-gray-300 hover:text-white'
                                : 'bg-white/60 border border-gray-300 hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                            }`
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full transition-colors ${
                        activeCategory === category ? 'bg-orange-500' : 'bg-gray-600 group-hover:bg-orange-500'
                      }`} />
                      <span className="text-sm font-medium flex items-center gap-2">
                        {category}
                        {category === 'Video' && <Video className="w-3 h-3" />}
                      </span>
                      <div className={`ml-auto text-xs ${
                        activeCategory === category ? 'text-orange-400' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {category === 'Video' 
                          ? PORTFOLIO_VIDEOS.length 
                          : PORTFOLIO_IMAGES[category]?.length || 0
                        }
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <div className={`hidden lg:block backdrop-blur-sm rounded-2xl p-6 border ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-orange-500/10 to-amber-600/5 border-orange-500/20' 
                  : 'bg-gradient-to-br from-orange-100 to-amber-50 border-orange-200'
              }`}>
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Ready to Begin?
                    </h4>
                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
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
            <div className="flex-1">
              {/* Portfolio Header */}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h3 className={`text-2xl font-semibold ${themeClasses.text.primary}`}>
                    {isVideoCategory ? 'Video Productions' : `${activeCategory} Photography`}
                  </h3>
                  <div className={`flex items-center gap-2 rounded-full px-4 py-2 border ${
                    isDarkMode 
                      ? 'bg-black/40 border-white/10 text-white/80' 
                      : 'bg-gray-100 border-gray-300 text-gray-700'
                  }`}>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">
                      {isVideoCategory 
                        ? `${displayVideos.length} ${displayVideos.length === 1 ? 'Video' : 'Videos'}`
                        : `${displayImages.length} ${displayImages.length === 1 ? 'Image' : 'Images'}`
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Video Grid */}
              {isVideoCategory && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayVideos.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => openVideoModal(video)}
                      className="relative aspect-video rounded-xl hover:scale-[1.02] transition-all duration-500 cursor-pointer overflow-hidden group"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      />
                      
                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-orange-500/90 group-hover:bg-orange-600 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-2xl">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                      </div>
                      
                      {/* Video Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                        <p className="text-base text-white font-medium mb-1">
                          {video.title}
                        </p>
                        <p className="text-xs text-gray-300">
                          {video.duration} • {video.category}
                        </p>
                      </div>

                      {/* Video Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/20 flex items-center gap-1">
                          <Video className="w-3 h-3" />
                          Video
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Image Masonry Grid */}
              {!isVideoCategory && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
                  {displayImages.map((img, idx) => {
                    const layout = masonryLayouts[idx % masonryLayouts.length];

                    return (
                      <div
                        key={idx}
                        onClick={() => openImageModal(idx)}
                        className={`relative ${layout} rounded-xl hover:scale-[1.02] transition-all duration-500 cursor-pointer overflow-hidden group`}
                      >
                        <img
                          src={img}
                          alt={`${activeCategory} photography ${idx + 1}`}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        />
                        
                        {/* Info Panel - Hover */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-white font-medium">
                              {activeCategory} #{idx + 1}
                            </p>
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                              <ChevronRight size={16} className="text-black" />
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
                <div className="text-center py-12">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
                  }`}>
                    <Camera className={`w-8 h-8 ${isDarkMode ? 'text-gray-600' : 'text-gray-500'}`} />
                  </div>
                  <h4 className={`text-lg font-semibold mb-2 ${themeClasses.text.primary}`}>
                    No Images Found
                  </h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
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
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/80 hover:bg-black rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 bg-black/80 hover:bg-black rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 border border-white/20"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 bg-black/80 hover:bg-black rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 border border-white/20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-black/80 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <button
              onClick={zoomOut}
              className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors disabled:opacity-30"
              disabled={modalState.scale <= 0.5}
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            
            <button
              onClick={resetZoom}
              className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors text-xs font-medium"
            >
              {Math.round(modalState.scale * 100)}%
            </button>
            
            <button
              onClick={zoomIn}
              className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors disabled:opacity-30"
              disabled={modalState.scale >= 3}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            
            <button
              onClick={resetZoom}
              className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20 text-sm">
            {modalState.imageIndex + 1} / {displayImages.length}
          </div>

          <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center overflow-hidden">
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
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      {videoModal.isOpen && videoModal.video && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <button
            onClick={closeVideoModal}
            className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/80 hover:bg-black rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden">
            <video
              controls
              autoPlay
              className="w-full h-full object-contain"
              poster={videoModal.video.thumbnail}
            >
              <source src={videoModal.video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="text-xl font-semibold text-white mb-2">
                {videoModal.video.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1">
                  <Video className="w-4 h-4" />
                  {videoModal.video.duration}
                </span>
                <span className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full text-xs">
                  {videoModal.video.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}