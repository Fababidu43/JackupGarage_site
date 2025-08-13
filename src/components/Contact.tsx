import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Send, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    registration: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section 
      id="contact" 
      className="section relative py-12 lg:py-16 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F6F6F6 0%, #F0F1F3 25%, #FAFBFC 50%, #F0F1F3 75%, #F6F6F6 100%)' }}
    >
      {/* Éléments décoratifs subtils */}
      <div className="absolute inset-0 opacity-4">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-16 w-28 h-28 bg-gradient-to-tl from-orange-100 to-yellow-100 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-to-r from-red-100 to-orange-100 rounded-full blur-lg"></div>
      </div>
      
      {/* Motif géométrique subtil */}
      <div className="absolute inset-0 opacity-2">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(222,81,33,0.1) 1px, transparent 1px),
                           radial-gradient(circle at 70% 60%, rgba(222,81,33,0.05) 1px, transparent 1px)`,
          backgroundSize: '80px 80px, 120px 120px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight uppercase">
            Contact
          </h2>
          <p className="text-lg font-semibold uppercase" style={{ color: '#DE5121' }}>
            Réponse sous 12h par téléphone ou mail
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white mr-3" style={{ background: '#DE5121' }}>
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 tracking-wide uppercase">Téléphone</h3>
                  <a 
                    href="tel:+33123456789"
                    className="font-semibold hover:opacity-80"
                    style={{ color: '#DE5121' }}
                  >
                    01 23 45 67 89
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 shadow-lg rounded-lg">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white mr-3" style={{ background: '#DE5121' }}>
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 tracking-wide uppercase">Email</h3>
                  <a 
                    href="mailto:contact@jackupgarage.fr"
                    className="font-semibold hover:opacity-80"
                    style={{ color: '#DE5121' }}
                  >
                    contact@jackupgarage.fr
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 shadow-lg rounded-lg">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white mr-3" style={{ background: '#DE5121' }}>
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 tracking-wide uppercase">Horaires</h3>
                  <p className="text-gray-700 font-light text-sm">
                    Lun - Sam: 8h - 18h<br />
                    Dimanche: Sur demande
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-bold text-gray-900 mb-2 tracking-wide uppercase">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none rounded font-light"
                    style={{ '--focus-border-color': '#DE5121' } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-bold text-gray-900 mb-2 tracking-wide uppercase">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none rounded font-light"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-bold text-gray-900 mb-2 tracking-wide uppercase">
                  Adresse d'intervention *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none rounded font-light"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2 tracking-wide uppercase">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none rounded font-light"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2 tracking-wide uppercase">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none rounded font-light"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="registration" className="block text-sm font-bold text-gray-900 mb-2 tracking-wide uppercase">
                    Immatriculation (facultatif)
                  </label>
                  <input
                    type="text"
                    id="registration"
                    name="registration"
                    value={formData.registration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none rounded font-light"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-bold text-gray-900 mb-2 tracking-wide uppercase">
                    Objet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none rounded font-light"
                  >
                    <option value="">Sélectionner</option>
                    <option value="entretien">Entretien / Vidange</option>
                    <option value="embrayage">Embrayage / Volant moteur</option>
                    <option value="distribution">Kit distribution</option>
                    <option value="suspension">Suspensions / Amortisseurs</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2 tracking-wide uppercase">
                  Description du problème *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none resize-none rounded font-light"
                  placeholder="Décrivez les symptômes, bruits anormaux, ou tout autre détail utile..."
                />
              </div>

              <button
                type="submit"
                className="w-full text-white py-4 px-6 font-bold hover:opacity-90 shadow-lg flex items-center justify-center tracking-wide rounded uppercase"
                style={{ background: '#DE5121' }}
              >
                <Send className="w-5 h-5 mr-2" />
                Envoyer la demande
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;