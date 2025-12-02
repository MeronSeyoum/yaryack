// src/components/layout/Navigation.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, Sun, Moon, Camera } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface NavigationProps {
  activeSection?: string;
  onNavClick?: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

interface NavItem {
  name: string;
  href: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '#home', label: 'Navigate to home section' },
  { name: 'About', href: '#about', label: 'Navigate to about section' },
  { name: 'Portfolio', href: '#portfolio', label: 'Navigate to portfolio section' },
  { name: 'Services', href: '#services', label: 'Navigate to services section' },
  { name: 'Contact', href: '#contact', label: 'Navigate to contact section' },
];

const SCROLL_THRESHOLD = 20;

export const Navigation: React.FC<NavigationProps> = ({
  activeSection = 'home',
  onNavClick,
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll detection with throttling
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
      }, 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavClick) {
      onNavClick(e, href);
    } else {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [onNavClick]);

  const handleMobileNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);
    handleNavClick(e, href);
  }, [handleNavClick]);

  const scrollToContact = useCallback(() => {
    const contact = document.getElementById('contact');
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const navBackground = isScrolled 
    ? isDarkMode 
      ? 'rgba(10, 10, 10, 0.95)' 
      : 'rgba(255, 255, 255, 0.95)'
    : 'transparent';

  const borderColor = isScrolled 
    ? isDarkMode
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(0, 0, 0, 0.1)'
    : 'transparent';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : ''
        }`}
        style={{
          background: navBackground,
          borderBottom: `1px solid ${borderColor}`,
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-2 lg:gap-3 group flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              style={{ 
                focusRingColor: 'var(--color-brand-primary)',
                outline: 'none',
              }}
              aria-label="Yaryack Photography - Go to home"
            >
              <div 
                className="w-10 h-10 lg:w-11 lg:h-11 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200"
                style={{
                  background: 'linear-gradient(135deg, var(--color-brand-primary-light), var(--color-brand-primary))',
                  boxShadow: '0 4px 12px rgba(6, 95, 70, 0.3)',
                }}
              >
                <Camera className="w-5 h-5 lg:w-6 lg:h-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <span 
                  className="text-lg lg:text-xl font-bold block leading-tight"
                  style={{ 
                    color: isDarkMode ? 'var(--color-brand-secondary)' : 'rgba(0, 0, 0, 0.6)',
                    textShadow: isDarkMode 
                      ? '0 0 20px rgba(6, 95, 70, 0.4)' 
                      : '0 0 10px rgba(10, 92, 46, 0.2)',
                  }}
                >
                  Yaryack
                </span>
                <p 
                  className="text-xs lg:text-sm font-medium"
                  style={{ 
                    color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                  }}
                >
                  Photography
                </p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="relative px-4 py-2 rounded-xl font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{
                      color: isActive 
                        ? '#ffffff'
                        : 'var(--color-text-primary)',
                      background: isActive 
                        ? isDarkMode 
                          ? 'linear-gradient(135deg, rgba(6, 95, 70, 0.6), rgba(16, 185, 129, 0.4))'
                          : 'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-primary-light))'
                        : 'transparent',
                      boxShadow: isActive 
                        ? '0 4px 12px rgba(6, 95, 70, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1)' 
                        : 'none',
                    }}
                    aria-label={item.label}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.name}
                    {isActive && (
                      <span 
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 rounded-full"
                        style={{ 
                          background: isDarkMode ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                        }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ 
                  background: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.05)',
                  border: isDarkMode 
                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                    : '1px solid rgba(0, 0, 0, 0.1)',
                }}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-300" aria-hidden="true" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-600" aria-hidden="true" />
                )}
              </button>
              <button
                onClick={scrollToContact}
                className="px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-primary-dark))',
                  color: '#ffffff',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                }}
                aria-label="Book photography session"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2"
                style={{ 
                  background: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.05)',
                  border: isDarkMode 
                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                    : '1px solid rgba(0, 0, 0, 0.1)',
                }}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-300" aria-hidden="true" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-600" aria-hidden="true" />
                )}
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2"
                style={{ 
                  background: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.05)',
                  border: isDarkMode 
                    ? '1px solid rgba(255, 255, 255, 0.2)' 
                    : '1px solid rgba(0, 0, 0, 0.1)',
                }}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" style={{ color: 'var(--color-text-primary)' }} aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5" style={{ color: 'var(--color-text-primary)' }} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-menu"
            className="fixed top-16 left-0 right-0 bottom-0 z-40 lg:hidden overflow-y-auto"
            style={{ 
              background: isDarkMode 
                ? 'rgba(10, 10, 10, 0.98)' 
                : 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(16px)',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <nav className="px-4 py-6 space-y-2" aria-label="Mobile">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleMobileNavClick(e, item.href)}
                    className="block px-4 py-3 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2"
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
                    aria-label={item.label}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                );
              })}
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToContact();
                  }}
                  className="w-full px-5 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-primary-dark))',
                    color: '#ffffff',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                  }}
                  aria-label="Book photography session"
                >
                  Book Now
                </button>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};