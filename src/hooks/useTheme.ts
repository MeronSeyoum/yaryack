// src/hooks/useTheme.ts
import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check localStorage first
    const saved = localStorage.getItem('theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    // Default to dark mode
    return true;
  });

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Theme classes for components that need them
  const themeClasses = {
    bg: {
      primary: isDarkMode ? "bg-black" : "bg-white",
      secondary: isDarkMode ? "bg-gray-900" : "bg-gray-50",
      tertiary: isDarkMode ? "bg-gray-800" : "bg-gray-100",
      card: isDarkMode ? "bg-gray-800" : "bg-white",
    },
    text: {
      primary: isDarkMode ? "text-white" : "text-gray-900",
      secondary: isDarkMode ? "text-gray-400" : "text-gray-600",
      muted: isDarkMode ? "text-gray-500" : "text-gray-500",
      accent: "text-emerald-600",
    },
    border: isDarkMode ? "border-gray-600" : "border-gray-300",
  };

  return {
    isDarkMode,
    toggleTheme,
    themeClasses,
  };
};