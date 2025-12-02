
import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Calendar as CalendarIcon, User, MessageCircle, ChevronDown } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { SectionHeader } from '../ui/SectionHeader';
import emailjs from '@emailjs/browser';

interface FormData {
  username: string;
  email: string;
  phone: string;
  date: string;
  occasion: string;
  message: string;
  agree: boolean;
}

const OCCASION_OPTIONS = [
  "Portrait Session",
  "Event Photography", 
  "Wedding Package",
  "Maternity Shoot",
  "Engagement Session",
  "Family Portrait",
  "Graduation Photos",
  "Commercial Work",
  "Other"
];

// Vite environment variables - IMPORTANT: Use import.meta.env
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Fallback values in case env variables are not set
const SERVICE_ID = EMAILJS_SERVICE_ID || 'service_5v11ynl';
const TEMPLATE_ID = EMAILJS_TEMPLATE_ID || 'template_7mb1byt';
const PUBLIC_KEY = EMAILJS_PUBLIC_KEY || '8HSbZX-_Fb9w8dP0N';

export const ContactSection: React.FC = () => {
  const { isDarkMode } = useTheme();
  const form = useRef<HTMLFormElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [showOccasionDropdown, setShowOccasionDropdown] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    phone: "",
    date: "",
    occasion: "",
    message: "",
    agree: false,
  });
  
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [errorFound, setErrorFound] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize date input placeholder behavior
  useEffect(() => {
    const input = dateRef.current;
    if (input) {
      // Set initial placeholder
      if (!formData.date) {
        input.value = "Pick a date";
      }
      
      const handleFocus = () => {
        if (input.value === "Pick a date") {
          input.value = "";
          input.type = "date";
          // Set min date to today
          const today = new Date().toISOString().split('T')[0];
          input.min = today;
        }
      };
      
      const handleBlur = () => {
        if (input.value === "" || !input.value) {
          input.type = "text";
          input.value = "Pick a date";
          setFormData(prev => ({ ...prev, date: "" }));
        }
      };

      input.addEventListener("focus", handleFocus);
      input.addEventListener("blur", handleBlur);
      
      return () => {
        input.removeEventListener("focus", handleFocus);
        input.removeEventListener("blur", handleBlur);
      };
    }
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleOccasionSelect = (occasion: string) => {
    setFormData(prev => ({ ...prev, occasion }));
    setShowOccasionDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.username || !formData.email || !formData.date || formData.date === "Pick a date") {
      setErrorFound(true);
      return;
    }
    
    setErrorFound(false);
    setIsSubmitting(true);

    try {
      // Send email using EmailJS with environment variables
      if (form.current) {
        await emailjs.sendForm(
          SERVICE_ID,
          TEMPLATE_ID,
          form.current,
          PUBLIC_KEY
        );
      }
      
      setIsFormSubmitted(true);
      setFormData({
        username: "",
        email: "",
        phone: "",
        date: "",
        occasion: "",
        message: "",
        agree: false,
      });
      
      // Reset date input
      if (dateRef.current) {
        dateRef.current.type = "text";
        dateRef.current.value = "Pick a date";
      }
      
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error sending your message. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "yaredyacob88@gmail.com",
      href: "mailto:yaredyacob88@gmail.com",
      subtitle: "Response within 24h"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (403) 561-9596",
      href: "tel:+1 (403) 561-9596",
      subtitle: "Mon-Fri, 9AM-6PM"
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Calgary, Alberta",
      subtitle: "Serving Calgary & area"
    }
  ];

  return (
    <section 
      id="contact" 
      className="relative border-t ds-border-primary overflow-hidden" 
      style={{
        background: isDarkMode 
          ? 'linear-gradient(to bottom, rgba(6, 95, 70, 0.2) 0%, rgba(2, 44, 34, 0.4) 100%)'
          : 'linear-gradient(to bottom, rgba(249, 250, 251, 0.95) 0%, rgba(243, 244, 246, 0.98) 100%)',
      }}
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&h=1080&fit=crop"
          alt="Photography background"
          className="w-full h-full object-cover"
          style={{ 
            filter: isDarkMode ? 'grayscale(100%) brightness(0.5)' : 'grayscale(100%) brightness(0.8)',
            opacity: isDarkMode ? 0.4 : 0.3
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: isDarkMode
              ? 'linear-gradient(to bottom, rgba(6, 95, 70, 0.2) 0%, rgba(2, 44, 34, 0.3) 50%, rgba(6, 95, 70, 0.15) 100%)'
              : 'linear-gradient(to bottom, rgba(249, 250, 251, 0.85) 0%, rgba(243, 244, 246, 0.92) 50%, rgba(10, 92, 46, 0.1) 100%)'
          }}
        />
      </div>

      <div className="relative z-10">
        <SectionHeader 
          title="Contact" 
          subtitle="Get In Touch" 
          swap={true}
        />
        
        <div className="mx-auto px-4 sm:px-6 lg:px-16 py-8">
          <div className="text-center mb-8">
            <h2 className="ds-heading-2 mb-4 ds-text-primary">
              Let's Create&nbsp;
              <span 
                className="font-semibold"
                style={{ 
                  background: 'linear-gradient(to right, var(--color-brand-primary-light), var(--color-brand-primary))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >Together
              </span>
            </h2>
            <p className="lg:block hidden ds-body-base ds-text-secondary max-w-2xl mx-auto">
              Ready to capture your special moments? Contact me to discuss your photography needs.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="max-w-5xl mx-auto">
            <div className="lg:grid hidden grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href || '#'}
                  className={`text-center group ds-transition-slow hover:scale-105 rounded-2xl p-6 border ${
                    !item.href ? 'cursor-default' : ''
                  }`}
                  style={{
                    background: isDarkMode 
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(255, 255, 255, 0.9)',
                    borderColor: isDarkMode
                      ? 'rgba(255, 255, 255, 0.2)'
                      : 'rgba(10, 92, 46, 0.2)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                  onClick={(e) => {
                    if (!item.href) e.preventDefault();
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-105 ds-transition-slow shadow-md"
                    style={{ 
                      background: 'linear-gradient(to bottom right, var(--color-brand-primary-light), var(--color-brand-primary))' 
                    }}
                  >
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="ds-body-base font-semibold mb-2 ds-text-primary">
                    {item.title}
                  </h3>
                  <p 
                    className="ds-body-sm font-medium mb-1 ds-text-primary"
                    style={{ 
                      color: isDarkMode ? 'var(--color-text-primary)' : 'var(--color-brand-primary)'
                    }}
                  >
                    {item.content}
                  </p>
                  <p className="ds-body-sm" style={{ 
                    color: isDarkMode ? 'var(--color-text-secondary)' : 'var(--color-text-secondary)'
                  }}>
                    {item.subtitle}
                  </p>
                </a>
              ))}
            </div>

            {/* Form Section */}
            {isFormSubmitted ? (
              <div 
                className="max-w-3xl mx-auto rounded-2xl p-12 text-center border ds-transition-slow"
                style={{
                  background: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(255, 255, 255, 0.95)',
                  borderColor: isDarkMode
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'rgba(10, 92, 46, 0.2)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                  style={{ 
                    background: 'linear-gradient(to bottom right, var(--color-brand-primary-light), var(--color-brand-primary))' 
                  }}
                >
                  <Send className="w-10 h-10 text-white" />
                </div>
                <h3 className="ds-heading-3 mb-4 ds-text-primary">
                  Thank you for getting in touch!
                </h3>
                <p className="ds-body-base ds-text-secondary mb-2">
                  I'll respond to your message within 24 hours.
                </p>
                <p className="ds-body-sm ds-text-tertiary">
                  In the meantime, feel free to explore more of my portfolio.
                </p>
              </div>
            ) : (
              <div 
                className="rounded-2xl p-6 lg:p-8 border ds-transition-slow"
                style={{
                  background: isDarkMode 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(255, 255, 255, 0.95)',
                  borderColor: isDarkMode
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'rgba(10, 92, 46, 0.2)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
                    style={{ 
                      background: 'linear-gradient(to bottom right, var(--color-brand-primary-light), var(--color-brand-primary))'
                    }}
                  >
                    <CalendarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="ds-heading-4 ds-text-primary">
                      Get a quote today
                    </h3>
                    {errorFound && (
                      <p className="ds-body-sm mt-1" style={{ color: '#ef4444' }}>
                        Please fill all mandatory fields (*)
                      </p>
                    )}
                  </div>
                </div>

                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block ds-body-sm mb-2 font-medium ds-text-secondary">
                        Your Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 ds-text-secondary" />
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleFormChange}
                          required
                          className="ds-input ds-input-md pl-10"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block ds-body-sm mb-2 font-medium ds-text-secondary">
                        Your Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 ds-text-secondary" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          required
                          className="ds-input ds-input-md pl-10"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block ds-body-sm mb-2 font-medium ds-text-secondary">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 ds-text-secondary" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          className="ds-input ds-input-md pl-10"
                          placeholder="+1 (403) 123-4567"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block ds-body-sm mb-2 font-medium ds-text-secondary">
                        Occasion Date *
                      </label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 ds-text-secondary" />
                        <input
                          ref={dateRef}
                          type="text"
                          name="date"
                          value={formData.date}
                          onChange={handleFormChange}
                          required
                          className="ds-input ds-input-md pl-10"
                          placeholder="Pick a date"
                          onFocus={(e) => {
                            if (e.target.value === "Pick a date") {
                              e.target.value = "";
                              e.target.type = "date";
                              // Set min date to today
                              const today = new Date().toISOString().split('T')[0];
                              e.target.min = today;
                            }
                          }}
                          onBlur={(e) => {
                            if (e.target.value === "" || !e.target.value) {
                              e.target.type = "text";
                              e.target.value = "Pick a date";
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Occasion Selection */}
                  <div>
                    <label className="block ds-body-sm mb-2 font-medium ds-text-secondary">
                      Type of Occasion
                    </label>
                    <div className="relative">
                      <div 
                        className="ds-input ds-input-md cursor-pointer flex items-center justify-between"
                        onClick={() => setShowOccasionDropdown(!showOccasionDropdown)}
                      >
                        <span className={formData.occasion ? "ds-text-primary" : "ds-text-secondary"}>
                          {formData.occasion || "Select occasion type"}
                        </span>
                        <ChevronDown className={`w-4 h-4 ds-text-secondary transition-transform ${showOccasionDropdown ? 'rotate-180' : ''}`} />
                      </div>
                      
                      {showOccasionDropdown && (
                        <div 
                          className="absolute z-10 mt-1 w-full rounded-lg border shadow-lg max-h-60 overflow-y-auto"
                          style={{
                            background: isDarkMode ? 'var(--color-bg-card)' : 'var(--color-bg-primary)',
                            borderColor: 'var(--color-border-primary)'
                          }}
                        >
                          {OCCASION_OPTIONS.map((option) => (
                            <div
                              key={option}
                              className="px-4 py-3 cursor-pointer hover:bg-opacity-10 transition-colors ds-transition-base"
                              style={{
                                background: formData.occasion === option 
                                  ? 'rgba(var(--color-brand-primary-rgb), 0.1)' 
                                  : 'transparent',
                                color: formData.occasion === option 
                                  ? 'var(--color-brand-primary)' 
                                  : 'var(--color-text-primary)',
                                borderBottom: '1px solid var(--color-border-primary)'
                              }}
                              onClick={() => handleOccasionSelect(option)}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Hidden input for form submission */}
                      <input
                        type="hidden"
                        name="occasion"
                        value={formData.occasion}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block ds-body-sm mb-2 font-medium ds-text-secondary">
                      Your Message
                    </label>
                    <div className="relative">
                      <MessageCircle className="absolute left-4 top-4 w-4 h-4 ds-text-secondary" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        rows={4}
                        className="ds-input ds-input-md resize-none pl-10"
                        placeholder="Tell me about your occasion, any special requests, or questions you might have..."
                      />
                    </div>
                  </div>

                  <div 
                    className="flex items-start gap-3 p-4 rounded-xl border" 
                    style={{ 
                      background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'var(--color-bg-input)',
                      borderColor: 'var(--color-border-primary)'
                    }}
                  >
                    <input
                      type="checkbox"
                      name="agree"
                      checked={formData.agree}
                      onChange={handleFormChange}
                      className="w-4 h-4 mt-0.5 flex-shrink-0 rounded"
                      style={{ 
                        accentColor: 'var(--color-brand-primary)',
                        background: 'var(--color-bg-input-focus)',
                        border: '1px solid var(--color-border-primary)'
                      }}
                    />
                    <span className="ds-body-sm ds-text-secondary">
                      I agree that Yaryack Photography can contact me regarding my inquiry.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full ds-btn ds-btn-primary ds-btn-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                  
                  <p className="text-center ds-body-xs ds-text-tertiary mt-4">
                    * Required fields
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};