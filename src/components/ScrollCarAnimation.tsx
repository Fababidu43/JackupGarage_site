import React, { useEffect, useState, useRef } from 'react';
import { Car } from 'lucide-react';

const ScrollCarAnimation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

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

  return (
    <div className="scroll-car-animation">
      {/* Ligne de parcours qui traverse toutes les sections */}
      <svg 
        className="fixed inset-0 w-full h-full z-20 pointer-events-none"
        style={{ mixBlendMode: 'multiply' }}
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 107, 53, 0.4)" />
            <stop offset="25%" stopColor="rgba(255, 107, 53, 0.7)" />
            <stop offset="50%" stopColor="rgba(255, 107, 53, 0.6)" />
            <stop offset="75%" stopColor="rgba(255, 107, 53, 0.8)" />
            <stop offset="100%" stopColor="rgba(255, 107, 53, 0.5)" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Chemin principal qui évite le texte */}
        <path
          d={`
            M ${window.innerWidth * 0.5} ${window.innerHeight * 0.25}
            L ${window.innerWidth * 0.3} ${window.innerHeight * 0.35}
            Q ${window.innerWidth * 0.15} ${window.innerHeight * 0.45} ${window.innerWidth * 0.7} ${window.innerHeight * 0.55}
            Q ${window.innerWidth * 0.85} ${window.innerHeight * 0.65} ${window.innerWidth * 0.4} ${window.innerHeight * 0.75}
            Q ${window.innerWidth * 0.2} ${window.innerHeight * 0.85} ${window.innerWidth * 0.6} ${window.innerHeight * 0.95}
            L ${window.innerWidth * 0.5} ${window.innerHeight * 1.05}
          `}
          stroke="url(#pathGradient)"
          strokeWidth="4"
          fill="none"
          strokeDasharray="15,8"
          filter="url(#glow)"
          className="animate-pulse"
          style={{
            strokeLinecap: 'round',
            strokeLinejoin: 'round'
          }}
        />
        
        {/* Points de connexion pour chaque section */}
        <circle cx={window.innerWidth * 0.5} cy={window.innerHeight * 0.25} r="6" fill="#FF6B35" opacity="0.8" className="animate-pulse" />
        <circle cx={window.innerWidth * 0.3} cy={window.innerHeight * 0.35} r="5" fill="#FF6B35" opacity="0.7" />
        <circle cx={window.innerWidth * 0.7} cy={window.innerHeight * 0.55} r="5" fill="#FF6B35" opacity="0.7" />
        <circle cx={window.innerWidth * 0.4} cy={window.innerHeight * 0.75} r="5" fill="#FF6B35" opacity="0.7" />
        <circle cx={window.innerWidth * 0.6} cy={window.innerHeight * 0.95} r="6" fill="#FF6B35" opacity="0.8" className="animate-pulse" />
      </svg>

      {/* Labels des sections positionnés le long du chemin */}
      <div className="fixed inset-0 z-25 pointer-events-none text-xs font-tech text-white/70 uppercase tracking-wide">
        <div className="absolute font-bold" style={{ top: '23%', left: '52%', transform: 'translateX(-50%)' }}>
          ACCUEIL
        </div>
        <div className="absolute font-bold" style={{ top: '33%', left: '25%', transform: 'translateX(-50%)' }}>
          SERVICES
        </div>
        <div className="absolute font-bold" style={{ top: '53%', left: '75%', transform: 'translateX(-50%)' }}>
          FAQ
        </div>
        <div className="absolute font-bold" style={{ top: '73%', left: '35%', transform: 'translateX(-50%)' }}>
          ZONE
        </div>
        <div className="absolute font-bold" style={{ top: '93%', left: '65%', transform: 'translateX(-50%)' }}>
          CONTACT
        </div>
      </div>

      {/* Effet de particules le long du chemin */}
      <div className="fixed inset-0 z-15 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full animate-ping"
            style={{
              left: `${30 + (i * 5)}%`,
              top: `${25 + (i * 6)}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollCarAnimation;