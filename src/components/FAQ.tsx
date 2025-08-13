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
    <section className="section py-12 lg:py-16 reveal-on-scroll" style={{ background: '#F8F9FA' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white mx-auto mb-4 pulse-subtle">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4 tracking-tight uppercase font-futuristic hover-glow-text">
            Questions Fréquentes
          </h2>
          <p className="text-base sm:text-lg font-semibold uppercase font-tech" style={{ color: '#FF6B35' }}>
            Toutes les réponses à vos questions
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg border border-orange-500/10 hover-scale border-glow subtle-glow animated-border overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-orange-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              >
                <h3 className="text-base sm:text-lg font-bold text-gray-900 font-futuristic pr-4">
                  {item.question}
                </h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-orange-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-orange-500 flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4 border-t border-orange-500/10">
                  <p className="text-sm sm:text-base text-gray-700 font-tech leading-relaxed pt-3">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
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