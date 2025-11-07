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

  const socialMedia = [
    { icon: Instagram, label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: Facebook, label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: Twitter, label: 'Twitter', color: 'hover:text-sky-500' }
  ];

  const contactInfo = [
    { icon: Mail, text: 'hello@yaryackphotography.ca' },
    { icon: Phone, text: '+1 (587) 123-4567' },
    { icon: MapPin, text: 'Calgary, Alberta' }
  ];

  const baseClasses = {
    bg: isDarkMode 
      ? 'bg-gradient-to-b from-gray-900 to-black border-white/10' 
      : 'bg-gradient-to-b from-gray-50 to-white border-gray-200',
    text: {
      primary: isDarkMode ? 'text-white' : 'text-gray-900',
      secondary: isDarkMode ? 'text-gray-400' : 'text-gray-600',
      muted: isDarkMode ? 'text-gray-500' : 'text-gray-400'
    },
    border: isDarkMode ? 'border-white/10' : 'border-gray-200',
    button: isDarkMode 
      ? 'bg-black/50 border-white/10' 
      : 'bg-white border-gray-300'
  };

  return (
    <footer className={`border-t py-12 ${baseClasses.bg}`}>
      <div className="px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Brand & Contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg">Yaryack</div>
                <div className={`text-sm ${baseClasses.text.muted}`}>Photography</div>
              </div>
            </div>

            <p className={`text-sm leading-relaxed max-w-md ${baseClasses.text.secondary}`}>
              Capturing authentic moments and creating timeless memories through professional photography in Calgary.
            </p>

            <div className="space-y-2">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <item.icon className={`w-4 h-4 ${baseClasses.text.muted}`} />
                  <span className={`text-sm ${baseClasses.text.secondary}`}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`font-semibold mb-4 ${baseClasses.text.primary}`}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`text-sm transition-colors duration-200 ${baseClasses.text.secondary} hover:text-orange-500`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social & CTA */}
        <div className={`border-t pt-6 mb-6 ${baseClasses.border}`}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-3">
              {socialMedia.map(({ icon: Icon, label, color }) => (
                <button
                  key={label}
                  className={`w-8 h-8 border rounded-lg flex items-center justify-center transition-all duration-200 hover:border-orange-500 ${baseClasses.button}`}
                  aria-label={label}
                >
                  <Icon className={`w-4 h-4 ${baseClasses.text.muted} ${color}`} />
                </button>
              ))}
            </div>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
            >
              Start Your Project
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 ${baseClasses.border}`}>
          <p className={`text-sm ${baseClasses.text.muted}`}>
            © {currentYear} Yaryack Photography. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className={`flex items-center gap-2 text-sm transition-colors duration-200 ${baseClasses.text.muted} hover:text-orange-500`}
          >
            Back to Top
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};