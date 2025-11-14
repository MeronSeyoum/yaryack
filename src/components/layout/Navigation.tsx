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
      className={`fixed top-0 left-0 right-0 z-50    ds-transition-slow ${
        isScrolled ? 'shadow-lg' : ''
      }`}
      style={{
        background: isScrolled 
          ? isDarkMode 
            ? 'rgba(10, 10, 10, 0.90)' 
            : 'rgba(255, 255, 255, 0.90)'
          : 'transparent',
        borderBottom: isScrolled 
          ? isDarkMode
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(0, 0, 0, 0.1)'
          : '1px solid transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 lg:border-b  ds-border-primary">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 lg:gap-3 group flex-shrink-0"
          >
            <div 
              className="w-10 h-10 lg:w-11 lg:h-11 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 ds-transition-slow"
              style={{
                background: `linear-gradient(to bottom right, var(--color-brand-primary-light), var(--color-brand-primary))`,
                boxShadow: '0 4px 12px rgba(6, 95, 70, 0.3)',
              }}
            >
              <Camera className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div>
              <span 
                className="ds-body-lg lg:ds-heading-4 font-bold block"
                style={{ 
                  color: 'var(--color-brand-primary)',
                  textShadow: isDarkMode 
                    ? '0 0 20px rgba(6, 95, 70, 0.4)' 
                    : '0 0 10px rgba(10, 92, 46, 0.2)',
                }}
              >
                Yaryack
              </span>
              <p 
                className="ds-body-xs lg:ds-body-sm -mt-0.5 lg:-mt-1 font-medium ds-text-secondary"
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
                  className="px-4 py-2 rounded-xl ds-body-base font-semibold ds-transition-slow hover:scale-105"
                  style={{
                    color: isActive 
                      ? 'var(--color-brand-primary)' 
                      : 'var(--color-text-primary)',
                    background: isActive 
                      ? isDarkMode 
                        ? 'rgba(6, 95, 70, 0.2)' 
                        : 'rgba(10, 92, 46, 0.1)'
                      : 'transparent',
                    textShadow: isActive 
                      ? '0 0 10px rgba(6, 95, 70, 0.3)' 
                      : 'none',
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
                  border: isDarkMode 
                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                    : '1px solid rgba(0, 0, 0, 0.1)',
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

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            {toggleTheme && (
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-lg flex items-center justify-center ds-transition-slow"
                style={{ 
                  background: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.05)',
                  border: isDarkMode 
                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                    : '1px solid rgba(0, 0, 0, 0.1)',
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
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 rounded-lg flex items-center justify-center ds-transition-slow"
              style={{ 
                background: isDarkMode 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(0, 0, 0, 0.05)',
                border: isDarkMode 
                  ? '1px solid rgba(255, 255, 255, 0.2)' 
                  : '1px solid rgba(0, 0, 0, 0.1)',
              }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 ds-text-primary" />
              ) : (
                <Menu className="w-5 h-5 ds-text-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden"
          style={{ 
            background: isDarkMode 
              ? 'rgba(10, 10, 10, 0.95)' 
              : 'rgba(255, 255, 255, 0.95)',
            borderTop: isDarkMode
              ? '1px solid rgba(255, 255, 255, 0.1)' 
              : '1px solid rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(12px)',
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
                  className="block px-4 py-3 rounded-xl ds-body-base font-semibold ds-transition-slow"
                  style={{
                    color: isActive 
                      ? 'var(--color-brand-primary)' 
                      : 'var(--color-text-primary)',
                    background: isActive 
                      ? isDarkMode 
                        ? 'rgba(6, 95, 70, 0.2)' 
                        : 'rgba(10, 92, 46, 0.1)'
                      : 'transparent',
                    textShadow: isActive 
                      ? '0 0 10px rgba(6, 95, 70, 0.3)' 
                      : 'none',
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