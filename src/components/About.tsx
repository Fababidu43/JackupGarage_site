import React from 'react';
import { User } from 'lucide-react';

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
              <div className="w-80 h-96 sm:w-96 sm:h-[28rem] lg:w-[28rem] lg:h-[32rem] xl:w-[32rem] xl:h-[36rem] mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-2xl border-4 border-orange-500/30 hover:border-orange-500/60 transition-all duration-500 hover-scale bg-black">
                <video 
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  controls={false}
                  onLoadStart={() => console.log('🎬 Début du chargement de la vidéo')}
                  onCanPlay={() => console.log('✅ Vidéo prête à être lue')}
                  onError={(e) => {
                    console.error('❌ Erreur chargement vidéo:', e);
                    console.warn('Vidéo de présentation non trouvée, affichage de l\'image de fallback');
                    // Fallback vers l'image si la vidéo ne charge pas
                    const video = e.currentTarget;
                    const img = document.createElement('img');
                    img.src = '/a_propos.JPG';
                    img.alt = 'Votre mécanicien JACK Up Auto';
                    img.className = 'w-full h-full object-cover';
                    img.loading = 'lazy';
                    video.parentNode?.replaceChild(img, video);
                  }}
                >
                  <source src="/presentation.MP4" type="video/mp4" />
                  <source src="/presentation.mp4" type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
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
              
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 mx-auto lg:mx-0 rounded-full mb-8 shadow-lg"></div>
            </div>

            <div className="space-y-4 text-center lg:text-left">
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl border-l-4 border-orange-500 shadow-lg">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-tech font-medium">
                  Reconverti mécanicien depuis presque <strong className="text-orange-600">7 ans</strong> j'ai foulé le sol de nombreux ateliers de maintenance allant de l'automobile traditionnelle jusqu'à la <strong className="text-orange-600">voiture électrique</strong>. 
                  De cette expérience variée j'ai fait le choix d\'aller vers une nouvelle approche de mon travail, celle de la <strong className="text-orange-600">mécanique à domicile</strong>, afin de vous proposer une solution <strong className="text-orange-600">efficace, transparente et économe</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;