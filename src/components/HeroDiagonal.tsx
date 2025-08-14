import React, { useEffect, useState } from 'react';

interface HeroDiagonalProps {
  bottomColor: string;
  className?: string;
}

const HeroDiagonal: React.FC<HeroDiagonalProps> = ({ 
  bottomColor, 
  className = '' 
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      // Même calcul de zoom que dans le Hero
      const zoomFactor = 1 + (scrolled * 0.0005);
      setScrollProgress(zoomFactor);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`diag diag--slash diag--section ${className}`}
      style={{
        background: bottomColor,
        ['--bottom-bg' as any]: bottomColor
      }}
    >
      {/* Image de fond identique au Hero avec même zoom */}
      <div
        className="absolute inset-0 -top-px"
        style={{
          background: `url('https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${100 * scrollProgress}% auto`,
          clipPath: 'polygon(-3% -1%, 103% -1%, -3% 103%)',
          zIndex: 1
        }}
      />
      
      {/* Filtre sombre identique au Hero */}
      <div
        className="absolute inset-0 -top-px"
        style={{
          background: 'linear-gradient(rgba(10, 10, 10, 0.85), rgba(26, 26, 26, 0.9))',
          clipPath: 'polygon(-3% -1%, 103% -1%, -3% 103%)',
          zIndex: 2
        }}
      />
    </div>
  );
};

export default HeroDiagonal;