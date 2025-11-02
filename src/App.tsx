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

// Types
type PortfolioCategory = "Event" | "Engagement" | "Wedding" | "Maternity" | "Portrait";
type PortfolioTab = "All Work" | "Featured" | "Recent";
type Section = "home" | "about" | "portfolio" | "services" | "contact";

interface Stat {
  number: string;
  label: string;
}

interface Service {
  name: string;
  description: string;
  price: string;
  features: string[];
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  agree: boolean;
}

interface ThemeClasses {
  bg: {
    primary: string;
    secondary: string;
    tertiary: string;
    card: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    accent: string;
  };
  border: string;
}

// Portfolio images by category
const portfolioImages: Record<PortfolioCategory, string[]> = {
  Event: [portfolio2, portfolio1, portfolio6, portfolio7, portfolio4, portfolio5, portfolio3],
  Engagement: [portfolio2, portfolio3, portfolio1, portfolio6, portfolio5, portfolio4, portfolio8],
  Wedding: [portfolio8, portfolio4, portfolio3, heroThumb2, portfolio1, portfolio2, portfolio5],
  Maternity: [portfolio4, portfolio2, portfolio3, portfolio12, portfolio2, portfolio13, portfolio5],
  Portrait: [portfolio9, portfolio10, portfolio12, portfolio2, portfolio3, portfolio7, portfolio1],
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory | "All">("Event");
  const [activePortfolioTab, setActivePortfolioTab] = useState<PortfolioTab>("All Work");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
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
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve();
        img.onerror = () => reject();
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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [heroImages.length]);

  // Updated stats based on actual website
  const stats: Stat[] = [
    { number: "5+", label: "Years of Experience" },
    { number: "500+", label: "Happy Clients" },
    { number: "1000+", label: "Photos Captured" },
    { number: "50+", label: "Events Covered" },
  ];

  const categories: (PortfolioCategory | "All")[] = ["All", "Event", "Engagement", "Wedding", "Maternity", "Portrait"];
  const portfolioTabs: PortfolioTab[] = ["All Work", "Featured", "Recent"];

  // Get portfolio images based on active category
  const getPortfolioImages = (): string[] => {
    if (activeCategory === "All") {
      return Object.values(portfolioImages).flat();
    }
    return portfolioImages[activeCategory] || [];
  };

  const currentPortfolioImages = getPortfolioImages();

  // Updated services based on actual website
  const services: Service[] = [
    {
      name: "Portrait Session",
      description: "Perfect for individual portraits, family photos, and professional headshots",
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
      description: "Comprehensive coverage for corporate events, parties, and special occasions",
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
      description: "Complete wedding day coverage from preparation to reception",
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

  const processSteps: ProcessStep[] = [
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

  const scrollToSection = (sectionId: Section): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      alert("Thank you for your message! We will get back to you within 24 hours.");
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

  const toggleTheme = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClasses: ThemeClasses = isDarkMode
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
          <p className="text-white text-lg">Loading Yaryack Photography...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses.bg.primary} ${themeClasses.text.primary}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full ${themeClasses.bg.secondary} border-b ${themeClasses.border} z-50 backdrop-blur-sm bg-opacity-95`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="text-lg sm:text-xl font-bold text-[#ff8533]">Yaryack Photography</div>

            <ul className="hidden md:flex gap-6 lg:gap-8 text-sm">
              {["Home", "About", "Portfolio", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase() as Section)}
                    className={`${themeClasses.text.secondary} hover:text-[#ff8533] transition-colors duration-200 ${
                      activeSection === item.toLowerCase() ? "text-[#ff8533]" : ""
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex gap-3 sm:gap-4 items-center">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${themeClasses.bg.tertiary} ${themeClasses.text.secondary} hover:text-[#ff8533] transition-colors duration-200`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="hidden sm:block bg-[#ff8533] text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#ff9944] transition-colors duration-200"
              >
                Book Session
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className={`md:hidden ${themeClasses.bg.secondary} border-t ${themeClasses.border} mt-3 py-4`}>
              <ul className="flex flex-col gap-3">
                {["Home", "About", "Portfolio", "Services", "Contact"].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase() as Section)}
                      className={`${themeClasses.text.secondary} hover:text-[#ff8533] transition-colors duration-200 w-full text-left py-2 px-2 ${
                        activeSection === item.toLowerCase() ? "text-[#ff8533]" : ""
                      }`}
                    >
                      {item}
                    </button>
                  </li>
                ))}
                <li className="mt-2">
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="bg-[#ff8533] text-black px-4 py-3 rounded-lg text-sm font-semibold hover:bg-[#ff9944] transition-colors duration-200 w-full text-center"
                  >
                    Book Session
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen pt-16">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroMain}
            alt="Professional photography by Yaryack"
            className="w-full h-full object-cover filter grayscale"
            style={{ objectPosition: '50% 30%' }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.6)_60%,black_85%)]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_190px] min-h-screen gap-4 lg:gap-8">
            
            {/* Left/Center Content */}
            <div className="flex flex-col justify-between p-4 sm:p-6 lg:p-12 xl:p-16 min-h-[80vh] lg:min-h-auto">
              <div className="space-y-4 sm:space-y-6 lg:space-y-16 mt-8 sm:mt-0">
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-400 tracking-wider -ml-1">
                  | Professional Photography in Calgary
                </p>
                <div className="border-l-2 sm:border-l-4 border-gray-100 pl-4 sm:pl-6 lg:pl-8">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight text-white">
                    Yaryack
                    <br />
                    Photography
                  </h1>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6 mt-8 sm:mt-0">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="group flex items-center justify-center gap-2 sm:gap-3 bg-[#ff8533] text-black px-4 sm:px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#ff9944] transition-all duration-300 hover:gap-3 sm:hover:gap-4 w-full sm:w-auto"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Book a Session
                    </span>
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={() => scrollToSection("portfolio")}
                    className="group flex items-center justify-center gap-2 sm:gap-3 border border-white text-white px-4 sm:px-6 py-3 rounded-lg font-semibold text-sm hover:bg-white hover:text-black transition-all duration-300 w-full sm:w-auto"
                  >
                    View Portfolio
                  </button>
                </div>
                <div className="flex gap-3 sm:gap-4 items-start">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#ff8533] rounded-full flex-shrink-0 mt-1"></div>
                  <p className="text-xs sm:text-sm text-white/80 max-w-md">
                    Capturing authentic moments and creating timeless memories through professional photography services in Calgary.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Film Strip Slideshow - Hidden on mobile, visible on lg+ */}
            <div className="hidden lg:flex flex-col justify-center p-4 lg:p-8">
              <div className="bg-black/90 rounded-lg p-3 border-2 border-gray-700 shadow-2xl">
                <div className="space-y-3 lg:space-y-4">
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
                            ? 'ring-2 ring-[#ff8533] scale-105 opacity-100' 
                            : 'opacity-50 hover:opacity-75'
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
              <div className="mt-3 lg:mt-4 text-center">
                <div className="text-xs text-gray-500 font-mono">PROFESSIONAL GRADE</div>
              </div>
            </div>
          </div>

          {/* Slide Indicators - Only show on mobile/tablet since film strip is hidden */}
          <div className="lg:hidden flex justify-center gap-2 pb-6 pt-4">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'bg-[#ff8533] w-6' : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`${themeClasses.bg.secondary} border-t ${themeClasses.border}`}>
        <div className="max-w-7xl mx-auto">
          <div className="py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light">About</h2>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-4">
            <div className="lg:col-span-3 relative min-h-[60vh] sm:min-h-screen">
              <div className="absolute inset-0">
                <img
                  src={photographerPortrait}
                  alt="Yaryack - Professional Photographer"
                  className="w-full h-full object-cover filter grayscale contrast-110"
                />
                <div className="absolute inset-0 bg-black/40"></div>
              </div>

              <div className="relative z-10 p-4 sm:p-6 lg:p-12 xl:p-16 h-full flex flex-col">
                <div className="flex-1">
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16 pb-6 sm:pb-8 lg:pb-10 border-b border-white/20">
                    {stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-light mb-1 sm:mb-2 text-white">
                          {stat.number}
                        </div>
                        <div className="text-xs sm:text-xs text-white/80 uppercase tracking-wider leading-tight">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 sm:mt-auto">
                  <div className="text-base sm:text-lg lg:text-xl text-white leading-relaxed space-y-4 sm:space-y-6 lg:space-y-8 max-w-3xl">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-light">Capturing Your Story</p>
                    <p className="text-white/90 text-sm sm:text-base">
                      Calgary-based photographer with 5+ years specializing in authentic portrait, event, 
                      and wedding photography. Passionate about creating timeless memories.
                    </p>
                    <p className="text-white/90 text-sm sm:text-base">
                      My approach combines technical expertise with artistic vision to capture genuine emotions 
                      and beautiful compositions you'll cherish forever.
                    </p>
                    <div className="text-xl sm:text-2xl lg:text-3xl italic text-[#ff8533] font-light pt-2 sm:pt-4">
                      - Yaryack Photography
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-8 xl:p-12 flex flex-col gap-6 sm:gap-8 lg:gap-10 border-t lg:border-t-0 lg:border-l border-gray-800">
              <div className="border-b border-gray-800 pb-6 sm:pb-8 lg:pb-10">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 lg:mb-5">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#ff8533] rounded-full"></div>
                  <h3 className="text-base sm:text-lg font-light">/ Client Testimonial</h3>
                </div>
                <p className={`text-xs sm:text-sm ${themeClasses.text.secondary} leading-relaxed mb-3 sm:mb-4 lg:mb-5`}>
                  "Yaryack captured our wedding day perfectly! Professional, talented, and truly passionate about photography. The photos exceeded our expectations!"
                </p>
                <p className="text-xs text-[#ff8533]">- Sarah & Mike Johnson</p>
              </div>

              <div className={`${themeClasses.bg.card} border ${themeClasses.border} p-4 sm:p-6 lg:p-8 rounded-lg`}>
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto mb-4 lg:mb-5 overflow-hidden rounded-lg">
                  <img
                    src={heroThumb2}
                    alt="Photography sample"
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                  />
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
      <section id="portfolio" className={`${themeClasses.bg.secondary} border-t ${themeClasses.border} py-8 sm:py-10 lg:py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-4 sm:mb-6 lg:mb-8">Portfolio</h2>

          <div className="flex gap-4 sm:gap-6 lg:gap-8 border-b border-gray-800 mb-6 sm:mb-8 lg:mb-10 overflow-x-auto pb-2">
            {portfolioTabs.map((tab) => (
              <div
                key={tab}
                onClick={() => setActivePortfolioTab(tab)}
                className={`py-3 sm:py-4 text-xs sm:text-sm cursor-pointer transition-colors duration-200 relative whitespace-nowrap ${
                  activePortfolioTab === tab ? "text-[#ff8533]" : `${themeClasses.text.muted} hover:text-[#ff8533]`
                }`}
              >
                {tab}
                {activePortfolioTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff8533]"></div>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-[200px_1fr] gap-6 sm:gap-8 lg:gap-10">
            <div className="lg:block">
              <h3 className={`text-xs sm:text-sm ${themeClasses.text.muted} mb-3 sm:mb-4 lg:mb-5`}>/ Categories</h3>
              <ul className="flex flex-wrap lg:flex-col gap-2 sm:gap-3">
                {categories.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs sm:text-sm cursor-pointer transition-colors duration-200 flex items-center gap-2 sm:gap-3 ${
                      activeCategory === cat
                        ? themeClasses.text.primary
                        : `${themeClasses.text.muted} hover:text-[#ff8533]`
                    }`}
                  >
                    {activeCategory === cat && (
                      <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#ff8533] rounded-full"></div>
                    )}
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Improved Masonry Layout */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 auto-rows-[120px] sm:auto-rows-[150px]">
              {currentPortfolioImages.slice(0, 8).map((img, idx) => {
                // Responsive layout patterns
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
                
                const layout = window.innerWidth < 640 ? mobileLayouts[idx % mobileLayouts.length] : desktopLayouts[idx % desktopLayouts.length];

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
                    {/* View indicator */}
                    <div className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 bg-[#ff8533] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ChevronRight size={12} className="text-black sm:w-4 sm:h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8 sm:mt-10 lg:mt-12">
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-[#ff8533] text-black px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#ff9944] transition-colors duration-200 text-sm sm:text-base"
            >
              View Full Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Services & Process Section */}
      <section id="services" className={`${themeClasses.bg.secondary} border-t ${themeClasses.border} py-12 sm:py-16 lg:py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-8 sm:mb-12 lg:mb-16">Services & Packages</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
            {services.map((service, idx) => (
              <div
                key={idx}
                className={`border ${themeClasses.border} p-4 sm:p-6 lg:p-8 xl:p-10 rounded-lg hover:border-[#ff8533] hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 ${themeClasses.bg.card}`}
              >
                <h3 className="text-lg sm:text-xl font-light mb-4 sm:mb-6 lg:mb-8">{service.name}</h3>
                <p className={`text-xs ${themeClasses.text.muted} leading-relaxed mb-4 sm:mb-6 lg:mb-8`}>
                  {service.description}
                </p>
                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light my-6 sm:my-8 lg:my-10 text-[#ff8533]">
                  {service.price}
                </div>
                <ul className={`text-xs sm:text-sm ${themeClasses.text.secondary} space-y-1 sm:space-y-2 lg:space-y-3 mb-6 sm:mb-8 lg:mb-10`}>
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start">
                      <div className="w-2 h-2 bg-[#ff8533] rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-[#ff8533] text-black py-2 sm:py-3 text-sm font-semibold hover:bg-[#ff9944] transition-colors duration-200 rounded-lg"
                >
                  Book This Package
                </button>
              </div>
            ))}
          </div>

          {/* Process Section */}
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-8 sm:mb-12 lg:mb-16">/ My Process</h2>

            <div className="max-w-4xl">
              {processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col sm:grid sm:grid-cols-[60px_1fr] lg:grid-cols-[80px_1fr] gap-4 sm:gap-6 lg:gap-10 mb-6 sm:mb-8 lg:mb-12 pb-6 sm:pb-8 lg:pb-12 ${
                    idx !== processSteps.length - 1
                      ? `border-b ${themeClasses.border}`
                      : ""
                  }`}
                >
                  <div className={`text-xl sm:text-2xl lg:text-3xl ${themeClasses.text.muted} font-light`}>
                    {step.number} /
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-light mb-2 sm:mb-3 lg:mb-4">{step.title}</h3>
                    <p className={`text-xs sm:text-sm ${themeClasses.text.secondary} leading-relaxed`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative border-t border-gray-800 py-12 sm:py-16 lg:py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&h=1080&fit=crop"
            alt="Photography background"
            className="w-full h-full object-cover filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/55 to-black/50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_70%)]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-center mb-3 text-white">Get in touch</h2>
          <p className="text-xs sm:text-sm text-gray-300 text-center mb-8 sm:mb-12 lg:mb-16 max-w-2xl mx-auto px-4">
            Ready to capture your special moments? Contact me to discuss your photography needs and book your session.
          </p>

          <div className="max-w-4xl mx-auto">
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-12">
              <div className="bg-black/70 backdrop-blur-md border border-gray-700 p-4 sm:p-6 rounded-lg text-center hover:border-[#ff8533] transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#ff8533] rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold mb-1 sm:mb-2 text-white">Email</h3>
                <p className="text-xs text-gray-400 break-all">hello@yaryackphotography.ca</p>
              </div>

              <div className="bg-black/70 backdrop-blur-md border border-gray-700 p-4 sm:p-6 rounded-lg text-center hover:border-[#ff8533] transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#ff8533] rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold mb-1 sm:mb-2 text-white">Phone</h3>
                <p className="text-xs text-gray-400">+1 (587) 123-4567</p>
              </div>

              <div className="bg-black/70 backdrop-blur-md border border-gray-700 p-4 sm:p-6 rounded-lg text-center hover:border-[#ff8533] transition-all duration-300 sm:col-span-2 lg:col-span-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#ff8533] rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold mb-1 sm:mb-2 text-white">Location</h3>
                <p className="text-xs text-gray-400">Calgary, Alberta</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-black/70 backdrop-blur-md border border-gray-700 p-4 sm:p-6 lg:p-8 rounded-lg shadow-2xl">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 mb-3 sm:mb-4 lg:mb-5">
                  <div>
                    <label className="block text-xs text-gray-300 mb-1 sm:mb-2 lg:mb-3 font-medium">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full border bg-black/50 border-gray-700 text-white placeholder-gray-500 p-2 sm:p-3 lg:p-4 text-sm focus:border-[#ff8533] focus:outline-none rounded-lg transition-colors duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-300 mb-1 sm:mb-2 lg:mb-3 font-medium">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full border bg-black/50 border-gray-700 text-white placeholder-gray-500 p-2 sm:p-3 lg:p-4 text-sm focus:border-[#ff8533] focus:outline-none rounded-lg transition-colors duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="mb-3 sm:mb-4 lg:mb-5">
                  <label className="block text-xs text-gray-300 mb-1 sm:mb-2 lg:mb-3 font-medium">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full border bg-black/50 border-gray-700 text-white placeholder-gray-500 p-2 sm:p-3 lg:p-4 text-sm focus:border-[#ff8533] focus:outline-none rounded-lg transition-colors duration-200"
                    placeholder="Your phone number"
                  />
                </div>

                <div className="mb-3 sm:mb-4 lg:mb-5">
                  <label className="block text-xs text-gray-300 mb-1 sm:mb-2 lg:mb-3 font-medium">Service Interest</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleFormChange}
                    className="w-full border bg-black/50 border-gray-700 text-white p-2 sm:p-3 lg:p-4 text-sm focus:border-[#ff8533] focus:outline-none rounded-lg transition-colors duration-200"
                  >
                    <option value="">Select a service</option>
                    <option value="portrait">Portrait Session</option>
                    <option value="event">Event Photography</option>
                    <option value="wedding">Wedding Photography</option>
                    <option value="maternity">Maternity Shoot</option>
                    <option value="engagement">Engagement Session</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-3 sm:mb-4 lg:mb-5">
                  <label className="block text-xs text-gray-300 mb-1 sm:mb-2 lg:mb-3 font-medium">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows="4"
                    className="w-full border bg-black/50 border-gray-700 text-white placeholder-gray-500 p-2 sm:p-3 lg:p-4 text-sm focus:border-[#ff8533] focus:outline-none rounded-lg resize-none transition-colors duration-200"
                    placeholder="Tell me about your project, preferred dates, and any specific requirements..."
                  ></textarea>
                </div>

                <div className="flex items-start gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8 text-xs">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleFormChange}
                    className="w-4 h-4 text-[#ff8533] focus:ring-[#ff8533] border-gray-600 rounded bg-black/50 mt-0.5"
                  />
                  <span className="text-gray-300 text-xs leading-relaxed">
                    I agree to the privacy policy and terms of service
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#ff8533] text-black py-2 sm:py-3 lg:py-4 text-sm font-semibold hover:bg-[#ff9944] disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200 rounded-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Social Media Links */}
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">Follow me on social media</p>
              <div className="flex justify-center gap-3 sm:gap-4">
                {['Instagram', 'Facebook', 'Twitter'].map((social) => (
                  <button
                    key={social}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-black/70 backdrop-blur-md border border-gray-700 rounded-full flex items-center justify-center hover:border-[#ff8533] hover:bg-[#ff8533]/10 transition-all duration-200"
                  >
                    <span className="text-xs text-gray-400 hover:text-[#ff8533]">{social[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${themeClasses.bg.primary} border-t ${themeClasses.border} py-6 sm:py-8 lg:py-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 lg:gap-5">
            <div className="text-base sm:text-lg text-[#ff8533] font-bold">Yaryack Photography</div>
            <ul className="flex gap-4 sm:gap-6 lg:gap-8 text-xs">
              <li>
                <button className={`${themeClasses.text.muted} hover:text-[#ff8533] transition-colors duration-200`}>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className={`${themeClasses.text.muted} hover:text-[#ff8533] transition-colors duration-200`}>
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
            <div className="text-xs text-gray-500 text-center sm:text-right">
              © 2024 Yaryack Photography. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-[#ff8533] text-black p-2 sm:p-3 rounded-full shadow-lg hover:bg-[#ff9944] transition-all duration-300 z-40"
          aria-label="Scroll to top"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-270" />
        </button>
      )}
    </div>
  );
};

export default App;