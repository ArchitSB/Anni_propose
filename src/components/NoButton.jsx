import { useState, useRef, useEffect } from 'react';

/**
 * The impossible-to-click NO button that escapes from cursor
 * Uses pure CSS transitions to avoid Framer Motion transform issues
 */
export default function NoButton() {
  const [isDodging, setIsDodging] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [escapeCount, setEscapeCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);

  // Fade in animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  /**
   * Calculate a safe random position that keeps button fully on screen
   * ALWAYS uses absolute positioning from viewport origin
   */
  const getRandomPosition = () => {
    if (!buttonRef.current) return { left: 0, top: 0 };

    // Get actual button dimensions
    const rect = buttonRef.current.getBoundingClientRect();
    const buttonWidth = rect.width;
    const buttonHeight = rect.height;
    
    // Safety padding from screen edges
    const padding = 20;
    
    // Calculate safe boundaries
    const minX = padding;
    const minY = padding;
    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;
    
    // Defensive check: if screen too small, center it
    if (maxX < minX || maxY < minY) {
      return {
        left: (window.innerWidth - buttonWidth) / 2,
        top: (window.innerHeight - buttonHeight) / 2
      };
    }
    
    // Generate random position within safe bounds
    let newLeft = minX + Math.random() * (maxX - minX);
    let newTop = minY + Math.random() * (maxY - minY);
    
    // Extra safety clamping
    newLeft = Math.max(minX, Math.min(newLeft, maxX));
    newTop = Math.max(minY, Math.min(newTop, maxY));
    
    return { left: newLeft, top: newTop };
  };

  const handleEscape = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isDodging) {
      // First time: switch to dodging mode
      setIsDodging(true);
      // Get initial button position before it becomes fixed
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({ left: rect.left, top: rect.top });
      }
    }
    
    // Calculate new random position from scratch
    setEscapeCount((prev) => prev + 1);
    const newPos = getRandomPosition();
    setPosition(newPos);
  };

  // Recalculate safe position on window resize
  useEffect(() => {
    if (!isDodging) return;

    const handleResize = () => {
      const newPos = getRandomPosition();
      setPosition(newPos);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDodging]);

  // Calculate transition speed based on escape count
  const transitionDuration = Math.max(0.15, 0.3 - escapeCount * 0.02);

  // Base button styles
  const baseStyle = {
    padding: '15px 40px',
    fontSize: '18px',
    fontWeight: '600',
    color: '#ffffff',
    background: 'rgba(150, 150, 150, 0.3)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '15px',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    touchAction: 'none',
    userSelect: 'none',
    opacity: isVisible ? 1 : 0,
    transition: `opacity 0.5s ease`,
  };

  // Normal button (before dodging starts)
  if (!isDodging) {
    return (
      <button
        ref={buttonRef}
        onMouseEnter={handleEscape}
        onTouchStart={handleEscape}
        onPointerEnter={handleEscape}
        onClick={(e) => e.preventDefault()}
        style={baseStyle}
      >
        No
      </button>
    );
  }

  // Dodging button with pure CSS positioning
  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleEscape}
      onTouchStart={handleEscape}
      onPointerEnter={handleEscape}
      onClick={(e) => e.preventDefault()}
      style={{
        ...baseStyle,
        position: 'fixed',
        left: `${position.left}px`,
        top: `${position.top}px`,
        zIndex: 9999,
        margin: 0,
        transform: 'translate(0, 0)', // No transform offset
        transition: `left ${transitionDuration}s cubic-bezier(0.34, 1.56, 0.64, 1), 
                     top ${transitionDuration}s cubic-bezier(0.34, 1.56, 0.64, 1)`,
      }}
    >
      No
    </button>
  );
}
