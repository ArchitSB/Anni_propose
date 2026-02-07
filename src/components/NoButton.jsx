import { useState, useRef, useEffect } from 'react';

/**
 * The impossible-to-click NO button
 * CLICK-BASED: Jumps away dramatically when clicked, stays within card
 */
export default function NoButton() {
  const [isDodging, setIsDodging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Position relative to card
  const [isVisible, setIsVisible] = useState(false);
  const [isJumping, setIsJumping] = useState(false); // For shake animation
  const buttonRef = useRef(null);

  // Fade in animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  /**
   * Get container (proposal card) boundaries
   */
  const getContainerBounds = () => {
    if (!buttonRef.current) return null;

    // Find the proposal card container (parent with position: relative)
    let container = buttonRef.current.parentElement;
    while (container && getComputedStyle(container).position !== 'relative') {
      container = container.parentElement;
      if (!container || container === document.body) break;
    }

    if (!container) return null;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = buttonRef.current.getBoundingClientRect();

    return {
      containerWidth: containerRect.width,
      containerHeight: containerRect.height,
      buttonWidth: buttonRect.width,
      buttonHeight: buttonRect.height,
    };
  };

  /**
   * Clamp value within boundaries
   */
  const clamp = (value, min, max) => {
    return Math.max(min, Math.min(value, max));
  };

  /**
   * Generate dramatic jump to a far-away position
   * Ensures new position is significantly different from current
   */
  const generateNewPosition = (bounds) => {
    if (!bounds) return { x: 0, y: 0 };

    const { containerWidth, containerHeight, buttonWidth, buttonHeight } = bounds;
    
    // Calculate available space
    const maxX = containerWidth - buttonWidth;
    const maxY = containerHeight - buttonHeight;
    
    const margin = 30; // Small margin from edges
    const minX = margin;
    const minY = margin;
    
    // Minimum distance from current position (must move far!)
    const minDistance = Math.min(containerWidth, containerHeight) * 0.3; // 30% of smaller dimension
    
    let newX, newY, distance;
    let attempts = 0;
    
    do {
      // Generate random position
      newX = minX + Math.random() * (maxX - minX);
      newY = minY + Math.random() * (maxY - minY);
      
      // Calculate distance from current position
      const dx = newX - position.x;
      const dy = newY - position.y;
      distance = Math.sqrt(dx * dx + dy * dy);
      
      attempts++;
    } while (distance < minDistance && attempts < 20);
    
    // Clamp to bounds
    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));
    
    return { x: newX, y: newY };
  };

  /**
   * Check if position overlaps with YES button area
   * YES button is in the center-left of the button container
   */
  const wouldOverlapYesButton = (newX, newY, bounds) => {
    // Get the button container position (the flex container with both buttons)
    if (!buttonRef.current || !buttonRef.current.parentElement) return false;
    
    const buttonContainer = buttonRef.current.parentElement;
    const containerRect = buttonContainer.getBoundingClientRect();
    
    // YES button approximate area (left side of button container)
    // It's positioned before NO button in the flex layout
    const yesButtonWidth = 120; // Approximate
    const yesButtonHeight = 60; // Approximate
    const gap = 30; // Gap between buttons
    
    // YES button is on the left in the flex container
    const yesButtonLeft = 0;
    const yesButtonRight = yesButtonWidth;
    const yesButtonTop = 0;
    const yesButtonBottom = yesButtonHeight;

    // Check if new position would overlap
    const buttonRight = newX + bounds.buttonWidth;
    const buttonBottom = newY + bounds.buttonHeight;

    const overlaps = !(
      newX > yesButtonRight + gap ||
      buttonRight < yesButtonLeft ||
      newY > yesButtonBottom ||
      buttonBottom < yesButtonTop
    );

    return overlaps;
  };

  /**
   * Jump button to new position on click
   */
  const jumpButton = () => {
    const bounds = getContainerBounds();
    if (!bounds) return;

    // Generate new far-away position
    let newPos = generateNewPosition(bounds);
    
    // Ensure doesn't overlap YES button
    let attempts = 0;
    while (wouldOverlapYesButton(newPos.x, newPos.y, bounds) && attempts < 10) {
      newPos = generateNewPosition(bounds);
      attempts++;
    }

    // Update position and trigger shake animation
    setPosition(newPos);
    setIsJumping(true);
    
    // Remove shake animation after it completes
    setTimeout(() => setIsJumping(false), 400);
  };

  /**
   * Initialize button position from current location
   */
  const initializePosition = () => {
    if (!buttonRef.current) return;

    // Get button's position relative to its offset parent (the card)
    const button = buttonRef.current;
    const offsetParent = button.offsetParent;
    
    if (!offsetParent) return;

    // Calculate position relative to container
    const buttonRect = button.getBoundingClientRect();
    const containerRect = offsetParent.getBoundingClientRect();

    const relativeX = buttonRect.left - containerRect.left;
    const relativeY = buttonRect.top - containerRect.top;

    setPosition({ x: relativeX, y: relativeY });
  };

  /**
   * Handle click on NO button - makes it jump away!
   */
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isDodging) {
      // First click: switch to dodging mode
      setIsDodging(true);
      initializePosition();
      
      // Jump immediately after initialization
      setTimeout(() => {
        jumpButton();
      }, 10);
      return;
    }

    // Jump button to new position
    jumpButton();
  };

  // Base button styles (responsive)
  const baseStyle = {
    padding: 'clamp(12px, 2vh, 15px) clamp(30px, 4vw, 40px)', // Responsive padding
    fontSize: 'clamp(16px, 2vw, 18px)', // Responsive font size
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
    minWidth: 'fit-content', // Ensure button doesn't shrink too much
  };

  // Normal button (before dodging starts)
  if (!isDodging) {
    return (
      <button
        ref={buttonRef}
        onClick={handleClick}
        style={baseStyle}
      >
        No
      </button>
    );
  }

  // Dodging button - absolute position within card with shake effect
  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      style={{
        ...baseStyle,
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 100,
        margin: 0,
        padding: 'clamp(12px, 2vh, 15px) clamp(30px, 4vw, 40px)', // Match responsive padding
        transform: isJumping ? 'scale(0.9) rotate(-5deg)' : 'scale(1) rotate(0deg)', // Shake effect when jumping
        transition: isJumping 
          ? 'left 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55), top 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.2s ease-out'
          : 'transform 0.2s ease-out',
      }}
    >
      No
    </button>
  );
}
