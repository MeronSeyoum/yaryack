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
    <section id="services" className={`border-t ${themeClasses.border}`}>
      <div className="mx-auto">
        {/* Section Header */}
        <div className={`p-4 sm:p-8 lg:px-16 border-b ${themeClasses.border}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
              <p className="text-sm text-gray-400 uppercase tracking-wider">What I Offer</p>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light">Services</h2>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-16">
        {/* Services Section */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          {/* Services Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-4">
              Professional
              <span className="font-medium bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent"> Photography </span>
              Packages
            </h3>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Tailored photography experiences designed to capture your unique story with precision and artistry
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {SERVICES.map((service, idx) => {
              const IconComponent = serviceIcons[idx] || Camera;
              return (
                <div
                  key={idx}
                  className="group relative bg-gradient-to-b from-gray-900/50 to-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-orange-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10"
                >
                  {/* Popular Badge */}
                  {idx === 1 && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-lg">
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Service Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Service Name */}
                  <h3 className="text-xl sm:text-2xl font-semibold text-white text-center mb-4">
                    {service.name}
                  </h3>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="text-3xl sm:text-4xl font-bold text-orange-500 mb-1">
                      {service.price}
                    </div>
                    <p className="text-gray-400 text-sm">All inclusive package</p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        </div>
                        <span className="text-sm text-gray-300 leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`w-full group relative overflow-hidden ${
                      idx === 1 
                        ? 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 border-0' 
                        : 'bg-transparent border border-orange-500/30 text-orange-500 hover:bg-orange-500/10'
                    } transition-all duration-300`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Book {service.name}
                    </span>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Section */}
        <div className="border-t border-white/10 pt-12 sm:pt-16 lg:pt-20">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">My Process</h3>
            </div>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
              A streamlined approach to ensure your photography experience is seamless, enjoyable, and delivers exceptional results
            </p>
          </div>

          {/* Process Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {PROCESS_STEPS.map((step, idx) => (
              <div 
                key={idx}
                className="group relative bg-gradient-to-b from-gray-900/30 to-black/20 backdrop-blur-sm border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-orange-500/20 transition-all duration-500"
              >
                {/* Step Number */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                  <div className="h-8 w-px bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-60"></div>
                </div>

                {/* Step Content */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-orange-500 transition-colors duration-300">
                    {step.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connecting Line - Desktop */}
                {idx < PROCESS_STEPS.length - 1 && (
                  <>
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></div>
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-2 h-2 bg-orange-500 rounded-full transform -translate-y-1/2"></div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Main CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-b from-gray-900/50 to-black/30 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-white/10 max-w-4xl mx-auto">
              <h4 className="text-2xl sm:text-3xl font-light text-white mb-4">
                Ready to Create Something
                <span className="font-medium bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent"> Amazing? </span>
              </h4>
              <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
                Let's work together to bring your vision to life. Book your session today and let's create timeless memories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4"
                  size="lg"
                >
                  <span className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    Start Your Project
                  </span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4"
                  size="lg"
                >
                  View Portfolio First
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};