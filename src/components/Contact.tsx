import React, { useState } from 'react';
import { Send, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    registration: '',
    subject: '',
    message: '',
    hasFlatSurface: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Ici vous ajouterez l'envoi vers votre endpoint
  };

  return (
    <section id="contact" className="py-20 bg-brand-steel text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Informations de contact */}
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-3xl mb-4">Demande de rendez-vous</h2>
              <p className="text-white/80">
                Remplissez le formulaire pour une intervention à domicile.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-brand-ink/60 rounded-lg border border-brand-line">
                <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold">Téléphone</h3>
                  <a 
                    href="tel:+33123456789"
                    className="text-brand-orange hover-allowed hover:text-brand-orange2"
                  >
                    01 23 45 67 89
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-brand-ink/60 rounded-lg border border-brand-line">
                <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a 
                    href="mailto:contact@jackupgarage.fr"
                    className="text-brand-orange hover-allowed hover:text-brand-orange2"
                  >
                    contact@jackupgarage.fr
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-brand-ink/60 rounded-lg border border-brand-line">
                <div className="w-10 h-10 bg-brand-orange rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold">Horaires</h3>
                  <p className="text-white/70 text-sm">
                    Lun - Sam: 8h - 18h<br />
                    Dimanche: Sur demande
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Nom"
                  className="bg-brand-ink/60 border border-brand-line rounded px-3 py-2 text-white placeholder-white/50 focus-ring"
                />
                <input
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Prénom"
                  className="bg-brand-ink/60 border border-brand-line rounded px-3 py-2 text-white placeholder-white/50 focus-ring"
                />
              </div>
              
              <input
                required
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Adresse complète d'intervention"
                className="w-full bg-brand-ink/60 border border-brand-line rounded px-3 py-2 text-white placeholder-white/50 focus-ring"
              />
              
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Téléphone"
                  className="bg-brand-ink/60 border border-brand-line rounded px-3 py-2 text-white placeholder-white/50 focus-ring"
                />
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="bg-brand-ink/60 border border-brand-line rounded px-3 py-2 text-white placeholder-white/50 focus-ring"
                />
              </div>
              
              <input
                name="registration"
                value={formData.registration}
                onChange={handleChange}
                placeholder="Immatriculation (facultatif mais recommandé)"
                className="w-full bg-brand-ink/60 border border-brand-line rounded px-3 py-2 text-white placeholder-white/50 focus-ring"
              />
              
              <select
                required
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-brand-ink/60 border border-brand-line rounded px-3 py-2 text-white focus-ring"
              >
                <option value="">Objet de la demande</option>
                <option value="entretien">Entretien / Vidange</option>
                <option value="embrayage">Embrayage / Volant moteur</option>
                <option value="distribution">Kit distribution</option>
                <option value="suspension">Suspensions / Amortisseurs</option>
                <option value="autre">Autre</option>
              </select>
              
              <textarea
                required
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Description détaillée du problème, symptômes, bruits anormaux..."
                className="w-full bg-brand-ink/60 border border-brand-line rounded px-3 py-2 text-white placeholder-white/50 resize-none focus-ring"
              />
              
              <label className="flex items-center gap-2 text-sm text-white/80">
                <input
                  type="checkbox"
                  name="hasFlatSurface"
                  checked={formData.hasFlatSurface}
                  onChange={handleChange}
                  className="accent-brand-orange focus-ring"
                />
                J'ai un sol dur et plat disponible
              </label>
              
              <button
                type="submit"
                className="w-full mt-6 px-6 py-3 rounded-md bg-brand-orange text-black font-medium shadow-glow hover-allowed hover:bg-brand-orange2 focus-ring flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Envoyer la demande
              </button>
              
              <p className="text-sm text-white/70 mt-4 text-center">
                Retour par mail ou téléphone sous 12 h.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;