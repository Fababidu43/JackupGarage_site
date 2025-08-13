import React, { useEffect, useState, useRef } from 'react';
import { Car } from 'lucide-react';

const ScrollCarAnimation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const lineRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / documentHeight, 1);
      
      setScrollProgress(progress);

      // Déterminer la section active
      const sections = ['hero', 'services', 'faq', 'area', 'contact'];
      let currentSection = '';
      
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          
          // Si le centre de la section est proche du centre de l'écran
          if (sectionCenter >= -200 && sectionCenter <= window.innerHeight + 200) {
            currentSection = sectionId;
          }
        }
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  // Calculer la position de la voiture
  const carPosition = scrollProgress * 100;

  return (
    <div className="scroll-car-animation">
      {/* Ligne de guidage */}
      <div 
        ref={lineRef}
        className="fixed left-8 top-0 w-1 bg-gradient-to-b from-orange-500/30 via-orange-400/50 to-orange-500/30 z-30 pointer-events-none"
        style={{ 
          height: '100vh',
          background: `linear-gradient(to bottom, 
            rgba(255, 107, 53, 0.2) 0%, 
            rgba(255, 107, 53, 0.6) 50%, 
            rgba(255, 107, 53, 0.2) 100%)`
        }}
      >
        {/* Points de connexion pour chaque section */}
        <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full shadow-lg animate-pulse" />
        <div className="absolute top-[30%] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full shadow-lg animate-pulse" />
        <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full shadow-lg animate-pulse" />
        <div className="absolute top-[70%] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full shadow-lg animate-pulse" />
        <div className="absolute top-[90%] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full shadow-lg animate-pulse" />
      </div>

      {/* Voiture qui suit le scroll */}
      <div 
        ref={carRef}
        className="fixed left-4 z-40 pointer-events-none transition-all duration-100 ease-out"
        style={{ 
          top: `${10 + (carPosition * 0.8)}%`,
          transform: 'translateY(-50%)'
        }}
      >
        {/* Phares de la voiture */}
        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-16 h-8 bg-gradient-to-r from-yellow-300/60 to-transparent rounded-full blur-sm animate-pulse" />
        <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 w-24 h-12 bg-gradient-to-r from-yellow-200/40 to-transparent rounded-full blur-md" />
        
        {/* Corps de la voiture */}
        <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-3 shadow-xl border-2 border-orange-400/50 hover:scale-110 transition-transform duration-200">
          <Car className="w-6 h-6 text-white transform rotate-90" />
          
          {/* Effet de mouvement */}
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-300 rounded-full animate-bounce" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
        </div>

        {/* Traînée de mouvement */}
        <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 w-4 h-1 bg-gradient-to-l from-orange-400/60 to-transparent rounded-full" />
        <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-2 h-0.5 bg-gradient-to-l from-orange-300/40 to-transparent rounded-full" />
      </div>

      {/* Effets d'illumination pour chaque section */}
      {activeSection && (
        <div className="fixed inset-0 pointer-events-none z-20">
          {/* Spotlight effect */}
          <div 
            className="absolute inset-0 transition-all duration-500 ease-out"
            style={{
              background: `radial-gradient(circle at 50% 50%, 
                rgba(255, 107, 53, 0.1) 0%, 
                rgba(255, 107, 53, 0.05) 30%, 
                transparent 60%)`
            }}
          />
          
          {/* Particules lumineuses */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-orange-400 rounded-full animate-ping"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Indicateur de progression */}
      <div className="fixed left-2 top-1/2 transform -translate-y-1/2 z-30 pointer-events-none">
        <div className="w-1 h-32 bg-gray-300/30 rounded-full overflow-hidden">
          <div 
            className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-full transition-all duration-100 ease-out"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      {/* Labels des sections (optionnel) */}
      <div className="fixed left-16 top-0 z-25 pointer-events-none text-xs font-tech text-white/60">
        <div className="absolute top-[10%] transform -translate-y-1/2 opacity-60">ACCUEIL</div>
        <div className="absolute top-[30%] transform -translate-y-1/2 opacity-60">SERVICES</div>
        <div className="absolute top-[50%] transform -translate-y-1/2 opacity-60">FAQ</div>
        <div className="absolute top-[70%] transform -translate-y-1/2 opacity-60">ZONE</div>
        <div className="absolute top-[90%] transform -translate-y-1/2 opacity-60">CONTACT</div>
      </div>
    </div>
  );
};

export default ScrollCarAnimation;