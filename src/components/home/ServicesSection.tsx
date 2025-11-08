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

  return (
    <section id="services" className="border-t border-emerald-500/20" style={{
      background: 'linear-gradient(to bottom, rgba(6, 78, 59, 0.95) 0%, rgba(4, 47, 46, 0.98) 100%)'
    }}>
      <div className="mx-auto">
        {/* Section Header - Compact */}
        <div className="p-3 sm:p-4 border-b border-emerald-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 bg-emerald-400 rounded-full"></div>
              <p className="text-xs text-white/80 uppercase tracking-wider">
                Services
              </p>
            </div>
            <h2 className="text-xl sm:text-2xl font-light text-white">
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
            <h3 className="text-xl sm:text-2xl font-light mb-3 text-white">
              Professional
              <span className="font-medium bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> Photography </span>
              Packages
            </h3>
            <p className="text-xs sm:text-sm max-w-xl mx-auto leading-relaxed text-white/80">
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
                  className="group relative backdrop-blur-sm border border-emerald-500/20 rounded-xl p-4 sm:p-6 transition-all duration-500 hover:shadow-lg bg-emerald-900/40 hover:border-emerald-400/50 hover:shadow-emerald-500/10"
                >
                  {/* Popular Badge */}
                  {idx === 1 && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                        Popular
                      </div>
                    </div>
                  )}

                  {/* Service Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Service Name */}
                  <h3 className="text-lg sm:text-xl font-semibold text-center mb-3 text-white">
                    {service.name}
                  </h3>

                  {/* Price */}
                  <div className="text-center mb-4">
                    <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">
                      {service.price}
                    </div>
                    <p className="text-xs text-white/80">
                      All inclusive
                    </p>
                  </div>

                  {/* Features List - Compact */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-2.5 h-2.5 text-emerald-400" />
                        </div>
                        <span className="text-xs leading-relaxed text-white/90">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`w-full group relative overflow-hidden text-sm transition-all duration-300 ${
                      idx === 1 
                        ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 border-0' 
                        : 'bg-transparent border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                    }`}
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

        {/* Process Section - Hidden on Mobile */}
        <div className="hidden lg:block border-t border-emerald-500/20 pt-8 sm:pt-12 lg:px-16">
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                <Clock className="w-3 h-3 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                My Process
              </h3>
            </div>
            <p className="text-xs sm:text-sm max-w-xl mx-auto text-white/80">
              A streamlined approach for seamless photography experiences
            </p>
          </div>

          {/* Process Steps Grid - Compact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {PROCESS_STEPS.map((step, idx) => (
              <div 
                key={idx}
                className="group relative backdrop-blur-sm border border-emerald-500/20 rounded-xl p-4 sm:p-6 transition-all duration-500 bg-emerald-900/40 hover:border-emerald-400/50"
              >
                {/* Step Number */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                    <span className="text-white font-bold text-sm">{step.number}</span>
                  </div>
                  <div className="h-6 w-px bg-gradient-to-b from-transparent via-emerald-500 to-transparent opacity-60"></div>
                </div>

                {/* Step Content */}
                <div>
                  <h4 className="text-base font-semibold mb-2 group-hover:text-emerald-400 transition-colors duration-300 text-white">
                    {step.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-white/80">
                    {step.description}
                  </p>
                </div>

                {/* Connecting Line - Desktop */}
                {idx < PROCESS_STEPS.length - 1 && (
                  <>
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent"></div>
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-1.5 h-1.5 rounded-full transform -translate-y-1/2 bg-emerald-500"></div>
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