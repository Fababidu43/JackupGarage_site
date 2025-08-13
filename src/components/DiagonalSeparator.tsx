import React from 'react';

interface DiagonalSeparatorProps {
  reverse?: boolean;
  className?: string;
}

const DiagonalSeparator: React.FC<DiagonalSeparatorProps> = ({ 
  reverse = false, 
  className = '' 
}) => {
  return (
    <div className={`diagonal-separator ${reverse ? 'reverse' : ''} ${className}`} />
  );
};

export default DiagonalSeparator;