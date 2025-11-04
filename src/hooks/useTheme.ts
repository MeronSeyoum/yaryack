// src/hooks/useTheme.ts
import { useState, useEffect } from 'react';
import { DESIGN_SYSTEM } from '../config/designSystem';
import type { ThemeClasses } from '../types';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const themeClasses: ThemeClasses = isDarkMode
    ? {
        bg: {
          primary: "bg-black",
          secondary: "bg-gray-900",
          tertiary: "bg-gray-800",
          card: "bg-gray-800",
        },
        text: {
          primary: "text-white",
          secondary: "text-gray-400",
          muted: "text-gray-500",
          accent: "text-orange-500",
        },
        border: "border-gray-600",
      }
    : {
        bg: {
          primary: "bg-white",
          secondary: "bg-gray-50",
          tertiary: "bg-gray-100",
          card: "bg-white",
        },
        text: {
          primary: "text-black",
          secondary: "text-gray-600",
          muted: "text-gray-500",
          accent: "text-orange-500",
        },
        border: "border-gray-300",
      };

  return {
    isDarkMode,
    toggleTheme,
    themeClasses,
    designSystem: DESIGN_SYSTEM,
  };
};