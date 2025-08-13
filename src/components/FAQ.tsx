import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqItems = [
    {
      question: "Intervenez-vous vraiment à domicile ?",
      answer: "Oui, nous nous déplaçons directement chez vous avec tout notre matériel professionnel. Il vous suffit d'avoir un sol dur et plat (garage, cour, parking)."
    },
    {
      question: "Combien coûte un déplacement ?",
      answer: "Le déplacement est gratuit dans notre zone d'intervention (43-42). Pour les embrayages, nous acceptons les déplacements plus longs avec un supplément kilométrique."
    },
    {
      question: "Combien de temps dure une intervention ?",
      answer: "Cela dépend du service : vidange (30-45min), freins (1-2h), embrayage (3-5h), distribution (4-6h). Nous vous donnons une estimation précise lors du devis."
    },
    {
      question: "Fournissez-vous les pièces ?",
      answer: "Oui, nous fournissons toutes les pièces de qualité constructeur. Les prix sont inclus dans nos devis transparents."
    },
    {
      question: "Êtes-vous assurés ?",
      answer: "Absolument ! Nous disposons d'une assurance RC Professionnelle complète pour votre tranquillité d'esprit."
    },
    {
      question: "Que se passe-t-il s'il pleut ?",
      answer: "Nous reportons l'intervention en cas de mauvais temps pour des raisons de sécurité. Nous vous recontactons dès que possible."
    },
    {
      question: "Acceptez-vous tous les véhicules ?",
      answer: "Nous intervenons sur la plupart des véhicules légers (voitures, utilitaires légers). Contactez-nous pour confirmer la compatibilité avec votre modèle."
    },
    {
      question: "Comment payer ?",
      answer: "Nous acceptons les espèces, chèques et virements. Le paiement se fait après l'intervention, une fois que vous êtes satisfait."
    }
  ];

  return (
    <section id="faq" className="section py-12 lg:py-16 reveal-on-scroll relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%)' }}>
      {/* Éléments décoratifs */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-orange-500/10 rounded-full animate-spin-slow"></div>
      <div className="absolute bottom-20 right-20 w-12 h-12 border border-orange-400/20 rotate-45"></div>
      <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-orange-500/5 rounded-full"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white mx-auto mb-6 pulse-subtle shadow-lg hover-scale">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4 tracking-tight uppercase font-futuristic hover-glow-text">
            Questions Fréquentes
          </h2>
          <p className="text-base sm:text-lg font-semibold uppercase font-tech mb-2" style={{ color: '#FF6B35' }}>
            Toutes les réponses à vos questions
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border-2 border-orange-500/20 hover-scale border-glow subtle-glow animated-border overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-orange-500/40"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 group"
              >
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 font-futuristic pr-4 group-hover:text-orange-600 transition-colors duration-300">
                  {item.question}
                </h3>
                <div className={`w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-orange-500/20 ${openItems.includes(index) ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-5 h-5 text-orange-500 transition-transform duration-300" />
                </div>
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 sm:px-8 pb-5 sm:pb-6 border-t border-orange-500/20 bg-gradient-to-r from-orange-50/50 to-transparent">
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 font-tech leading-relaxed pt-4 sm:pt-5">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <p className="text-sm text-gray-600 font-tech mb-4">
            Vous avez d'autres questions ?
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200 font-tech uppercase tracking-wide text-sm hover-scale"
          >
            Nous Contacter
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;