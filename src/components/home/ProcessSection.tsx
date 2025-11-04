// src/components/home/ProcessSection.tsx
import React from 'react';
import { PROCESS_STEPS } from '../../constants';
import { DESIGN_SYSTEM } from '../../config/designSystem';

interface ProcessSectionProps {
  themeClasses: any;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ themeClasses }) => {
 return (
    <div className="mt-12 sm:mt-16 lg:mt-20">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-8 sm:mb-12 lg:mb-16">/ My Process</h2>

      <div className="max-w-4xl">
        {PROCESS_STEPS.map((step, idx) => (
          <div
            key={idx}
            className={`flex flex-col sm:grid sm:grid-cols-[60px_1fr] lg:grid-cols-[80px_1fr] gap-4 sm:gap-6 lg:gap-10 mb-6 sm:mb-8 lg:mb-12 pb-6 sm:pb-8 lg:pb-12 ${
              idx !== PROCESS_STEPS.length - 1
                ? `border-b ${themeClasses.border}`
                : ""
            }`}
          >
            <div className={`text-xl sm:text-2xl lg:text-3xl ${themeClasses.text.muted} font-light`}>
              {step.number} |
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-light mb-2 sm:mb-3 lg:mb-4">{step.title}</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};