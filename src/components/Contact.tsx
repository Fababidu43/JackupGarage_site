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
      className="section relative py-8 lg:py-12 reveal-on-scroll diagonal-cut-top-backslash"
      style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)' }}
    >
      <div className="relative z-10">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
              <Phone className="w-6 h-6" />
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4 tracking-tight uppercase font-futuristic">
              Contact
            </h2>
            <p className="text-base sm:text-lg font-semibold uppercase font-tech px-4 text-orange-400">
              Réponse sous 12h par téléphone ou mail
            </p>
            <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full mt-3"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 shadow-xl rounded-lg border border-orange-500/30 glow-hover hover-scale border-glow subtle-glow animated-border">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-white mr-3 pulse-subtle" style={{ background: '#FF6B35' }}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-wide uppercase font-futuristic hover-glow-text">Téléphone</h3>
                    <a 
                      href="tel:+33630703036"
                      className="font-semibold hover:opacity-80 font-tech hover-lift text-sm sm:text-base"
                      style={{ color: '#FF6B35' }}
                    >
                      06 30 70 30 36
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 shadow-xl rounded-lg border border-orange-500/30 glow-hover hover-scale border-glow subtle-glow animated-border">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-white mr-3 pulse-subtle" style={{ background: '#FF6B35' }}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-wide uppercase font-futuristic hover-glow-text">Email</h3>
                    <a 
                      href="mailto:fabian.measson123@gmail.com"
                      className="font-semibold hover:opacity-80 font-tech hover-lift text-sm sm:text-base break-all"
                      style={{ color: '#FF6B35' }}
                    >
                      fabian.measson123@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 shadow-xl rounded-lg border border-orange-500/30 glow-hover hover-scale border-glow subtle-glow animated-border">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-white mr-3 pulse-subtle" style={{ background: '#FF6B35' }}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-wide uppercase font-futuristic hover-glow-text">Horaires</h3>
                    <p className="text-gray-600 font-light text-xs sm:text-sm font-tech">
                      Lun - Sam: 8h - 18h<br />
                      Dimanche: Sur demande
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-black/90 backdrop-blur-sm p-4 sm:p-6 shadow-2xl rounded-lg border-2 border-orange-500/40 hover-scale border-glow subtle-glow animated-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-xs sm:text-sm font-bold text-white mb-1 sm:mb-2 tracking-wide uppercase font-tech">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/95 border-2 border-gray-300 text-gray-900 focus:border-orange-500 focus:outline-none rounded font-light font-tech glow-focus text-sm min-h-[44px] transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xs sm:text-sm font-bold text-white mb-1 sm:mb-2 tracking-wide uppercase font-tech">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/95 border-2 border-gray-300 text-gray-900 focus:border-orange-500 focus:outline-none rounded font-light font-tech glow-focus text-sm min-h-[44px] transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="mb-3 sm:mb-4">
                  <label htmlFor="address" className="block text-xs sm:text-sm font-bold text-white mb-1 sm:mb-2 tracking-wide uppercase font-tech">
                    Adresse d'intervention *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/95 border-2 border-gray-300 text-gray-900 focus:border-orange-500 focus:outline-none rounded font-light font-tech glow-focus text-sm min-h-[44px] transition-all duration-200"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-bold text-white mb-1 sm:mb-2 tracking-wide uppercase font-tech">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/95 border-2 border-gray-300 text-gray-900 focus:border-orange-500 focus:outline-none rounded font-light font-tech glow-focus text-sm min-h-[44px] transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-bold text-white mb-1 sm:mb-2 tracking-wide uppercase font-tech">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/95 border-2 border-gray-300 text-gray-900 focus:border-orange-500 focus:outline-none rounded font-light font-tech glow-focus text-sm min-h-[44px] transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div>
                    <label htmlFor="registration" className="block text-xs sm:text-sm font-bold text-white mb-1 sm:mb-2 tracking-wide uppercase font-tech">
                      Immatriculation (facultatif)
                    </label>
                    <input
                      type="text"
                      id="registration"
                      name="registration"
                      value={formData.registration}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/95 border-2 border-gray-300 text-gray-900 focus:border-orange-500 focus:outline-none rounded font-light font-tech glow-focus text-sm min-h-[44px] transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs sm:text-sm font-bold text-white mb-1 sm:mb-2 tracking-wide uppercase font-tech">
                      Objet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/95 border-2 border-gray-300 text-gray-900 focus:border-orange-500 focus:outline-none rounded font-light font-tech glow-focus text-sm min-h-[44px] transition-all duration-200"
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

                <div className="mb-4 sm:mb-6">
                  <label htmlFor="message" className="block text-xs sm:text-sm font-bold text-white mb-1 sm:mb-2 tracking-wide uppercase font-tech">
                    Description du problème *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/95 border-2 border-gray-300 text-gray-900 focus:border-orange-500 focus:outline-none resize-none rounded font-light font-tech glow-focus text-sm min-h-[80px] transition-all duration-200"
                    placeholder="Décrivez les symptômes, bruits anormaux, ou tout autre détail utile..."
                  />
                </div>

                {/* Case à cocher sol dur */}
                <div className="mb-4 sm:mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 flex-shrink-0"
                      required
                    />
                    <span className="text-xs sm:text-sm font-medium text-white font-tech">
                      J'ai un sol dur et plat disponible *
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-3 sm:py-4 px-4 sm:px-6 font-bold shadow-lg flex items-center justify-center tracking-wide rounded uppercase font-tech glow-hover hover-scale morph-button subtle-glow text-sm min-h-[48px]"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Envoyer la demande
                </button>
                
                <p className="text-center text-xs sm:text-sm text-white/60 mt-3 sm:mt-4 font-tech">
                  Retour par mail ou téléphone sous 12 h.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;