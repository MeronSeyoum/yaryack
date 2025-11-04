// src/components/home/ContactSection.tsx
import React, { useState } from 'react';
import { ChevronRight, Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter } from 'lucide-react';
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
            <p className="text-sm text-gray-400 uppercase tracking-wider">Get In Touch</p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">
            Let's Create
            <span className="font-medium bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent"> Together </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Ready to capture your special moments? Contact me to discuss your photography needs and book your session. 
            I'm here to bring your vision to life.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16">
            {contactInfo.map((item, index) => (
              <Card 
                key={index}
                className="bg-gradient-to-b from-gray-900/50 to-black/30 backdrop-blur-sm border border-white/10 p-6 sm:p-8 text-center hover:border-orange-500/30 transition-all duration-500 group"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-orange-500 text-sm sm:text-base font-medium mb-2">{item.content}</p>
                <p className="text-gray-400 text-xs">{item.subtitle}</p>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card className="bg-gradient-to-b from-gray-900/50 to-black/30 backdrop-blur-sm border border-white/10 p-6 sm:p-8 lg:p-10 shadow-2xl">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Send className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Send a Message</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-black/30 border border-white/10 text-white placeholder-gray-500 p-3 sm:p-4 text-sm focus:border-orange-500 focus:outline-none rounded-xl transition-all duration-300 focus:bg-black/50"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-black/30 border border-white/10 text-white placeholder-gray-500 p-3 sm:p-4 text-sm focus:border-orange-500 focus:outline-none rounded-xl transition-all duration-300 focus:bg-black/50"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="w-full bg-black/30 border border-white/10 text-white placeholder-gray-500 p-3 sm:p-4 text-sm focus:border-orange-500 focus:outline-none rounded-xl transition-all duration-300 focus:bg-black/50"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2 font-medium">Service Interest</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleFormChange}
                        className="w-full bg-black/30 border border-white/10 text-white p-3 sm:p-4 text-sm focus:border-orange-500 focus:outline-none rounded-xl transition-all duration-300 focus:bg-black/50"
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
                    <label className="block text-sm text-gray-300 mb-2 font-medium">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      rows={5}
                      className="w-full bg-black/30 border border-white/10 text-white placeholder-gray-500 p-3 sm:p-4 text-sm focus:border-orange-500 focus:outline-none rounded-xl resize-none transition-all duration-300 focus:bg-black/50"
                      placeholder="Tell me about your project, preferred dates, and any specific requirements..."
                    ></textarea>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-black/20 rounded-xl border border-white/5">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={formData.agree}
                      onChange={handleFormChange}
                      className="w-4 h-4 text-orange-500 focus:ring-orange-500 border-gray-600 rounded bg-black/50 mt-1 flex-shrink-0"
                    />
                    <span className="text-gray-300 text-sm leading-relaxed">
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
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Response Time Card */}
              <Card className="bg-gradient-to-br from-orange-500/10 to-amber-600/5 backdrop-blur-sm border border-orange-500/20 p-6 sm:p-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Quick Response</h4>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    I typically respond to all inquiries within 2-4 hours during business days.
                  </p>
                  <div className="text-orange-500 text-sm font-medium">
                    Response Time: 2-4 hours
                  </div>
                </div>
              </Card>

              {/* Social Media */}
              <Card className="bg-gradient-to-b from-gray-900/50 to-black/30 backdrop-blur-sm border border-white/10 p-6 sm:p-8">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-white mb-4">Follow My Work</h4>
                  <p className="text-gray-400 text-sm mb-6">
                    Stay updated with my latest projects and behind-the-scenes content
                  </p>
                  <div className="flex justify-center gap-3">
                    {socialMedia.map((social, index) => (
                      <button
                        key={index}
                        className="w-12 h-12 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 group"
                      >
                        <social.icon className={`w-5 h-5 text-gray-400 ${social.color} transition-colors duration-300`} />
                      </button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Business Hours */}
              <Card className="bg-gradient-to-b from-gray-900/50 to-black/30 backdrop-blur-sm border border-white/10 p-6 sm:p-8">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-white mb-4">Business Hours</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-300">
                      <span>Monday - Friday</span>
                      <span className="text-orange-500">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Saturday</span>
                      <span className="text-orange-500">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
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

// Add the Clock icon component
const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);