// src/components/home/ContactSection.tsx
import React, { useState } from 'react';
import { ChevronRight, Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter, Clock } from 'lucide-react';
import type { FormData } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface ContactSectionProps {
  themeClasses: any;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ themeClasses }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    agree: false,
  });

  // Determine if we're in dark mode
  const isDarkMode = themeClasses.bg.primary.includes('black') || 
                    themeClasses.bg.primary.includes('gray-900') ||
                    themeClasses.bg.primary.includes('gray-800') ||
                    themeClasses.text.primary.includes('white');

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

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "hello@yaryackphotography.ca",
      subtitle: "Response within 24h"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (587) 123-4567",
      subtitle: "Mon-Fri, 9AM-6PM"
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Calgary, Alberta",
      subtitle: "Serving Calgary & area"
    }
  ];

  const socialMedia = [
    { name: 'Instagram', icon: Instagram, color: 'hover:text-pink-500' },
    { name: 'Facebook', icon: Facebook, color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: Twitter, color: 'hover:text-sky-500' }
  ];

  return (
    <section id="contact" className={`relative border-t ${themeClasses.border} py-8 sm:py-12 overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&h=1080&fit=crop"
          alt="Photography background"
          className="w-full h-full object-cover filter grayscale"
        />
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-gradient-to-b from-black/50 via-black/40 to-black/60' 
            : 'bg-gradient-to-b from-white/50 via-white/40 to-white/60'
        }`}></div>
        <div className={`absolute inset-0 ${
          isDarkMode 
            ? 'bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]' 
            : 'bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.8)_100%)]'
        }`}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header - Compact */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-1.5 h-8 bg-orange-500 rounded-full"></div>
            <p className={`text-xl uppercase tracking-wider ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Get In Touch
            </p>
          </div>
          <h2 className={`text-xl sm:text-2xl font-light mb-3 ${
            themeClasses.text.primary
          }`}>
            Let's Create
            <span className="font-medium bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent"> Together </span>
          </h2>
          <p className={`text-xs max-w-2xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Ready to capture your special moments? Contact me to discuss your photography needs.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Contact Info Cards - Compact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {contactInfo.map((item, index) => (
              <Card 
                key={index}
                className={`backdrop-blur-sm border p-4 text-center transition-all duration-500 group ${
                  isDarkMode
                    ? 'bg-gradient-to-b from-gray-900/50 to-black/30 border-white/10 hover:border-orange-500/30'
                    : 'bg-gradient-to-b from-white/80 to-gray-100/80 border-gray-200 hover:border-orange-500/50'
                }`}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md">
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <h3 className={`text-sm font-semibold mb-1 ${
                  themeClasses.text.primary
                }`}>
                  {item.title}
                </h3>
                <p className="text-orange-500 text-xs font-medium mb-1">{item.content}</p>
                <p className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {item.subtitle}
                </p>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
            {/* Contact Form - Compact */}
            <div className="lg:col-span-3">
              <Card className={`backdrop-blur-sm border p-4 sm:p-6 shadow-lg ${
                isDarkMode
                  ? 'bg-gradient-to-b from-gray-900/50 to-black/30 border-white/10'
                  : 'bg-gradient-to-b from-white/80 to-gray-100/80 border-gray-200'
              }`}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <Send className="w-3 h-3 text-white" />
                  </div>
                  <h3 className={`text-lg font-semibold ${
                    themeClasses.text.primary
                  }`}>
                    Send a Message
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className={`block text-xs mb-1 font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        className={`w-full border text-xs p-2.5 focus:border-orange-500 focus:outline-none rounded-lg transition-all duration-300 placeholder-gray-500 ${
                          isDarkMode
                            ? 'bg-black/30 border-white/10 text-white focus:bg-black/50'
                            : 'bg-white/50 border-gray-300 text-gray-900 focus:bg-white'
                        }`}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className={`block text-xs mb-1 font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        className={`w-full border text-xs p-2.5 focus:border-orange-500 focus:outline-none rounded-lg transition-all duration-300 placeholder-gray-500 ${
                          isDarkMode
                            ? 'bg-black/30 border-white/10 text-white focus:bg-black/50'
                            : 'bg-white/50 border-gray-300 text-gray-900 focus:bg-white'
                        }`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className={`block text-xs mb-1 font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className={`w-full border text-xs p-2.5 focus:border-orange-500 focus:outline-none rounded-lg transition-all duration-300 placeholder-gray-500 ${
                          isDarkMode
                            ? 'bg-black/30 border-white/10 text-white focus:bg-black/50'
                            : 'bg-white/50 border-gray-300 text-gray-900 focus:bg-white'
                        }`}
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label className={`block text-xs mb-1 font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Service Interest
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleFormChange}
                        className={`w-full border text-xs p-2.5 focus:border-orange-500 focus:outline-none rounded-lg transition-all duration-300 ${
                          isDarkMode
                            ? 'bg-black/30 border-white/10 text-white focus:bg-black/50'
                            : 'bg-white/50 border-gray-300 text-gray-900 focus:bg-white'
                        }`}
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
                  </div>

                  <div>
                    <label className={`block text-xs mb-1 font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      rows={4}
                      className={`w-full border text-xs p-2.5 focus:border-orange-500 focus:outline-none rounded-lg resize-none transition-all duration-300 placeholder-gray-500 ${
                        isDarkMode
                          ? 'bg-black/30 border-white/10 text-white focus:bg-black/50'
                          : 'bg-white/50 border-gray-300 text-gray-900 focus:bg-white'
                      }`}
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>

                  <div className={`flex items-start gap-2 p-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-black/20 border-white/5' 
                      : 'bg-gray-100/50 border-gray-200'
                  }`}>
                    <input
                      type="checkbox"
                      name="agree"
                      checked={formData.agree}
                      onChange={handleFormChange}
                      className={`w-3.5 h-3.5 text-orange-500 focus:ring-orange-500 rounded mt-0.5 flex-shrink-0 ${
                        isDarkMode 
                          ? 'bg-black/50 border-gray-600' 
                          : 'bg-white border-gray-300'
                      }`}
                    />
                    <span className={`text-xs leading-relaxed ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      I agree to the privacy policy and terms of service.
                    </span>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.agree}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 border-0 shadow-md hover:shadow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed py-2.5 text-sm"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        <span className="font-semibold">Send Message</span>
                        <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Sidebar - Additional Info - Compact */}
            <div className="lg:col-span-2 space-y-4">
              {/* Response Time Card */}
              <Card className={`backdrop-blur-sm border p-4 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-orange-500/10 to-amber-600/5 border-orange-500/20'
                  : 'bg-gradient-to-br from-orange-100 to-amber-50 border-orange-200'
              }`}>
                <div className="text-center">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <h4 className={`text-sm font-semibold mb-1 ${
                    themeClasses.text.primary
                  }`}>
                    Quick Response
                  </h4>
                  <p className={`text-xs leading-relaxed mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    I respond within 2-4 hours on business days.
                  </p>
                  <div className="text-orange-500 text-xs font-medium">
                    Response: 2-4 hours
                  </div>
                </div>
              </Card>

              {/* Social Media */}
              <Card className={`backdrop-blur-sm border p-4 ${
                isDarkMode
                  ? 'bg-gradient-to-b from-gray-900/50 to-black/30 border-white/10'
                  : 'bg-gradient-to-b from-white/80 to-gray-100/80 border-gray-200'
              }`}>
                <div className="text-center">
                  <h4 className={`text-sm font-semibold mb-2 ${
                    themeClasses.text.primary
                  }`}>
                    Follow My Work
                  </h4>
                  <p className={`text-xs mb-3 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Latest projects & behind-the-scenes
                  </p>
                  <div className="flex justify-center gap-2">
                    {socialMedia.map((social, index) => (
                      <button
                        key={index}
                        className={`w-8 h-8 backdrop-blur-md border rounded-lg flex items-center justify-center hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 group ${
                          isDarkMode
                            ? 'bg-black/50 border-white/10'
                            : 'bg-white/50 border-gray-300'
                        }`}
                      >
                        <social.icon className={`w-3.5 h-3.5 transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        } ${social.color}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Business Hours */}
              <Card className={`backdrop-blur-sm border p-4 ${
                isDarkMode
                  ? 'bg-gradient-to-b from-gray-900/50 to-black/30 border-white/10'
                  : 'bg-gradient-to-b from-white/80 to-gray-100/80 border-gray-200'
              }`}>
                <div className="text-center">
                  <h4 className={`text-sm font-semibold mb-2 ${
                    themeClasses.text.primary
                  }`}>
                    Business Hours
                  </h4>
                  <div className="space-y-1 text-xs">
                    <div className={`flex justify-between ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <span>Mon - Fri</span>
                      <span className="text-orange-500">9AM - 6PM</span>
                    </div>
                    <div className={`flex justify-between ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <span>Saturday</span>
                      <span className="text-orange-500">10AM - 4PM</span>
                    </div>
                    <div className={`flex justify-between ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <span>Sunday</span>
                      <span className="text-orange-500">Appointment</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};