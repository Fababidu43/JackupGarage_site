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
      answer: "Gratuit dans un rayon de 50 km. Pour la zone élargie embrayage (50-75 km), supplément de 1€/km. Voir notre zone d'intervention pour plus de détails."
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
          <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-2 sm:mb-3 tracking-tight uppercase font-futuristic">
            Questions Fréquentes
          </h2>
          <p className="text-sm sm:text-base font-semibold uppercase font-tech mb-2" style={{ color: '#FF6B35' }}>
            Toutes les réponses à vos questions
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-8">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="relative reveal-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Trait spécifique pour chaque question */}
              {index === 0 && (
                <>
                  {/* Style 1: Trait simple horizontal complet */}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-screen h-0.5 bg-gradient-to-r from-orange-500/70 via-orange-500/40 to-orange-500/70 -translate-x-full"></div>
                </>
              )}
              
              {index === 1 && (
                <>
                  {/* Style 2: Double trait avec espacement */}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-y-1 w-screen h-0.5 bg-gradient-to-r from-orange-500/60 via-orange-500/30 to-transparent -translate-x-full"></div>
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 translate-y-1 w-screen h-0.5 bg-gradient-to-r from-transparent via-orange-500/30 to-orange-500/60 -translate-x-full"></div>
                </>
              )}
              
              {index === 2 && (
                <>
                  {/* Style 3: Trait pointillé simulé */}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-screen h-0.5 -translate-x-full" 
                       style={{background: 'repeating-linear-gradient(90deg, #FF6B35 0px, #FF6B35 20px, transparent 20px, transparent 40px)'}}>
                  </div>
                </>
              )}
              
              {index === 3 && (
                <>
                  {/* Style 4: Trait avec épaississement au centre */}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-screen h-1 bg-gradient-to-r from-orange-500/50 via-orange-500/80 to-orange-500/50 -translate-x-full rounded-full"></div>
                </>
              )}
              
              {index === 4 && (
                <>
                  {/* Style 5: Trait avec dégradé inversé */}
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-screen h-0.5 bg-gradient-to-l from-orange-500/70 via-orange-500/40 to-orange-500/70 translate-x-full"></div>
                </>
              )}
              
              {index === 5 && (
                <>
                  {/* Style 6: Triple trait fin */}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-y-2 w-screen h-px bg-gradient-to-r from-orange-500/40 via-orange-500/20 to-transparent -translate-x-full"></div>
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-screen h-px bg-gradient-to-r from-orange-500/60 via-orange-500/40 to-orange-500/60 -translate-x-full"></div>
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 translate-y-2 w-screen h-px bg-gradient-to-r from-transparent via-orange-500/20 to-orange-500/40 -translate-x-full"></div>
                </>
              )}
              
              {index === 6 && (
                <>
                  {/* Style 7: Trait avec effet de lueur */}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-screen h-0.5 bg-gradient-to-r from-orange-500/60 via-orange-500/30 to-transparent -translate-x-full shadow-lg shadow-orange-500/20"></div>
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-screen h-2 bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent -translate-x-full blur-sm"></div>
                </>
              )}
              
              {index === 7 && (
                <>
                  {/* Style 8: Trait diagonal simulé avec segments */}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 rotate-1 w-screen h-0.5 bg-gradient-to-r from-orange-500/50 via-orange-500/30 to-orange-500/50 -translate-x-full origin-left"></div>
                </>
              )}
              
              {/* Contenu de la FAQ */}
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border-2 border-orange-500/30 hover-scale border-glow overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-orange-500/50 relative z-10">
                {/* Question */}
                <div className="px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-orange-50/50 to-white border-b border-orange-500/20">
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 font-futuristic hover-glow-text flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50"></div>
                    {item.question}
                  </h3>
                </div>
                
                {/* Réponse toujours visible */}
                <div className="px-4 sm:px-6 py-4 sm:py-5 bg-white">
                  <p className="text-xs sm:text-sm lg:text-base text-gray-700 font-tech leading-relaxed">
                    {item.question === "Combien coûte un déplacement ?" ? (
                      <>
                        Gratuit dans un rayon de 50 km. Pour la zone élargie embrayage (50-75 km), supplément de 1€/km.{' '}
                        <button
                          onClick={() => document.getElementById('area')?.scrollIntoView({ behavior: 'smooth' })}
                          className="text-orange-500 hover:text-orange-600 underline font-medium"
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
                
                {/* Petit accent décoratif */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/20 via-orange-500/40 to-orange-500/20"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Traits décoratifs de section */}
        <div className="relative mt-12 mb-8">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
          <div className="relative z-10 flex justify-center">
            <div className="bg-white px-6 py-2 rounded-full border-2 border-orange-500/30 shadow-lg">
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            </div>
          </div>
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