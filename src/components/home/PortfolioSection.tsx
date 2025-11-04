// src/components/home/PortfolioSection.tsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Calendar, Star, Users, Camera, Award, X, ZoomIn, ZoomOut, RotateCcw, Play, Video } from 'lucide-react';
import { Button } from '../ui/Button';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_IMAGES } from '../../constants/portfolio';
import type { PortfolioCategory } from '../../types/portfolio';
import type { ThemeClasses } from '../../types';

interface PortfolioSectionProps {
  themeClasses: ThemeClasses;
}

interface ImageModalState {
  isOpen: boolean;
  imageIndex: number;
  scale: number;
  position: { x: number; y: number };
  isDragging: boolean;
}

// Sample video data - replace with your actual video URLs
const PORTFOLIO_VIDEOS = [
  {
    id: 1,
    title: "Wedding Highlights",
    thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500&h=500&fit=crop",
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    duration: "2:45",
    category: "Photos" as PortfolioCategory
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

// Update categories to replace 'Event' with 'Photos'
const UPDATED_CATEGORIES = PORTFOLIO_CATEGORIES.map(cat => 
  cat === 'Event' ? 'Event' : cat
) as PortfolioCategory[];

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ themeClasses }) => {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory | 'All' | 'Video'>('Event');
  const [isMobile, setIsMobile] = useState(false);
  const [modalState, setModalState] = useState<ImageModalState>({
    isOpen: false,
    imageIndex: 0,
    scale: 1,
    position: { x: 0, y: 0 },
    isDragging: false
  });
  const [videoModal, setVideoModal] = useState({ isOpen: false, video: null as typeof PORTFOLIO_VIDEOS[0] | null });
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

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
    if (activeCategory === 'Video') {
      return []; // Video category only shows videos
    }
    // For photo categories, show images
    return PORTFOLIO_IMAGES[activeCategory as PortfolioCategory] || [];
  };

  // Get videos based on active category
  const getDisplayVideos = () => {
    if (activeCategory === 'Video') {
      return PORTFOLIO_VIDEOS; // Video category shows all videos
    }
    if (activeCategory === 'All') {
      return []; // All category only shows images
    }
    // For specific photo categories, show related videos
    return PORTFOLIO_VIDEOS.filter(video => video.category === activeCategory);
  };

  const displayImages = getDisplayImages();
  const displayVideos = getDisplayVideos();
  const isVideoCategory = activeCategory === 'Video';
  const isAllCategory = activeCategory === 'All';

  // Image preview modal functions
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
      position: { x: 0, y: 0 } // Reset position when zooming out to fit
    }));
  };

  const resetZoom = () => {
    setModalState(prev => ({
      ...prev,
      scale: 1,
      position: { x: 0, y: 0 }
    }));
  };

  // Mouse event handlers for image dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (modalState.scale <= 1) return;
    
    setModalState(prev => ({ ...prev, isDragging: true }));
    dragStartRef.current = {
      x: e.clientX - prev.position.x,
      y: e.clientY - prev.position.y
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

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (modalState.scale <= 1) return;
    
    const touch = e.touches[0];
    setModalState(prev => ({ ...prev, isDragging: true }));
    dragStartRef.current = {
      x: touch.clientX - prev.position.x,
      y: touch.clientY - prev.position.y
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

  const stats = [
    { icon: Award, value: '5+', label: 'Years Experience' },
    { icon: Users, value: '500+', label: 'Happy Clients' },
    { icon: Camera, value: '1000+', label: 'Photos Captured' },
    { icon: Video, value: '100+', label: 'Videos Produced' },
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

  const videoLayouts = [
    "row-span-2 col-span-2",
    "row-span-2 col-span-2",
    "row-span-2 col-span-2",
    "row-span-2 col-span-2",
  ];

  return (
    <>
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
              <div className="bg-gradient-to-b from-gray-900/50 to-black/30 backdrop-blur-sm  py-6 pr-6 mt-0 lg:mt-20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-white">Categories</h3>
                </div>
                
                <div className="space-y-2">
                  {[...UPDATED_CATEGORIES, 'Video'].map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category as any)}
                      className={`w-full text-left p-3 rounded-xl transition-all duration-300 flex items-center gap-3 group ${
                        activeCategory === category
                          ? 'bg-orange-500/20 border border-orange-500/30 text-orange-500'
                          : 'bg-black/20 border border-white/5 hover:bg-white/5 text-gray-300 hover:text-white'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full transition-colors ${
                        activeCategory === category ? 'bg-orange-500' : 'bg-gray-600 group-hover:bg-orange-500'
                      }`} />
                      <span className="text-sm font-medium flex items-center gap-2">
                        {category}
                        {category === 'Video' && <Video className="w-3 h-3" />}
                      </span>
                      <div className="ml-auto text-xs opacity-60">
                        {category === 'Video' 
                          ? PORTFOLIO_VIDEOS.length 
                          : category === 'All'
                          ? Object.values(PORTFOLIO_IMAGES).flat().length
                          : PORTFOLIO_IMAGES[category as PortfolioCategory]?.length || 0
                        }
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
                      {isVideoCategory ? 'Video Productions' : `${activeCategory} Photography`}
                    </h3>
                    <p className="text-gray-400 text-sm max-w-2xl">
                      {isVideoCategory 
                        ? 'Explore my video productions across different categories. Each video tells a unique story through motion and sound.'
                        : 'Explore my work across different photography categories. Each image tells a unique story of authentic moments captured with passion and precision.'
                      }
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-black/40 rounded-full px-4 py-2 border border-white/10">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-white/80">
                      {isVideoCategory 
                        ? `${displayVideos.length} ${displayVideos.length === 1 ? 'Video' : 'Videos'}`
                        : `${displayImages.length} ${displayImages.length === 1 ? 'Image' : 'Images'}`
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Portfolio Grid */}
              <div 
                ref={scrollContainerRef}
                className="h-[calc(100vh-280px)] lg:h-[calc(100vh-0px)] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-800 hover:scrollbar-thumb-orange-600"
              >
                {/* Video Grid - Only show for Video category */}
                {isVideoCategory && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 auto-rows-[200px] sm:auto-rows-[250px] lg:auto-rows-[300px] mb-6">
                    {displayVideos.map((video, idx) => {
                      const layout = isMobile 
                        ? videoLayouts[idx % videoLayouts.length] 
                        : "row-span-2 col-span-1";

                      return (
                        <div
                          key={video.id}
                          onClick={() => openVideoModal(video)}
                          className={`relative ${layout} rounded-xl hover:scale-[1.02] transition-all duration-500 cursor-pointer overflow-hidden group`}
                        >
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                          />
                          
                          {/* Video Overlay */}
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
                          
                          {/* Play Button */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-orange-500/90 group-hover:bg-orange-600 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-2xl">
                              <Play className="w-6 h-6 text-white ml-1" />
                            </div>
                          </div>
                          
                          {/* Video Info */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-0 group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm lg:text-base text-white font-medium">
                                  {video.title}
                                </p>
                                <p className="text-xs text-gray-300 mt-1">
                                  {video.duration} • {video.category}
                                </p>
                              </div>
                              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                                <Play size={12} className="text-black" />
                              </div>
                            </div>
                          </div>

                          {/* Video Badge */}
                          <div className="absolute top-3 left-3 flex items-center gap-2">
                            <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-white/20 flex items-center gap-1">
                              <Video className="w-3 h-3" />
                              Video
                            </span>
                            <span className="bg-blue-500/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-blue-500/20">
                              {video.duration}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Image Grid - Show for all categories except Video */}
                {!isVideoCategory && (
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 auto-rows-[120px] sm:auto-rows-[140px] lg:auto-rows-[180px]">
                    {displayImages.map((img, idx) => {
                      const layout = isMobile 
                        ? mobileLayouts[idx % mobileLayouts.length] 
                        : desktopLayouts[idx % desktopLayouts.length];

                      return (
                        <div
                          key={idx}
                          onClick={() => openImageModal(idx)}
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
                )}

                {/* Empty State */}
                {(displayImages.length === 0 && !isVideoCategory) || (displayVideos.length === 0 && isVideoCategory) && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      {isVideoCategory ? <Video className="w-8 h-8 text-gray-600" /> : <Camera className="w-8 h-8 text-gray-600" />}
                    </div>
                    <h4 className="text-white text-lg font-semibold mb-2">
                      No {isVideoCategory ? 'Videos' : 'Images'} Found
                    </h4>
                    <p className="text-gray-400 text-sm">
                      No {isVideoCategory ? 'videos' : 'images'} available for {activeCategory} category.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Preview Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/80 hover:bg-black rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation Arrows */}
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

          {/* Zoom Controls */}
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

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/20 text-sm">
            {modalState.imageIndex + 1} / {displayImages.length}
          </div>

          {/* Image Container */}
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

          {/* Horizontal Scrollbar (appears when zoomed) */}
          {modalState.scale > 1 && (
            <div className="absolute bottom-16 left-4 right-4 z-50 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 rounded-full transition-all duration-200"
                style={{
                  width: `${Math.min(100, 100 / modalState.scale)}%`,
                  transform: `translateX(${Math.max(0, Math.min(100 - (100 / modalState.scale), (modalState.position.x / (imageRef.current?.offsetWidth || 1)) * 100))}%)`
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* Video Preview Modal */}
      {videoModal.isOpen && videoModal.video && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeVideoModal}
            className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/80 hover:bg-black rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Video Container */}
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
            
            {/* Video Info Overlay */}
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
};