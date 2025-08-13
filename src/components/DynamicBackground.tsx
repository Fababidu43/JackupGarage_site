import React, { useEffect, useState } from 'react';

const DynamicBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      setWindowHeight(window.innerHeight);
      setDocumentHeight(document.documentElement.scrollHeight);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Initial setup
    updateDimensions();
    handleScroll();

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Calculate scroll progress (0 to 1)
  const scrollProgress = Math.min(scrollY / (documentHeight - windowHeight), 1);
  
  // Calculate positions with parallax effect
  const shape1Y = scrollY * 0.3; // Slower parallax
  const shape2Y = scrollY * 0.5; // Medium parallax
  
  // Color transitions based on scroll progress
  const getShape1Colors = () => {
    if (scrollProgress < 0.2) {
      // Hero section - Orange dominant
      return {
        from: `rgba(255, 107, 53, ${0.15 - scrollProgress * 0.3})`,
        to: `rgba(255, 140, 66, ${0.08 - scrollProgress * 0.2})`
      };
    } else if (scrollProgress < 0.4) {
      // Services section - Orange to neutral
      const localProgress = (scrollProgress - 0.2) / 0.2;
      return {
        from: `rgba(255, 107, 53, ${0.12 - localProgress * 0.08})`,
        to: `rgba(26, 26, 26, ${0.05 + localProgress * 0.03})`
      };
    } else if (scrollProgress < 0.7) {
      // Middle sections - Neutral tones
      return {
        from: `rgba(26, 26, 26, 0.08)`,
        to: `rgba(255, 107, 53, 0.06)`
      };
    } else {
      // Contact section - Dark dominant
      const localProgress = (scrollProgress - 0.7) / 0.3;
      return {
        from: `rgba(10, 10, 10, ${0.12 + localProgress * 0.08})`,
        to: `rgba(255, 107, 53, ${0.08 - localProgress * 0.04})`
      };
    }
  };

  const getShape2Colors = () => {
    if (scrollProgress < 0.3) {
      // Early sections - Subtle orange
      return {
        from: `rgba(255, 140, 66, ${0.08 - scrollProgress * 0.2})`,
        to: `rgba(255, 107, 53, ${0.12 - scrollProgress * 0.3})`
      };
    } else if (scrollProgress < 0.6) {
      // Middle sections - Balanced
      const localProgress = (scrollProgress - 0.3) / 0.3;
      return {
        from: `rgba(255, 107, 53, ${0.06 + localProgress * 0.02})`,
        to: `rgba(26, 26, 26, ${0.04 + localProgress * 0.04})`
      };
    } else {
      // End sections - Dark with orange accent
      return {
        from: `rgba(26, 26, 26, 0.08)`,
        to: `rgba(255, 107, 53, 0.10)`
      };
    }
  };

  // Shape morphing based on scroll
  const getShape1Transform = () => {
    const rotation = scrollProgress * 180; // Full rotation over scroll
    const scale = 1 + scrollProgress * 0.3; // Slight growth
    const skew = Math.sin(scrollProgress * Math.PI) * 10; // Wave-like skew
    
    return `rotate(${rotation}deg) scale(${scale}) skewX(${skew}deg)`;
  };

  const getShape2Transform = () => {
    const rotation = -scrollProgress * 120; // Counter rotation
    const scale = 1.2 - scrollProgress * 0.2; // Slight shrink
    const skew = Math.cos(scrollProgress * Math.PI * 1.5) * 15; // Different wave
    
    return `rotate(${rotation}deg) scale(${scale}) skewY(${skew}deg)`;
  };

  // Responsive sizing
  const getShape1Size = () => {
    const baseSize = windowHeight > 768 ? 800 : 400;
    const variation = Math.sin(scrollProgress * Math.PI * 2) * 100;
    return baseSize + variation;
  };

  const getShape2Size = () => {
    const baseSize = windowHeight > 768 ? 600 : 300;
    const variation = Math.cos(scrollProgress * Math.PI * 1.5) * 80;
    return baseSize + variation;
  };

  const shape1Colors = getShape1Colors();
  const shape2Colors = getShape2Colors();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Shape 1 - Primary morphing blob */}
      <div
        className="absolute transition-all duration-300 ease-out"
        style={{
          width: `${getShape1Size()}px`,
          height: `${getShape1Size()}px`,
          left: `${20 + Math.sin(scrollProgress * Math.PI) * 15}%`,
          top: `${shape1Y - 200}px`,
          background: `radial-gradient(ellipse at center, ${shape1Colors.from} 0%, ${shape1Colors.to} 70%, transparent 100%)`,
          borderRadius: `${40 + Math.sin(scrollProgress * Math.PI * 3) * 20}% ${60 + Math.cos(scrollProgress * Math.PI * 2) * 15}% ${50 + Math.sin(scrollProgress * Math.PI * 4) * 25}% ${45 + Math.cos(scrollProgress * Math.PI * 1.5) * 20}%`,
          transform: getShape1Transform(),
          filter: `blur(${2 + scrollProgress * 3}px)`,
          opacity: 0.8 - scrollProgress * 0.2
        }}
      />

      {/* Shape 2 - Secondary complementary blob */}
      <div
        className="absolute transition-all duration-300 ease-out"
        style={{
          width: `${getShape2Size()}px`,
          height: `${getShape2Size()}px`,
          right: `${15 + Math.cos(scrollProgress * Math.PI * 1.2) * 20}%`,
          top: `${shape2Y + windowHeight * 0.3}px`,
          background: `radial-gradient(ellipse at center, ${shape2Colors.from} 0%, ${shape2Colors.to} 60%, transparent 100%)`,
          borderRadius: `${55 + Math.cos(scrollProgress * Math.PI * 2.5) * 25}% ${35 + Math.sin(scrollProgress * Math.PI * 3.5) * 20}% ${65 + Math.cos(scrollProgress * Math.PI * 2) * 15}% ${40 + Math.sin(scrollProgress * Math.PI * 2.8) * 30}%`,
          transform: getShape2Transform(),
          filter: `blur(${1.5 + scrollProgress * 2.5}px)`,
          opacity: 0.7 - scrollProgress * 0.15
        }}
      />

      {/* Subtle overlay for depth */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at ${50 + Math.sin(scrollProgress * Math.PI) * 20}% ${30 + scrollProgress * 40}%, rgba(255, 107, 53, ${0.02 + scrollProgress * 0.03}) 0%, transparent 50%)`,
          opacity: 0.6
        }}
      />
    </div>
  );
};

export default DynamicBackground;