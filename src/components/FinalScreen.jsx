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
          padding: 'clamp(40px, 6vw, 60px)',
          borderRadius: '30px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(255, 23, 68, 0.5)',
          maxWidth: '90vw',
          width: '100%',
          maxWidth: '900px', // Limit max width for large screens
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
            fontSize: 'clamp(60px, 10vw, 96px)', // Responsive: 60px min, 96px max
            fontWeight: '900',
            color: '#ffffff',
            marginBottom: 'clamp(20px, 3vh, 30px)',
            textShadow: '0 0 40px rgba(255, 23, 68, 1)',
            letterSpacing: 'clamp(1px, 0.3vw, 3px)',
            lineHeight: '1.2',
          }}
        >
          Yippppeeee �
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          style={{
            fontSize: 'clamp(20px, 3.5vw, 32px)', // Responsive: 20px min, 32px max
            fontWeight: '600',
            color: '#ffcde7',
            lineHeight: '1.8',
            maxWidth: '800px',
            marginBottom: 'clamp(30px, 4vh, 40px)',
            padding: '0 20px', // Prevent text from touching edges
          }}
        >
          One year down, forever to go.<br />
          Thank you for choosing me, Diya.<br />
          <span style={{ 
            fontSize: 'clamp(18px, 2.8vw, 28px)', // Responsive signature text
            fontStyle: 'italic',
            color: '#ff69b4',
            textShadow: '0 0 20px rgba(255, 105, 180, 0.8)',
          }}>
            — Yours, Anni ❤️
          </span>
        </motion.p>

        {/* Celebration GIF */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, type: 'spring' }}
          style={{
            marginTop: 'clamp(15px, 2vh, 20px)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(255, 23, 68, 0.4), 0 0 60px rgba(255, 105, 180, 0.3)',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            maxWidth: 'min(400px, 90%)', // Responsive: never exceed 400px or 90% of container
            width: '100%',
          }}
        >
          <img 
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDZ0YzN6dTBkZGJhY2FvbHM4ZDJsYzF6eDJhbGRiYzN6Ym9qZHZ6YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KZQlfylo73AMU/giphy.gif"
            alt="Celebration"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </motion.div>

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
