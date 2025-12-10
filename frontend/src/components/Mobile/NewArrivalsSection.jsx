import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FiTag } from 'react-icons/fi';
import LazyImage from '../LazyImage';
import { getNewArrivals } from '../../data/products';
import useReducedMotion from '../../hooks/useReducedMotion';

const NewArrivalsSection = () => {
  const location = useLocation();
  const isMobileApp = location.pathname.startsWith('/app');
  const newArrivals = getNewArrivals(6);
  const prefersReducedMotion = useReducedMotion();

  if (newArrivals.length === 0) {
    return null;
  }

  // Simplified animations when reduced motion is preferred
  const containerVariants = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 },
      }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        whileHover: { scale: 1.01 },
      };

  return (
    <motion.div
      {...containerVariants}
      className="relative mx-4 my-4 rounded-2xl overflow-hidden shadow-xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500"
    >
      {/* Animated Gradient Overlay - Only if motion is not reduced */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
              'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
              'linear-gradient(225deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
              'linear-gradient(315deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
              'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ willChange: 'background' }}
        />
      )}

      {/* Decorative Background Pattern - Static when reduced motion */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        {prefersReducedMotion ? (
          <>
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full blur-2xl" />
          </>
        ) : (
          <>
            <motion.div
              className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl"
              animate={{
                x: [0, 20, 0],
                y: [0, 15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ willChange: 'transform' }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full blur-2xl"
              animate={{
                x: [0, -15, 0],
                y: [0, -10, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
              style={{ willChange: 'transform' }}
            />
          </>
        )}
      </div>
      
      {/* Content */}
      <div className="relative px-4 py-5">
        {/* Header with Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {prefersReducedMotion ? (
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <FiTag className="text-white text-lg" />
              </div>
            ) : (
              <motion.div
                className="bg-white/20 backdrop-blur-sm rounded-full p-2"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{ scale: 1.15, rotate: 10 }}
                style={{ willChange: 'transform' }}
              >
                <motion.div
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{ willChange: 'transform' }}
                >
                  <FiTag className="text-white text-lg" />
                </motion.div>
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {prefersReducedMotion ? (
                <h2 className="text-xl font-extrabold text-white drop-shadow-lg">
                  New Arrivals
                </h2>
              ) : (
                <motion.h2
                  className="text-xl font-extrabold text-white drop-shadow-lg"
                  animate={{
                    textShadow: [
                      '0 2px 4px rgba(0,0,0,0.2)',
                      '0 4px 8px rgba(255,255,255,0.3)',
                      '0 2px 4px rgba(0,0,0,0.2)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{ willChange: 'filter' }}
                >
                  New Arrivals
                </motion.h2>
              )}
              <p className="text-xs text-white/90 font-medium">Fresh products just added</p>
            </motion.div>
          </div>
          {prefersReducedMotion ? (
            <Link
              to="/app/search"
              className="bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-3 py-1.5 rounded-lg hover:bg-white/30 transition-all block"
            >
              See All
            </Link>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/app/search"
                className="bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-3 py-1.5 rounded-lg hover:bg-white/30 transition-all block"
              >
                See All
              </Link>
            </motion.div>
          )}
        </div>

        {/* Products Grid - Image Only */}
        <div className="flex flex-wrap md:flex-nowrap md:overflow-x-visible gap-2 md:gap-3">
          {newArrivals.map((product, index) => {
            const productLink = isMobileApp ? `/app/product/${product.id}` : `/product/${product.id}`;
            const itemVariants = prefersReducedMotion
              ? {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: index * 0.05, duration: 0.3 },
                }
              : {
                  initial: { opacity: 0, scale: 0.8, y: 20 },
                  animate: { opacity: 1, scale: 1, y: 0 },
                  transition: {
                    delay: index * 0.08,
                    type: 'spring',
                    stiffness: 100,
                    damping: 10,
                  },
                };

            return (
              <motion.div
                key={product.id}
                {...itemVariants}
                className="w-[calc(33.333%-0.5rem)] md:w-0 md:flex-1 md:min-w-0"
              >
                {prefersReducedMotion ? (
                  <div className="rounded-xl overflow-hidden">
                  <Link to={productLink}>
                    <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden relative rounded-xl">
                      <LazyImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
                        }}
                      />
                    </div>
                  </Link>
                  </div>
                ) : (
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 4px 6px rgba(0,0,0,0.1)',
                        '0 8px 12px rgba(59, 130, 246, 0.3)',
                        '0 4px 6px rgba(0,0,0,0.1)',
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.2,
                    }}
                    className="rounded-xl overflow-hidden"
                    style={{ willChange: 'box-shadow' }}
                  >
                    <Link to={productLink}>
                      <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden relative rounded-xl">
                        <LazyImage
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
                          }}
                        />
                      </div>
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default NewArrivalsSection;

