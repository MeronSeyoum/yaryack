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
    <section id="contact" className="relative border-t border-emerald-500/20 py-8 sm:py-12 overflow-hidden" style={{
      background: 'linear-gradient(to bottom, rgba(6, 78, 59, 0.95) 10%, rgba(4, 47, 46, 0.98) 100%)'
    }}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&h=1080&fit=crop"
          alt="Photography background"
          className="w-full h-full object-cover filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/0 via-emerald-900/30 to-emerald-900/70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,78,59,0.8)_100%)]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header - Compact */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-1.5 h-8 bg-emerald-400 rounded-full"></div>
            <p className="text-xl uppercase tracking-wider text-white/80">
              Get In Touch
            </p>
          </div>
          <h2 className="text-xl sm:text-2xl font-light mb-3 text-white">
            Let's Create
            <span className="font-medium bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> Together </span>
          </h2>
          <p className="text-xs max-w-2xl mx-auto leading-relaxed text-white/80">
            Ready to capture your special moments? Contact me to discuss your photography needs.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Contact Info Cards - Compact with email and phone in same row on mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {contactInfo.map((item, index) => (
              <Card 
                key={index}
                className={`backdrop-blur-sm border border-emerald-500/20 p-4 text-center transition-all duration-500 group bg-emerald-900/70 hover:border-emerald-400/50 ${
                  // Hide location on mobile, show on desktop
                  item.title === "Location" ? "hidden lg:block" : ""
                }`}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md">
                  <item.icon className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-semibold mb-1 text-white">
                  {item.title}
                </h3>
                <p className="text-emerald-400 text-xs font-medium mb-1">{item.content}</p>
                <p className="text-xs text-white/80">
                  {item.subtitle}
                </p>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Contact Form - Compact */}
            <div className="lg:col-span-3">
              <Card className="backdrop-blur-sm border border-emerald-500/40 p-4 sm:p-6 shadow-lg bg-emerald-900/80">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Send className="w-3 h-3 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Send a Message
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs mb-1 font-medium text-white/90">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        className="w-full border border-emerald-500/20 text-xs p-2.5 focus:border-emerald-400 focus:outline-none rounded-lg transition-all duration-300 placeholder-white/60 bg-emerald-900/30 text-white focus:bg-emerald-900/50"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1 font-medium text-white/90">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        className="w-full border border-emerald-500/20 text-xs p-2.5 focus:border-emerald-400 focus:outline-none rounded-lg transition-all duration-300 placeholder-white/60 bg-emerald-900/30 text-white focus:bg-emerald-900/50"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs mb-1 font-medium text-white/90">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="w-full border border-emerald-500/20 text-xs p-2.5 focus:border-emerald-400 focus:outline-none rounded-lg transition-all duration-300 placeholder-white/60 bg-emerald-900/30 text-white focus:bg-emerald-900/50"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1 font-medium text-white/90">
                        Service Interest
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleFormChange}
                        className="w-full border border-emerald-500/20 text-xs p-2.5 focus:border-emerald-400 focus:outline-none rounded-lg transition-all duration-300 bg-emerald-900/30 text-white focus:bg-emerald-900/50"
                      >
                        <option value="" className="bg-emerald-900">Select a service</option>
                        <option value="portrait" className="bg-emerald-900">Portrait Session</option>
                        <option value="event" className="bg-emerald-900">Event Photography</option>
                        <option value="wedding" className="bg-emerald-900">Wedding Photography</option>
                        <option value="maternity" className="bg-emerald-900">Maternity Shoot</option>
                        <option value="engagement" className="bg-emerald-900">Engagement Session</option>
                        <option value="other" className="bg-emerald-900">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs mb-1 font-medium text-white/90">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      rows={4}
                      className="w-full border border-emerald-500/20 text-xs p-2.5 focus:border-emerald-400 focus:outline-none rounded-lg resize-none transition-all duration-300 placeholder-white/60 bg-emerald-900/30 text-white focus:bg-emerald-900/50"
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>

                  <div className="flex items-start gap-2 p-2 rounded-lg border border-emerald-500/20 bg-emerald-900/30">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={formData.agree}
                      onChange={handleFormChange}
                      className="w-3.5 h-3.5 text-emerald-500 focus:ring-emerald-500 rounded mt-0.5 flex-shrink-0 bg-emerald-900/50 border-emerald-500/30"
                    />
                    <span className="text-xs leading-relaxed text-white/90">
                      I agree to the privacy policy and terms of service.
                    </span>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.agree}
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 border-0 shadow-md hover:shadow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed py-2.5 text-sm"
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

            {/* Sidebar - Additional Info - Hidden on mobile */}
            {/* <div className="lg:col-span-2 space-y-4 hidden lg:block"> */}
              {/* Social Media */}
              {/* <Card className="backdrop-blur-sm border border-emerald-500/20 p-4 bg-emerald-900/40">
                <div className="text-center">
                  <h4 className="text-sm font-semibold mb-2 text-white">
                    Follow My Work
                  </h4>
                  <p className="text-xs mb-3 text-white/80">
                    Latest projects & behind-the-scenes
                  </p>
                  <div className="flex justify-center gap-2">
                    {socialMedia.map((social, index) => (
                      <button
                        key={index}
                        className="w-8 h-8 backdrop-blur-md border border-emerald-500/20 rounded-lg flex items-center justify-center hover:border-emerald-400 hover:bg-emerald-500/10 transition-all duration-300 group bg-emerald-900/30"
                      >
                        <social.icon className={`w-3.5 h-3.5 transition-colors duration-300 text-white/80 ${social.color}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </Card> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};