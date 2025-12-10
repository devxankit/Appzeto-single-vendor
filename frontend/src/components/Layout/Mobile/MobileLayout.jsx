import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MobileHeader from './MobileHeader';
import MobileBottomNav from './MobileBottomNav';
import MobileCartBar from './MobileCartBar';
import CartDrawer from '../../Cart/CartDrawer';
import useMobileHeaderHeight from '../../../hooks/useMobileHeaderHeight';

const MobileLayout = ({ children, showBottomNav = true, showCartBar = true }) => {
  const location = useLocation();
  const headerHeight = useMobileHeaderHeight();
  // Hide header and bottom nav on login, register, and verification pages
  const isAuthPage = location.pathname === '/app/login' || 
                     location.pathname === '/app/register' || 
                     location.pathname === '/app/verification';
  
  // Always show bottom nav on /app routes, except auth pages
  const shouldShowBottomNav = location.pathname.startsWith('/app') && !isAuthPage ? true : (showBottomNav && !isAuthPage);
  // Hide header on categories, search, wishlist, profile, and auth pages
  const shouldShowHeader = !isAuthPage && 
                           location.pathname !== '/app/categories' && 
                           location.pathname !== '/app/search' && 
                           location.pathname !== '/app/wishlist' && 
                           location.pathname !== '/app/profile';
  
  // Ensure body scroll is restored and scrollbar is hidden when component mounts
  useEffect(() => {
    // Allow vertical scrolling but hide scrollbar
    document.body.style.overflowY = 'auto';
    document.body.style.overflowX = 'hidden';
    // Hide scrollbar
    document.body.style.scrollbarWidth = 'none';
    document.body.style.msOverflowStyle = 'none';
    
    // Webkit scrollbar hiding with data attribute for cleanup
    const style = document.createElement('style');
    style.setAttribute('data-mobile-scrollbar', 'true');
    style.textContent = `
      body::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
      }
      body::-webkit-scrollbar-track {
        display: none !important;
      }
      body::-webkit-scrollbar-thumb {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.body.style.overflowY = '';
      document.body.style.overflowX = '';
      document.body.style.scrollbarWidth = '';
      document.body.style.msOverflowStyle = '';
      // Remove style tag if it exists
      const styleTag = document.head.querySelector('style[data-mobile-scrollbar]');
      if (styleTag) {
        styleTag.remove();
      }
    };
  }, []);

  return (
    <>
      {shouldShowHeader && <MobileHeader />}
      <main 
        className={`min-h-screen w-full overflow-x-hidden ${shouldShowBottomNav ? 'pb-20' : ''} ${showCartBar ? 'pb-24' : ''}`}
        style={{ paddingTop: shouldShowHeader ? `${headerHeight}px` : '0px' }}
      >
        {children}
      </main>
      {showCartBar && <MobileCartBar />}
      {shouldShowBottomNav && <MobileBottomNav />}
      <CartDrawer />
    </>
  );
};

export default MobileLayout;

