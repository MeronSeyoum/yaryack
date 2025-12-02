// src/pages/HomePage.tsx
import React, { useState, useEffect } from "react";
import { Navigation } from "../components/layout/Navigation";
import { HeroSection } from "../components/home/HeroSection";
import { AboutSection } from "../components/home/AboutSection";
import { PortfolioSection } from "../components/home/PortfolioSection";
import { ServicesSection } from "../components/home/ServicesSection";
import { ContactSection } from "../components/home/ContactSection";
import { Footer } from "../components/layout/Footer";

const HomePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'portfolio', 'services', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <div className="min-h-screen">
      <Navigation 
        activeSection={activeSection}
        onNavClick={handleNavClick}
      />
      
      <HeroSection 
        activeSection={activeSection}
        onNavClick={handleNavClick}
      />
      
      <AboutSection isVisible={activeSection === "about"} />
      <PortfolioSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomePage;