import React from 'react';
import { User, Award, Clock, Heart, Wrench, Phone } from 'lucide-react';

const About = () => {
  return (
    <section 
      id="about" 
      className="section relative py-8 lg:py-12 reveal-on-scroll bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Photo et présentation */}
          <div className="text-center lg:text-left">
            <div className="relative inline-block mb-6">
              {/* Photo du mécanicien */}
              <div className="w-80 h-96 sm:w-96 sm:h-[28rem] lg:w-[28rem] lg:h-[32rem] xl:w-[32rem] xl:h-[36rem] mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-2xl border-4 border-orange-500/30 hover:border-orange-500/60 transition-all duration-500 hover-scale relative group">
                <img 
                  src="/a_propos.JPG" 
                  alt="Votre mécanicien JACK Up Auto" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter brightness-105 contrast-105"
                  loading="lazy"
                />
                {/* Overlay subtil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Badge professionnel */}
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transform translate-x-full group-hover:translate-x-0 transition-transform duration-500">
                  7 ans d'expérience
                </div>
              </div>
            </div>
          </div>

          {/* Contenu textuel */}
          <div>
            <div className="mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white mx-auto lg:mx-0 mb-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover-scale">
                <User className="w-6 h-6" />
              </div>
              
              <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight uppercase font-futuristic text-center lg:text-left hover-glow-text">
                À Propos
              </h2>
              
              <p className="text-lg sm:text-xl text-orange-600 font-bold uppercase font-tech mb-6 text-center lg:text-left tracking-wide">
                Votre mécanicien de confiance
              </p>
              
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 mx-auto lg:mx-0 rounded-full mb-8 shadow-lg"></div>
            </div>

            {/* Texte de présentation personnalisé */}
            <div className="space-y-4 text-center lg:text-left">
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl border-l-4 border-orange-500 shadow-lg">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-tech font-medium">
                  Reconverti mécanicien depuis presque <strong className="text-orange-600">7 ans</strong> j'ai foulé le sol de nombreux ateliers de maintenance allant de l'automobile traditionnelle jusqu'à la <strong className="text-orange-600">voiture électrique</strong>. 
                </p>
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-tech font-medium mt-4">
                  De cette expérience variée j'ai fait le choix d'aller vers une nouvelle approche de mon travail, celle de la <strong className="text-orange-600">mécanique à domicile</strong>, afin de vous proposer une solution <strong className="text-orange-600">efficace, transparente et économe</strong>.
                </p>
              </div>
            </div>

            {/* Badges d'expertise */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover-scale">
                🚗 Automobile traditionnelle
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover-scale">
                ⚡ Voiture électrique
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg hover-scale">
                🏠 Service à domicile
              </div>
            </div>

            {/* Statistiques impressionnantes */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center bg-white p-4 rounded-xl shadow-lg border border-orange-100 hover:border-orange-300 transition-all duration-300 hover-scale">
                <div className="text-2xl font-black text-orange-600 font-futuristic">7</div>
                <div className="text-xs text-gray-600 font-tech uppercase">Années</div>
              </div>
              <div className="text-center bg-white p-4 rounded-xl shadow-lg border border-orange-100 hover:border-orange-300 transition-all duration-300 hover-scale">
                <div className="text-2xl font-black text-orange-600 font-futuristic">100%</div>
                <div className="text-xs text-gray-600 font-tech uppercase">Mobile</div>
              </div>
              <div className="text-center bg-white p-4 rounded-xl shadow-lg border border-orange-100 hover:border-orange-300 transition-all duration-300 hover-scale">
                <div className="text-2xl font-black text-orange-600 font-futuristic">43</div>
                <div className="text-xs text-gray-600 font-tech uppercase">Haute-Loire</div>
              </div>
              <div className="text-center bg-white p-4 rounded-xl shadow-lg border border-orange-100 hover:border-orange-300 transition-all duration-300 hover-scale">
                <div className="text-2xl font-black text-orange-600 font-futuristic">⭐</div>
                <div className="text-xs text-gray-600 font-tech uppercase">Qualité</div>
              </div>
            </div>

            {/* Points forts redesignés */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover-scale shadow-md hover:shadow-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm font-futuristic">Ponctuel</div>
                  <div className="text-xs text-gray-700 font-tech">Respect des horaires</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover-scale shadow-md hover:shadow-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm font-futuristic">À l'écoute</div>
                  <div className="text-xs text-gray-700 font-tech">Conseils personnalisés</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover-scale shadow-md hover:shadow-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm font-futuristic">Expérimenté</div>
                  <div className="text-xs text-gray-700 font-tech">7 ans d'expérience</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover-scale shadow-md hover:shadow-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm font-futuristic">Disponible</div>
                  <div className="text-xs text-gray-700 font-tech">Réponse rapide</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;