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
      subtitle: "I'll respond within 24 hours"
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
    <section id="contact" className={`relative border-t ${themeClasses.border} py-12 sm:py-16 lg:py-20 overflow-hidden`}>
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
            <p className={`text-sm uppercase tracking-wider ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Get In Touch
            </p>
          </div>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light mb-4 ${
            themeClasses.text.primary
          }`}>
            Let's Create
            <span className="font-medium bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent"> Together </span>
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Ready to capture your special moments? Contact me to discuss your photography needs and book your session. 
            I'm here to bring your vision to life.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-12">
            {contactInfo.map((item, index) => (
              <Card 
                key={index}
                className={`backdrop-blur-sm border p-6 sm:p-8 text-center transition-all duration-500 group ${
                  isDarkMode
                    ? 'bg-gradient-to-b from-gray-900/50 to-black/30 border-white/10 hover:border-orange-500/30'
                    : 'bg-gradient-to-b from-white/80 to-gray-100/80 border-gray-200 hover:border-orange-500/50'
                }`}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  themeClasses.text.primary
                }`}>
                  {item.title}
                </h3>
                <p className="text-orange-500 text-sm sm:text-base font-medium mb-2">{item.content}</p>
                <p className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {item.subtitle}
                </p>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card className={`backdrop-blur-sm border p-6 sm:p-8 lg:p-10 shadow-xl ${
                isDarkMode
                  ? 'bg-gradient-to-b from-gray-900/50 to-black/30 border-white/10'
                  : 'bg-gradient-to-b from-white/80 to-gray-100/80 border-gray-200'
              }`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Send className="w-4 h-4 text-white" />
                  </div>
                  <h3 className={`text-xl font-semibold ${
                    themeClasses.text.primary
                  }`}>
                    Send a Message
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className={`block text-sm mb-2 font-medium ${
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
                        className={`w-full border text-sm p-3 sm:p-4 focus:border-orange-500 focus:outline-none rounded-xl transition-all duration-300 placeholder-gray-500 ${
                          isDarkMode
                            ? 'bg-black/30 border-white/10 text-white focus:bg-black/50'
                            : 'bg-white/50 border-gray-300 text-gray-900 focus:bg-white'
                        }`}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm mb-2 font-medium ${
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
                        className={`w-full border text-sm p-3 sm:p-4 focus:border-orange-500 focus:outline-none rounded-xl transition-all duration-300 placeholder-gray-500 ${
                          isDarkMode
                            ? 'bg-black/30 border-white/10 text-white focus:bg-black/50'
                            : 'bg-white/50 border-gray-300 text-gray-900 focus:bg-white'
                        }`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className={`block text-sm mb-2 font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className={`w-full border text-sm p-3 sm:p-4 focus:border-orange-500 focus:outline-none rounded-xl transition-all duration-300 placeholder-gray-500 ${
                          isDarkMode
                            ? 'bg-black/30 border-white/10 text-white focus:bg-black/50'
                            : 'bg-white/50 border-gray-300 text-gray-900 focus:bg-white'
                        }`}
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm mb-2 font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Service Interest
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleFormChange}
                        className={`w-full border text-sm p-3 sm:p-4 focus:border-orange-500 focus:outline-none rounded-xl transition-all duration-300 ${
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
                    <label className={`block text-sm mb-2 font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      rows={5}
                      className={`w-full border text-sm p-3 sm:p-4 focus:border-orange-500 focus:outline-none rounded-xl resize-none transition-all duration-300 placeholder-gray-500 ${
                        isDarkMode
                          ? 'bg-black/30 border-white/10 text-white focus:bg-black/50'
                          : 'bg-white/50 border-gray-300 text-gray-900 focus:bg-white'
                      }`}
                      placeholder="Tell me about your project, preferred dates, and any specific requirements..."
                    ></textarea>
                  </div>

                  <div className={`flex items-start gap-3 p-3 rounded-xl border ${
                    isDarkMode 
                      ? 'bg-black/20 border-white/5' 
                      : 'bg-gray-100/50 border-gray-200'
                  }`}>
                    <input
                      type="checkbox"
                      name="agree"
                      checked={formData.agree}
                      onChange={handleFormChange}
                      className={`w-4 h-4 text-orange-500 focus:ring-orange-500 rounded mt-1 flex-shrink-0 ${
                        isDarkMode 
                          ? 'bg-black/50 border-gray-600' 
                          : 'bg-white border-gray-300'
                      }`}
                    />
                    <span className={`text-sm leading-relaxed ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      I agree to the privacy policy and terms of service. Your information is secure and will never be shared with third parties.
                    </span>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.agree}
                    size="lg"
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed py-4"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending Message...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Send className="w-5 h-5" />
                        <span className="text-base font-semibold">Send Message</span>
                        <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Sidebar - Additional Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Response Time Card */}
              <Card className={`backdrop-blur-sm border p-6 sm:p-8 ${
                isDarkMode
                  ? 'bg-gradient-to-br from-orange-500/10 to-amber-600/5 border-orange-500/20'
                  : 'bg-gradient-to-br from-orange-100 to-amber-50 border-orange-200'
              }`}>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h4 className={`text-lg font-semibold mb-2 ${
                    themeClasses.text.primary
                  }`}>
                    Quick Response
                  </h4>
                  <p className={`text-sm leading-relaxed mb-3 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    I typically respond to all inquiries within 2-4 hours during business days.
                  </p>
                  <div className="text-orange-500 text-sm font-medium">
                    Response Time: 2-4 hours
                  </div>
                </div>
              </Card>

              {/* Social Media */}
              <Card className={`backdrop-blur-sm border p-6 sm:p-8 ${
                isDarkMode
                  ? 'bg-gradient-to-b from-gray-900/50 to-black/30 border-white/10'
                  : 'bg-gradient-to-b from-white/80 to-gray-100/80 border-gray-200'
              }`}>
                <div className="text-center">
                  <h4 className={`text-lg font-semibold mb-4 ${
                    themeClasses.text.primary
                  }`}>
                    Follow My Work
                  </h4>
                  <p className={`text-sm mb-6 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Stay updated with my latest projects and behind-the-scenes content
                  </p>
                  <div className="flex justify-center gap-3">
                    {socialMedia.map((social, index) => (
                      <button
                        key={index}
                        className={`w-12 h-12 backdrop-blur-md border rounded-xl flex items-center justify-center hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 group ${
                          isDarkMode
                            ? 'bg-black/50 border-white/10'
                            : 'bg-white/50 border-gray-300'
                        }`}
                      >
                        <social.icon className={`w-5 h-5 transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        } ${social.color}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Business Hours */}
              <Card className={`backdrop-blur-sm border p-6 sm:p-8 ${
                isDarkMode
                  ? 'bg-gradient-to-b from-gray-900/50 to-black/30 border-white/10'
                  : 'bg-gradient-to-b from-white/80 to-gray-100/80 border-gray-200'
              }`}>
                <div className="text-center">
                  <h4 className={`text-lg font-semibold mb-4 ${
                    themeClasses.text.primary
                  }`}>
                    Business Hours
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className={`flex justify-between ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <span>Monday - Friday</span>
                      <span className="text-orange-500">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className={`flex justify-between ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <span>Saturday</span>
                      <span className="text-orange-500">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className={`flex justify-between ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <span>Sunday</span>
                      <span className="text-orange-500">By Appointment</span>
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