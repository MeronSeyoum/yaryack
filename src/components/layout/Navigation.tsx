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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ds-transition-slow ${
        isScrolled ? 'backdrop-blur-lg shadow-lg' : ''
      }`}
      style={{
        background: isScrolled 
          ? isDarkMode 
            ? 'rgba(10, 10, 10, 0.85)' 
            : 'rgba(245, 245, 245, 0.85)'
          : 'transparent',
        borderBottom: isScrolled 
          ? isDarkMode
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(0, 0, 0, 0.1)'
          : '1px solid transparent'
      }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group"
          >
            <div 
              className="w-10 h-10 rounded-md flex items-center justify-center shadow-md group-hover:scale-105 ds-transition-slow"
              style={{
                background: `linear-gradient(to bottom right, var(--color-brand-primary-light), var(--color-brand-primary))`
              }}
            >
               <Camera className="w-5 h-5  text-white " />
            </div>
            <div className="hidden sm:block">
              <span className="ds-heading-4" style={{
                color: isDarkMode ? '#ffffff' : '#1f2937'
              }}>Yaryack</span>
              <p className="ds-body-sm -mt-1" style={{
                color: isDarkMode ? '#9ca3af' : '#6b7280'
              }}>Photography</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-4 py-2 rounded-xl ds-body-base font-medium ds-transition-slow hover:scale-105`}
                style={{
                  background: activeSection === item.href.replace('#', '')
                    ? isDarkMode 
                      ? 'rgba(16, 185, 129, 0.15)' 
                      : 'rgba(16, 185, 129, 0.1)'
                    : 'transparent',
                  color: activeSection === item.href.replace('#', '')
                    ? '#10b981'
                    : isDarkMode ? '#d1d5db' : '#6b7280'
                }}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {toggleTheme && (
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl flex items-center justify-center ds-transition-slow hover:scale-105"
                style={{ 
                  background: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.05)',
                  border: isDarkMode 
                    ? '1px solid rgba(255, 255, 255, 0.1)' 
                    : '1px solid rgba(0, 0, 0, 0.1)'
                }}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>
            )}
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="ds-btn ds-btn-primary ds-btn-sm"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center ds-transition-slow"
            style={{ 
              background: isDarkMode 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(0, 0, 0, 0.05)',
              border: isDarkMode 
                ? '1px solid rgba(255, 255, 255, 0.1)' 
                : '1px solid rgba(0, 0, 0, 0.1)'
            }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" style={{ color: isDarkMode ? '#ffffff' : '#1f2937' }} />
            ) : (
              <Menu className="w-5 h-5" style={{ color: isDarkMode ? '#ffffff' : '#1f2937' }} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden backdrop-blur-lg border-t"
          style={{ 
            background: isDarkMode 
              ? 'rgba(10, 10, 10, 0.95)' 
              : 'rgba(245, 245, 245, 0.95)',
            borderColor: isDarkMode 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleMobileNavClick(e, item.href)}
                className={`block px-4 py-3 rounded-xl ds-body-base font-medium ds-transition-slow`}
                style={{
                  background: activeSection === item.href.replace('#', '')
                    ? isDarkMode 
                      ? 'rgba(16, 185, 129, 0.15)' 
                      : 'rgba(16, 185, 129, 0.1)'
                    : 'transparent',
                  color: activeSection === item.href.replace('#', '')
                    ? '#10b981'
                    : isDarkMode ? '#d1d5db' : '#6b7280'
                }}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 space-y-3">
              {toggleTheme && (
                <button
                  onClick={toggleTheme}
                  className="w-full px-4 py-3 rounded-xl flex items-center justify-center gap-2 ds-transition-slow"
                  style={{ 
                    background: isDarkMode 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : 'rgba(0, 0, 0, 0.05)',
                    border: isDarkMode 
                      ? '1px solid rgba(255, 255, 255, 0.1)' 
                      : '1px solid rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="w-5 h-5 text-yellow-400" />
                      <span className="ds-body-base" style={{ color: isDarkMode ? '#ffffff' : '#1f2937' }}>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5 text-gray-700" />
                      <span className="ds-body-base" style={{ color: isDarkMode ? '#ffffff' : '#1f2937' }}>Dark Mode</span>
                    </>
                  )}
                </button>
              )}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full ds-btn ds-btn-primary ds-btn-md"
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