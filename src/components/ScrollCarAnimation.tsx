import React, { useEffect, useState } from 'react';

const ScrollCarAnimation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / documentHeight, 1);
      setScrollProgress(progress);
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
      {/* Ligne qui traverse chaque section sur les fonds uniquement */}
      <svg 
        className="fixed inset-0 w-full h-full z-10 pointer-events-none"
        style={{ mixBlendMode: 'multiply' }}
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 107, 53, 0.6)" />
            <stop offset="20%" stopColor="rgba(255, 107, 53, 0.8)" />
            <stop offset="40%" stopColor="rgba(255, 107, 53, 0.7)" />
            <stop offset="60%" stopColor="rgba(255, 107, 53, 0.9)" />
            <stop offset="80%" stopColor="rgba(255, 107, 53, 0.6)" />
            <stop offset="100%" stopColor="rgba(255, 107, 53, 0.8)" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Chemin qui traverse chaque section sur les fonds */}
        <path
          d={`
            M ${window.innerWidth * 0.85} ${window.innerHeight * 0.35}
            L ${window.innerWidth * 0.15} ${window.innerHeight * 0.45}
            L ${window.innerWidth * 0.85} ${window.innerHeight * 0.55}
            L ${window.innerWidth * 0.2} ${window.innerHeight * 0.65}
            L ${window.innerWidth * 0.75} ${window.innerHeight * 0.75}
            L ${window.innerWidth * 0.25} ${window.innerHeight * 0.85}
            L ${window.innerWidth * 0.8} ${window.innerHeight * 0.95}
            L ${window.innerWidth * 0.15} ${window.innerHeight * 1.05}
          `}
          stroke="url(#pathGradient)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="12,6"
          filter="url(#glow)"
          className="animate-pulse"
          style={{
            strokeLinecap: 'round',
            strokeLinejoin: 'round'
          }}
        />
        
        {/* Points de connexion pour chaque section */}
        <circle cx={window.innerWidth * 0.85} cy={window.innerHeight * 0.35} r="4" fill="#FF6B35" opacity="0.8" />
        <circle cx={window.innerWidth * 0.15} cy={window.innerHeight * 0.45} r="4" fill="#FF6B35" opacity="0.7" />
        <circle cx={window.innerWidth * 0.85} cy={window.innerHeight * 0.55} r="4" fill="#FF6B35" opacity="0.7" />
        <circle cx={window.innerWidth * 0.2} cy={window.innerHeight * 0.65} r="4" fill="#FF6B35" opacity="0.7" />
        <circle cx={window.innerWidth * 0.75} cy={window.innerHeight * 0.75} r="4" fill="#FF6B35" opacity="0.7" />
        <circle cx={window.innerWidth * 0.25} cy={window.innerHeight * 0.85} r="4" fill="#FF6B35" opacity="0.7" />
        <circle cx={window.innerWidth * 0.8} cy={window.innerHeight * 0.95} r="4" fill="#FF6B35" opacity="0.7" />
        <circle cx={window.innerWidth * 0.15} cy={window.innerHeight * 1.05} r="5" fill="#FF6B35" opacity="0.9" className="animate-pulse" />
      </svg>

      {/* Labels des sections positionnés le long du chemin */}
      <div className="fixed inset-0 z-15 pointer-events-none text-xs font-tech text-white/60 uppercase tracking-wide">
        <div className="absolute font-medium" style={{ top: '33%', right: '12%', transform: 'translateX(50%)' }}>
          HERO
        </div>
        <div className="absolute font-medium" style={{ top: '43%', left: '12%', transform: 'translateX(-50%)' }}>
          SERVICES
        </div>
        <div className="absolute font-medium" style={{ top: '53%', right: '12%', transform: 'translateX(50%)' }}>
          FAQ
        </div>
        <div className="absolute font-medium" style={{ top: '63%', left: '17%', transform: 'translateX(-50%)' }}>
          ZONE
        </div>
        <div className="absolute font-medium" style={{ top: '73%', right: '22%', transform: 'translateX(50%)' }}>
          CONTACT
        </div>
        <div className="absolute font-medium" style={{ top: '103%', left: '12%', transform: 'translateX(-50%)' }}>
          FOOTER
        </div>
      </div>

      {/* Particules qui suivent le chemin */}
      <div className="fixed inset-0 z-12 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full animate-ping"
            style={{
              left: `${15 + (i * 10)}%`,
              top: `${35 + (i * 8)}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: '2.5s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollCarAnimation;