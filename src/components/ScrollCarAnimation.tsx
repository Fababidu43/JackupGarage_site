import React, { useEffect, useState, useRef } from 'react';

const ScrollCarAnimation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [linePosition, setLinePosition] = useState<'left' | 'right'>('right');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / documentHeight, 1);
      setScrollProgress(progress);

      // Détecter la section active
      const sections = ['hero', 'services', 'area', 'faq', 'contact'];
      const currentSection = sections.find(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
        }
        return false;
      });

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
        // Effet de phares pendant 1 seconde
        setTimeout(() => setActiveSection(null), 1000);
      }

      // Logique de changement de côté (exemple: changer au milieu de la page)
      if (progress > 0.5 && linePosition === 'right' && !isTransitioning) {
        setIsTransitioning(true);
        setLinePosition('left');
        setTimeout(() => setIsTransitioning(false), 2000);
      } else if (progress <= 0.5 && linePosition === 'left' && !isTransitioning) {
        setIsTransitioning(true);
        setLinePosition('right');
        setTimeout(() => setIsTransitioning(false), 2000);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [linePosition, isTransitioning, activeSection]);

  const getCarPosition = () => {
    if (isTransitioning) {
      // Position diagonale pendant la transition
      const transitionProgress = scrollProgress > 0.5 ? 
        (scrollProgress - 0.5) * 4 : // Transition vers la gauche
        (0.5 - scrollProgress) * 4; // Transition vers la droite
      
      const startX = linePosition === 'left' ? 'calc(100% - 60px)' : '60px';
      const endX = linePosition === 'left' ? '60px' : 'calc(100% - 60px)';
      
      return {
        top: `${scrollProgress * 100}%`,
        left: linePosition === 'left' ? startX : endX,
        transform: 'translateY(-50%)',
        transition: 'left 2s cubic-bezier(0.4, 0, 0.2, 1)'
      };
    }

    return {
      top: `${scrollProgress * 100}%`,
      left: linePosition === 'right' ? 'calc(100% - 60px)' : '60px',
      transform: 'translateY(-50%)',
      transition: 'none'
    };
  };

  return (
    <>
      {/* Ligne verticale */}
      <div
        ref={lineRef}
        className={`fixed top-0 w-0.5 bg-gradient-to-b from-orange-500/30 via-orange-500/60 to-orange-500/30 z-30 transition-all duration-2000 ease-in-out ${
          isTransitioning ? 'opacity-50' : 'opacity-100'
        }`}
        style={{
          height: '100vh',
          left: linePosition === 'right' ? 'calc(100% - 30px)' : '30px',
        }}
      />

      {/* Voiture */}
      <div
        ref={carRef}
        className="fixed z-40 transition-all duration-100 ease-out"
        style={getCarPosition()}
      >
        {/* Corps de la voiture */}
        <div className="relative">
          {/* Carrosserie */}
          <div className="w-8 h-12 bg-gradient-to-b from-orange-600 to-orange-700 rounded-lg shadow-lg border border-orange-500/50">
            {/* Pare-brise */}
            <div className="w-6 h-3 bg-blue-200/80 rounded-t-lg mx-auto mt-1"></div>
            {/* Phares */}
            <div className="flex justify-between px-1 mt-1">
              <div className="w-1 h-1 bg-yellow-300 rounded-full"></div>
              <div className="w-1 h-1 bg-yellow-300 rounded-full"></div>
            </div>
            {/* Roues */}
            <div className="absolute -left-0.5 top-2 w-1 h-1 bg-gray-800 rounded-full"></div>
            <div className="absolute -right-0.5 top-2 w-1 h-1 bg-gray-800 rounded-full"></div>
            <div className="absolute -left-0.5 bottom-2 w-1 h-1 bg-gray-800 rounded-full"></div>
            <div className="absolute -right-0.5 bottom-2 w-1 h-1 bg-gray-800 rounded-full"></div>
          </div>

          {/* Effet de phares */}
          {activeSection && (
            <div
              className="absolute top-0 w-32 h-32 pointer-events-none animate-pulse"
              style={{
                left: linePosition === 'right' ? '-120px' : '20px',
                background: `radial-gradient(ellipse 120px 60px at center, 
                  rgba(255, 255, 0, 0.3) 0%, 
                  rgba(255, 255, 0, 0.1) 50%, 
                  transparent 100%)`,
                transform: 'translateY(-25%)',
                animation: 'headlightPulse 1s ease-in-out'
              }}
            />
          )}
        </div>
      </div>

      {/* Effet d'illumination globale */}
      {activeSection && (
        <div
          className="fixed inset-0 pointer-events-none z-20"
          style={{
            background: `radial-gradient(circle at ${
              linePosition === 'right' ? '90%' : '10%'
            } ${scrollProgress * 100}%, 
              rgba(255, 255, 0, 0.1) 0%, 
              rgba(255, 255, 0, 0.05) 30%, 
              transparent 60%)`,
            animation: 'sectionIllumination 1s ease-in-out'
          }}
        />
      )}

      <style jsx>{`
        @keyframes headlightPulse {
          0% { opacity: 0; transform: translateY(-25%) scale(0.8); }
          50% { opacity: 1; transform: translateY(-25%) scale(1.1); }
          100% { opacity: 0.7; transform: translateY(-25%) scale(1); }
        }

        @keyframes sectionIllumination {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
      `}</style>
    </>
  );
};

export default ScrollCarAnimation;