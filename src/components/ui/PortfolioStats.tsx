import React from 'react';
import { STATS } from '../../constants';

export const PortfolioStats: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#ff8533] mb-2">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};