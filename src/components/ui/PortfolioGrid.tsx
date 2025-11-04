import React from 'react';
import { ChevronRight } from 'lucide-react';
import { PortfolioCategory } from '../../types/portfolio';

interface PortfolioGridProps {
  images: string[];
  activeCategory: PortfolioCategory | 'All';
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ images, activeCategory }) => {
  const mobileLayouts = [
    "row-span-2 col-span-1",
    "row-span-1 col-span-1", 
    "row-span-1 col-span-1",
    "row-span-2 col-span-1",
  ];
  
  const desktopLayouts = [
    "row-span-2 col-span-1",
    "row-span-1 col-span-1",
    "row-span-1 col-span-1", 
    "row-span-2 col-span-1",
    "row-span-2 col-span-1",
    "row-span-1 col-span-1",
    "row-span-1 col-span-1",
    "row-span-2 col-span-1",
  ];

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 auto-rows-[120px] sm:auto-rows-[150px]">
      {images.map((img, idx) => {
        const layout = window.innerWidth < 640 
          ? mobileLayouts[idx % mobileLayouts.length] 
          : desktopLayouts[idx % desktopLayouts.length];

        return (
          <div
            key={idx}
            className={`relative ${layout} rounded-lg hover:scale-[1.02] transition-transform duration-300 cursor-pointer overflow-hidden group`}
          >
            <img
              src={img}
              alt={`${activeCategory} photography ${idx + 1}`}
              className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 lg:p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-xs text-gray-300 font-medium">/ {activeCategory}</p>
            </div>
            <div className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 bg-[#ff8533] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ChevronRight size={12} className="text-black sm:w-4 sm:h-4" />
            </div>
          </div>
        );
      })}
    </div>
  );
};