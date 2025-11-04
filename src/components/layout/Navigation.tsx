// src/components/layout/Navigation.tsx
import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Camera } from "lucide-react";

interface NavigationProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  isDarkMode,
  toggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  // Theme-based styles
  const navBackground = isScrolled
    ? isDarkMode
      ? "bg-black/95 backdrop-blur-md border-b border-gray-600"
      : "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg"
    : isDarkMode
    ? "bg-transparent border-b border-gray-600"
    : "bg-transparent border-b border-gray-200";

  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const subtitleColor = isDarkMode ? "text-gray-400" : "text-gray-600";
  const navItemColor = isDarkMode ? "text-gray-300" : "text-gray-700";
  const navItemHoverColor = "hover:text-orange-500";
  const mobileMenuBackground = isDarkMode 
    ? "bg-black/95 backdrop-blur-md" 
    : "bg-white/95 backdrop-blur-md";
  const mobileBorderColor = isDarkMode ? "border-gray-800" : "border-gray-200";
  const buttonBackground = isDarkMode ? "bg-white/10" : "bg-black/10";
  const buttonHoverBackground = isDarkMode ? "hover:bg-white/20" : "hover:bg-black/20";
  const buttonIconColor = isDarkMode ? "text-white" : "text-gray-900";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50  transition-all duration-300 ${navBackground} ${
        isScrolled ? "py-2 sm:py-3" : "py-4 "
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2 sm:gap-3 group"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className={textColor}>
              <div className="font-semibold text-base sm:text-lg leading-tight">Yaryack</div>
              <div className={`text-xs ${subtitleColor} -mt-0.5 leading-tight`}>Photography</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-sm font-medium ${navItemColor} ${navItemHoverColor} transition-colors duration-200`}
              >
                {item.name}
              </a>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${buttonBackground} ${buttonHoverBackground} transition-all duration-200 border ${
                isDarkMode ? "border-white/20" : "border-gray-300"
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className={`w-4 h-4 ${buttonIconColor}`} />
              ) : (
                <Moon className={`w-4 h-4 ${buttonIconColor}`} />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${buttonBackground} ${buttonHoverBackground} transition-all duration-200 border ${
                isDarkMode ? "border-white/20" : "border-gray-300"
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className={`w-4 h-4 ${buttonIconColor}`} />
              ) : (
                <Moon className={`w-4 h-4 ${buttonIconColor}`} />
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg ${buttonBackground} ${buttonHoverBackground} transition-all duration-200 border ${
                isDarkMode ? "border-white/20" : "border-gray-300"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className={`w-5 h-5 ${buttonIconColor}`} />
              ) : (
                <Menu className={`w-5 h-5 ${buttonIconColor}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden mt-4 pt-4 border-t ${mobileBorderColor} ${mobileMenuBackground} rounded-lg -mx-4 px-4 pb-4 shadow-xl`}>
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-sm font-medium py-3 px-4 rounded-lg transition-all duration-200 ${navItemColor} ${navItemHoverColor} ${
                    isDarkMode ? "hover:bg-white/10" : "hover:bg-black/10"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};