import { motion } from 'framer-motion';

/**
 * The glowing, premium YES button
 */
export default function YesButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        scale: 1.1,
        boxShadow: '0 0 40px rgba(255, 23, 68, 0.8)',
      }}
      whileTap={{ scale: 0.95 }}
      style={{
        padding: '20px 60px',
        fontSize: '24px',
        fontWeight: '700',
        color: '#ffffff',
        background: 'linear-gradient(135deg, #ff1744 0%, #ff4569 100%)',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        boxShadow: '0 0 30px rgba(255, 23, 68, 0.6)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
    >
      <motion.span
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          transform: 'translateX(-100%)',
        }}
      />
      <motion.span
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>Yes! 💖</span>
    </motion.button>
  );
}
