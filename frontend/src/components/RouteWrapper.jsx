import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

/**
 * Wrapper component that forces remounting when location changes
 * Optimized to prevent unnecessary remounts and improve performance
 */
const RouteWrapper = ({ children }) => {
  const location = useLocation();
  
  // Memoize the key to prevent unnecessary re-renders
  const locationKey = useMemo(
    () => location.pathname + location.search,
    [location.pathname, location.search]
  );
  
  // Return children with location key to force remount on route change
  // Using a div with no styling to avoid layout interference
  // Only remount when location actually changes
  return (
    <div 
      key={locationKey} 
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </div>
  );
};

export default RouteWrapper;

