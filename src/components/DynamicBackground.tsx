import React, { useEffect, useState } from 'react';

const DynamicBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const updateWindowHeight = () => setWindowHeight(window.innerHeight);
    updateWindowHeight();
    window.addEventListener('resize', updateWindowHeight);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateWindowHeight);
    };
  }, []);

  // Calcul de la progression du scroll (0 à 1)
  const scrollProgress = Math.min(scrollY / (document.documentElement.scrollHeight - windowHeight), 1);
  
  // Parallaxe subtil
  const parallaxOffset = scrollY * 0.2;
  
  // Changement de couleur basé sur la position
  const getBackgroundColor = (progress: number) => {
    if (progress < 0.2) return { r: 26, g: 26, b: 26 }; // Hero - noir
    if (progress < 0.4) return { r: 248, g: 249, b: 250 }; // Services - blanc
    if (progress < 0.6) return { r: 10, g: 10, b: 10 }; // Zone - noir
    if (progress < 0.8) return { r: 248, g: 249, b: 250 }; // FAQ - blanc
    return { r: 10, g: 10, b: 10 }; // Contact - noir
  };

  const bgColor = getBackgroundColor(scrollProgress);
  const accentOpacity = 0.03 + (Math.sin(scrollProgress * Math.PI * 2) * 0.02);

  // Morphing des formes
  const morphValue1 = 50 + Math.sin(scrollProgress * Math.PI * 4) * 20;
  const morphValue2 = 30 + Math.cos(scrollProgress * Math.PI * 3) * 15;
  const morphValue3 = 40 + Math.sin(scrollProgress * Math.PI * 5) * 10;

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ 
        zIndex: -1,
        transform: `translateY(${parallaxOffset}px)`,
        background: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`
      }}
    >
      {/* Formes morphantes */}
      <div className="absolute inset-0 opacity-30">
        {/* Forme 1 - Grande bulle morphante */}
        <div
          className="absolute rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${morphValue1}vw`,
            height: `${morphValue1}vw`,
            background: `radial-gradient(circle, rgba(255, 107, 53, ${accentOpacity}) 0%, transparent 70%)`,
            top: `${20 + scrollProgress * 10}%`,
            left: `${-10 + scrollProgress * 20}%`,
            transform: `rotate(${scrollProgress * 360}deg) scale(${0.8 + scrollProgress * 0.4})`
          }}
        />
        
        {/* Forme 2 - Ellipse flottante */}
        <div
          className="absolute transition-all duration-1500 ease-out"
          style={{
            width: `${morphValue2}vw`,
            height: `${morphValue2 * 0.6}vw`,
            background: `linear-gradient(45deg, rgba(255, 107, 53, ${accentOpacity * 0.8}) 0%, transparent 60%)`,
            borderRadius: `${morphValue2}% ${100 - morphValue2}% ${morphValue2}% ${100 - morphValue2}%`,
            top: `${60 - scrollProgress * 20}%`,
            right: `${-5 + scrollProgress * 15}%`,
            transform: `rotate(${-scrollProgress * 180}deg)`
          }}
        />
        
        {/* Forme 3 - Blob organique */}
        <div
          className="absolute transition-all duration-2000 ease-out"
          style={{
            width: `${morphValue3}vw`,
            height: `${morphValue3}vw`,
            background: `radial-gradient(ellipse, rgba(255, 140, 66, ${accentOpacity * 0.6}) 0%, transparent 80%)`,
            borderRadius: `${morphValue3}% ${100 - morphValue3}% ${morphValue3 + 10}% ${90 - morphValue3}%`,
            bottom: `${10 + scrollProgress * 30}%`,
            left: `${30 + Math.sin(scrollProgress * Math.PI * 2) * 20}%`,
            transform: `scale(${0.6 + scrollProgress * 0.8}) rotate(${scrollProgress * 270}deg)`
          }}
        />
        
        {/* Particules flottantes */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full transition-all duration-3000 ease-out"
            style={{
              background: `rgba(255, 107, 53, ${accentOpacity * 2})`,
              top: `${20 + i * 15 + Math.sin(scrollProgress * Math.PI * (i + 1)) * 10}%`,
              left: `${10 + i * 20 + Math.cos(scrollProgress * Math.PI * (i + 1)) * 15}%`,
              transform: `translateY(${-scrollProgress * 100}px) scale(${0.5 + scrollProgress})`
            }}
          />
        ))}
      </div>
      
      {/* Grille tech subtile */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 107, 53, ${accentOpacity}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 107, 53, ${accentOpacity}) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: `translate(${scrollProgress * 20}px, ${scrollProgress * 20}px)`
        }}
      />
      
      {/* Dégradé de transition */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: `linear-gradient(
            ${45 + scrollProgress * 90}deg, 
            rgba(255, 107, 53, ${accentOpacity * 0.5}) 0%, 
            transparent 50%, 
            rgba(255, 140, 66, ${accentOpacity * 0.3}) 100%
          )`,
          opacity: 0.6
        }}
      />
    </div>
  );
};

export default DynamicBackground;