import { useState, useRef, useEffect, useMemo } from 'react';

/**
 * Get optimized image source with WebP/AVIF fallbacks
 * @param {string} src - Original image source
 * @returns {string} - Optimized image source
 */
const getOptimizedSrc = (src) => {
  if (!src) return src;
  
  // If already using optimized format, return as is
  if (src.includes('.avif') || src.includes('.webp')) {
    return src;
  }
  
  // Try to get WebP version if available
  // This assumes images follow a pattern like image.png -> image.webp
  const extension = src.split('.').pop();
  const basePath = src.replace(`.${extension}`, '');
  
  // Return original for now - can be enhanced with actual format detection
  // In production, you'd want to check if WebP/AVIF exists on server
  return src;
};

const LazyImage = ({ 
  src, 
  alt, 
  className, 
  onError, 
  eager = false, 
  fetchpriority,
  rootMargin = '100px', // Increased from 50px for earlier loading
  sizes,
  srcset,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(eager ? src : null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Get optimized image source
  const optimizedSrc = useMemo(() => getOptimizedSrc(src), [src]);

  useEffect(() => {
    // If eager mode, load immediately
    if (eager) {
      setImageSrc(optimizedSrc);
      return;
    }

    // Use IntersectionObserver for lazy loading with improved settings
    if (typeof IntersectionObserver !== 'undefined') {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(optimizedSrc);
              if (observerRef.current) {
                observerRef.current.disconnect();
              }
            }
          });
        },
        {
          rootMargin, // Start loading earlier (100px by default)
          threshold: 0.01,
        }
      );

      if (imgRef.current) {
        observerRef.current.observe(imgRef.current);
      }
    } else {
      // Fallback for browsers without IntersectionObserver
      setImageSrc(optimizedSrc);
    }

    return () => {
      if (observerRef.current) {
        if (imgRef.current) {
          observerRef.current.unobserve(imgRef.current);
        }
        observerRef.current.disconnect();
      }
    };
  }, [optimizedSrc, eager, rootMargin]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = (e) => {
    // Fallback to original src if optimized version fails
    if (imageSrc !== src && !hasError) {
      setHasError(false);
      setImageSrc(src);
      return;
    }
    
    setHasError(true);
    setIsLoaded(false);
    if (onError) {
      onError(e);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className || ''}`} ref={imgRef}>
      {/* Placeholder/Blur effect */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
      )}

      {/* Actual Image */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className || ''}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          {...(fetchpriority && { fetchpriority })}
          {...(sizes && { sizes })}
          {...(srcset && { srcset })}
          {...props}
        />
      )}

      {/* Error Fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-xs">Failed to load</span>
        </div>
      )}
    </div>
  );
};

export default LazyImage;

