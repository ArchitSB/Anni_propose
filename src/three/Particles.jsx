import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Particle system for atmospheric effect
 */
export default function Particles({ count = 200 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random positions in a sphere
      positions[i3] = (Math.random() - 0.5) * 40;
      positions[i3 + 1] = (Math.random() - 0.5) * 40;
      positions[i3 + 2] = (Math.random() - 0.5) * 40;

      // Pink/red color variations
      colors[i3] = 1;
      colors[i3 + 1] = Math.random() * 0.5;
      colors[i3 + 2] = Math.random() * 0.5 + 0.5;
    }

    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Floating animation
      positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.01;
      
      // Wrap around
      if (positions[i3 + 1] > 20) positions[i3 + 1] = -20;
      if (positions[i3 + 1] < -20) positions[i3 + 1] = 20;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}
