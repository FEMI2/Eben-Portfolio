import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
}

export function ImageWithFallback({ src, alt, fallback, ...props }: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      if (fallback) {
        setImageSrc(fallback);
      } else {
        // Fallback to a placeholder if no fallback provided
        setImageSrc(`https://ui-avatars.com/api/?name=${encodeURIComponent(alt)}&size=400&background=e9ebef&color=030213`);
      }
    }
  };

  return (
    <img
      {...props}
      src={imageSrc}
      alt={alt}
      onError={handleError}
      loading="lazy"
    />
  );
}