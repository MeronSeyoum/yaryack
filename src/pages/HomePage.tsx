// src/pages/HomePage.tsx
import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { useImageLoader } from '../hooks/useImageLoader';
import { Navigation } from '../components/layout/Navigation';
import { ScrollToTop } from '../components/layout/ScrollToTop';
import { LoadingSpinner } from '../components/layout/LoadingSpinner';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { PortfolioSection } from '../components/home/PortfolioSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { ContactSection } from '../components/home/ContactSection';

// Import all images used in home page
import heroMain from "../assets/images/hero-main.jpg";
import heroThumb1 from "../assets/images/hero-thumb-1.jpg";
import heroThumb2 from "../assets/images/hero-thumb-2.jpeg";
import heroThumb3 from "../assets/images/hero-thumb-3.jpeg";
import heroThumb4 from "../assets/images/hero-thumb-4.jpeg";
import photographerPortrait from "../assets/images/photographer-portrait.jpg";
import { Footer } from '../components/layout/Footer';

const HomePage: React.FC = () => {
  const { isDarkMode, toggleTheme, themeClasses } = useTheme();
  const imagesLoaded = useImageLoader([
    heroMain, heroThumb1, heroThumb2, heroThumb3, heroThumb4, photographerPortrait
  ]);

  if (!imagesLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.bg.primary} ${themeClasses.text.primary}`}>
      <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <HeroSection themeClasses={themeClasses}  />
      <AboutSection themeClasses={themeClasses} />
      <PortfolioSection themeClasses={themeClasses} />
      <ServicesSection themeClasses={themeClasses} />
      {/* <ProcessSection themeClasses={themeClasses} /> */}
      <ContactSection themeClasses={themeClasses} />
      
      <Footer isDarkMode={isDarkMode} />
      <ScrollToTop />
    </div>
  );
};

export default HomePage;