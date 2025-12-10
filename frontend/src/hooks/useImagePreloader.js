import { useEffect, useRef } from 'react';

/**
 * Hook to preload images in the background
 * @param {string[]} imageUrls - Array of image URLs to preload
 * @param {boolean} enabled - Whether preloading is enabled (default: true)
 */
const useImagePreloader = (imageUrls, enabled = true) => {
  const preloadedImages = useRef(new Set());

  useEffect(() => {
    if (!enabled || !imageUrls || imageUrls.length === 0) {
      return;
    }

    // Preload images that haven't been preloaded yet
    imageUrls.forEach((url) => {
      if (!preloadedImages.current.has(url) && url) {
        const img = new Image();
        img.src = url;
        preloadedImages.current.add(url);
      }
    });

    // Cleanup function (optional - images will remain in cache)
    return () => {
      // Images are cached by browser, so we don't need to clean up
      // But we can clear the ref if needed
    };
  }, [imageUrls, enabled]);

  return {
    preloadedCount: preloadedImages.current.size,
    isPreloaded: (url) => preloadedImages.current.has(url),
  };
};

export default useImagePreloader;

