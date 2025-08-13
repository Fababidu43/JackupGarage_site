import React from 'react';
import { useScrollAnimation, useParallax } from '../hooks/useScrollAnimations';

interface AnimatedElementProps {
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn' | 'glitch' | 'hologram';
  delay?: number;
  className?: string;
}

export const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  className = ''
}) => {
  const { elementRef, isVisible, scrollProgress } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true
  });

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';
    
    switch (animation) {
      case 'fadeInUp':
        return 'animate-fade-in-up';
      case 'slideInLeft':
        return 'animate-slide-in-left';
      case 'slideInRight':
        return 'animate-slide-in-right';
      case 'scaleIn':
        return 'animate-scale-in';
      case 'glitch':
        return 'animate-glitch';
      case 'hologram':
        return 'animate-hologram';
      default:
        return 'animate-fade-in-up';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ease-out ${getAnimationClass()} ${className}`}
      style={{ 
        animationDelay: `${delay}ms`,
        transform: `translateY(${(1 - scrollProgress) * 20}px)`
      }}
    >
      {children}
    </div>
  );
};

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  speed = 0.5,
  className = ''
}) => {
  const offset = useParallax(speed);

  return (
    <div
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

interface MorphingShapeProps {
  className?: string;
}

export const MorphingShape: React.FC<MorphingShapeProps> = ({ className = '' }) => {
  const { elementRef, scrollProgress } = useScrollAnimation();

  return (
    <div
      ref={elementRef}
      className={`morphing-shape ${className}`}
      style={{
        transform: `rotate(${scrollProgress * 360}deg) scale(${0.5 + scrollProgress * 0.5})`,
        borderRadius: `${20 + scrollProgress * 30}%`,
      }}
    />
  );
};

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ 
  count = 20, 
  className = '' 
}) => {
  const { elementRef, scrollProgress } = useScrollAnimation();

  return (
    <div ref={elementRef} className={`relative ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-orange-400 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            transform: `translateY(${scrollProgress * -50}px)`,
            opacity: 0.3 + scrollProgress * 0.7
          }}
        />
      ))}
    </div>
  );
};