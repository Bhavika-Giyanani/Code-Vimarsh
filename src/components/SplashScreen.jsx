import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import content from '../data/content.json';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const { splash } = content;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const containerVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      scale: 1.1,
      transition: { duration: 0.5, ease: 'easeInOut' }
    }
  };

  const titleVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  const taglineVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: 0.5, ease: 'easeOut' }
    }
  };

  const loadingVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.4, delay: 1.2 }
    }
  };

  const dotVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
          variants={containerVariants}
          initial="initial"
          exit="exit"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Gradient orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/20 blur-3xl"
              animate={{
                x: [0, -50, 0],
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--muted-foreground) / 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, hsl(var(--muted-foreground) / 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />

          {/* Content */}
          <div className="relative z-10 text-center px-4">
            {/* Code brackets decoration */}
            <motion.div
              className="flex items-center justify-center gap-4 mb-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-6xl md:text-8xl font-mono text-primary/50">{'<'}</span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 'auto' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="overflow-hidden"
              >
                <motion.h1
                  className="text-5xl md:text-7xl lg:text-8xl font-bold text-gradient whitespace-nowrap"
                  variants={titleVariants}
                  initial="initial"
                  animate="animate"
                >
                  {splash.title}
                </motion.h1>
              </motion.div>
              <span className="text-6xl md:text-8xl font-mono text-primary/50">{'/>'}</span>
            </motion.div>

            {/* Tagline with typing effect */}
            <motion.div
              className="overflow-hidden"
              variants={taglineVariants}
              initial="initial"
              animate="animate"
            >
              <p className="text-xl md:text-3xl font-mono text-muted-foreground tracking-wider">
                {'// '}{splash.tagline}
              </p>
            </motion.div>

            {/* Loading indicator */}
            <motion.div
              className="mt-12 flex items-center justify-center gap-2"
              variants={loadingVariants}
              initial="initial"
              animate="animate"
            >
              <span className="text-sm font-mono text-muted-foreground">{splash.loadingText}</span>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary"
                    variants={dotVariants}
                    animate="animate"
                    style={{ animationDelay: `${i * 0.2}s` }}
                    transition={{ delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom code decoration */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-muted-foreground/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            console.log("Welcome to Code Vimarsh");
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
