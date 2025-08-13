import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const faqSection = document.querySelector('.geometric-bg--faq');
      if (faqSection) {
        const speed = 0.15;
        const yPos = scrolled * speed;
        (faqSection as HTMLElement).style.setProperty('--scroll-y', `${yPos}px`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      answer: "Oui, nous venons chez vous avec tout le matériel. Il faut juste un sol dur et plat."
    },
    {
      question: "Combien coûte un déplacement ?",
      answer: "Gratuit dans les zones 43-42. Supplément kilométrique pour les embrayages longue distance."
    },
    {
      question: "Combien de temps dure une intervention ?",
      answer: "Vidange 30-45min, freins 1-2h, embrayage 3-5h, distribution 4-6h."
    },
    {
      question: "Fournissez-vous les pièces ?",
      answer: "Oui, pièces de qualité constructeur incluses dans le devis."
    },
    {
      question: "Êtes-vous assurés ?",
      answer: "Oui, assurance RC Professionnelle complète."
    },
    {
      question: "Que se passe-t-il s'il pleut ?",
      answer: "Report en cas de pluie pour la sécurité. Nouveau RDV dès que possible."
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
    <section id="faq" className="section py-6 lg:py-8 reveal-on-scroll relative overflow-hidden geometric-bg geometric-bg--faq" style={{ background: 'linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%)' }}>
      {/* Éléments décoratifs */}
      <div className="absolute top-6 left-6 w-12 h-12 border border-orange-500/10 rounded-full animate-spin-slow"></div>
      <div className="absolute bottom-12 right-12 w-8 h-8 border border-orange-400/20 rotate-45"></div>
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4 pulse-subtle shadow-lg hover-scale">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-2 sm:mb-3 tracking-tight uppercase font-futuristic hover-glow-text">
            Questions Fréquentes
          </h2>
          <p className="text-sm sm:text-base font-semibold uppercase font-tech mb-2" style={{ color: '#FF6B35' }}>
            Toutes les réponses à vos questions
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-orange-500/20 hover-scale border-glow overflow-hidden transition-all duration-200 hover:shadow-xl hover:border-orange-500/40"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-25 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 group"
              >
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 font-futuristic pr-3 group-hover:text-orange-600 transition-colors duration-200">
                  {item.question}
                </h3>
                <div className={`w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:bg-orange-500/20 ${openItems.includes(index) ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-4 h-4 text-orange-500 transition-transform duration-200" />
                </div>
              </button>
              
              {openItems.includes(index) && (
                <div className="px-4 sm:px-6 pb-3 sm:pb-4 border-t border-orange-500/20 bg-gradient-to-r from-orange-50/50 to-transparent">
                  <p className="text-xs sm:text-sm lg:text-base text-gray-700 font-tech leading-relaxed pt-3 sm:pt-4">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-8">
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