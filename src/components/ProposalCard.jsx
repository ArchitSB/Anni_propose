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
        padding: 'clamp(40px, 8vw, 80px) clamp(30px, 6vw, 80px)',
        borderRadius: '30px',
        width: '90vw',
        maxWidth: '800px',
        minHeight: 'clamp(350px, 60vh, 500px)',
        position: 'relative', // Container for absolute positioned NO button
        overflow: 'hidden', // Keep button inside card
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
          fontSize: 'clamp(36px, 5vw, 56px)', // Responsive: 36px min, 56px max
          fontWeight: '800',
          color: '#ffffff',
          marginBottom: 'clamp(15px, 2vh, 20px)',
          textShadow: '0 0 30px rgba(255, 23, 68, 0.8)',
          letterSpacing: '1px',
          lineHeight: '1.2',
        }}
      >
        Diya, I still choose you ❤️
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{
          fontSize: 'clamp(18px, 2.5vw, 24px)', // Responsive: 18px min, 24px max
          fontWeight: '500',
          color: '#ffcde7',
          marginBottom: 'clamp(30px, 5vh, 50px)',
          lineHeight: '1.8',
          padding: '0 10px', // Prevent text from touching edges on small screens
        }}
      >
        It's been one amazing year with you,<br />
        and I'd love to keep choosing you again and again.
      </motion.p>

      {/* Buttons container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          display: 'flex',
          gap: 'clamp(15px, 3vw, 30px)', // Responsive gap
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          flexWrap: 'wrap', // Allow wrapping on very small screens
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
