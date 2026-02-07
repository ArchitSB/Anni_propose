import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Camera with cinematic movement and mouse parallax
 */
export default function CameraRig({ mousePosition, zoomIn = false, shake = false }) {
  const cameraRef = useRef();
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!cameraRef.current) return;

    const t = state.clock.elapsedTime;

    if (zoomIn) {
      // Zoom in animation when YES is clicked
      cameraRef.current.position.z = THREE.MathUtils.lerp(
        cameraRef.current.position.z,
        5,
        delta * 2
      );
      cameraRef.current.position.y = THREE.MathUtils.lerp(
        cameraRef.current.position.y,
        2,
        delta * 2
      );
    } else {
      // Subtle cinematic drift
      const driftX = Math.sin(t * 0.2) * 0.5;
      const driftY = Math.cos(t * 0.15) * 0.3;

      // Mouse parallax
      const parallaxX = mousePosition ? mousePosition.x * 2 : 0;
      const parallaxY = mousePosition ? mousePosition.y * 2 : 0;

      cameraRef.current.position.x = THREE.MathUtils.lerp(
        cameraRef.current.position.x,
        driftX + parallaxX,
        delta * 0.5
      );
      
      cameraRef.current.position.y = THREE.MathUtils.lerp(
        cameraRef.current.position.y,
        driftY + parallaxY,
        delta * 0.5
      );
    }

    // Camera shake effect
    if (shake) {
      cameraRef.current.position.x += (Math.random() - 0.5) * 0.1;
      cameraRef.current.position.y += (Math.random() - 0.5) * 0.1;
    }

    // Always look at center
    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 15]}
      fov={75}
    />
  );
}
