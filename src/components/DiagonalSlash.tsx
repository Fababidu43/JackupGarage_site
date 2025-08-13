import React from 'react';

interface DiagonalSlashProps {
  topColor: string;      // couleur exacte de la section au-dessus
  bottomColor: string;   // couleur exacte de la section en dessous
  type?: 'section' | 'service';
  className?: string;
}

const DiagonalSlash: React.FC<DiagonalSlashProps> = ({ 
  topColor, 
  bottomColor, 
  type = 'section', 
  className = '' 
}) => (
  <div
    className={`diag diag--slash diag--${type} ${className}`}
    style={{
      // fond = bottomColor (plus d'::after)
      background: bottomColor,
      // triangle = topColor
      ['--top-bg' as any]: topColor,
      ['--bottom-bg' as any]: bottomColor
    }}
  />
);

export default DiagonalSlash;