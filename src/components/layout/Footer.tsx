// src/components/layout/Footer.tsx
import React from 'react';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  isDarkMode?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode = true }) => {
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
      className="border-t ds-border-primary"
      style={{ background: 'var(--color-bg-secondary)' }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-16 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
                style={{
                  background: `linear-gradient(to bottom right, var(--color-brand-primary-light), var(--color-brand-primary))`
                }}
              >
                <span className="text-white font-bold text-xl">Y</span>
              </div>
              <div>
                <span className="ds-heading-4 ds-text-primary">Yaryack</span>
                <p className="ds-body-sm ds-text-tertiary -mt-1">Photography</p>
              </div>
            </div>
            <p className="ds-body-sm ds-text-secondary leading-relaxed">
              Capturing authentic moments and creating timeless memories across Calgary and beyond.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl flex items-center justify-center ds-transition-slow border ds-border-light hover:border-emerald-400"
                  style={{ background: 'var(--color-bg-card)' }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 ds-text-secondary" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className='lg:block hidden'>
            <h3 className="ds-heading-4 ds-text-primary mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="ds-body-sm ds-text-secondary hover:ds-text-primary ds-transition-base inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className='lg:block hidden'>
            <h3 className="ds-heading-4 ds-text-primary mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="ds-body-sm ds-text-secondary hover:ds-text-primary ds-transition-base inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="ds-heading-4 ds-text-primary mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index}>
                  <a
                    href={info.href}
                    className="flex items-start gap-3 group ds-transition-base"
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 ds-transition-slow"
                      style={{
                        background: 'var(--color-bg-card)',
                      }}
                    >
                      <info.icon className="w-4 h-4 ds-text-secondary" />
                    </div>
                    <span className="ds-body-sm ds-text-secondary group-hover:ds-text-primary">
                      {info.text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div 
          className="hidden mb-12 p-6 lg:p-8 rounded-2xl border ds-border-primary"
          style={{ background: 'var(--color-bg-card)' }}
        >
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h3 className="ds-heading-4 ds-text-primary">
              Stay Updated
            </h3>
            <p className="ds-body-base ds-text-secondary">
              Subscribe to our newsletter for photography tips, special offers, and behind-the-scenes content.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 ds-input ds-input-md"
                required
              />
              <button
                type="submit"
                className="ds-btn ds-btn-primary ds-btn-md whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="pt-8 border-t ds-border-primary"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="ds-body-sm ds-text-tertiary text-center md:text-left">
              © {currentYear} Yaryack Photography. All rights reserved.
            </p>
            
            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="ds-body-sm ds-text-tertiary hover:ds-text-primary ds-transition-base"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Made with Love */}
            <div className="flex items-center gap-2">
              <span className="ds-body-sm ds-text-tertiary">Made with</span>
              <Heart 
                className="w-4 h-4 animate-pulse" 
                style={{ 
                  fill: 'var(--color-brand-primary)',
                  color: 'var(--color-brand-primary)'
                }} 
              />
              <span className="ds-body-sm ds-text-tertiary">in Calgary</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};