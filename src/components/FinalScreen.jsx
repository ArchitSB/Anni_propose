import { motion } from 'framer-motion';

/**
 * The celebration screen after YES is clicked
 */
export default function FinalScreen() {
  // Floating hearts animation
  const hearts = ['💖', '💕', '💗', '💓', '💝', '❤️', '💘'];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(15px)',
      }}
    >
      {/* Main message */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          delay: 0.3,
        }}
        style={{
          textAlign: 'center',
          padding: '60px',
          borderRadius: '30px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(255, 23, 68, 0.5)',
        }}
      >
        <motion.h1
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            fontSize: '96px',
            fontWeight: '900',
            color: '#ffffff',
            marginBottom: '30px',
            textShadow: '0 0 40px rgba(255, 23, 68, 1)',
            letterSpacing: '3px',
          }}
        >
          Yippeeee 💖
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          style={{
            fontSize: '36px',
            fontWeight: '600',
            color: '#ffcde7',
            lineHeight: '1.6',
            maxWidth: '800px',
          }}
        >
          You just made me the happiest person alive
        </motion.p>

        {/* Emoji rain */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                y: -100,
                x: Math.random() * window.innerWidth,
                rotate: Math.random() * 360,
              }}
              animate={{
                y: window.innerHeight + 100,
                rotate: Math.random() * 360 + 720,
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                position: 'absolute',
                fontSize: `${30 + Math.random() * 40}px`,
                opacity: 0.7 + Math.random() * 0.3,
              }}
            >
              {hearts[Math.floor(Math.random() * hearts.length)]}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Sparkle effects */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          initial={{
            scale: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            scale: [0, 1, 0],
            x: (Math.random() - 0.5) * 1000,
            y: (Math.random() - 0.5) * 1000,
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${
              ['#ff1744', '#ff69b4', '#ffc1e3'][i % 3]
            }, transparent)`,
            boxShadow: `0 0 20px ${['#ff1744', '#ff69b4', '#ffc1e3'][i % 3]}`,
          }}
        />
      ))}
    </motion.div>
  );
}
