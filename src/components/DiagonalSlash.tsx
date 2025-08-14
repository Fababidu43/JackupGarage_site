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
}) => {
  // Vérifier si topColor est une URL d'image
  const isImageUrl = topColor.startsWith('url(');
  
  return (
  <div
    className={`diag diag--slash diag--${type} ${className}`}
    style={{
      background: bottomColor,
      ['--top-bg' as any]: topColor,
      ['--bottom-bg' as any]: bottomColor
    }}
  />
  );
};

export default DiagonalSlash;