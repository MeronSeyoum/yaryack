// src/components/layout/Footer.tsx
import React from 'react';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin, Heart, Camera } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About', href: '#about' },
      { name: 'Portfolio', href: '#portfolio' },
      { name: 'Services', href: '#services' },
      { name: 'Contact', href: '#contact' },
    ],
    services: [
      { name: 'Portrait Sessions', href: '#services' },
      { name: 'Event Photography', href: '#services' },
      { name: 'Wedding Packages', href: '#services' },
      { name: 'Commercial Work', href: '#services' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],
  };

  const contactInfo = [
    { icon: Mail, text: 'hello@yaryackphotography.ca', href: 'mailto:hello@yaryackphotography.ca' },
    { icon: Phone, text: '+1 (403) 561-9596', href: 'tel:+14035619596' },
    { icon: MapPin, text: 'Calgary, Alberta', href: '#' },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/yaryack_photos', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100064125130777', label: 'Facebook' },
    { icon: Youtube, href: 'https://www.youtube.com/@yaryackvideoproduction1626', label: 'Youtube' },
  ];

  return (
    <footer 
      className="border-t"
      style={{ 
        background: 'var(--color-bg-secondary)',
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-16 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, var(--color-brand-primary-light), var(--color-brand-primary))',
                  boxShadow: '0 2px 8px rgba(6, 95, 70, 0.25)',
                }}
              >
                <Camera className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div className="leading-tight">
                <span 
                  className="text-lg font-bold block tracking-wide"
                  style={{ 
                    color: isDarkMode ? '#ffffff' : '#111827',
                    fontFamily: '"Brush Script MT", cursive',
                  }}
                >
                  Yaryack
                </span>
                <span 
                  className="text-[10px] font-medium block text-right -mt-1"
                  style={{ 
                    color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                    fontFamily: '"Brush Script MT", cursive',
                  }}
                >
                  Photography
                </span>
              </div>
            </div>
            <p 
              className="text-sm leading-relaxed"
              style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)' }}
            >
              Capturing authentic moments and creating timeless memories across Calgary and beyond.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2"
                  style={{ 
                    background: isDarkMode 
                      ? 'rgba(6, 95, 70, 0.15)' 
                      : 'rgba(6, 95, 70, 0.08)',
                    border: '1px solid var(--color-brand-primary)',
                  }}
                  aria-label={social.label}
                >
                  <social.icon 
                    className="w-5 h-5" 
                    style={{ color: 'var(--color-brand-primary)' }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className='lg:block hidden'>
            <h3 
              className="text-base font-semibold mb-4"
              style={{ color: isDarkMode ? '#ffffff' : '#111827' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm inline-block transition-colors duration-200"
                    style={{ 
                      color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-brand-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)';
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className='lg:block hidden'>
            <h3 
              className="text-base font-semibold mb-4"
              style={{ color: isDarkMode ? '#ffffff' : '#111827' }}
            >
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm inline-block transition-colors duration-200"
                    style={{ 
                      color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--color-brand-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)';
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 
              className="text-base font-semibold mb-4"
              style={{ color: isDarkMode ? '#ffffff' : '#111827' }}
            >
              Get in Touch
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index}>
                  <a
                    href={info.href}
                    className="flex items-start gap-3 group transition-all duration-200"
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200"
                      style={{
                        background: isDarkMode 
                          ? 'rgba(6, 95, 70, 0.15)' 
                          : 'rgba(6, 95, 70, 0.08)',
                        border: '1px solid var(--color-brand-primary)',
                      }}
                    >
                      <info.icon 
                        className="w-4 h-4" 
                        style={{ color: 'var(--color-brand-primary)' }}
                      />
                    </div>
                    <span 
                      className="text-sm transition-colors duration-200"
                      style={{ 
                        color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                      }}
                    >
                      {info.text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="pt-8 border-t"
          style={{
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p 
              className="text-sm text-center md:text-left"
              style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)' }}
            >
              © {currentYear} Yaryack Photography. All rights reserved.
            </p>
            
            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm transition-colors duration-200"
                  style={{ 
                    color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-brand-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Made with Love */}
            <div className="flex items-center gap-2">
              <span 
                className="text-sm"
                style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)' }}
              >
                Made with
              </span>
              <Heart 
                className="w-4 h-4 animate-pulse" 
                style={{ 
                  fill: 'var(--color-brand-primary)',
                  color: 'var(--color-brand-primary)'
                }} 
              />
              <span 
                className="text-sm"
                style={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)' }}
              >
                in Calgary by
              </span>
              <a
                href="https://github.com/meryato"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold transition-colors duration-200"
                style={{ 
                  color: 'var(--color-brand-primary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isDarkMode ? '#ffffff' : '#111827';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-brand-primary)';
                }}
              >
                Meryato
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};