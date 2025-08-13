import React, { useState } from 'react';
import { Phone, Mail, Send, Clock, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    licensePlate: '',
    subject: '',
    description: '',
    consent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.consent) newErrors.consent = 'You must accept the privacy policy';

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 bg-base-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-base-700 rounded-xl p-12">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-display font-bold text-text-primary mb-4">
              Message Sent Successfully!
            </h2>
            <p className="text-text-muted mb-6">
              Thank you for your request. We will reply within 12 hours by phone or email.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-brand-500 hover:text-brand-400 font-medium"
            >
              Send another message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-base-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-text-primary mb-4">
            Contact & Booking
          </h2>
          <div className="inline-flex items-center px-4 py-2 bg-brand-500/20 border border-brand-500/30 rounded-full">
            <Clock className="w-4 h-4 mr-2 text-brand-400" />
            <span className="text-sm font-medium text-brand-400">Reply within 12h</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-base-700 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-500 rounded-lg flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold text-text-primary">Phone</h3>
                  <a 
                    href="tel:+33123456789"
                    className="text-brand-400 hover:text-brand-300 font-medium"
                  >
                    01 23 45 67 89
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-base-700 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-500 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold text-text-primary">Email</h3>
                  <a 
                    href="mailto:contact@jackupgarage.fr"
                    className="text-brand-400 hover:text-brand-300 font-medium"
                  >
                    contact@jackupgarage.fr
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-base-700 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-500 rounded-lg flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold text-text-primary">Hours</h3>
                  <p className="text-text-muted text-sm">
                    Mon - Sat: 8am - 6pm<br />
                    Sunday: On request
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-base-700 rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-text-primary mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-base-800 border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                      errors.firstName ? 'border-red-500' : 'border-white/10'
                    }`}
                  />
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-text-primary mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-base-800 border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                      errors.lastName ? 'border-red-500' : 'border-white/10'
                    }`}
                  />
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="address" className="block text-sm font-medium text-text-primary mb-2">
                  Intervention Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-base-800 border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                    errors.address ? 'border-red-500' : 'border-white/10'
                  }`}
                />
                {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-base-800 border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                      errors.phone ? 'border-red-500' : 'border-white/10'
                    }`}
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-base-800 border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                      errors.email ? 'border-red-500' : 'border-white/10'
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="licensePlate" className="block text-sm font-medium text-text-primary mb-2">
                    License Plate (optional but recommended)
                  </label>
                  <input
                    type="text"
                    id="licensePlate"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-base-800 border border-white/10 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-base-800 border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                      errors.subject ? 'border-red-500' : 'border-white/10'
                    }`}
                  >
                    <option value="">Select a service</option>
                    <option value="maintenance">Maintenance (oil & brakes)</option>
                    <option value="clutch">Clutch & flywheel</option>
                    <option value="timing">Timing belt kits</option>
                    <option value="suspension">Shocks, suspension, joints</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-2">
                  Problem Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe symptoms, unusual noises, or any other useful details..."
                  className={`w-full px-4 py-3 bg-base-800 border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none ${
                    errors.description ? 'border-red-500' : 'border-white/10'
                  }`}
                />
                {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
              </div>

              <div className="mb-6">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 mr-3 w-4 h-4 text-brand-500 bg-base-800 border-white/10 rounded focus:ring-brand-500 focus:ring-2"
                  />
                  <span className="text-sm text-text-muted">
                    I agree to the processing of my personal data in accordance with the{' '}
                    <a href="/privacy" className="text-brand-400 hover:text-brand-300">privacy policy</a> *
                  </span>
                </label>
                {errors.consent && <p className="text-red-400 text-sm mt-1">{errors.consent}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-brand-500 text-white py-4 px-6 font-semibold hover:bg-brand-400 rounded-lg transition-all duration-300 hover:shadow-glow flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-base-700"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;