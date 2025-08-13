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
          
          if (sectionCenter >= -200 && sectionCenter <= window.innerHeight + 200) {
            currentSection = sectionId;
          }
        }
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

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
    handleScroll();

    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  // Calculer la position et le chemin de la voiture
  const getCarPosition = (progress: number) => {
    const sections = [
      { name: 'hero', start: 0, end: 0.2, path: 'right' },
      { name: 'services', start: 0.2, end: 0.4, path: 'left' },
      { name: 'faq', start: 0.4, end: 0.6, path: 'center' },
      { name: 'area', start: 0.6, end: 0.8, path: 'right' },
      { name: 'contact', start: 0.8, end: 1, path: 'left' }
    ];

    let currentSection = sections.find(section => 
      progress >= section.start && progress <= section.end
    ) || sections[0];

    const sectionProgress = (progress - currentSection.start) / (currentSection.end - currentSection.start);
    
    // Position verticale
    const topPosition = 10 + (progress * 80);
    
    // Position horizontale selon le chemin
    let leftPosition = 50; // Centre par défaut
    
    switch (currentSection.path) {
      case 'right':
        leftPosition = 20 + (sectionProgress * 60); // De gauche à droite
        break;
      case 'left':
        leftPosition = 80 - (sectionProgress * 60); // De droite à gauche
        break;
      case 'center':
        // Mouvement en S
        leftPosition = 50 + Math.sin(sectionProgress * Math.PI * 2) * 20;
        break;
    }

    return { top: topPosition, left: leftPosition, section: currentSection.name };
  };

  const carPosition = getCarPosition(scrollProgress);

  return (
    <div className="scroll-car-animation">
      {/* Chemin dynamique qui suit la voiture */}
      <svg 
        className="fixed inset-0 w-full h-full z-20 pointer-events-none"
        style={{ mixBlendMode: 'multiply' }}
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 107, 53, 0.3)" />
            <stop offset="50%" stopColor="rgba(255, 107, 53, 0.6)" />
            <stop offset="100%" stopColor="rgba(255, 107, 53, 0.3)" />
          </linearGradient>
        </defs>
        
        {/* Chemin courbe qui traverse les sections */}
        <path
          d={`M ${window.innerWidth * 0.2} ${window.innerHeight * 0.1}
              Q ${window.innerWidth * 0.8} ${window.innerHeight * 0.25}
                ${window.innerWidth * 0.2} ${window.innerHeight * 0.4}
              Q ${window.innerWidth * 0.5} ${window.innerHeight * 0.5}
                ${window.innerWidth * 0.8} ${window.innerHeight * 0.65}
              Q ${window.innerWidth * 0.2} ${window.innerHeight * 0.8}
                ${window.innerWidth * 0.2} ${window.innerHeight * 0.95}`}
          stroke="url(#pathGradient)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="10,5"
          className="animate-pulse"
        />
      </svg>

      {/* Points de repère pour chaque section */}
      <div className="fixed inset-0 z-25 pointer-events-none">
        {[
          { section: 'hero', top: '15%', left: '25%' },
          { section: 'services', top: '30%', left: '75%' },
          { section: 'faq', top: '50%', left: '50%' },
          { section: 'area', top: '70%', left: '80%' },
          { section: 'contact', top: '85%', left: '25%' }
        ].map((point, index) => (
          <div
            key={point.section}
            className={`absolute w-4 h-4 rounded-full border-2 transition-all duration-300 ${
              activeSection === point.section 
                ? 'bg-orange-500 border-orange-400 shadow-lg scale-125' 
                : 'bg-orange-300/50 border-orange-400/50'
            }`}
            style={{ 
              top: point.top, 
              left: point.left,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Pulse effect pour la section active */}
            {activeSection === point.section && (
              <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-75" />
            )}
          </div>
        ))}
      </div>

      {/* Voiture qui suit le chemin */}
      <div 
        ref={carRef}
        className="fixed z-40 pointer-events-none transition-all duration-100 ease-out"
        style={{ 
          top: `${carPosition.top}%`,
          left: `${carPosition.left}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Phares de la voiture - direction dynamique */}
        <div 
          className="absolute w-20 h-12 bg-gradient-to-r from-yellow-300/60 to-transparent rounded-full blur-sm animate-pulse"
          style={{
            top: '50%',
            left: carPosition.left > 50 ? '-60px' : '40px',
            transform: 'translateY(-50%)',
            rotate: carPosition.left > 50 ? '180deg' : '0deg'
          }}
        />
        <div 
          className="absolute w-32 h-16 bg-gradient-to-r from-yellow-200/40 to-transparent rounded-full blur-md"
          style={{
            top: '50%',
            left: carPosition.left > 50 ? '-80px' : '60px',
            transform: 'translateY(-50%)',
            rotate: carPosition.left > 50 ? '180deg' : '0deg'
          }}
        />
        
        {/* Corps de la voiture avec rotation selon la direction */}
        <div 
          className="relative bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-3 shadow-xl border-2 border-orange-400/50 hover:scale-110 transition-all duration-200"
          style={{
            transform: carPosition.left > 50 ? 'scaleX(-1)' : 'scaleX(1)'
          }}
        >
          <Car className="w-6 h-6 text-white" />
          
          {/* Roues animées */}
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gray-800 rounded-full animate-spin" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-gray-800 rounded-full animate-spin" style={{ animationDelay: '0.1s' }} />
        </div>

        {/* Traînée de mouvement selon la direction */}
        <div 
          className="absolute top-1/2 w-6 h-1 bg-gradient-to-r from-orange-400/60 to-transparent rounded-full"
          style={{
            left: carPosition.left > 50 ? '40px' : '-30px',
            transform: 'translateY(-50%)',
            background: carPosition.left > 50 
              ? 'linear-gradient(to left, rgba(255, 140, 66, 0.6), transparent)'
              : 'linear-gradient(to right, rgba(255, 140, 66, 0.6), transparent)'
          }}
        />
      </div>

      {/* Effet d'illumination pour la section active */}
      {activeSection && (
        <div className="fixed inset-0 pointer-events-none z-15">
          <div 
            className="absolute transition-all duration-500 ease-out"
            style={{
              top: `${carPosition.top - 20}%`,
              left: `${carPosition.left - 25}%`,
              width: '50%',
              height: '40%',
              background: `radial-gradient(ellipse at center, 
                rgba(255, 107, 53, 0.15) 0%, 
                rgba(255, 107, 53, 0.08) 40%, 
                transparent 70%)`,
              borderRadius: '50%'
            }}
          />
          
          {/* Particules lumineuses autour de la voiture */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-orange-400 rounded-full animate-ping"
                style={{
                  left: `${carPosition.left + (Math.cos(i * Math.PI / 4) * 5)}%`,
                  top: `${carPosition.top + (Math.sin(i * Math.PI / 4) * 5)}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Indicateur de progression */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-30 pointer-events-none">
        <div className="w-1 h-32 bg-gray-300/30 rounded-full overflow-hidden">
          <div 
            className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-full transition-all duration-100 ease-out"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
        
        {/* Indicateur de section actuelle */}
        <div className="mt-2 text-xs font-tech text-white/80 text-center uppercase tracking-wide">
          {activeSection || 'accueil'}
        </div>
      </div>

      {/* Labels des sections avec positions dynamiques */}
      <div className="fixed inset-0 z-25 pointer-events-none text-xs font-tech text-white/60">
        <div className="absolute" style={{ top: '15%', left: '30%' }}>ACCUEIL</div>
        <div className="absolute" style={{ top: '30%', left: '70%' }}>SERVICES</div>
        <div className="absolute" style={{ top: '50%', left: '45%' }}>FAQ</div>
        <div className="absolute" style={{ top: '70%', left: '75%' }}>ZONE</div>
        <div className="absolute" style={{ top: '85%', left: '30%' }}>CONTACT</div>
      </div>
    </div>
  );
};

export default ScrollCarAnimation;