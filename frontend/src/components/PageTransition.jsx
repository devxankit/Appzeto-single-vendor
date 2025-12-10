import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useMemo, useTransition, useRef } from 'react';

const pageVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction === 'forward' ? 100 : direction === 'back' ? -100 : 0,
    y: direction === 'forward' || direction === 'back' ? 0 : 20,
  }),
  animate: {
    opacity: 1,
    x: 0,
    y: 0
  }
};

const pageTransition = {
  type: 'tween',
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.2
};

/**
 * Page transition wrapper for smooth route changes with direction-based animations
 * Optimized with React 18 useTransition for non-blocking route changes
 */
const PageTransition = ({ children }) => {
  const location = useLocation();
  const [direction, setDirection] = useState('none');
  const [prevPath, setPrevPath] = useState(location.pathname);
  const [isPending, startTransition] = useTransition();
  const scrollTimeoutRef = useRef(null);

  // Determine direction based on path changes
  useEffect(() => {
    const pathDepth = (path) => path.split('/').filter(Boolean).length;
    const currentDepth = pathDepth(location.pathname);
    const previousDepth = pathDepth(prevPath);

    startTransition(() => {
    if (currentDepth > previousDepth) {
      setDirection('forward');
    } else if (currentDepth < previousDepth) {
      setDirection('back');
    } else {
      setDirection('none');
    }
    setPrevPath(location.pathname);
    });
  }, [location.pathname, prevPath, startTransition]);

  // Scroll to top on route change - non-blocking
  useEffect(() => {
    // Clear any pending scroll timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Use requestAnimationFrame for smooth scroll
    scrollTimeoutRef.current = setTimeout(() => {
      requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      });
    }, 0);

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [location.pathname]);

  // Memoize the unique key to ensure it updates when location changes
  const uniqueKey = useMemo(() => location.pathname + location.search, [location.pathname, location.search]);

  // Only apply will-change when transitioning
  const willChangeStyle = useMemo(() => {
    return isPending 
      ? { willChange: 'transform, opacity', transform: 'translateZ(0)' }
      : { transform: 'translateZ(0)' };
  }, [isPending]);

  return (
    <div key={uniqueKey} className="w-full">
      <motion.div
        custom={direction}
        initial="initial"
        animate="animate"
        variants={pageVariants}
        transition={pageTransition}
        style={willChangeStyle}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PageTransition;

