// src/components/home/VerticalFilmRoll.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { ThemeClasses } from '../../types';

interface VerticalFilmRollProps {
  images: string[];
  themeClasses: ThemeClasses;
  className?: string;
}

export const VerticalFilmRoll: React.FC<VerticalFilmRollProps> = ({ 
  images, 
  themeClasses,
  className = '' 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [solenoidActive, setSolenoidActive] = useState(false);
  const [canisterEngaged, setCanisterEngaged] = useState(true);

  // Auto-slide effect with solenoid simulation
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      // Activate solenoid before slide change
      setSolenoidActive(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
        setSolenoidActive(false);
      }, 200);
    }, 3500);
    
    return () => clearInterval(timer);
  }, [images.length, isAutoPlaying]);

  const goToSlide = useCallback((index: number) => {
    setSolenoidActive(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setSolenoidActive(false);
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 8000);
    }, 200);
  }, []);

  // Determine if we're in dark mode based on background color
  const isDarkMode = themeClasses.bg.primary.includes('black') || 
                    themeClasses.bg.primary.includes('gray-900') ||
                    themeClasses.bg.primary.includes('gray-800');

  return (
    <div className={`relative ${className}`}>
      {/* Camera Housing with Side Tubes */}
      <div className="relative">
        {/* Left Side Tube */}

        {/* Right Side Tube */}
        <div className={`absolute -right-0 top-8 bottom-8 w-6 rounded-lg border-2 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700 shadow-2xl' 
            : 'bg-gray-200 border-gray-300 shadow-lg'
        }`}>
          {/* Tube End Caps */}
          <div className={`absolute -right-1 top-2 w-2 h-4 rounded-l ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-400'
          }`} />
          <div className={`absolute -right-1 bottom-2 w-2 h-4 rounded-l ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-400'
          }`} />
          
          {/* Tube Mounting Brackets */}
          <div className={`absolute right-0 top-1/4 w-1 h-3 ${
            isDarkMode ? 'bg-gray-600' : 'bg-gray-500'
          }`} />
          <div className={`absolute right-0 top-3/4 w-1 h-3 ${
            isDarkMode ? 'bg-gray-600' : 'bg-gray-500'
          }`} />
        </div>

        {/* Solenoid Mechanism */}
        <motion.div 
          className={`absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-16 rounded-lg border-2 ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-600' 
              : 'bg-gray-300 border-gray-400'
          } shadow-xl`}
          animate={{
            x: solenoidActive ? [0, -4, 0] : 0,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut"
          }}
        >
          {/* Solenoid Plunger */}
          <motion.div 
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 rounded-l ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-500'
            }`}
            animate={{
              x: solenoidActive ? [0, 6, 0] : 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut"
            }}
          />
          
          {/* Solenoid Coils */}
          <div className="absolute left-4 top-2 bottom-2 right-2 flex flex-col justify-between">
            {[...Array(4)].map((_, i) => (
              <div 
                key={i}
                className={`h-1 rounded-full ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Electrical Wires */}
          <div className={`absolute -right-2 top-4 w-4 h-1 ${
            isDarkMode ? 'bg-red-500' : 'bg-red-600'
          } rounded-r`} />
          <div className={`absolute -right-2 bottom-4 w-4 h-1 ${
            isDarkMode ? 'bg-blue-500' : 'bg-blue-600'
          } rounded-r`} />
        </motion.div>

        {/* Main Film Roll Container */}
        <div 
          className={`relative p-4 rounded-lg border-2 mx-8 mb-20 ${
            isDarkMode 
              ? 'border-gray-700 bg-gradient-to-b from-gray-900 to-black' 
              : 'border-gray-300 bg-gradient-to-b from-gray-100 to-white'
          } shadow-2xl`}
          style={{
            transform: 'perspective(800px) rotateX(2deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Camera Body Texture */}
          <div className={`absolute inset-0 rounded-lg pointer-events-none ${
            isDarkMode 
              ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
              : 'bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200'
          } opacity-60`} />

          {/* Film Roll Body */}
          <div className="relative">
            {/* Left Edge Perforations */}
            <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-around py-4 z-10">
              {[...Array(8)].map((_, i) => (
                <motion.div 
                  key={`left-${i}`}
                  className={`w-1.5 h-2 rounded-sm ${
                    isDarkMode ? 'bg-gray-600' : 'bg-gray-400'
                  }`}
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                    scaleY: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>

            {/* Right Edge Perforations */}
            <div className="absolute right-2 top-0 bottom-0 flex flex-col justify-around py-4 z-10">
              {[...Array(8)].map((_, i) => (
                <motion.div 
                  key={`right-${i}`}
                  className={`w-1.5 h-2 rounded-sm ${
                    isDarkMode ? 'bg-gray-600' : 'bg-gray-400'
                  }`}
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                    scaleY: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>

            {/* Film Strip with Natural Curve */}
            <div 
              className={`relative rounded border-2 overflow-hidden ${
                isDarkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300'
              } shadow-inner`}
            >
              {/* Film Frames Stack */}
              <div className="space-y-3 p-3 min-h-[400px] relative">
                {images.map((img, idx) => {
                  const offset = (idx - currentSlide) * 100;
                  const isActive = idx === currentSlide;
                  const distanceFromActive = Math.abs(idx - currentSlide);
                  
                  return (
                    <motion.div
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      className="relative cursor-pointer"
                      initial={false}
                      animate={{
                        y: offset,
                        x: Math.sin(idx * 0.8) * (isActive ? 0 : 3),
                        rotateZ: Math.sin(idx * 0.5) * (isActive ? 0 : 1.5),
                        scale: isActive ? 1.05 : 0.95,
                        opacity: distanceFromActive > 1 ? 0 : (isActive ? 1 : 0.4),
                        zIndex: isActive ? 10 : 5 - distanceFromActive,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        duration: 0.5
                      }}
                      style={{
                        position: idx === 0 ? 'relative' : 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                      }}
                    >
                      {/* Film Frame Border */}
                      <div className={`p-2 rounded-lg border-2 ${
                        isActive 
                          ? 'border-orange-500 shadow-2xl shadow-orange-500/30 bg-white/5' 
                          : `${isDarkMode ? 'border-gray-500 bg-gray-700/30' : 'border-gray-300 bg-gray-200/30'}`
                      }`}>
                        {/* Frame Corners */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-orange-500/50 rounded-tl" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-orange-500/50 rounded-tr" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-orange-500/50 rounded-bl" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-orange-500/50 rounded-br" />

                        {/* Image */}
                        <div className="aspect-[3/4] rounded overflow-hidden relative">
                          <img
                            src={img}
                            alt={`Frame ${idx + 1}`}
                            className={`w-full h-full object-cover transition-all duration-500 ${
                              isActive ? 'filter-none' : 'filter grayscale brightness-75'
                            }`}
                          />
                          
                          {/* Film Grain Overlay */}
                          <div 
                            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-10"
                            style={{
                              background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.06\'/%3E%3C/svg%3E")',
                            }}
                          />

                          {/* Vintage Vignette */}
                          <div 
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 85%)'
                            }}
                          />
                        </div>

                        {/* Frame Counter */}
                        {isActive && (
                          <motion.div 
                            className={`absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs font-mono border shadow-lg ${
                              isDarkMode 
                                ? 'bg-gray-800 border-gray-600 text-gray-300' 
                                : 'bg-gray-200 border-gray-300 text-gray-700'
                            }`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                          >
                            <span className="text-orange-500 font-bold">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>/</span>
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                              {String(images.length).padStart(2, '0')}
                            </span>
                          </motion.div>
                        )}
                      </div>

                      {/* Side Markings */}
                      {isActive && (
                        <>
                          <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90">
                            <span className={`text-xs font-mono tracking-widest ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              KODAK
                            </span>
                          </div>
                          <div className="absolute -right-6 top-1/2 -translate-y-1/2 rotate-90">
                            <span className={`text-xs font-mono tracking-widest ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              400
                            </span>
                          </div>
                        </>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress Indicator */}
              <div 
                className={`absolute bottom-0 left-0 right-0 h-1 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-400'
                }`}
              >
                <motion.div 
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-400"
                  animate={{
                    width: isAutoPlaying ? ['0%', '100%'] : '0%'
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: isAutoPlaying ? Infinity : 0,
                    ease: "linear"
                  }}
                />
              </div>
            </div>

            {/* Film Brand Label */}
            <motion.div 
              className={`mt-3 text-center py-2 rounded text-sm font-mono tracking-wider border shadow-md ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600' 
                  : 'bg-gray-200 border-gray-300'
              }`}
              animate={{
                y: [0, -1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-amber-500 font-bold">PORTRA</span>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}> 400</span>
            </motion.div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`w-2 h-2 rounded-full ${
                    idx === currentSlide
                      ? 'bg-orange-500' 
                      : `${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`
                  }`}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.8 }}
                  animate={{
                    width: idx === currentSlide ? 24 : 8,
                    boxShadow: idx === currentSlide 
                      ? '0 0 10px rgba(249, 115, 22, 0.5)'
                      : 'none'
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              ))}
            </div>

            {/* Auto-play Indicator */}
            <div className="flex items-center justify-center gap-2 mt-3">
              <motion.div 
                className={`w-2 h-2 rounded-full ${
                  isAutoPlaying ? 'bg-green-500' : isDarkMode ? 'bg-gray-600' : 'bg-gray-400'
                }`}
                animate={{
                  scale: isAutoPlaying ? [1, 1.2, 1] : 1,
                  opacity: isAutoPlaying ? [1, 0.7, 1] : 0.6
                }}
                transition={{
                  duration: 1,
                  repeat: isAutoPlaying ? Infinity : 0
                }}
              />
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {isAutoPlaying ? 'Auto' : 'Paused'}
              </span>
            </div>
          </div>
        </div>

        {/* High-Tech Film Canister - Centered and Aligned */}
        <motion.div 
          className="absolute -bottom-24 left-1 -translate-x-1/2 z-30 w-full max-w-sm"
          animate={{
            y: canisterEngaged ? [0, -2, 0] : 0,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Canister Outer Shell */}
          <div className="relative flex justify-center">
            {/* Main Canister Body */}
            <div 
              className="w-64 h-20 rounded-2xl relative overflow-hidden shadow-2xl"
              style={{
                background: 'linear-gradient(145deg, #fde68a 0%, #fcd34d 15%, #fbbf24 35%, #f59e0b 55%, #d97706 75%, #b45309 95%)',
                boxShadow: `
                  inset 0 2px 4px rgba(255,255,255,0.3),
                  inset 0 -2px 4px rgba(0,0,0,0.4),
                  0 8px 32px rgba(0,0,0,0.5),
                  0 0 0 1px rgba(255,255,255,0.1)
                `
              }}
            >
              {/* Metallic Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-amber-300/30 pointer-events-none" />
              
              {/* High-Tech Slider Track */}
              <div className="absolute top-3 left-4 right-4 h-3 bg-black/60 rounded-full overflow-hidden backdrop-blur-sm">
                {/* Slider Progress Glow */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    boxShadow: ['0 0 10px rgba(34, 197, 94, 0.3)', '0 0 20px rgba(34, 197, 94, 0.6)', '0 0 10px rgba(34, 197, 94, 0.3)']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                />
                
                {/* Slider Knob */}
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white cursor-pointer shadow-2xl border border-gray-300"
                  style={{
                    left: '100%',
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{
                    backgroundColor: ['#ffffff', '#f0f0f0', '#ffffff'],
                    boxShadow: [
                      '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.8)',
                      '0 4px 16px rgba(0,0,0,0.4), inset 0 1px 3px rgba(255,255,255,0.9)',
                      '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.8)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Knob Grip Pattern */}
                  <div className="absolute inset-1 rounded-full bg-gradient-to-br from-gray-200 to-gray-400">
                    <div className="absolute inset-0.5 rounded-full border border-gray-300/50" />
                    {/* Vector-style grip lines */}
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-gray-500/40 rounded" />
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-gray-500/40 rounded" />
                  </div>
                  
                  {/* LED Indicator */}
                  <motion.div 
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-400 shadow-lg"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity
                    }}
                  />
                </motion.div>
              </div>

              {/* Inner Canister with Vector Design */}
              <div className="absolute inset-2 bg-gradient-to-b from-amber-100 to-amber-300 rounded-xl shadow-inner overflow-hidden border border-amber-200/50">
                {/* Top Black Bar with Tech Details */}
                <div className="absolute top-0 left-0 right-0 h-3 bg-black rounded-t-xl flex items-center justify-between px-3">
                  {/* Small Tech Dots */}
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-amber-400/60" />
                    <div className="w-1 h-1 rounded-full bg-amber-400/60" />
                  </div>
                  <div className="text-[10px] text-amber-300 font-mono uppercase tracking-widest">35mm</div>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-amber-400/60" />
                    <div className="w-1 h-1 rounded-full bg-amber-400/60" />
                  </div>
                </div>
                
                {/* Film Label with Vector Style */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-4 pb-2">
                  {/* Top Text with modern typography */}
                  <div className="text-[10px] font-bold text-gray-900 text-center leading-tight tracking-[0.2em] uppercase">
                    color print film
                  </div>
                  
                  {/* Large "200" with tech glow */}
                  <motion.div 
                    className="text-2xl font-black text-gray-900 mt-1 tracking-tighter relative"
                    animate={{
                      textShadow: [
                        '0 0 0px rgba(0,0,0,0.5)',
                        '0 0 8px rgba(255,255,255,0.8)',
                        '0 0 0px rgba(0,0,0,0.5)'
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity
                    }}
                  >
                    200
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 text-2xl font-black text-white/20 blur-sm">200</div>
                  </motion.div>
                  
                  {/* Bottom Text with modern layout */}
                  <div className="text-[9px] font-semibold text-gray-800 mt-1 tracking-widest flex items-center gap-2">
                    <span>36exp</span>
                    <div className="w-1 h-1 rounded-full bg-gray-700" />
                    <span>ISO 200/24°</span>
                  </div>
                </div>

                {/* Bottom Black Bar with Vector Elements */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-black rounded-b-xl flex items-center justify-center">
                  {/* Vector-style pattern */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-0.5 h-0.5 rounded-full bg-amber-400/40" />
                    ))}
                  </div>
                </div>

                {/* Vector-style Corner Accents */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-amber-600/30" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-amber-600/30" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-amber-600/30" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-amber-600/30" />
              </div>

              {/* Film Slot with High-Tech Design */}
              <motion.div 
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-3 bg-gradient-to-b from-gray-900 via-gray-800 to-black rounded-t-lg border border-gray-700"
                style={{
                  clipPath: 'polygon(0 100%, 100% 100%, 88% 0, 12% 0)'
                }}
                animate={{
                  scaleY: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                {/* High-Tech Film Leader */}
                <motion.div 
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-16"
                  animate={{
                    y: [0, -1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  <div className={`h-3 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'} rounded-t-lg border border-gray-500/30`}>
                    <div className="flex justify-between px-3 pb-0.5">
                      {[...Array(3)].map((_, i) => (
                        <motion.div 
                          key={i}
                          className={`w-1 h-1 rounded-sm ${isDarkMode ? 'bg-gray-800' : 'bg-gray-500'} border border-gray-600/30`}
                          animate={{
                            opacity: [0.3, 0.8, 0.3]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Status Display */}
              <motion.div 
                className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono bg-black/90 text-green-400 backdrop-blur-sm border border-green-500/30 shadow-2xl"
                animate={{
                  backgroundColor: ['rgba(0,0,0,0.9)', 'rgba(0,20,0,0.8)', 'rgba(0,0,0,0.9)'],
                  y: [0, -1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              >
                <motion.div 
                  className="w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-400/50"
                  animate={{
                    scale: [1, 1.4, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }}
                />
                <span className="tracking-widest">ENGAGED</span>
                <div className="w-1 h-3 bg-green-400/60 rounded-full animate-pulse" />
              </motion.div>

              {/* Side Extension */}
              <div className="absolute w-5 bottom-7 border-r border-t border-b border-amber-500 rounded-r-lg h-14 -right-5 bg-white/30 z-10" />
            </div>

            {/* Outer Glow Effect */}
            <motion.div 
              className="absolute inset-0 rounded-2xl bg-amber-400/20 blur-xl -z-10"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};