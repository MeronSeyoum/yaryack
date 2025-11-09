// src/pages/HomePage.tsx
import React, { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { useImageLoader } from "../hooks/useImageLoader";
import { Navigation } from "../components/layout/Navigation";
import { ScrollToTop } from "../components/layout/ScrollToTop";
import { LoadingSpinner } from "../components/layout/LoadingSpinner";
import { HeroSection } from "../components/home/HeroSection";
import { AboutSection } from "../components/home/AboutSection";
import { PortfolioSection } from "../components/home/PortfolioSection";
import { ServicesSection } from "../components/home/ServicesSection";
import { ProcessSection } from "../components/home/ProcessSection";
import { ContactSection } from "../components/home/ContactSection";

// Import all images used in home page
import heroMain from "../assets/images/hero-main.jpg";
import heroThumb1 from "../assets/images/hero-thumb-1.jpg";
import heroThumb2 from "../assets/images/hero-thumb-2.jpg";
import heroThumb3 from "../assets/images/hero-thumb-3.jpg";
import heroThumb4 from "../assets/images/hero-thumb-4.jpg";
import photographerPortrait from "../assets/images/photographer-portrait.jpg";
import { Footer } from "../components/layout/Footer";

const HomePage: React.FC = () => {
  const { isDarkMode, toggleTheme, themeClasses } = useTheme();
  const imagesLoaded = useImageLoader([
    heroMain,
    heroThumb1,
    heroThumb2,
    heroThumb3,
    heroThumb4,
    photographerPortrait,
  ]);

  const [activeSection, setActiveSection] = useState("home");

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    const section = href.replace("#", "");
    setActiveSection(section);

    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  if (!imagesLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${themeClasses.bg.primary} ${themeClasses.text.primary}`}
    >
      <Navigation
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onNavClick={handleNavClick}
      />

      <HeroSection themeClasses={themeClasses} />
      <AboutSection isVisible={activeSection === "about"} />
      <PortfolioSection />
      <ServicesSection />
      {/* <ProcessSection  /> */}
      <ContactSection />

      <Footer isDarkMode={isDarkMode} />
      <ScrollToTop />
    </div>
  );
};

export default HomePage;
