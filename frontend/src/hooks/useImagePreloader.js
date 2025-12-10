import { useEffect, useRef } from 'react';

/**
 * Hook to preload images in the background with priority support
 * @param {string[]} imageUrls - Array of image URLs to preload
 * @param {boolean} enabled - Whether preloading is enabled (default: true)
 * @param {string} priority - Priority level: 'high', 'low', or 'auto' (default: 'low')
 */
const useImagePreloader = (imageUrls, enabled = true, priority = 'low') => {
  const preloadedImages = useRef(new Set());
  const loadingImages = useRef(new Set());

  useEffect(() => {
    if (!enabled || !imageUrls || imageUrls.length === 0) {
      return;
    }

    // Preload images that haven't been preloaded yet
    imageUrls.forEach((url) => {
      if (!preloadedImages.current.has(url) && !loadingImages.current.has(url) && url) {
        loadingImages.current.add(url);
        
        const img = new Image();
        
        // Set fetch priority if supported
        if ('fetchPriority' in img) {
          img.fetchPriority = priority;
        }
        
        // Handle successful load
        img.onload = () => {
          preloadedImages.current.add(url);
          loadingImages.current.delete(url);
        };
        
        // Handle error
        img.onerror = () => {
          loadingImages.current.delete(url);
        };
        
        // Start loading
        img.src = url;
      }
    });

    // Cleanup function (optional - images will remain in cache)
    return () => {
      // Images are cached by browser, so we don't need to clean up
      // But we can clear the loading set if needed
    };
  }, [imageUrls, enabled, priority]);

  return {
    preloadedCount: preloadedImages.current.size,
    isPreloaded: (url) => preloadedImages.current.has(url),
    isLoading: (url) => loadingImages.current.has(url),
  };
};

export default useImagePreloader;

