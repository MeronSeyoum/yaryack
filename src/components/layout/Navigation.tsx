// src/components/layout/Navigation.tsx
import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Camera } from "lucide-react";

interface NavigationProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  isDarkMode,
  toggleTheme,
  activeSection,
  setActiveSection,
  onNavClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'portfolio', 'services', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, setActiveSection]);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);
    onNavClick(e, href);
  };

  // Theme-based styles - Updated to emerald green
  const navBackground = isScrolled
    ? isDarkMode
      ? "bg-emerald-900/95 backdrop-blur-md border-b border-emerald-500/20"
      : "bg-white/95 backdrop-blur-md border-b border-emerald-200 shadow-lg"
    : isDarkMode
    ? "bg-transparent border-b border-emerald-500/20"
    : "bg-transparent border-b border-emerald-200";

  const textColor = isDarkMode ? "text-white" : "text-emerald-900";
  const subtitleColor = isDarkMode ? "text-emerald-300/80" : "text-emerald-600";
  const navItemColor = isDarkMode ? "text-emerald-200" : "text-emerald-700";
  const navItemHoverColor = "hover:text-emerald-400";
  const activeNavItemColor = "text-emerald-400";
  const mobileMenuBackground = isDarkMode 
    ? "bg-emerald-900/95 backdrop-blur-md" 
    : "bg-white/95 backdrop-blur-md";
  const mobileBorderColor = isDarkMode ? "border-emerald-500/20" : "border-emerald-200";
  const buttonBackground = isDarkMode ? "bg-emerald-500/10" : "bg-emerald-500/10";
  const buttonHoverBackground = isDarkMode ? "hover:bg-emerald-500/20" : "hover:bg-emerald-500/20";
  const buttonIconColor = isDarkMode ? "text-emerald-200" : "text-emerald-700";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackground} ${
        isScrolled ? "py-2 sm:py-5" : "py-4"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2 sm:gap-3 group"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className={textColor}>
              <div className="font-semibold text-base sm:text-lg leading-tight">Yaryack</div>
              <div className={`text-xs ${subtitleColor} -mt-0.5 leading-tight`}>Photography</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const sectionName = item.href.replace('#', '');
              const isActive = activeSection === sectionName;
              
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive ? activeNavItemColor : navItemColor
                  } ${navItemHoverColor}`}
                >
                  {item.name}
                </a>
              );
            })}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${buttonBackground} ${buttonHoverBackground} transition-all duration-200 border ${
                isDarkMode ? "border-emerald-500/20" : "border-emerald-300"
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className={`w-4 h-4 ${buttonIconColor}`} />
              ) : (
                <Moon className={`w-4 h-4 ${buttonIconColor}`} />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${buttonBackground} ${buttonHoverBackground} transition-all duration-200 border ${
                isDarkMode ? "border-emerald-500/20" : "border-emerald-300"
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className={`w-4 h-4 ${buttonIconColor}`} />
              ) : (
                <Moon className={`w-4 h-4 ${buttonIconColor}`} />
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg ${buttonBackground} ${buttonHoverBackground} transition-all duration-200 border ${
                isDarkMode ? "border-emerald-500/20" : "border-emerald-300"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className={`w-5 h-5 ${buttonIconColor}`} />
              ) : (
                <Menu className={`w-5 h-5 ${buttonIconColor}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden mt-4 pt-4 border-t ${mobileBorderColor} ${mobileMenuBackground} rounded-lg -mx-4 px-4 pb-4 shadow-xl`}>
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const sectionName = item.href.replace('#', '');
                const isActive = activeSection === sectionName;
                
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-sm font-medium py-3 px-4 rounded-lg transition-all duration-200 ${
                      isActive ? activeNavItemColor : navItemColor
                    } ${navItemHoverColor} ${
                      isDarkMode ? "hover:bg-emerald-500/10" : "hover:bg-emerald-500/10"
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};