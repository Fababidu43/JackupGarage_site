import React, { useEffect, useState, useRef } from 'react';

const ScrollCarAnimation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [carPath, setCarPath] = useState<Array<{x: number, y: number, side: 'left' | 'right'}>>([]);
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGSVGElement>(null);

  // Fonction pour détecter les obstacles (contenu)
  const detectContentBounds = () => {
    const sections = document.querySelectorAll('section, .section');
    const obstacles: Array<{top: number, bottom: number, left: number, right: number}> = [];
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const scrollTop = window.pageYOffset;
      
      // Ajouter les bounds de chaque section
      obstacles.push({
        top: rect.top + scrollTop,
        bottom: rect.bottom + scrollTop,
        left: rect.left,
        right: rect.right
      });
    });
    
    return obstacles;
  };

  // Calculer le chemin optimal qui évite le contenu
  const calculateOptimalPath = () => {
    const documentHeight = document.documentElement.scrollHeight;
    const viewportWidth = window.innerWidth;
    const obstacles = detectContentBounds();
    const path: Array<{x: number, y: number, side: 'left' | 'right'}> = [];
    
    const leftMargin = 60;
    const rightMargin = viewportWidth - 60;
    const safeDistance = 100; // Distance de sécurité du contenu
    
    // Diviser la hauteur en segments
    const segments = Math.ceil(documentHeight / 100);
    
    for (let i = 0; i <= segments; i++) {
      const y = (i / segments) * documentHeight;
      let preferredSide: 'left' | 'right' = 'right';
      let x = rightMargin;
      
      // Vérifier les collisions pour cette hauteur
      const conflictsWithContent = obstacles.some(obstacle => {
        return y >= obstacle.top - safeDistance && 
               y <= obstacle.bottom + safeDistance &&
               ((rightMargin >= obstacle.left - safeDistance && rightMargin <= obstacle.right + safeDistance) ||
                (leftMargin >= obstacle.left - safeDistance && leftMargin <= obstacle.right + safeDistance));
      });
      
      // Si conflit à droite, essayer à gauche
      if (conflictsWithContent) {
        const leftConflict = obstacles.some(obstacle => {
          return y >= obstacle.top - safeDistance && 
                 y <= obstacle.bottom + safeDistance &&
                 leftMargin >= obstacle.left - safeDistance && 
                 leftMargin <= obstacle.right + safeDistance;
        });
        
        if (!leftConflict) {
          preferredSide = 'left';
          x = leftMargin;
        }
      }
      
      path.push({ x, y, side: preferredSide });
    }
    
    return path;
  };

  useEffect(() => {
    // Calculer le chemin initial
    const initialPath = calculateOptimalPath();
    setCarPath(initialPath);
    
    // Recalculer le chemin lors du redimensionnement
    const handleResize = () => {
      const newPath = calculateOptimalPath();
      setCarPath(newPath);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / documentHeight, 1);
      setScrollProgress(progress);

      // Trouver la position actuelle sur le chemin
      if (carPath.length > 0) {
        const pathIndex = Math.floor(progress * (carPath.length - 1));
        setCurrentPathIndex(pathIndex);
        
        // Détecter les changements de côté pour les transitions
        if (pathIndex > 0 && pathIndex < carPath.length - 1) {
          const currentSide = carPath[pathIndex].side;
          const nextSide = carPath[pathIndex + 1]?.side;
          
          if (currentSide !== nextSide && !isTransitioning) {
            setIsTransitioning(true);
            setTimeout(() => setIsTransitioning(false), 1500);
          }
        }
      }

      // Détecter la section active pour les phares
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
        setTimeout(() => setActiveSection(null), 1200);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [carPath, isTransitioning, activeSection]);

  // Obtenir la position actuelle de la voiture
  const getCurrentCarPosition = () => {
    if (carPath.length === 0) return { x: window.innerWidth - 60, y: 0, side: 'right' as const };
    
    const currentPoint = carPath[currentPathIndex] || carPath[0];
    const nextPoint = carPath[currentPathIndex + 1];
    
    if (!nextPoint) return currentPoint;
    
    // Interpolation entre les points pour un mouvement fluide
    const segmentProgress = (scrollProgress * (carPath.length - 1)) - currentPathIndex;
    const x = currentPoint.x + (nextPoint.x - currentPoint.x) * segmentProgress;
    const y = currentPoint.y + (nextPoint.y - currentPoint.y) * segmentProgress;
    
    return { x, y, side: currentPoint.side };
  };

  const carPosition = getCurrentCarPosition();
  const facingLeft = carPosition.side === 'right'; // Si à droite, fait face à gauche (vers le contenu)

  // Générer le chemin SVG
  const generateSVGPath = () => {
    if (carPath.length < 2) return '';
    
    let pathData = `M ${carPath[0].x} ${carPath[0].y}`;
    
    for (let i = 1; i < carPath.length; i++) {
      const point = carPath[i];
      const prevPoint = carPath[i - 1];
      
      // Utiliser des courbes pour les transitions douces
      if (point.side !== prevPoint.side) {
        const midY = (point.y + prevPoint.y) / 2;
        const controlX = window.innerWidth / 2;
        pathData += ` Q ${controlX} ${midY} ${point.x} ${point.y}`;
      } else {
        pathData += ` L ${point.x} ${point.y}`;
      }
    }
    
    return pathData;
  };

  return (
    <>
      {/* Ligne de chemin SVG */}
      <svg
        ref={lineRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-30"
        style={{ height: `${document.documentElement.scrollHeight}px` }}
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 107, 53, 0.3)" />
            <stop offset="50%" stopColor="rgba(255, 107, 53, 0.6)" />
            <stop offset="100%" stopColor="rgba(255, 107, 53, 0.3)" />
          </linearGradient>
        </defs>
        <path
          d={generateSVGPath()}
          stroke="url(#pathGradient)"
          strokeWidth="2"
          fill="none"
          className="transition-all duration-300"
        />
      </svg>

      {/* Voiture */}
      <div
        ref={carRef}
        className="fixed z-40 transition-all duration-100 ease-out"
        style={{
          left: `${carPosition.x - 16}px`,
          top: `${(scrollProgress * (document.documentElement.scrollHeight - window.innerHeight)) + window.innerHeight / 2 - 24}px`,
          transform: facingLeft ? 'scaleX(-1)' : 'scaleX(1)',
        }}
      >
        {/* Corps de la voiture */}
        <div className="relative">
          {/* Carrosserie */}
          <div className="w-8 h-12 bg-gradient-to-b from-orange-600 to-orange-700 rounded-lg shadow-lg border border-orange-500/50">
            {/* Pare-brise */}
            <div className="w-6 h-3 bg-blue-200/80 rounded-t-lg mx-auto mt-1"></div>
            {/* Phares avant */}
            <div className={`flex ${facingLeft ? 'justify-start pl-1' : 'justify-end pr-1'} mt-1`}>
              <div className="w-1 h-1 bg-yellow-300 rounded-full"></div>
              <div className="w-1 h-1 bg-yellow-300 rounded-full ml-0.5"></div>
            </div>
            {/* Roues */}
            <div className="absolute -left-0.5 top-2 w-1 h-1 bg-gray-800 rounded-full"></div>
            <div className="absolute -right-0.5 top-2 w-1 h-1 bg-gray-800 rounded-full"></div>
            <div className="absolute -left-0.5 bottom-2 w-1 h-1 bg-gray-800 rounded-full"></div>
            <div className="absolute -right-0.5 bottom-2 w-1 h-1 bg-gray-800 rounded-full"></div>
          </div>

          {/* Effet de phares dirigés vers le contenu */}
          {activeSection && (
            <div
              className="absolute top-0 w-40 h-20 pointer-events-none animate-pulse"
              style={{
                left: facingLeft ? '-160px' : '32px',
                background: `radial-gradient(ellipse 160px 40px at ${facingLeft ? '100%' : '0%'} center, 
                  rgba(255, 255, 0, 0.4) 0%, 
                  rgba(255, 255, 0, 0.2) 40%, 
                  rgba(255, 255, 0, 0.1) 70%,
                  transparent 100%)`,
                transform: 'translateY(-10px)',
                animation: 'headlightBeam 1.2s ease-in-out'
              }}
            />
          )}
        </div>
      </div>

      {/* Effet d'illumination globale de la section */}
      {activeSection && (
        <div
          className="fixed inset-0 pointer-events-none z-20"
          style={{
            background: `radial-gradient(circle at ${carPosition.x}px ${window.innerHeight / 2}px, 
              rgba(255, 255, 0, 0.15) 0%, 
              rgba(255, 255, 0, 0.08) 30%, 
              rgba(255, 255, 0, 0.03) 60%,
              transparent 80%)`,
            animation: 'sectionGlow 1.2s ease-in-out'
          }}
        />
      )}

      <style jsx>{`
        @keyframes headlightBeam {
          0% { opacity: 0; transform: translateY(-10px) scale(0.8); }
          30% { opacity: 1; transform: translateY(-10px) scale(1.1); }
          70% { opacity: 0.8; transform: translateY(-10px) scale(1); }
          100% { opacity: 0; transform: translateY(-10px) scale(0.9); }
        }

        @keyframes sectionGlow {
          0% { opacity: 0; }
          40% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default ScrollCarAnimation;