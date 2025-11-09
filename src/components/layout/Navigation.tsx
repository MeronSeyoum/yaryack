// src/components/layout/Navigation.tsx
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavigationProps {
  isDarkMode?: boolean;
  toggleTheme?: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  isDarkMode = true,
  toggleTheme,
  activeSection,
  setActiveSection,
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

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);
    onNavClick(e, href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ds-transition-slow ${
        isScrolled
          ? 'backdrop-blur-lg shadow-lg'
          : ''
      }`}
      style={{
        background: isScrolled 
          ? 'rgba(0, 0, 0, 0.8)' 
          : 'transparent',
        borderBottom: isScrolled 
          ? '1px solid var(--color-border-primary)' 
          : '1px solid transparent'
      }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => onNavClick(e, '#home')}
            className="flex items-center gap-3 group"
          >
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 ds-transition-slow"
              style={{
                background: `linear-gradient(to bottom right, var(--color-brand-primary-light), var(--color-brand-primary))`
              }}
            >
              <span className="text-white font-bold text-lg">Y</span>
            </div>
            <div className="hidden sm:block">
              <span className="ds-heading-4 ds-text-primary">Yaryack</span>
              <p className="ds-body-sm ds-text-tertiary -mt-1">Photography</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => onNavClick(e, item.href)}
                className={`px-4 py-2 rounded-xl ds-body-base font-medium ds-transition-slow ${
                  activeSection === item.href.replace('#', '')
                    ? 'ds-text-primary'
                    : 'ds-text-tertiary hover:ds-text-primary'
                }`}
                style={{
                  background: activeSection === item.href.replace('#', '')
                    ? 'var(--color-bg-card)'
                    : 'transparent',
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
                className="w-10 h-10 rounded-xl flex items-center justify-center ds-transition-slow border ds-border-light hover:border-emerald-400"
                style={{ background: 'var(--color-bg-card)' }}
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 ds-text-secondary" />
                ) : (
                  <Moon className="w-5 h-5 ds-text-secondary" />
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
            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center ds-transition-slow border ds-border-light"
            style={{ background: 'var(--color-bg-card)' }}
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden backdrop-blur-lg border-t ds-border-primary"
          style={{ background: 'rgba(0, 0, 0, 0.95)' }}
        >
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleMobileNavClick(e, item.href)}
                className={`block px-4 py-3 rounded-xl ds-body-base font-medium ds-transition-slow ${
                  activeSection === item.href.replace('#', '')
                    ? 'ds-text-primary'
                    : 'ds-text-tertiary'
                }`}
                style={{
                  background: activeSection === item.href.replace('#', '')
                    ? 'var(--color-bg-card)'
                    : 'transparent',
                }}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 space-y-3">
              {toggleTheme && (
                <button
                  onClick={toggleTheme}
                  className="w-full px-4 py-3 rounded-xl flex items-center justify-center gap-2 ds-transition-slow border ds-border-light"
                  style={{ background: 'var(--color-bg-card)' }}
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="w-5 h-5" />
                      <span className="ds-body-base ds-text-primary">Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5" />
                      <span className="ds-body-base ds-text-primary">Dark Mode</span>
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