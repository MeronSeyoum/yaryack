

// src/components/home/ServicesSection.tsx
import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Clock, Users, Camera, Star } from 'lucide-react';

interface Service {
  name: string;
  price: string;
  features: string[];
}

const SERVICES: Service[] = [
  {
    name: "Portrait Session",
    price: "$250",
    features: [
      "1-2 hour session",
      "1 location",
      "30+ edited photos",
      "Online gallery access",
      "High-resolution downloads",
      "Print release"
    ],
  },
  {
    name: "Event Photography",
    price: "$400",
    features: [
      "3-4 hour coverage",
      "Multiple locations",
      "100+ edited photos",
      "Online gallery access",
      "Quick turnaround",
      "Professional editing"
    ],
  },
  {
    name: "Wedding Package",
    price: "$1200",
    features: [
      "8+ hour coverage",
      "Two photographers",
      "300+ edited photos",
      "Premium online gallery",
      "Print package included",
      "Engagement session"
    ],
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Consultation & Booking",
    description: "We discuss your vision, timeline, and requirements to create the perfect photography plan.",
  },
  {
    number: "02",
    title: "The Photoshoot",
    description: "A comfortable and professional session where we capture authentic moments and creative compositions.",
  },
  {
    number: "03",
    title: "Editing & Enhancement",
    description: "Professional editing and color correction to bring out the best in your photographs.",
  },
  {
    number: "04",
    title: "Delivery & Support",
    description: "Your final photos delivered through a private online gallery with options for prints.",
  },
];

