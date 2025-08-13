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
      {/* Ligne simple du Hero vers Services */}
      <svg 
        className="fixed inset-0 w-full h-full z-10 pointer-events-none"
        style={{ mixBlendMode: 'normal' }}
      >
        <defs>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="50%" stopColor="#FF8C42" />
            <stop offset="100%" stopColor="#FF6B35" />
          </linearGradient>
        </defs>
        
        {/* Ligne du Hero vers Services */}
        <line
          x1={window.innerWidth * 0.5}
          y1={window.innerHeight * 0.85}
          x2={window.innerWidth * 0.5}
          y2={window.innerHeight * 1.15}
          stroke="url(#orangeGradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* Point de départ dans le Hero */}
        <circle 
          cx={window.innerWidth * 0.5} 
          cy={window.innerHeight * 0.85} 
          r="6" 
          fill="#FF6B35" 
          opacity="0.9"
        />
        
        {/* Point d'arrivée vers Services */}
        <circle 
          cx={window.innerWidth * 0.5} 
          cy={window.innerHeight * 1.15} 
          r="6" 
          fill="#FF6B35" 
          opacity="0.9"
        />
      </svg>
    </div>
  );
};

export default ScrollCarAnimation;