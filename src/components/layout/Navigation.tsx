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

  return (
    <>
      <nav
        className={`fixed  top-0 left-0 right-0 z-50  ds-transition-slow ${
          isScrolled ? 'shadow-lg' : ''
        }`}
        style={{
          background: isScrolled 
            ? 'var(--color-bg-card)' 
            : 'transparent',
          borderBottom: isScrolled 
            ? '1px solid var(--color-border-light)' 
            : '1px solid transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-16 ">
          <div className="flex items-center justify-between h-12 lg:h-20">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex  ds-btn-primary items-center gap-2 lg:gap-3 group px-3 py-0.5 rounded-lg flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 ds-transition-base hover:scale-[1.02]"
              style={{ 
                // background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-primary-dark))',
                // boxShadow: 'var(--shadow-md)',
                // focusRingColor: 'var(--color-brand-primary)',
              }}
              aria-label="Yaryack Photography - Go to home"
            >
              <Camera className="w-5 h-5 lg:w-7 lg:h-7 text-white flex-shrink-0" aria-hidden="true" />
              <div className="leading-tight">
                <span 
                  className="text-lg lg:text-2xl font-bold block text-white tracking-wide"
                  style={{ 
                    fontFamily: '"Brush Script MT", cursive',
                  }}
                >
                  Yaryack
                </span>
                <span 
                  className="text-[10px] lg:text-xs font-medium block text-right text-white/90 -mt-2"
                  style={{ 
                    fontFamily: '"Brush Script MT", cursive',
                  }}
                >
                  Photography
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 " aria-label="Primary">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative px-4 py-2 rounded-lg font-semibold ds-transition-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      isActive ? '' : 'ds-text-primary hover:bg-opacity-10'
                    }`}
                    style={{
                      color: isActive ? '#ffffff' : undefined,
                      background: isActive 
                        ? 'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-primary-dark))'
                        : 'transparent',
                      boxShadow: isActive ? 'var(--shadow-md)' : 'none',
                      '--focus-ring-color': 'var(--color-brand-primary)',
                    } as React.CSSProperties}
                    aria-label={item.label}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex  items-center gap-3">
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-lg flex items-center justify-center ds-transition-base hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ds-card"
                style={{ 
                  '--focus-ring-color': 'var(--color-brand-primary)',
                } as React.CSSProperties}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" style={{ color: 'var(--color-brand-secondary)' }} aria-hidden="true" />
                ) : (
                  <Moon className="w-5 h-5" style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
                )}
              </button>
              <button
                onClick={scrollToContact}
                className="ds-btn ds-btn-primary ds-btn-md"
                aria-label="Book photography session"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center  gap-2">
              <button
                onClick={toggleTheme}
                className="w-9 h-9  rounded-lg flex items-center justify-center ds-transition-base hover:scale-105 focus:outline-none focus:ring-2 ds-card"
                style={{ 
                  focusRingColor: 'var(--color-brand-primary)',
                }}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4" style={{ color: 'var(--color-brand-secondary)' }} aria-hidden="true" />
                ) : (
                  <Moon className="w-4 h-4" style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
                )}
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-9 h-9 rounded-lg flex items-center justify-center ds-transition-base hover:scale-105 focus:outline-none focus:ring-2 ds-card"
                style={{ 
                  '--focus-ring-color': 'var(--color-brand-primary)',
                } as React.CSSProperties}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4 ds-text-primary" aria-hidden="true" />
                ) : (
                  <Menu className="w-4 h-4 ds-text-primary" aria-hidden="true" />
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
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: 'var(--color-overlay-heavy)' }}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-menu"
            className="fixed top-16 left-0 right-0 bottom-0 z-40 lg:hidden overflow-y-auto"
            style={{ 
              background: 'var(--color-bg-primary)',
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
                    className={`block px-4 py-3 rounded-lg font-semibold ds-transition-base focus:outline-none focus:ring-2 ${
                      isActive ? '' : 'ds-text-primary'
                    }`}
                    style={{
                      color: isActive ? '#ffffff' : undefined,
                      background: isActive 
                        ? 'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-primary-dark))'
                        : 'transparent',
                      '--focus-ring-color': 'var(--color-brand-primary)',
                    } as React.CSSProperties}
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
                  className="w-full ds-btn ds-btn-primary ds-btn-md"
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