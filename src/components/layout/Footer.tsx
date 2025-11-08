// src/components/layout/Footer.tsx
import React from 'react';
import { Camera, Instagram, Facebook, Twitter, Mail, Phone, MapPin, ArrowUp, Clock } from 'lucide-react';

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
      ? 'bg-gradient-to-b from-emerald-900 to-emerald-950 border-emerald-500/20' 
      : 'bg-gradient-to-b from-gray-50 to-white border-gray-200',
    text: {
      primary: isDarkMode ? 'text-white' : 'text-gray-900',
      secondary: isDarkMode ? 'text-white/80' : 'text-gray-600',
      muted: isDarkMode ? 'text-white/60' : 'text-gray-400'
    },
    border: isDarkMode ? 'border-emerald-500/20' : 'border-gray-200',
    button: isDarkMode 
      ? 'bg-emerald-900/50 border-emerald-500/20' 
      : 'bg-white border-gray-300'
  };

  return (
    <footer className={`border-t py-12 ${baseClasses.bg}`}>
      <div className="px-4 sm:px-6 lg:px-16 mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Brand & Contact - Takes more space */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg text-white">Yaryack</div>
                <div className={`text-sm ${baseClasses.text.muted}`}>Photography</div>
              </div>
            </div>

            <p className={`text-sm leading-relaxed max-w-md ${baseClasses.text.secondary}`}>
              Capturing authentic moments and creating timeless memories through professional photography in Calgary.
            </p>

            {/* Contact Info - Horizontal layout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <item.icon className={`w-4 h-4 ${baseClasses.text.muted}`} />
                  <span className={`text-sm ${baseClasses.text.secondary}`}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links - Centered */}
          <div className="lg:col-span-3">
            <h3 className={`font-semibold mb-4 ${baseClasses.text.primary}`}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`text-sm transition-colors duration-200 ${baseClasses.text.secondary} hover:text-emerald-400 block py-1`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours & Quick Response - Side by side on larger screens */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {/* Quick Response */}
              <div className="backdrop-blur-sm border border-emerald-500/20 p-4 rounded-lg bg-emerald-900/40">
                <div className="text-center">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <h4 className={`text-sm font-semibold mb-1 ${baseClasses.text.primary}`}>
                    Quick Response
                  </h4>
                  <p className={`text-xs leading-relaxed mb-2 ${baseClasses.text.secondary}`}>
                    I respond within 2-4 hours on business days.
                  </p>
                  <div className="text-emerald-400 text-xs font-medium">
                    Response: 2-4 hours
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="backdrop-blur-sm border border-emerald-500/20 p-4 rounded-lg bg-emerald-900/40">
                <div className="text-center">
                  <h4 className={`text-sm font-semibold mb-2 ${baseClasses.text.primary}`}>
                    Business Hours
                  </h4>
                  <div className="space-y-1 text-xs">
                    <div className={`flex justify-between ${baseClasses.text.secondary}`}>
                      <span>Mon - Fri</span>
                      <span className="text-emerald-400">9AM - 6PM</span>
                    </div>
                    <div className={`flex justify-between ${baseClasses.text.secondary}`}>
                      <span>Saturday</span>
                      <span className="text-emerald-400">10AM - 4PM</span>
                    </div>
                    <div className={`flex justify-between ${baseClasses.text.secondary}`}>
                      <span>Sunday</span>
                      <span className="text-emerald-400">Appointment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social & CTA */}
        <div className={`border-t pt-6 mb-6 ${baseClasses.border}`}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <span className={`text-sm ${baseClasses.text.secondary}`}>
                Follow my work:
              </span>
              <div className="flex gap-2">
                {socialMedia.map(({ icon: Icon, label, color }) => (
                  <button
                    key={label}
                    className={`w-8 h-8 border rounded-lg flex items-center justify-center transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-500/10 ${baseClasses.button}`}
                    aria-label={label}
                  >
                    <Icon className={`w-4 h-4 ${baseClasses.text.muted} ${color}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className={`text-sm ${baseClasses.text.secondary} hidden sm:block`}>
                Ready to create something amazing?
              </span>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
              >
                Start Your Project
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 ${baseClasses.border}`}>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
            <p className={`text-sm ${baseClasses.text.muted}`}>
              © {currentYear} Yaryack Photography. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <a href="#" className={`${baseClasses.text.muted} hover:text-emerald-400 transition-colors`}>
                Privacy Policy
              </a>
              <a href="#" className={`${baseClasses.text.muted} hover:text-emerald-400 transition-colors`}>
                Terms of Service
              </a>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className={`flex items-center gap-2 text-sm transition-all duration-200 ${baseClasses.text.muted} hover:text-emerald-400 hover:scale-105`}
          >
            Back to Top
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};