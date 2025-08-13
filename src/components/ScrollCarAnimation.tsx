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
      {/* Ligne continue qui traverse toutes les sections */}
      <svg 
        className="fixed inset-0 w-full h-full z-10 pointer-events-none"
        style={{ mixBlendMode: 'normal' }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="25%" stopColor="#FF8C42" />
            <stop offset="50%" stopColor="#FF6B35" />
            <stop offset="75%" stopColor="#FF8C42" />
            <stop offset="100%" stopColor="#FF6B35" />
          </linearGradient>
        </defs>
        
        {/* Tracé principal qui suit exactement vos images */}
        <path
          d="M 8 15 
             L 8 25
             Q 8 35, 15 40
             L 25 45
             Q 35 50, 45 52
             L 55 54
             Q 65 56, 75 60
             L 85 65
             Q 90 68, 85 72
             L 75 76
             Q 65 80, 55 82
             L 45 84
             Q 35 86, 25 88
             L 15 90
             Q 8 92, 8 95"
          stroke="url(#pathGradient)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Points de repère pour chaque section */}
        <circle cx="8" cy="15" r="0.4" fill="#FF6B35" opacity="0.8" />
        <circle cx="25" cy="45" r="0.3" fill="#FF8C42" opacity="0.7" />
        <circle cx="75" cy="60" r="0.3" fill="#FF6B35" opacity="0.7" />
        <circle cx="45" cy="84" r="0.3" fill="#FF8C42" opacity="0.7" />
        <circle cx="8" cy="95" r="0.4" fill="#FF6B35" opacity="0.8" />
      </svg>
    </div>
  );
};

export default ScrollCarAnimation;