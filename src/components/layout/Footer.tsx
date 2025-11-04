// src/components/layout/Footer.tsx
import React from 'react';
import { Camera, Instagram, Facebook, Twitter, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  isDarkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDarkMode }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    'Portrait Photography',
    'Event Photography', 
    'Wedding Photography',
    'Maternity Shoots',
    'Engagement Sessions',
    'Commercial Photography'
  ];

  const socialMedia = [
    { icon: Instagram, label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: Facebook, label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: Twitter, label: 'Twitter', color: 'hover:text-sky-500' }
  ];

  return (
    <footer className={`border-t py-12 sm:py-16 lg:py-20 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-gray-900 to-black border-white/10' 
        : 'bg-gradient-to-b from-gray-50 to-white border-gray-200'
    }`}>
      <div className=" px-4 sm:px-6 lg:px-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8 lg:mb-12">
          {/* Left Column - Brand & Description */}
          <div className="space-y-6">
            {/* Brand */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                <div className="font-bold text-xl">Yaryack</div>
                <div className={`text-sm -mt-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>Photography</div>
              </div>
            </div>

            {/* Description */}
            <p className={`text-sm sm:text-base leading-relaxed max-w-md ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Capturing authentic moments and creating timeless memories through professional photography 
              services in Calgary. Let's tell your story together.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 group">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300 ${
                  isDarkMode ? 'bg-orange-500/20' : 'bg-orange-500/10'
                }`}>
                  <Mail className={`w-3 h-3 transition-colors duration-300 ${
                    isDarkMode 
                      ? 'text-orange-500 group-hover:text-white' 
                      : 'text-orange-600 group-hover:text-white'
                  }`} />
                </div>
                <span className={`text-sm transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-gray-400 group-hover:text-white' 
                    : 'text-gray-600 group-hover:text-gray-900'
                }`}>
                  hello@yaryackphotography.ca
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300 ${
                  isDarkMode ? 'bg-orange-500/20' : 'bg-orange-500/10'
                }`}>
                  <Phone className={`w-3 h-3 transition-colors duration-300 ${
                    isDarkMode 
                      ? 'text-orange-500 group-hover:text-white' 
                      : 'text-orange-600 group-hover:text-white'
                  }`} />
                </div>
                <span className={`text-sm transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-gray-400 group-hover:text-white' 
                    : 'text-gray-600 group-hover:text-gray-900'
                }`}>
                  +1 (587) 123-4567
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300 ${
                  isDarkMode ? 'bg-orange-500/20' : 'bg-orange-500/10'
                }`}>
                  <MapPin className={`w-3 h-3 transition-colors duration-300 ${
                    isDarkMode 
                      ? 'text-orange-500 group-hover:text-white' 
                      : 'text-orange-600 group-hover:text-white'
                  }`} />
                </div>
                <span className={`text-sm transition-colors duration-300 ${
                  isDarkMode 
                    ? 'text-gray-400 group-hover:text-white' 
                    : 'text-gray-600 group-hover:text-gray-900'
                }`}>
                  Calgary, Alberta
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Quick Links */}
            <div>
              <h3 className={`font-semibold text-lg mb-4 flex items-center gap-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                Navigation
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`text-sm transition-all duration-300 flex items-center gap-2 group ${
                        isDarkMode
                          ? 'text-gray-400 hover:text-orange-500'
                          : 'text-gray-600 hover:text-orange-500'
                      }`}
                    >
                      <div className={`w-1 h-1 rounded-full group-hover:bg-orange-500 group-hover:scale-150 transition-all duration-300 ${
                        isDarkMode ? 'bg-gray-600' : 'bg-gray-400'
                      }`}></div>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className={`font-semibold text-lg mb-4 flex items-center gap-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                Services
              </h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <span className={`text-sm transition-colors duration-300 cursor-default flex items-center gap-2 group ${
                      isDarkMode
                        ? 'text-gray-400 hover:text-orange-500'
                        : 'text-gray-600 hover:text-orange-500'
                    }`}>
                      <div className={`w-1 h-1 rounded-full group-hover:bg-orange-500 transition-colors duration-300 ${
                        isDarkMode ? 'bg-gray-600' : 'bg-gray-400'
                      }`}></div>
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media & CTA */}
        <div className={`border-t pt-8 lg:pt-12 mb-8 ${
          isDarkMode ? 'border-white/10' : 'border-gray-200'
        }`}>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Social Media */}
            <div className="text-center lg:text-left">
              <h4 className={`font-semibold mb-4 text-sm uppercase tracking-wider ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Follow My Journey
              </h4>
              <div className="flex gap-3 justify-center lg:justify-start">
                {socialMedia.map(({ icon: Icon, label, color }) => (
                  <button
                    key={label}
                    className={`w-10 h-10 backdrop-blur-sm border rounded-xl flex items-center justify-center hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 group ${
                      isDarkMode
                        ? 'bg-black/50 border-white/10'
                        : 'bg-white border-gray-300'
                    }`}
                    aria-label={label}
                  >
                    <Icon className={`w-4 h-4 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    } ${color}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Start Your Project
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t pt-8 flex flex-col lg:flex-row justify-between items-center gap-4 ${
          isDarkMode ? 'border-white/10' : 'border-gray-200'
        }`}>
          {/* Copyright */}
          <div className="flex items-center gap-4">
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              © {currentYear} Yaryack Photography. All rights reserved.
            </p>
            <div className="hidden sm:flex gap-4">
              <a href="#" className={`text-xs transition-colors duration-200 ${
                isDarkMode
                  ? 'text-gray-500 hover:text-orange-500'
                  : 'text-gray-400 hover:text-orange-500'
              }`}>
                Privacy Policy
              </a>
              <a href="#" className={`text-xs transition-colors duration-200 ${
                isDarkMode
                  ? 'text-gray-500 hover:text-orange-500'
                  : 'text-gray-400 hover:text-orange-500'
              }`}>
                Terms of Service
              </a>
            </div>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className={`flex items-center gap-2 transition-colors duration-200 group ${
              isDarkMode ? 'text-gray-400 hover:text-orange-500' : 'text-gray-500 hover:text-orange-500'
            }`}
          >
            <span className="text-sm">Back to Top</span>
            <div className={`w-8 h-8 border rounded-lg flex items-center justify-center group-hover:border-orange-500 group-hover:bg-orange-500/10 transition-all duration-300 ${
              isDarkMode
                ? 'bg-black/50 border-white/10'
                : 'bg-white border-gray-300'
            }`}>
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>

        {/* Mobile Legal Links */}
        <div className={`sm:hidden flex justify-center gap-6 mt-6 pt-6 ${
          isDarkMode ? 'border-t border-white/5' : 'border-t border-gray-200'
        }`}>
          <a href="#" className={`text-xs transition-colors duration-200 ${
            isDarkMode
              ? 'text-gray-500 hover:text-orange-500'
              : 'text-gray-400 hover:text-orange-500'
          }`}>
            Privacy Policy
          </a>
          <a href="#" className={`text-xs transition-colors duration-200 ${
            isDarkMode
              ? 'text-gray-500 hover:text-orange-500'
              : 'text-gray-400 hover:text-orange-500'
          }`}>
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};