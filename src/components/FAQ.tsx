import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

const FAQ = () => {

  const faqItems = [
    {
      question: "Intervenez-vous vraiment à domicile ?",
      answer: "Oui, nous venons chez vous avec tout le matériel. Il faut juste un sol dur et plat."
    },
    {
      question: "Combien coûte un déplacement ?",
      answer: "Gratuit dans un rayon de 30 km. Pour la zone élargie selon nature des travaux (30-70 km), supplément de 1€/km. Voir notre zone d'intervention pour plus de détails."
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
    <section id="faq" className="section py-6 lg:py-8 reveal-on-scroll diagonal-cut-top-slash diagonal-cut-bottom-backslash bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black mb-2 sm:mb-3 tracking-tight uppercase text-gray-900 font-futuristic">
            Questions Fréquentes
          </h2>
          <p className="text-sm sm:text-base text-gray-700 font-semibold uppercase font-tech mb-2">
            Toutes les réponses à vos questions
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-8">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="relative reveal-on-scroll"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Trait gauche - Simplifié */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-screen h-0.5 -translate-x-full overflow-hidden">
                <div 
                  className="w-full h-full bg-gradient-to-r from-transparent via-orange-500/30 to-orange-500/50"
                  style={{
                    animation: `simplePulse 4s ease-in-out infinite ${index * 0.5}s`
                  }}
                ></div>
                
                <div 
                  className="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-orange-400 rounded-full opacity-80"
                  style={{
                    animation: `simpleFloat 3s ease-in-out infinite ${index * 0.4}s`
                  }}
                ></div>
              </div>
              
              {/* Trait droit - Simplifié */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-screen h-0.5 translate-x-full overflow-hidden">
                <div 
                  className="w-full h-full bg-gradient-to-l from-transparent via-orange-500/30 to-orange-500/50"
                  style={{
                    animation: `simplePulse 4s ease-in-out infinite ${index * 0.5 + 2}s`
                  }}
                ></div>
                
                <div 
                  className="absolute right-1/4 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-orange-400 rounded-full opacity-80"
                  style={{
                    animation: `simpleFloat 3s ease-in-out infinite ${index * 0.4 + 1}s`
                  }}
                ></div>
              </div>
              
              {/* Contenu de la FAQ */}
              <div className="bg-white/98 backdrop-blur-sm rounded-xl shadow-lg border border-orange-500/20 hover:border-orange-500/40 overflow-hidden transition-all duration-300 hover:shadow-xl relative z-10 group">
                {/* Accent décoratif */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/20 via-orange-500/40 to-orange-500/20"></div>
                
                {/* Question */}
                <div className="px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-orange-500/15 group-hover:from-gray-100 group-hover:to-gray-200 transition-all duration-300">
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 font-futuristic flex items-center gap-3 transition-colors duration-300">
                    <div className="w-2 h-2 bg-orange-500 rounded-full shadow-sm"></div>
                    {item.question}
                  </h3>
                </div>
                
                {/* Réponse */}
                <div className="px-4 sm:px-6 py-4 sm:py-5 bg-gray-50 group-hover:bg-gray-100 transition-all duration-300">
                  <p className="text-xs sm:text-sm lg:text-base text-gray-700 font-tech leading-relaxed transition-colors duration-300">
                    {item.question === "Combien coûte un déplacement ?" ? (
                      <>
                        Gratuit dans un rayon de 30 km. Pour la zone élargie selon nature des travaux (30-70 km), supplément de 1€/km.{' '}
                        Gratuit dans un rayon de 30 km. Pour la zone élargie selon nature des travaux (30-60 km), supplément de 1€/km.{' '}
                        <button
                          onClick={() => document.getElementById('area')?.scrollIntoView({ behavior: 'smooth' })}
                          className="underline font-medium text-orange-600 hover:text-orange-700 transition-colors duration-200"
                        >
                          Voir notre zone d'intervention
                        </button>
                        {' '}pour plus de détails.
                      </>
                    ) : (
                      item.answer
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Séparateur de section */}
        <div className="relative mt-12 mb-8">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
          <div className="relative z-10 flex justify-center">
            <div className="bg-white px-8 py-3 rounded-full border border-orange-500/30 shadow-lg hover:border-orange-500/50 transition-all duration-300">
              <div className="w-3 h-3 bg-orange-500 rounded-full opacity-80"></div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <p className="text-sm text-gray-700 font-tech mb-4">
            Vous avez d'autres questions ?
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition-all duration-300 font-tech uppercase tracking-wide text-sm hover:shadow-lg hover:shadow-orange-500/25 hover-scale"
          >
            Nous Contacter
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;