// src/components/layout/Navigation.tsx
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Camera } from 'lucide-react';

interface NavigationProps {
  isDarkMode?: boolean;
  toggleTheme?: () => void;
  activeSection?: string;
  onNavClick?: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  isDarkMode = true,
  toggleTheme,
  activeSection = 'home',
  onNavClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavClick) {
      onNavClick(e, href);
    } else {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);
    handleNavClick(e, href);
  };

  const getPrimaryTextColor = () => {
    return isDarkMode ? '#ffffff' : '#111827';
  };

  const getSecondaryTextColor = () => {
    return isDarkMode ? '#e5e7eb' : '#374151';
  };

  const getActiveTextColor = () => {
    return '#10b981';
  };

  const getHoverTextColor = () => {
    return isDarkMode ? '#10b981' : '#059669';
  };

  const getNavBackground = () => {
    if (!isScrolled) return 'transparent';
    return isDarkMode 
      ? 'rgba(10, 10, 10, 0.85)' 
      : 'rgba(255, 255, 255, 0.85)';
  };

  const getNavBorder = () => {
    if (!isScrolled) return 'transparent';
    return isDarkMode 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.1)';
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ds-transition-slow ${
        isScrolled ? 'shadow-lg' : ''
      }`}
      style={{
        background: getNavBackground(),
        borderBottom: `1px solid ${getNavBorder()}`,
      }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 lg:border-b ds-border-primary">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Responsive sizing */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <div 
              className="w-9 h-9 lg:w-10 lg:h-10 rounded-md flex items-center justify-center shadow-md group-hover:scale-105 ds-transition-slow"
              style={{
                background: `linear-gradient(to bottom right, var(--color-brand-primary-light), var(--color-brand-primary))`
              }}
            >
              <Camera className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            <div>
              <span 
                className="ds-body-base lg:ds-heading-4 font-bold block"
                style={{ color: getPrimaryTextColor() }}
              >
                Yaryack
              </span>
              <p 
                className="hidden sm:block ds-body-xs lg:ds-body-sm -mt-0.5 lg:-mt-1 font-medium"
                style={{ color: getSecondaryTextColor() }}
              >
                Photography
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-4 py-2 rounded-xl ds-body-base font-semibold ds-transition-slow hover:scale-105`}
                  style={{
                    color: isActive ? getActiveTextColor() : getPrimaryTextColor(),
                    background: isActive 
                      ? (isDarkMode ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)')
                      : 'transparent',
                    textShadow: isActive ? '0 0 10px rgba(16, 185, 129, 0.3)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = getHoverTextColor();
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = getPrimaryTextColor();
                    }
                  }}
                >
                  {item.name}
                </a>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {toggleTheme && (
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl flex items-center justify-center ds-transition-slow hover:scale-105 hover:shadow-lg"
                style={{ 
                  background: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.05)',
                  color: getPrimaryTextColor(),
                  border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
                }}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-300" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-600" />
                )}
              </button>
            )}
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="ds-btn ds-btn-primary ds-btn-sm font-semibold shadow-lg hover:shadow-xl"
              style={{
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
              }}
            >
              Book Now
            </button>
          </div>

          {/* Mobile Actions - Compact */}
          <div className="flex lg:hidden items-center gap-2">
            {toggleTheme && (
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-lg flex items-center justify-center ds-transition-slow"
                style={{ 
                  background: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.05)',
                  color: getPrimaryTextColor(),
                  border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
                }}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-yellow-300" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-600" />
                )}
              </button>
            )}
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9 rounded-lg flex items-center justify-center ds-transition-slow"
              style={{ 
                background: isDarkMode 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(0, 0, 0, 0.05)',
                color: getPrimaryTextColor(),
                border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
              }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden backdrop-blur-lg border-t"
          style={{ 
            background: isDarkMode 
              ? 'rgba(10, 10, 10, 0.95)' 
              : 'rgba(255, 255, 255, 0.95)',
            borderColor: getNavBorder(),
          }}
        >
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleMobileNavClick(e, item.href)}
                  className={`block px-4 py-3 rounded-xl ds-body-base font-semibold ds-transition-slow`}
                  style={{
                    color: isActive ? getActiveTextColor() : getPrimaryTextColor(),
                    background: isActive 
                      ? (isDarkMode ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)')
                      : 'transparent',
                    textShadow: isActive ? '0 0 10px rgba(16, 185, 129, 0.3)' : 'none',
                  }}
                >
                  {item.name}
                </a>
              );
            })}
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full ds-btn ds-btn-primary ds-btn-md font-semibold shadow-lg"
                style={{
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};