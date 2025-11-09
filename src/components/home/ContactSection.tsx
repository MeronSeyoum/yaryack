// src/components/home/ContactSection.tsx
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  agree: boolean;
}

export const ContactSection: React.FC = () => {
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

  return (
    <section id="contact" className="relative border-t ds-border-primary py-16 overflow-hidden" style={{
      background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.95) 10%, rgba(0, 0, 0, 0.98) 100%)'
    }}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&h=1080&fit=crop"
          alt="Photography background"
          className="w-full h-full object-cover filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/30 to-emerald-400/70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-2 h-10 rounded-full" style={{ background: 'var(--color-brand-primary)' }}></div>
            <p className="ds-heading-4 uppercase tracking-wider ds-text-secondary">
              Get In Touch
            </p>
          </div>
          <h2 className="ds-heading-2 mb-4 ds-text-primary">
            Let's Create
            <span className="font-semibold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent"> Together </span>
          </h2>
          <p className="ds-body-base ds-text-secondary max-w-2xl mx-auto">
            Ready to capture your special moments? Contact me to discuss your photography needs.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className={`ds-card ds-card-p-md text-center group ${
                  item.title === "Location" ? "hidden lg:block" : ""
                }`}
              >
                <div 
                  className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-105 ds-transition-slow shadow-md"
                  style={{ background: 'linear-gradient(to bottom right, var(--color-brand-primary-light), var(--color-brand-primary))' }}
                >
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="ds-body-base font-semibold mb-2 ds-text-primary">
                  {item.title}
                </h3>
                <p className="ds-body-sm font-medium mb-1" style={{ color: 'var(--color-brand-primary-light)' }}>
                  {item.content}
                </p>
                <p className="ds-body-sm ds-text-tertiary">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="ds-card ds-card-elevated ds-card-p-lg">
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'var(--color-brand-primary)' }}
              >
                <Send className="w-5 h-5 text-white" />
              </div>
              <h3 className="ds-heading-4 ds-text-primary">
                Send a Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block ds-body-sm mb-2 font-medium ds-text-secondary">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="ds-input ds-input-md"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block ds-body-sm mb-2 font-medium ds-text-secondary">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="ds-input ds-input-md"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block ds-body-sm mb-2 font-medium ds-text-secondary">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="ds-input ds-input-md"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label className="block ds-body-sm mb-2 font-medium ds-text-secondary">
                    Service Interest
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleFormChange}
                    className="ds-input ds-input-md"
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
                <label className="block ds-body-sm mb-2 font-medium ds-text-secondary">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                  rows={5}
                  className="ds-input ds-input-md resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl border ds-border-primary" style={{ background: 'var(--color-bg-input)' }}>
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
                  I agree to the privacy policy and terms of service.
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.agree}
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};