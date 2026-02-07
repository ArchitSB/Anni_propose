import { motion } from 'framer-motion';
import YesButton from './YesButton';
import NoButton from './NoButton';

/**
 * The main proposal card with glassmorphism effect
 */
export default function ProposalCard({ onYesClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 1,
        delay: 0.5,
        type: 'spring',
        stiffness: 100,
      }}
      style={{
        textAlign: 'center',
        padding: '60px 80px',
        borderRadius: '30px',
        minWidth: '500px',
        maxWidth: '90vw',
        position: 'relative',
      }}
      className="glass-card"
    >
      {/* Title */}
      <motion.h1
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          fontSize: '64px',
          fontWeight: '800',
          color: '#ffffff',
          marginBottom: '20px',
          textShadow: '0 0 30px rgba(255, 23, 68, 0.8)',
          letterSpacing: '2px',
        }}
      >
        I Love You ❤️
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{
          fontSize: '28px',
          fontWeight: '500',
          color: '#ffcde7',
          marginBottom: '50px',
          lineHeight: '1.6',
        }}
      >
        Will you be my Valentine?
      </motion.p>

      {/* Buttons container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          display: 'flex',
          gap: '30px',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <YesButton onClick={onYesClick} />
        <NoButton />
      </motion.div>

      {/* Decorative hearts */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          fontSize: '48px',
        }}
      >
        💕
      </motion.div>

      <motion.div
        animate={{
          y: [0, 10, 0],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          fontSize: '48px',
        }}
      >
        💖
      </motion.div>
    </motion.div>
  );
}