export const ServicesSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const serviceIcons = [Camera, Users, Star];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SERVICES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides on mobile
  useEffect(() => {
    if (!isMobile) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isMobile, currentSlide]);

  return (
    <section id="services" className="border-t ds-border-primary ds-bg-section-primary">
      {/* Section Header */}
      <div className="ds-section-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 rounded-full" style={{ background: 'var(--color-brand-primary)' }}></div>
            <p className="ds-body-sm ds-text-secondary uppercase tracking-wider font-medium">
              Services
            </p>
          </div>
          <h2 className="ds-heading-3 ds-text-primary">
            What I Offer
          </h2>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-16 py-16">
        {/* Services Section */}
        <div className="mb-16">
          {/* Services Header */}
          <div className="text-center mb-12">
            <h3 className="ds-heading-3 mb-4 ds-text-primary">
              Professional
              <span className="font-semibold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> Photography </span>
              Packages
            </h3>
            <p className="ds-body-base ds-text-secondary max-w-2xl mx-auto">
              Tailored photography experiences designed to capture your unique story
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
            {SERVICES.map((service, idx) => {
              const IconComponent = serviceIcons[idx] || Camera;
              const isPopular = idx === 1;
              
              return (
                <div
                  key={idx}
                  className="ds-card ds-card-p-lg group relative"
                >
                  {/* Popular Badge */}
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Service Icon */}
                  <div className="flex justify-center mb-6">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 ds-transition-slow"
                      style={{ background: 'linear-gradient(to bottom right, var(--color-brand-primary-light), var(--color-brand-primary))' }}
                    >
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Service Name */}
                  <h3 className="ds-heading-4 text-center mb-4 ds-text-primary">
                    {service.name}
                  </h3>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold mb-2" style={{ color: 'var(--color-brand-primary-light)' }}>
                      {service.price}
                    </div>
                    <p className="ds-body-sm ds-text-secondary">
                      All inclusive
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <div 
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: 'rgba(16, 185, 129, 0.2)' }}
                        >
                          <CheckCircle className="w-3 h-3" style={{ color: 'var(--color-brand-primary-light)' }} />
                        </div>
                        <span className="ds-body-sm ds-text-secondary">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`w-full ds-btn ds-btn-md group/btn ${
                      isPopular 
                        ? 'ds-btn-primary' 
                        : 'ds-btn-outline'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book {service.name}</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Mobile Carousel */}
          <div className="lg:hidden">
            <div className="relative overflow-hidden">
              {/* Carousel Container */}
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {SERVICES.map((service, idx) => {
                  const IconComponent = serviceIcons[idx] || Camera;
                  const isPopular = idx === 1;
                  
                  return (
                    <div
                      key={idx}
                      className="w-full flex-shrink-0 px-4"
                    >
                      <div className="ds-card ds-card-p-lg group relative mx-auto max-w-sm">
                        {/* Popular Badge */}
                        {isPopular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                            <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
                              Most Popular
                            </div>
                          </div>
                        )}

                        {/* Service Icon */}
                        <div className="flex justify-center mb-6">
                          <div 
                            className="w-14 h-14 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 ds-transition-slow"
                            style={{ background: 'linear-gradient(to bottom right, var(--color-brand-primary-light), var(--color-brand-primary))' }}
                          >
                            <IconComponent className="w-7 h-7 text-white" />
                          </div>
                        </div>

                        {/* Service Name */}
                        <h3 className="ds-heading-4 text-center mb-4 ds-text-primary">
                          {service.name}
                        </h3>

                        {/* Price */}
                        <div className="text-center mb-6">
                          <div className="text-4xl font-bold mb-2" style={{ color: 'var(--color-brand-primary-light)' }}>
                            {service.price}
                          </div>
                          <p className="ds-body-sm ds-text-secondary">
                            All inclusive
                          </p>
                        </div>

                        {/* Features List */}
                        <div className="space-y-3 mb-8">
                          {service.features.map((feature, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-3">
                              <div 
                                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{ background: 'rgba(16, 185, 129, 0.2)' }}
                              >
                                <CheckCircle className="w-3 h-3" style={{ color: 'var(--color-brand-primary-light)' }} />
                              </div>
                              <span className="ds-body-sm ds-text-secondary">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <button
                          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                          className={`w-full ds-btn ds-btn-md group/btn ${
                            isPopular 
                              ? 'ds-btn-primary' 
                              : 'ds-btn-outline'
                          }`}
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Book {service.name}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center ds-transition-slow hover:scale-110 hover:bg-white"
                aria-label="Previous service"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center ds-transition-slow hover:scale-110 hover:bg-white"
                aria-label="Next service"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Slide Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {SERVICES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`w-3 h-3 rounded-full ds-transition-slow ${
                      currentSlide === idx ? 'w-8 bg-brand-primary shadow-lg' : 'bg-gray-300 opacity-60'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Process Section - Desktop Only */}
        <div className="hidden lg:block border-t ds-border-primary pt-16">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'var(--color-brand-primary)' }}
              >
                <Clock className="w-5 h-5 text-white" />
              </div>
              <h3 className="ds-heading-3 ds-text-primary">
                My Process
              </h3>
            </div>
            <p className="ds-body-base ds-text-secondary max-w-2xl mx-auto">
              A streamlined approach for seamless photography experiences
            </p>
          </div>

          {/* Process Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {PROCESS_STEPS.map((step, idx) => (
              <div 
                key={idx}
                className="ds-card ds-card-p-lg group relative"
              >
                {/* Step Number */}
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 ds-transition-slow"
                    style={{ background: 'linear-gradient(to bottom right, var(--color-brand-primary-light), var(--color-brand-primary))' }}
                  >
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                  <div 
                    className="h-8 w-0.5 rounded-full"
                    style={{ background: 'linear-gradient(to bottom, transparent, var(--color-brand-primary), transparent)', opacity: 0.6 }}
                  ></div>
                </div>

                {/* Step Content */}
                <div>
                  <h4 className="ds-heading-4 text-lg mb-3 group-hover:text-emerald-400 ds-transition-slow ds-text-primary">
                    {step.title}
                  </h4>
                  <p className="ds-body-sm ds-text-secondary">
                    {step.description}
                  </p>
                </div>

                {/* Connecting Line - Desktop */}
                {idx < PROCESS_STEPS.length - 1 && (
                  <>
                    <div 
                      className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5"
                      style={{ background: 'linear-gradient(to right, var(--color-brand-primary), transparent)' }}
                    ></div>
                    <div 
                      className="hidden lg:block absolute top-1/2 -right-3 w-2 h-2 rounded-full transform -translate-y-1/2"
                      style={{ background: 'var(--color-brand-primary)' }}
                    ></div>
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

// // src/components/home/ServicesSection.tsx
// import React from 'react';
// import { Calendar, CheckCircle, Clock, Users, Camera, Star } from 'lucide-react';

// interface Service {
//   name: string;
//   price: string;
//   features: string[];
// }

// const SERVICES: Service[] = [
//   {
//     name: "Portrait Session",
//     price: "$250",
//     features: [
//       "1-2 hour session",
//       "1 location",
//       "30+ edited photos",
//       "Online gallery access",
//       "High-resolution downloads",
//       "Print release"
//     ],
//   },
//   {
//     name: "Event Photography",
//     price: "$400",
//     features: [
//       "3-4 hour coverage",
//       "Multiple locations",
//       "100+ edited photos",
//       "Online gallery access",
//       "Quick turnaround",
//       "Professional editing"
//     ],
//   },
//   {
//     name: "Wedding Package",
//     price: "$1200",
//     features: [
//       "8+ hour coverage",
//       "Two photographers",
//       "300+ edited photos",
//       "Premium online gallery",
//       "Print package included",
//       "Engagement session"
//     ],
//   },
// ];

// const PROCESS_STEPS = [
//   {
//     number: "01",
//     title: "Consultation & Booking",
//     description: "We discuss your vision, timeline, and requirements to create the perfect photography plan.",
//   },
//   {
//     number: "02",
//     title: "The Photoshoot",
//     description: "A comfortable and professional session where we capture authentic moments and creative compositions.",
//   },
//   {
//     number: "03",
//     title: "Editing & Enhancement",
//     description: "Professional editing and color correction to bring out the best in your photographs.",
//   },
//   {
//     number: "04",
//     title: "Delivery & Support",
//     description: "Your final photos delivered through a private online gallery with options for prints.",
//   },
// ];

// export const ServicesSection: React.FC = () => {
//   const serviceIcons = [Camera, Users, Star];

//   return (
//     <section id="services" className="border-t ds-border-primary ds-bg-section-primary">
//       {/* Section Header */}
//       <div className="ds-section-header">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-2 h-8 rounded-full" style={{ background: 'var(--color-brand-primary)' }}></div>
//             <p className="ds-body-sm ds-text-secondary uppercase tracking-wider font-medium">
//               Services
//             </p>
//           </div>
//           <h2 className="ds-heading-3 ds-text-primary">
//             What I Offer
//           </h2>
//         </div>
//       </div>

//       <div className="mx-auto px-4 sm:px-6 lg:px-16 py-16">
//         {/* Services Section */}
//         <div className="mb-16">
//           {/* Services Header */}
//           <div className="text-center mb-12">
//             <h3 className="ds-heading-3 mb-4 ds-text-primary">
//               Professional
//               <span className="font-semibold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> Photography </span>
//               Packages
//             </h3>
//             <p className="ds-body-base ds-text-secondary max-w-2xl mx-auto">
//               Tailored photography experiences designed to capture your unique story
//             </p>
//           </div>

//           {/* Services Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
//             {SERVICES.map((service, idx) => {
//               const IconComponent = serviceIcons[idx] || Camera;
//               const isPopular = idx === 1;
              
//               return (
//                 <div
//                   key={idx}
//                   className="ds-card ds-card-p-lg group relative"
//                 >
//                   {/* Popular Badge */}
//                   {isPopular && (
//                     <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
//                       <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
//                         Most Popular
//                       </div>
//                     </div>
//                   )}

//                   {/* Service Icon */}
//                   <div className="flex justify-center mb-6">
//                     <div 
//                       className="w-14 h-14 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 ds-transition-slow"
//                       style={{ background: 'linear-gradient(to bottom right, var(--color-brand-primary-light), var(--color-brand-primary))' }}
//                     >
//                       <IconComponent className="w-7 h-7 text-white" />
//                     </div>
//                   </div>

//                   {/* Service Name */}
//                   <h3 className="ds-heading-4 text-center mb-4 ds-text-primary">
//                     {service.name}
//                   </h3>

//                   {/* Price */}
//                   <div className="text-center mb-6">
//                     <div className="text-4xl font-bold mb-2" style={{ color: 'var(--color-brand-primary-light)' }}>
//                       {service.price}
//                     </div>
//                     <p className="ds-body-sm ds-text-secondary">
//                       All inclusive
//                     </p>
//                   </div>

//                   {/* Features List */}
//                   <div className="space-y-3 mb-8">
//                     {service.features.map((feature, fIdx) => (
//                       <div key={fIdx} className="flex items-start gap-3">
//                         <div 
//                           className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
//                           style={{ background: 'rgba(16, 185, 129, 0.2)' }}
//                         >
//                           <CheckCircle className="w-3 h-3" style={{ color: 'var(--color-brand-primary-light)' }} />
//                         </div>
//                         <span className="ds-body-sm ds-text-secondary">
//                           {feature}
//                         </span>
//                       </div>
//                     ))}
//                   </div>

//                   {/* CTA Button */}
//                   <button
//                     onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
//                     className={`w-full ds-btn ds-btn-md group/btn ${
//                       isPopular 
//                         ? 'ds-btn-primary' 
//                         : 'ds-btn-outline'
//                     }`}
//                   >
//                     <Calendar className="w-4 h-4" />
//                     <span>Book {service.name}</span>
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Process Section - Desktop Only */}
//         <div className="hidden lg:block border-t ds-border-primary pt-16">
//           {/* Section Header */}
//           <div className="text-center mb-12">
//             <div className="flex items-center justify-center gap-3 mb-4">
//               <div 
//                 className="w-10 h-10 rounded-full flex items-center justify-center"
//                 style={{ background: 'var(--color-brand-primary)' }}
//               >
//                 <Clock className="w-5 h-5 text-white" />
//               </div>
//               <h3 className="ds-heading-3 ds-text-primary">
//                 My Process
//               </h3>
//             </div>
//             <p className="ds-body-base ds-text-secondary max-w-2xl mx-auto">
//               A streamlined approach for seamless photography experiences
//             </p>
//           </div>

//           {/* Process Steps Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {PROCESS_STEPS.map((step, idx) => (
//               <div 
//                 key={idx}
//                 className="ds-card ds-card-p-lg group relative"
//               >
//                 {/* Step Number */}
//                 <div className="flex items-center gap-4 mb-4">
//                   <div 
//                     className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 ds-transition-slow"
//                     style={{ background: 'linear-gradient(to bottom right, var(--color-brand-primary-light), var(--color-brand-primary))' }}
//                   >
//                     <span className="text-white font-bold text-lg">{step.number}</span>
//                   </div>
//                   <div 
//                     className="h-8 w-0.5 rounded-full"
//                     style={{ background: 'linear-gradient(to bottom, transparent, var(--color-brand-primary), transparent)', opacity: 0.6 }}
//                   ></div>
//                 </div>

//                 {/* Step Content */}
//                 <div>
//                   <h4 className="ds-heading-4 text-lg mb-3 group-hover:text-emerald-400 ds-transition-slow ds-text-primary">
//                     {step.title}
//                   </h4>
//                   <p className="ds-body-sm ds-text-secondary">
//                     {step.description}
//                   </p>
//                 </div>

//                 {/* Connecting Line - Desktop */}
//                 {idx < PROCESS_STEPS.length - 1 && (
//                   <>
//                     <div 
//                       className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5"
//                       style={{ background: 'linear-gradient(to right, var(--color-brand-primary), transparent)' }}
//                     ></div>
//                     <div 
//                       className="hidden lg:block absolute top-1/2 -right-3 w-2 h-2 rounded-full transform -translate-y-1/2"
//                       style={{ background: 'var(--color-brand-primary)' }}
//                     ></div>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };