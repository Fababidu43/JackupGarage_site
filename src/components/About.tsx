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
              <div className="w-80 h-96 sm:w-96 sm:h-[28rem] lg:w-[28rem] lg:h-[32rem] xl:w-[32rem] xl:h-[36rem] mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl border-4 border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover-scale">
                <img 
                  src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                  alt="Votre mécanicien JACK Up Auto" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Contenu textuel */}
          <div>
            <div className="mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white mx-auto lg:mx-0 mb-4 shadow-lg">
                <User className="w-6 h-6" />
              </div>
              
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight uppercase font-futuristic text-center lg:text-left">
                À Propos
              </h2>
              
              <p className="text-base sm:text-lg text-orange-600 font-semibold uppercase font-tech mb-4 text-center lg:text-left">
                Votre mécanicien de confiance
              </p>
              
              <div className="w-16 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto lg:mx-0 rounded-full mb-6"></div>
            </div>

            {/* Texte de présentation - À personnaliser */}
            <div className="space-y-4 text-center lg:text-left">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-tech">
                <strong className="text-orange-600">Passionné de mécanique depuis plus de 10 ans</strong>, je me déplace à votre domicile pour vous offrir un service de qualité, proche de chez vous.
              </p>
              
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-tech">
                Mon objectif ? <strong className="text-orange-600">Vous faire gagner du temps</strong> tout en vous garantissant des réparations professionnelles à des tarifs transparents.
              </p>
              
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-tech">
                Basé en Haute-Loire, je connais parfaitement la région et ses spécificités. <strong className="text-orange-600">Votre satisfaction est ma priorité !</strong>
              </p>
            </div>

            {/* Points forts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3 bg-orange-50 p-3 rounded-lg border border-orange-200 hover:border-orange-300 transition-colors duration-200">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm font-futuristic">Ponctuel</div>
                  <div className="text-xs text-gray-600 font-tech">Respect des horaires</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-orange-50 p-3 rounded-lg border border-orange-200 hover:border-orange-300 transition-colors duration-200">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm font-futuristic">À l'écoute</div>
                  <div className="text-xs text-gray-600 font-tech">Conseils personnalisés</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-orange-50 p-3 rounded-lg border border-orange-200 hover:border-orange-300 transition-colors duration-200">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm font-futuristic">Expérimenté</div>
                  <div className="text-xs text-gray-600 font-tech">10+ ans d'expérience</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-orange-50 p-3 rounded-lg border border-orange-200 hover:border-orange-300 transition-colors duration-200">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm font-futuristic">Disponible</div>
                  <div className="text-xs text-gray-600 font-tech">Réponse rapide</div>
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