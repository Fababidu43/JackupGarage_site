import React, { useEffect, useState, useRef } from 'react';
import { Car, ChevronDown, ChevronUp } from 'lucide-react';

const ScrollCarAnimation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [activeStage, setActiveStage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const animationRef = useRef<HTMLDivElement>(null);

  // Points d'étape alignés avec les sections principales
  const stages = [
    { id: 'hero', name: 'ACCUEIL', position: 5 },
    { id: 'services', name: 'SERVICES', position: 20 },
    { id: 'service-1', name: 'ENTRETIEN', position: 35 },
    { id: 'service-2', name: 'EMBRAYAGE', position: 50 },
    { id: 'service-3', name: 'DISTRIBUTION', position: 65 },
    { id: 'area', name: 'ZONE', position: 80 },
    { id: 'contact', name: 'CONTACT', position: 95 }
  ];

  useEffect(() => {
    // Vérifier si l'utilisateur préfère les animations réduites
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / documentHeight, 1);
      
      // Déterminer la direction du scroll
      const direction = scrollTop > lastScrollY.current ? 'down' : 'up';
      setScrollDirection(direction);
      lastScrollY.current = scrollTop;
      
      setScrollProgress(progress);

      // Déterminer l'étape active basée sur la position de scroll
      const currentStage = stages.findIndex((stage, index) => {
        const nextStage = stages[index + 1];
        const stageProgress = stage.position / 100;
        const nextStageProgress = nextStage ? nextStage.position / 100 : 1;
        
        return progress >= stageProgress && progress < nextStageProgress;
      });
      
      if (currentStage !== -1 && currentStage !== activeStage) {
        setActiveStage(currentStage);
        
        // Déclencher l'effet de phares
        triggerHeadlightEffect(stages[currentStage].id);
      }
    };

    // Throttle avec requestAnimationFrame pour performance
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

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Appel initial

    return () => window.removeEventListener('scroll', throttledScroll);
  }, [activeStage]);

  const triggerHeadlightEffect = (sectionId: string) => {
    // Créer un effet de halo lumineux sur la section
    const section = document.getElementById(sectionId);
    if (section) {
      // Ajouter temporairement une classe pour l'effet lumineux
      section.classList.add('headlight-illuminated');
      
      // Retirer l'effet après 2 secondes
      setTimeout(() => {
        section.classList.remove('headlight-illuminated');
      }, 2000);
    }
  };

  // Calculer la position de la voiture (5% à 95% de l'écran)
  const carPosition = 5 + (scrollProgress * 90);

  if (!isVisible) return null;

  return (
    <div 
      ref={animationRef}
      className="fixed left-4 top-0 bottom-0 z-30 pointer-events-none hidden lg:block"
      style={{ width: '60px' }}
    >
      {/* Ligne conductrice verticale */}
      <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-orange-500/40 to-transparent">
        {/* Points d'étape */}
        {stages.map((stage, index) => (
          <div
            key={stage.id}
            className={`absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeStage 
                ? 'bg-orange-500 shadow-lg shadow-orange-500/50 scale-125' 
                : 'bg-orange-500/60'
            }`}
            style={{ top: `${stage.position}%` }}
          >
            {/* Pulse effect pour l'étape active */}
            {index === activeStage && (
              <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-75"></div>
            )}
          </div>
        ))}
      </div>

      {/* Labels des étapes */}
      <div className="absolute left-12 top-0 bottom-0">
        {stages.map((stage, index) => (
          <div
            key={`label-${stage.id}`}
            className={`absolute text-xs font-tech transition-all duration-300 whitespace-nowrap ${
              index === activeStage 
                ? 'text-orange-400 font-semibold opacity-100' 
                : 'text-gray-500 opacity-60'
            }`}
            style={{ 
              top: `${stage.position}%`,
              transform: 'translateY(-50%)'
            }}
          >
            {stage.name}
          </div>
        ))}
      </div>

      {/* Voiture qui suit le scroll */}
      <div 
        className="absolute left-0 transition-all duration-100 ease-out"
        style={{ 
          top: `${carPosition}%`,
          transform: `translateY(-50%) ${scrollDirection === 'up' ? 'rotate(180deg)' : 'rotate(0deg)'}`
        }}
      >
        {/* Phares de la voiture */}
        <div className={`absolute transition-all duration-200 ${
          scrollDirection === 'down' 
            ? 'right-0 top-1/2 transform translate-x-full -translate-y-1/2' 
            : 'left-0 top-1/2 transform -translate-x-full -translate-y-1/2'
        }`}>
          {/* Faisceau principal */}
          <div className="w-16 h-6 bg-gradient-to-r from-yellow-300/60 to-transparent rounded-full blur-sm"></div>
          {/* Faisceau étendu */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-24 h-10 bg-gradient-to-r from-yellow-200/30 to-transparent rounded-full blur-md"></div>
        </div>

        {/* Corps de la voiture */}
        <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-2 shadow-xl border border-orange-400/50 hover:scale-110 transition-transform duration-200">
          <Car className="w-5 h-5 text-white" />
          
          {/* Indicateur de direction */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-300 rounded-full flex items-center justify-center">
            {scrollDirection === 'down' ? (
              <ChevronDown className="w-2 h-2 text-orange-800" />
            ) : (
              <ChevronUp className="w-2 h-2 text-orange-800" />
            )}
          </div>
        </div>

        {/* Traînée de mouvement */}
        <div className={`absolute top-1/2 transform -translate-y-1/2 transition-all duration-200 ${
          scrollDirection === 'down' 
            ? '-left-4 w-3 h-0.5 bg-gradient-to-r from-orange-400/60 to-transparent' 
            : '-right-4 w-3 h-0.5 bg-gradient-to-l from-orange-400/60 to-transparent'
        } rounded-full`}></div>
      </div>

      {/* Barre de progression */}
      <div className="absolute right-0 top-1/4 bottom-1/4 w-1 bg-gray-300/20 rounded-full overflow-hidden">
        <div 
          className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-full transition-all duration-100 ease-out"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ScrollCarAnimation;