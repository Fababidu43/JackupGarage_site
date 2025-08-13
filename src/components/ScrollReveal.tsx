import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'rotate' | 'slide-diagonal' | 'bounce' | 'elastic';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  distance?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = '',
  threshold = 0.15,
  distance = 80
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        } else {
          // Réapparaître quand on scroll vers le haut avec un seuil plus bas
          if (entry.boundingClientRect.top > window.innerHeight * 0.8) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold: threshold,
        rootMargin: '-10px 0px -20px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay, threshold]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
    
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0) scale(0.95)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0) scale(0.95)`;
      case 'left':
        return `translate3d(-${distance}px, 0, 0) scale(0.9)`;
      case 'right':
        return `translate3d(${distance}px, 0, 0) scale(0.9)`;
      case 'scale':
        return 'translate3d(0, 0, 0) scale(0.8)';
      case 'rotate':
        return `translate3d(0, ${distance/2}px, 0) scale(0.9) rotate(-5deg)`;
      case 'slide-diagonal':
        return `translate3d(-${distance}px, ${distance}px, 0) scale(0.85) rotate(-3deg)`;
      case 'bounce':
        return `translate3d(0, ${distance * 1.5}px, 0) scale(0.7)`;
      case 'elastic':
        return `translate3d(0, ${distance}px, 0) scale(1.1)`;
      default:
        return `translate3d(0, ${distance}px, 0) scale(0.95)`;
    }
  };

  const getTransition = () => {
    switch (direction) {
      case 'bounce':
        return `all ${duration}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
      case 'elastic':
        return `all ${duration}s cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
      case 'slide-diagonal':
        return `all ${duration}s cubic-bezier(0.23, 1, 0.32, 1)`;
      case 'rotate':
        return `all ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
      default:
        return `all ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    }
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: getTransition(),
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;