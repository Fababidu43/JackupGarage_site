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
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Trait gauche - Extension complète */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-screen h-0.5 -translate-x-full overflow-hidden">
                {/* Trait principal avec dégradé moderne */}
                <div 
                  className="w-full h-full bg-gradient-to-r from-transparent via-orange-500/20 to-orange-500/60 animate-pulse"
                  style={{
                    animation: `perfectPulse 4s ease-in-out infinite ${index * 0.5}s`,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 107, 53, 0.1) 20%, rgba(255, 107, 53, 0.4) 50%, rgba(255, 107, 53, 0.6) 80%, rgba(255, 107, 53, 0.3) 100%)',
                    boxShadow: '0 0 12px rgba(255, 107, 53, 0.4), 0 0 24px rgba(255, 107, 53, 0.2)'
                  }}
                ></div>
                
                {/* Effet de brillance qui traverse */}
                <div 
                  className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  style={{
                    animation: `perfectShine 5s ease-in-out infinite ${index * 0.7}s`,
                    filter: 'blur(1px)'
                  }}
                ></div>
                
                {/* Points lumineux flottants */}
                <div 
                  className="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-orange-400 rounded-full"
                  style={{
                    boxShadow: '0 0 8px rgba(255, 107, 53, 0.8), 0 0 16px rgba(255, 107, 53, 0.4)',
                    animation: `perfectFloat 3s ease-in-out infinite ${index * 0.4}s`
                  }}
                ></div>
                <div 
                  className="absolute right-1/4 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-orange-300 rounded-full"
                  style={{
                    boxShadow: '0 0 6px rgba(255, 107, 53, 0.6)',
                    animation: `perfectFloat 3s ease-in-out infinite ${index * 0.4 + 1.5}s`
                  }}
                ></div>
              </div>
              
              {/* Trait droit - Symétrique parfait */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-screen h-0.5 translate-x-full overflow-hidden">
                {/* Trait principal symétrique */}
                <div 
                  className="w-full h-full bg-gradient-to-l from-transparent via-orange-500/20 to-orange-500/60 animate-pulse"
                  style={{
                    animation: `perfectPulse 4s ease-in-out infinite ${index * 0.5 + 2}s`,
                    background: 'linear-gradient(270deg, transparent 0%, rgba(255, 107, 53, 0.1) 20%, rgba(255, 107, 53, 0.4) 50%, rgba(255, 107, 53, 0.6) 80%, rgba(255, 107, 53, 0.3) 100%)',
                    boxShadow: '0 0 12px rgba(255, 107, 53, 0.4), 0 0 24px rgba(255, 107, 53, 0.2)'
                  }}
                ></div>
                
                {/* Brillance symétrique */}
                <div 
                  className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-transparent via-white/50 to-transparent"
                  style={{
                    animation: `perfectShineReverse 5s ease-in-out infinite ${index * 0.7 + 2.5}s`,
                    filter: 'blur(1px)'
                  }}
                ></div>
                
                {/* Points lumineux symétriques */}
                <div 
                  className="absolute right-1/4 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-orange-400 rounded-full"
                  style={{
                    boxShadow: '0 0 8px rgba(255, 107, 53, 0.8), 0 0 16px rgba(255, 107, 53, 0.4)',
                    animation: `perfectFloat 3s ease-in-out infinite ${index * 0.4 + 0.75}s`
                  }}
                ></div>
                <div 
                  className="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-orange-300 rounded-full"
                  style={{
                    boxShadow: '0 0 6px rgba(255, 107, 53, 0.6)',
                    animation: `perfectFloat 3s ease-in-out infinite ${index * 0.4 + 2.25}s`
                  }}
                ></div>
              </div>
              
              {/* Effet lumineux qui traverse tout l'encadrement */}
              <div 
                className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
                style={{ zIndex: 15 }}
              >
                <div 
                  className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0"
                  style={{
                    animation: `perfectLightSweep 6s ease-in-out infinite ${index * 0.8}s`,
                    filter: 'blur(2px)'
                  }}
                ></div>
              </div>
              
              {/* Contenu de la FAQ avec animations parfaites */}
              <div className="bg-white/98 backdrop-blur-sm rounded-xl shadow-2xl border-2 border-orange-500/30 hover-scale border-glow overflow-hidden transition-all duration-500 hover:shadow-3xl hover:border-orange-500/60 relative z-10 group">
                {/* Accent décoratif animé en haut */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/30 via-orange-500/60 to-orange-500/30"
                  style={{
                    animation: `perfectAccent 3s ease-in-out infinite ${index * 0.3}s`
                  }}
                ></div>
                
                {/* Question avec effet hover */}
                <div className="px-4 sm:px-6 py-4 sm:py-5 bg-gradient-to-r from-orange-50/60 to-white/90 border-b border-orange-500/25 group-hover:from-orange-50/80 group-hover:to-white transition-all duration-300">
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 font-futuristic hover-glow-text flex items-center gap-3 group-hover:text-gray-800 transition-colors duration-300">
                    <div 
                      className="w-2.5 h-2.5 bg-orange-500 rounded-full shadow-lg shadow-orange-500/60"
                      style={{
                        animation: `perfectDot 2s ease-in-out infinite ${index * 0.25}s`
                      }}
                    ></div>
                    {item.question}
                  </h3>
                </div>
                
                {/* Réponse toujours visible avec animation */}
                <div className="px-4 sm:px-6 py-4 sm:py-5 bg-white/95 group-hover:bg-white transition-all duration-300">
                  <p className="text-xs sm:text-sm lg:text-base text-gray-700 font-tech leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                    {item.question === "Combien coûte un déplacement ?" ? (
                      <>
                        Gratuit dans un rayon de 50 km. Pour la zone élargie embrayage (50-75 km), supplément de 1€/km.{' '}
                        <button
                          onClick={() => document.getElementById('area')?.scrollIntoView({ behavior: 'smooth' })}
                          className="text-orange-500 hover:text-orange-600 underline font-medium transition-colors duration-200"
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
                
                {/* Effet de glow au hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Séparateur de section avec animation parfaite */}
        <div className="relative mt-12 mb-8">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"></div>
          <div className="relative z-10 flex justify-center">
            <div className="bg-white px-8 py-3 rounded-full border-2 border-orange-500/40 shadow-xl hover:border-orange-500/60 transition-all duration-300 hover:shadow-2xl">
              <div 
                className="w-4 h-4 bg-orange-500 rounded-full"
                style={{
                  animation: 'perfectCenterPulse 2s ease-in-out infinite',
                  boxShadow: '0 0 12px rgba(255, 107, 53, 0.6), 0 0 24px rgba(255, 107, 53, 0.3)'
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <p className="text-sm text-gray-600 font-tech mb-4">
            Vous avez d'autres questions ?
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition-all duration-300 font-tech uppercase tracking-wide text-sm hover-scale shadow-lg hover:shadow-xl hover:shadow-orange-500/25"
          >
            Nous Contacter
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;