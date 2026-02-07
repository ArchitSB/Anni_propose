import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * Lighting setup for romantic atmosphere
 */
export default function Lights({ intensity = 1, celebrate = false }) {
  const pointLight1 = useRef();
  const pointLight2 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Gentle light movement
    if (pointLight1.current) {
      pointLight1.current.position.x = Math.sin(t * 0.5) * 5;
      pointLight1.current.position.y = Math.cos(t * 0.3) * 5;
      
      if (celebrate) {
        pointLight1.current.intensity = 3 + Math.sin(t * 5) * 1;
      }
    }
    
    if (pointLight2.current) {
      pointLight2.current.position.x = Math.cos(t * 0.4) * 5;
      pointLight2.current.position.z = Math.sin(t * 0.6) * 5;
      
      if (celebrate) {
        pointLight2.current.intensity = 3 + Math.cos(t * 5) * 1;
      }
    }
  });

  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.4 * intensity} color="#ffb3d9" />
      
      {/* Directional light for depth */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8 * intensity}
        color="#ff69b4"
      />
      
      {/* Point lights for romantic glow */}
      <pointLight
        ref={pointLight1}
        position={[5, 5, 5]}
        intensity={celebrate ? 3 : 1.5}
        color="#ff1744"
        distance={20}
        decay={2}
      />
      
      <pointLight
        ref={pointLight2}
        position={[-5, 3, -5]}
        intensity={celebrate ? 3 : 1.5}
        color="#ff69b4"
        distance={20}
        decay={2}
      />
      
      <pointLight
        position={[0, -5, 0]}
        intensity={1 * intensity}
        color="#ffc1e3"
        distance={15}
        decay={2}
      />
    </>
  );
}
