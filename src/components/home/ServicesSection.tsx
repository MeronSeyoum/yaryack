// src/components/home/ServicesSection.tsx
import React from 'react';
import { Calendar, CheckCircle, Clock, Users, Camera, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { SERVICES, PROCESS_STEPS } from '../../constants';
import type { ThemeClasses } from '../../types';

interface ServicesSectionProps {
  themeClasses: ThemeClasses;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ themeClasses }) => {
  const serviceIcons = [Camera, Users, Star];

  // Determine if we're in dark mode
  const isDarkMode = themeClasses.bg.primary.includes('black') || 
                    themeClasses.bg.primary.includes('gray-900') ||
                    themeClasses.bg.primary.includes('gray-800') ||
                    themeClasses.text.primary.includes('white');

  return (
    <section id="services" className={`border-t ${themeClasses.border}`}>
      <div className="mx-auto">
        {/* Section Header - Compact */}
        <div className={`p-3 sm:p-4 border-b ${themeClasses.border}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-wider`}>
                Services
              </p>
            </div>
            <h2 className={`text-xl sm:text-2xl font-light ${themeClasses.text.primary}`}>
              What I Offer
            </h2>
          </div>
        </div>
      </div>

      <div className="mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Services Section */}
        <div className="mb-8 sm:mb-12">
          {/* Services Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h3 className={`text-xl sm:text-2xl font-light mb-3 ${themeClasses.text.primary}`}>
              Professional
              <span className="font-medium bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent"> Photography </span>
              Packages
            </h3>
            <p className={`text-xs sm:text-sm max-w-xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Tailored photography experiences designed to capture your unique story
            </p>
          </div>

          {/* Services Grid - Compact */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {SERVICES.map((service, idx) => {
              const IconComponent = serviceIcons[idx] || Camera;
              return (
                <div
                  key={idx}
                  className={`group relative backdrop-blur-sm border rounded-xl p-4 sm:p-6 transition-all duration-500 hover:shadow-lg ${
                    isDarkMode
                      ? 'bg-gradient-to-b from-gray-900/50 to-black/30 border-white/30 hover:border-orange-500/30 hover:shadow-orange-500/10'
                      : 'bg-gradient-to-b from-white to-gray-50 border-gray-200 hover:border-orange-500/50 hover:shadow-orange-500/5'
                  }`}
                >
                  {/* Popular Badge */}
                  {idx === 1 && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                        Popular
                      </div>
                    </div>
                  )}

                  {/* Service Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Service Name */}
                  <h3 className={`text-lg sm:text-xl font-semibold text-center mb-3 ${
                    themeClasses.text.primary
                  }`}>
                    {service.name}
                  </h3>

                  {/* Price */}
                  <div className="text-center mb-4">
                    <div className="text-2xl sm:text-3xl font-bold text-orange-500 mb-1">
                      {service.price}
                    </div>
                    <p className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      All inclusive
                    </p>
                  </div>

                  {/* Features List - Compact */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-2.5 h-2.5 text-green-400" />
                        </div>
                        <span className={`text-xs leading-relaxed ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`w-full group relative overflow-hidden text-sm ${
                      idx === 1 
                        ? 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 border-0' 
                        : `${
                            isDarkMode 
                              ? 'bg-transparent border border-orange-500/30 text-orange-500 hover:bg-orange-500/10'
                              : 'bg-transparent border border-orange-500 text-orange-600 hover:bg-orange-500/10'
                          }`
                    } transition-all duration-300`}
                  >
                    <span className="flex items-center justify-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Book {service.name}
                    </span>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Section */}
        <div className={`border-t pt-8 sm:pt-12 lg:px-16 ${
          isDarkMode ? 'border-white/10' : 'border-gray-200'
        }`}>
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <Clock className="w-3 h-3 text-white" />
              </div>
              <h3 className={`text-lg sm:text-xl font-semibold ${themeClasses.text.primary}`}>
                My Process
              </h3>
            </div>
            <p className={`text-xs sm:text-sm max-w-xl mx-auto ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              A streamlined approach for seamless photography experiences
            </p>
          </div>

          {/* Process Steps Grid - Compact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {PROCESS_STEPS.map((step, idx) => (
              <div 
                key={idx}
                className={`group relative backdrop-blur-sm border rounded-xl p-4 sm:p-6 transition-all duration-500 ${
                  isDarkMode
                    ? 'bg-gradient-to-b from-gray-900/30 to-black/20 border-white/25 hover:border-orange-500/20'
                    : 'bg-gradient-to-b from-white to-gray-50 border-gray-200 hover:border-orange-500/30'
                }`}
              >
                {/* Step Number */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                    <span className="text-white font-bold text-sm">{step.number}</span>
                  </div>
                  <div className={`h-6 w-px bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-60 ${
                    isDarkMode ? '' : 'via-orange-400'
                  }`}></div>
                </div>

                {/* Step Content */}
                <div>
                  <h4 className={`text-base font-semibold mb-2 group-hover:text-orange-500 transition-colors duration-300 ${
                    themeClasses.text.primary
                  }`}>
                    {step.title}
                  </h4>
                  <p className={`text-xs leading-relaxed ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {step.description}
                  </p>
                </div>

                {/* Connecting Line - Desktop */}
                {idx < PROCESS_STEPS.length - 1 && (
                  <>
                    <div className={`hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-orange-500 to-transparent ${
                      isDarkMode ? '' : 'from-orange-400'
                    }`}></div>
                    <div className={`hidden lg:block absolute top-1/2 -right-3 w-1.5 h-1.5 rounded-full transform -translate-y-1/2 ${
                      isDarkMode ? 'bg-orange-500' : 'bg-orange-400'
                    }`}></div>
                  </>
                )}
              </div>
            ))}
          </div>

        
        </div>
      </div>
    </section>
  );
};