import React from 'react';

interface DiagonalBackslashProps {
  topColor: string;
  bottomColor: string;
  type?: 'section' | 'service';
  className?: string;
}

const DiagonalBackslash: React.FC<DiagonalBackslashProps> = ({ 
  topColor, 
  bottomColor, 
  type = 'section', 
  className = '' 
}) => {
  // Vérifier si topColor est une URL d'image
  const isImageUrl = topColor.startsWith('url(');
  
  return (
    <div
      className={`diag diag--backslash diag--${type} ${className}`}
      style={{
        background: bottomColor,
        ['--top-bg' as any]: isImageUrl ? topColor : topColor,
        ['--bottom-bg' as any]: bottomColor
      }}
    />
  );
};

export default DiagonalBackslash;