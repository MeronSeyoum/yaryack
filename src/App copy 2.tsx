import React, { useState, useEffect } from "react";
import { Menu, X, ChevronRight, Sun, Moon } from "lucide-react";

// Import your images
import heroMain from "./assets/images/hero-main.jpg";
import heroThumb1 from "./assets/images/hero-thumb-1.jpg";
import heroThumb2 from "./assets/images/hero-thumb-2.jpeg";
import heroThumb3 from "./assets/images/hero-thumb-3.jpeg";
import heroThumb4 from "./assets/images/hero-thumb-4.jpeg";
import photographerPortrait from "./assets/images/photographer-portrait.jpg";

import portfolio1 from "./assets/images/portfolio-1.jpg";
import portfolio2 from "./assets/images/portfolio-2.jpg";
import portfolio3 from "./assets/images/portfolio-3.jpg";
import portfolio4 from "./assets/images/portfolio-4.jpg";
import portfolio5 from "./assets/images/portfolio-5.jpg";
import portfolio6 from "./assets/images/portfolio-6.jpg";
import portfolio10 from "./assets/images/portfolio-11.jpg";
import portfolio12 from "./assets/images/portfolio-12.jpg";
import portfolio13 from "./assets/images/portfolio-13.jpg";
import portfolio7 from "./assets/images/portfolio-7.jpg";
import portfolio8 from "./assets/images/portfolio-8.jpg";
import portfolio9 from "./assets/images/portfolio-9.jpg";
// Portfolio images by category - USING IMPORTED IMAGES
const portfolioImages = {
  Event: [
    portfolio2,
    portfolio1,
    portfolio6,
    portfolio7,
    portfolio4,
    portfolio5,
    portfolio3,
  ],
  Engagement: [
    portfolio2,
    portfolio3,
    portfolio1,
    portfolio6,
    portfolio5,
    portfolio4,
    portfolio8,
  ],
  Wedding: [
    portfolio8,
    portfolio4,
    portfolio3,
    heroThumb2,
    portfolio1,
    portfolio2,
    portfolio5,
  ],
  Maternity: [
    portfolio4,
    portfolio2,
    portfolio3,
    portfolio12,
    portfolio2,
    portfolio13,
    portfolio5,
  ],
  Portrait: [
    portfolio9,
    portfolio10,
    portfolio12,
    portfolio2,
    portfolio3,
    portfolio7,
    portfolio1,
  ],
};

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [activeCategory, setActiveCategory] = useState("Event");
  const [activePortfolioTab, setActivePortfolioTab] = useState("All Work");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    agree: false,
  });

  const heroImages = [heroThumb1, heroThumb2, heroThumb3, heroThumb4];

  // Preload images
  useEffect(() => {
    const imageUrls = [heroMain, ...heroImages, photographerPortrait];
    const loadPromises = imageUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(loadPromises).then(() => setImagesLoaded(true));
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation for slideshow
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentSlide(
          (prev) => (prev - 1 + heroImages.length) % heroImages.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [heroImages.length]);

  const stats = [
    { number: "8+", label: "Years of Experience" },
    { number: "1000+", label: "Photos Captured" },
    { number: "1500+", label: "Happy Clients" },
    { number: "27000+", label: "Five Star Reviews" },
  ];

  const categories = [
    "All",
    "Event",
    "Engagement",
    "Wedding",
    "Maternity",
    "Portrait",
  ];
  const portfolioTabs = ["All Work", "Featured", "Recent"];

  // Get portfolio images based on active category
  const getPortfolioImages = () => {
    if (activeCategory === "All") {
      return Object.values(portfolioImages).flat();
    }
    return portfolioImages[activeCategory] || [];
  };

  const currentPortfolioImages = getPortfolioImages();

  const services = [
    {
      name: "Lite",
      description: "Perfect for individual portraits and quick sessions",
      price: "$140",
      features: [
        "1 hour session",
        "Single location",
        "15 edited photos",
        "Online gallery access",
        "High-resolution downloads",
      ],
    },
    {
      name: "Standard",
      description: "Ideal for fashion shoots and extended sessions",
      price: "$240",
      features: [
        "2 hour session",
        "Up to 2 locations",
        "30 edited photos",
        "Online gallery access",
        "Print package included",
        "Wardrobe consultation",
      ],
    },
    {
      name: "Premium",
      description:
        "Comprehensive package for special events and editorial work",
      price: "$440",
      features: [
        "4 hour session",
        "Multiple locations",
        "60+ edited photos",
        "Premium online gallery",
        "Deluxe print package",
        "Full styling consultation",
        "Priority scheduling",
      ],
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Initial Consultation",
      description:
        "We'll discuss your vision, preferred photography style, session details, and any specific requirements.",
    },
    {
      number: "02",
      title: "The Photo Session",
      description:
        "A relaxed and professional photography experience where we capture authentic moments and creative compositions.",
    },
    {
      number: "03",
      title: "Professional Post-Production",
      description:
        "Meticulous editing and color correction to enhance your photographs while preserving their natural beauty.",
    },
    {
      number: "04",
      title: "Final Delivery",
      description:
        "Your beautifully edited photos delivered through a private online gallery with high-resolution downloads.",
    },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Thank you for your message! We will get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        agree: false,
      });
    } catch (error) {
      alert("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClasses = isDarkMode
    ? {
        bg: {
          primary: "bg-black",
          secondary: "bg-[#0a0a0a]",
          tertiary: "bg-[#1a1a1a]",
          card: "bg-[#1a1a1a]",
        },
        text: {
          primary: "text-white",
          secondary: "text-[#999]",
          muted: "text-[#666]",
          accent: "text-[#ff8533]",
        },
        border: "border-[#2a2a2a]",
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
          accent: "text-[#ff8533]",
        },
        border: "border-gray-200",
      };

  // Loading component
  if (!imagesLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ff8533] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Yaryack Media...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${themeClasses.bg.primary} ${themeClasses.text.primary}`}
    >
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full ${themeClasses.bg.secondary} border-b ${themeClasses.border} z-50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-lg font-bold text-[#ff8533]">
            Yaryack Media Production
          </div>

          <ul className="hidden md:flex gap-8 text-sm">
            {["Home", "About", "Portfolio", "Services", "Contact"].map(
              (item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`${
                      themeClasses.text.secondary
                    } hover:text-[#ff8533] transition-colors duration-200 ${
                      activeSection === item.toLowerCase()
                        ? "text-[#ff8533]"
                        : ""
                    }`}
                  >
                    {item}
                  </button>
                </li>
              )
            )}
          </ul>

          <div className="flex gap-4 items-center">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${themeClasses.bg.tertiary} ${themeClasses.text.secondary} hover:text-[#ff8533] transition-colors duration-200`}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="w-5 h-5 bg-[#ff8533] rounded-full cursor-pointer"></div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className={`md:hidden ${themeClasses.bg.secondary} border-t ${themeClasses.border} py-4`}
          >
            <ul className="flex flex-col gap-4 px-4 sm:px-6">
              {["Home", "About", "Portfolio", "Services", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className={`${
                        themeClasses.text.secondary
                      } hover:text-[#ff8533] transition-colors duration-200 w-full text-left ${
                        activeSection === item.toLowerCase()
                          ? "text-[#ff8533]"
                          : ""
                      }`}
                    >
                      {item}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen mt-10">
        {/* Background Image */}
        <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
          <div className="max-w-7xl h-full flex justify-center items-center">
            <img
              src={heroMain}
              alt="Professional photography"
              className="max-w-7xl h-full object-cover filter grayscale"
              style={{ objectPosition: "50% 30%" }}
            />
            <div className="absolute max-w-7xl mx-auto inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.6)_60%,black_85%)]"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_190px] min-h-screen gap-4">
            {/* Left/Center Content */}
            <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-12 xl:p-16 min-h-[80vh]">
              <div className="space-y-6 lg:space-y-16">
                <p className="text-base sm:text-lg lg:text-xl text-gray-400 tracking-wider -ml-1">
                  | Let us capture moments of your life
                </p>
                <div className="border-l-4 border-gray-100 pl-6 lg:pl-8">
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-medium leading-tight text-white">
                    Yaryack
                    <br />
                    Media
                    <br />
                    Production
                  </h1>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-center flex-wrap">
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="group flex items-center gap-3 bg-[#ff8533] text-black px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#ff9944] transition-all duration-300 hover:gap-4"
                  >
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Schedule a Shoot
                    </span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-[#ff8533] rounded-full flex-shrink-0"></div>
                  <p className="text-sm text-white/80 max-w-md">
                    Capturing authentic moments that tell your unique story
                    through professional photography
                  </p>
                </div>
              </div>
            </div>

            {/* Right Film Strip Slideshow */}
            <div className="flex flex-col justify-center p-8">
              <div className="bg-black/90 rounded-lg p-3 border-2 border-gray-700 shadow-2xl">
                <div className="space-y-4">
                  {heroImages.map((img, idx) => (
                    <div key={idx} className="relative">
                      {/* Top film holes */}
                      <div className="flex justify-between px-1 mb-1">
                        <div className="w-2 h-2 bg-gray-600 rounded-sm"></div>
                        <div className="w-2 h-2 bg-gray-600 rounded-sm"></div>
                      </div>

                      {/* Image frame */}
                      <div
                        className={`relative w-full aspect-[3/4] rounded overflow-hidden cursor-pointer transition-all duration-500 ${
                          idx === currentSlide
                            ? "ring-2 ring-[#ff8533] scale-105 opacity-100"
                            : "opacity-50 hover:opacity-75"
                        }`}
                        onClick={() => setCurrentSlide(idx)}
                      >
                        <img
                          src={img}
                          alt={`Photography sample ${idx + 1}`}
                          className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                        />
                        {/* Frame number overlay */}
                        {idx === currentSlide && (
                          <div className="absolute top-2 right-2 bg-[#ff8533] text-black text-xs font-bold px-2 py-1 rounded">
                            {idx + 1}/{heroImages.length}
                          </div>
                        )}
                      </div>

                      {/* Bottom film holes */}
                      <div className="flex justify-between px-1 mt-1">
                        <div className="w-2 h-2 bg-gray-600 rounded-sm"></div>
                        <div className="w-2 h-2 bg-gray-600 rounded-sm"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Film strip label */}
              <div className="mt-4 text-center">
                <div className="text-xs text-gray-500 font-mono">
                  KODAK 400 35mm
                </div>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 pb-8">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? "bg-[#ff8533] w-8"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`${themeClasses.bg.secondary} border-t ${themeClasses.border}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="py-8 lg:py-10 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
            <h2 className="text-3xl lg:text-4xl font-light">About</h2>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4">
            <div className="lg:col-span-3 relative min-h-screen">
              <div className="absolute inset-0">
                <img
                  src={photographerPortrait}
                  alt="Professional Photographer"
                  className="w-full h-full object-cover filter grayscale contrast-110"
                />
                <div className="absolute inset-0 bg-black/40"></div>
              </div>

              <div className="relative z-10 p-6 sm:p-8 lg:p-12 xl:p-16 h-full flex flex-col">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-8 lg:gap-16 mb-12 lg:mb-16 pb-8 lg:pb-10 border-b border-white/20">
                    {stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-3xl sm:text-4xl lg:text-5xl font-light mb-2 text-white">
                          {stat.number}
                        </div>
                        <div className="text-xs text-white/80 uppercase tracking-wider">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="text-lg lg:text-xl text-white leading-relaxed space-y-6 lg:space-y-8 max-w-3xl">
                    <p className="text-2xl lg:text-3xl font-light">
                      Capturing Your Story
                    </p>
                    <p className="text-white/90">
                      Calgary-based photographer with 8+ years specializing in
                      authentic portrait, fashion, and lifestyle photography.
                    </p>
                    <p className="text-white/90">
                      Blending technical expertise with artistic vision to
                      create images you'll cherish forever.
                    </p>
                    <div className="text-2xl lg:text-3xl italic text-[#ff8533] font-light pt-4">
                      - Yaryack Media
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-12 xl:p-16 flex flex-col gap-8 lg:gap-10 border-l border-gray-800">
              <div className="border-b border-gray-800 pb-8 lg:pb-10">
                <div className="flex items-center gap-4 mb-4 lg:mb-5">
                  <div className="w-6 h-6 bg-[#ff8533] rounded-full"></div>
                  <h3 className="text-lg font-light">/ People say</h3>
                </div>
                <p
                  className={`text-sm ${themeClasses.text.secondary} leading-relaxed mb-4 lg:mb-5`}
                >
                  "Working with Yaryack was an incredible experience.
                  Professional, talented, and truly passionate about capturing
                  the perfect moments."
                </p>
                <p className="text-xs text-[#ff8533]">- Sarah Johnson</p>
              </div>

              <div
                className={`${themeClasses.bg.card} border ${themeClasses.border} p-6 lg:p-8 rounded-lg`}
              >
                <div
                  className={`w-16 h-16 lg:w-20 lg:h-20 ${themeClasses.bg.tertiary} rounded-full mb-4 lg:mb-5 flex items-center justify-center`}
                >
                  <span className="text-2xl text-[#ff8533]">YM</span>
                </div>
                <div className="text-lg mb-2">Yaryack Media</div>
                <div
                  className={`text-xs ${themeClasses.text.muted} mb-4 lg:mb-5`}
                >
                  Professional Photographer
                </div>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-[#ff8533] text-black py-3 text-sm font-semibold hover:bg-[#ff9944] transition-colors duration-200 rounded-lg"
                >
                  Book a Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section
        id="portfolio"
        className={`${themeClasses.bg.secondary} border-t ${themeClasses.border} py-10 lg:py-12`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-light mb-6 lg:mb-8">
            Portfolio
          </h2>

          <div className="flex gap-6 lg:gap-10 border-b border-gray-800 mb-8 lg:mb-10 overflow-x-auto">
            {portfolioTabs.map((tab) => (
              <div
                key={tab}
                onClick={() => setActivePortfolioTab(tab)}
                className={`py-4 text-sm cursor-pointer transition-colors duration-200 relative whitespace-nowrap ${
                  activePortfolioTab === tab
                    ? "text-[#ff8533]"
                    : `${themeClasses.text.muted} hover:text-[#ff8533]`
                }`}
              >
                {tab}
                {activePortfolioTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff8533]"></div>
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-[250px_1fr] gap-8 lg:gap-10">
            <div>
              <h3 className={`text-sm ${themeClasses.text.muted} mb-4 lg:mb-5`}>
                / Categories
              </h3>
              <ul className="space-y-2 lg:space-y-3">
                {categories.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-sm cursor-pointer transition-colors duration-200 flex items-center gap-3 ${
                      activeCategory === cat
                        ? themeClasses.text.primary
                        : `${themeClasses.text.muted} hover:text-[#ff8533]`
                    }`}
                  >
                    {activeCategory === cat && (
                      <div className="w-4 h-4 bg-[#ff8533] rounded-full"></div>
                    )}
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Scattered Masonry Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 auto-rows-[150px]">
              {currentPortfolioImages.map((img, idx) => {
                // Create varied scattered layout
                const layouts = [
                  "row-span-2 col-span-1", // Vertical
                  "row-span-1 col-span-1", // Horizontal
                  "row-span-1 col-span-1", // Large
                  "row-span-2 col-span-1", // Small
                  "row-span-3 col-span-2", // Horizontal
                  "row-span-2 col-span-1", // Vertical
                  "row-span-2 col-span-1", // Small
                ];
                const layout = layouts[idx % layouts.length];

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
                    <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-xs text-gray-300">
                        / {activeCategory}
                      </p>
                    </div>
                    {/* Accent dot on some images */}
                    {idx % 3 === 0 && (
                      <div className="absolute bottom-3 right-3 w-8 h-8 bg-[#ff8533] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ChevronRight size={16} className="text-black" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services & Process Section */}
      <section
        id="services"
        className={`${themeClasses.bg.secondary} border-t ${themeClasses.border} py-16 lg:py-20`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-light mb-12 lg:mb-16">
            Services & Packages
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
            {services.map((service, idx) => (
              <div
                key={idx}
                className={`border ${themeClasses.border} p-6 lg:p-8 xl:p-10 text-center rounded-lg hover:border-[#ff8533] hover:-translate-y-2 transition-all duration-300 ${themeClasses.bg.card}`}
              >
                <h3 className="text-xl font-light mb-6 lg:mb-8">
                  {service.name}
                </h3>
                <p
                  className={`text-xs ${themeClasses.text.muted} leading-relaxed mb-6 lg:mb-8`}
                >
                  {service.description}
                </p>
                <div className="text-4xl lg:text-5xl font-light my-8 lg:my-10">
                  {service.price}
                </div>
                <ul
                  className={`text-sm ${themeClasses.text.secondary} space-y-2 lg:space-y-3 mb-8 lg:mb-10`}
                >
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx}>{feature}</li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-[#ff8533] text-black py-3 text-sm font-semibold hover:bg-[#ff9944] transition-colors duration-200 rounded-lg"
                >
                  Request Proposal
                </button>
              </div>
            ))}
          </div>

          {/* Process Section */}
          <div className="mt-16 lg:mt-20">
            <h2 className="text-3xl lg:text-4xl font-light mb-12 lg:mb-16">
              / Our Process
            </h2>

            <div className="max-w-4xl">
              {processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`grid md:grid-cols-[80px_1fr] gap-6 lg:gap-10 mb-8 lg:mb-12 pb-8 lg:pb-12 ${
                    idx !== processSteps.length - 1
                      ? `border-b ${themeClasses.border}`
                      : ""
                  }`}
                >
                  <div
                    className={`text-2xl lg:text-3xl ${themeClasses.text.muted} font-light`}
                  >
                    {step.number} /
                  </div>
                  <div>
                    <h3 className="text-lg font-light mb-3 lg:mb-4">
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm ${themeClasses.text.secondary} leading-relaxed`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section with Background Image */}
      <section
        id="contact"
        className="relative border-t border-gray-800 py-16 lg:py-20 overflow-hidden"
      >
        {/* Background Image - Camera/Photography themed */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&h=1080&fit=crop"
            alt="Photography background"
            className="w-full h-full object-cover filter grayscale"
          />
          {/* Stronger dark overlay for better readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/55 to-black/50"></div>
          {/* Additional vignette effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_70%)]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-light text-center mb-3 text-white">
            Get in touch with us
          </h2>
          <p className="text-sm text-gray-300 text-center mb-12 lg:mb-16">
            We'd love to hear from you and discuss your photography needs!
          </p>

          <div className="max-w-2xl mx-auto">
            {/* Contact Info Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8 lg:mb-12">
              <div className="bg-black/70 backdrop-blur-md border border-gray-700 p-6 rounded-lg text-center hover:border-[#ff8533] transition-all duration-300">
                <div className="w-12 h-12 bg-[#ff8533] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold mb-2 text-white">Email</h3>
                <p className="text-xs text-gray-400">info@yaryackmedia.com</p>
              </div>

              <div className="bg-black/70 backdrop-blur-md border border-gray-700 p-6 rounded-lg text-center hover:border-[#ff8533] transition-all duration-300">
                <div className="w-12 h-12 bg-[#ff8533] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold mb-2 text-white">Phone</h3>
                <p className="text-xs text-gray-400">+1 (403) 555-0123</p>
              </div>

              <div className="bg-black/70 backdrop-blur-md border border-gray-700 p-6 rounded-lg text-center hover:border-[#ff8533] transition-all duration-300">
                <div className="w-12 h-12 bg-[#ff8533] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold mb-2 text-white">
                  Location
                </h3>
                <p className="text-xs text-gray-400">Calgary, Alberta</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-black/70 backdrop-blur-md border border-gray-700 p-6 lg:p-8 rounded-lg shadow-2xl">
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4 lg:gap-5 mb-4 lg:mb-5">
                  <div>
                    <label className="block text-xs text-gray-300 mb-2 lg:mb-3 font-medium">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full border bg-black/50 border-gray-700 text-white placeholder-gray-500 p-3 lg:p-4 text-sm focus:border-[#ff8533] focus:outline-none rounded-lg transition-colors duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-300 mb-2 lg:mb-3 font-medium">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full border bg-black/50 border-gray-700 text-white placeholder-gray-500 p-3 lg:p-4 text-sm focus:border-[#ff8533] focus:outline-none rounded-lg transition-colors duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="mb-4 lg:mb-5">
                  <label className="block text-xs text-gray-300 mb-2 lg:mb-3 font-medium">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full border bg-black/50 border-gray-700 text-white placeholder-gray-500 p-3 lg:p-4 text-sm focus:border-[#ff8533] focus:outline-none rounded-lg transition-colors duration-200"
                    placeholder="Your phone number"
                  />
                </div>

                <div className="mb-4 lg:mb-5">
                  <label className="block text-xs text-gray-300 mb-2 lg:mb-3 font-medium">
                    Service Interest
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleFormChange}
                    className="w-full border bg-black/50 border-gray-700 text-white p-3 lg:p-4 text-sm focus:border-[#ff8533] focus:outline-none rounded-lg transition-colors duration-200"
                  >
                    <option value="">Select a service</option>
                    <option value="event">Event Photography</option>
                    <option value="engagement">Engagement Session</option>
                    <option value="wedding">Wedding Photography</option>
                    <option value="maternity">Maternity Shoot</option>
                    <option value="portrait">Portrait Session</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-4 lg:mb-5">
                  <label className="block text-xs text-gray-300 mb-2 lg:mb-3 font-medium">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows="6"
                    className="w-full border bg-black/50 border-gray-700 text-white placeholder-gray-500 p-3 lg:p-4 text-sm focus:border-[#ff8533] focus:outline-none rounded-lg resize-none transition-colors duration-200"
                    placeholder="Tell us about your project, preferred dates, and any specific requirements..."
                  ></textarea>
                </div>

                <div className="flex items-center gap-3 mb-6 lg:mb-8 text-xs">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleFormChange}
                    className="w-4 h-4 text-[#ff8533] focus:ring-[#ff8533] border-gray-600 rounded bg-black/50"
                  />
                  <span className="text-gray-300">
                    I agree to the privacy policy and terms of service
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#ff8533] text-black py-3 lg:py-4 text-sm font-semibold hover:bg-[#ff9944] disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200 rounded-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Social Media Links */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400 mb-4">
                Follow us on social media
              </p>
              <div className="flex justify-center gap-4">
                {["Instagram", "Facebook", "Twitter"].map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 bg-black/70 backdrop-blur-md border border-gray-700 rounded-full flex items-center justify-center hover:border-[#ff8533] hover:bg-[#ff8533]/10 transition-all duration-200"
                  >
                    <span className="text-xs text-gray-400 hover:text-[#ff8533]">
                      {social[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`${themeClasses.bg.primary} border-t ${themeClasses.border} py-8 lg:py-10`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 lg:gap-5">
            <div className="text-lg text-[#ff8533]">YMP</div>
            <ul className="flex gap-6 lg:gap-8 text-xs">
              <li>
                <button
                  className={`${themeClasses.text.muted} hover:text-[#ff8533] transition-colors duration-200`}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  className={`${themeClasses.text.muted} hover:text-[#ff8533] transition-colors duration-200`}
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className={`${themeClasses.text.muted} hover:text-[#ff8533] transition-colors duration-200`}
                >
                  Contact
                </button>
              </li>
            </ul>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((dot) => (
                <div
                  key={dot}
                  className={`w-2 h-2 rounded-full cursor-pointer ${
                    dot === 1 ? "bg-[#ff8533]" : themeClasses.bg.tertiary
                  }`}
                ></div>
              ))}
            </div>
          </div>
          <div
            className={`text-center text-xs ${themeClasses.text.muted} mt-6 lg:mt-8`}
          >
            © 2025 Yaryack Media Production. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#ff8533] text-black p-3 rounded-full shadow-lg hover:bg-[#ff9944] transition-all duration-300 z-40"
          aria-label="Scroll to top"
        >
          <ChevronRight className="w-5 h-5 rotate-270" />
        </button>
      )}
    </div>
  );
}

export default App;
