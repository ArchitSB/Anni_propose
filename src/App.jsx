import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Scene from './three/Scene';
import ProposalCard from './components/ProposalCard';
import FinalScreen from './components/FinalScreen';
import './styles/global.css';

/**
 * Main App Component - Valentine Proposal Experience
 * A cinematic, interactive proposal website with Three.js
 */
function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [celebrate, setCelebrate] = useState(false);
  const [showProposal, setShowProposal] = useState(true);
  const [heartCount, setHeartCount] = useState(50);

  // Track mouse movement for parallax and interactions
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle YES button click
  const handleYesClick = () => {
    // Hide proposal card
    setShowProposal(false);

    // Wait for fade out, then trigger celebration
    setTimeout(() => {
      setCelebrate(true);
      setHeartCount(200); // Multiply hearts
    }, 800);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* 3D Background Scene */}
      <Scene
        mousePosition={mousePosition}
        celebrate={celebrate}
        heartCount={heartCount}
      />

      {/* Centered UI Container */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        {/* Proposal Card with glassmorphism */}
        <AnimatePresence>
          {showProposal && (
            <motion.div
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
              style={{ pointerEvents: 'auto' }}
            >
              <ProposalCard onYesClick={handleYesClick} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Final celebration screen */}
      <AnimatePresence>
        {celebrate && <FinalScreen />}
      </AnimatePresence>

      {/* Loading overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(to bottom, #1a0a1f, #4a0e4e)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            fontSize: '96px',
          }}
        >
          💖
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
