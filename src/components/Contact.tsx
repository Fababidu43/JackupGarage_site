import React, { useState } from 'react';
import { Phone, Mail, Send, Clock, MessageSquare } from 'lucide-react';

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
      className="section relative py-12 lg:py-16 particles-bg overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* Éléments décoratifs futuristes */}
      <div className="absolute top-20 left-20 w-36 h-36 border border-orange-500/10 rounded-full animate-rotate"></div>
      <div className="absolute bottom-20 right-20 w-28 h-28 border border-orange-500/20 rounded-full animate-rotate" style={{ animationDirection: 'reverse' }}></div>
      <div className="absolute top-1/2 left-10 w-3 h-3 bg-orange-500 rounded-full animate-float"></div>
      <div className="absolute top-1/3 right-10 w-2 h-2 bg-orange-400 rounded-full animate-pulse-custom"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 animate-fade-up">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center animate-neon-glow">
              <MessageSquare className="w-8 h-8 text-white animate-pulse-custom" />
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight uppercase hover-glow">
            Contact
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-6 animate-neon-glow"></div>
          
          <p className="text-lg font-semibold uppercase text-orange-400 animate-pulse-custom">
            Réponse sous 12h par téléphone ou mail
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info futuriste */}
          <div className="space-y-6 animate-slide-left">
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-sm p-6 shadow-lg rounded-lg border border-orange-500/30 hover-neon">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white mr-3 animate-pulse-custom" style={{ background: 'linear-gradient(135deg, #FF6B35, #FFB366)' }}>
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide uppercase hover-glow">Téléphone</h3>
                  <a 
                    href="tel:+33123456789"
                    className="font-semibold hover:text-white transition-colors text-orange-400"
                  >
                    01 23 45 67 89
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-sm p-6 shadow-lg rounded-lg border border-orange-500/30 hover-neon">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white mr-3 animate-pulse-custom" style={{ background: 'linear-gradient(135deg, #FF6B35, #FFB366)', animationDelay: '0.5s' }}>
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide uppercase hover-glow">Email</h3>
                  <a 
                    href="mailto:contact@jackupgarage.fr"
                    className="font-semibold hover:text-white transition-colors text-orange-400"
                  >
                    contact@jackupgarage.fr
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-sm p-6 shadow-lg rounded-lg border border-orange-500/30 hover-neon">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white mr-3 animate-pulse-custom" style={{ background: 'linear-gradient(135deg, #FF6B35, #FFB366)', animationDelay: '1s' }}>
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide uppercase hover-glow">Horaires</h3>
                  <p className="text-gray-300 font-light text-sm">
                    Lun - Sam: 8h - 18h<br />
                    Dimanche: Sur demande
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form futuriste */}
          <div className="lg:col-span-2 animate-slide-right">
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm p-6 shadow-lg rounded-lg border border-orange-500/30 hover-neon">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-bold text-white mb-2 tracking-wide uppercase">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border-2 border-orange-500/30 focus:border-orange-500 focus:outline-none rounded font-light text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-bold text-white mb-2 tracking-wide uppercase">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border-2 border-orange-500/30 focus:border-orange-500 focus:outline-none rounded font-light text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-bold text-white mb-2 tracking-wide uppercase">
                  Adresse d'intervention *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border-2 border-orange-500/30 focus:border-orange-500 focus:outline-none rounded font-light text-white placeholder-gray-400 transition-all duration-300"
                  placeholder="Adresse complète"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-white mb-2 tracking-wide uppercase">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border-2 border-orange-500/30 focus:border-orange-500 focus:outline-none rounded font-light text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Votre téléphone"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-white mb-2 tracking-wide uppercase">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border-2 border-orange-500/30 focus:border-orange-500 focus:outline-none rounded font-light text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="registration" className="block text-sm font-bold text-white mb-2 tracking-wide uppercase">
                    Immatriculation (facultatif)
                  </label>
                  <input
                    type="text"
                    id="registration"
                    name="registration"
                    value={formData.registration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border-2 border-orange-500/30 focus:border-orange-500 focus:outline-none rounded font-light text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="AB-123-CD"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-bold text-white mb-2 tracking-wide uppercase">
                    Objet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border-2 border-orange-500/30 focus:border-orange-500 focus:outline-none rounded font-light text-white transition-all duration-300"
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
                <label htmlFor="message" className="block text-sm font-bold text-white mb-2 tracking-wide uppercase">
                  Description du problème *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border-2 border-orange-500/30 focus:border-orange-500 focus:outline-none resize-none rounded font-light text-white placeholder-gray-400 transition-all duration-300"
                  placeholder="Décrivez les symptômes, bruits anormaux, ou tout autre détail utile..."
                />
              </div>

              <button
                type="submit"
                className="w-full text-white py-4 px-6 font-bold shadow-lg flex items-center justify-center tracking-wide rounded uppercase transition-all duration-300 hover-neon animate-border-glow"
                style={{ background: 'linear-gradient(135deg, #FF6B35, #FFB366)' }}
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