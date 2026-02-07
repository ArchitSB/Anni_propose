import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Hearts from './Hearts';
import Lights from './Lights';
import CameraRig from './CameraRig';
import Effects from './Effects';
import Particles from './Particles';

/**
 * Main 3D Scene Component
 */
export default function Scene({ mousePosition, celebrate, heartCount }) {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, #1a0a1f, #4a0e4e)',
      }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
    >
      <Suspense fallback={null}>
        {/* Fog for depth */}
        <fog attach="fog" args={['#2a0a2f', 10, 50]} />

        {/* Camera with cinematic movement */}
        <CameraRig
          mousePosition={mousePosition}
          zoomIn={celebrate}
          shake={celebrate}
        />

        {/* Lighting setup */}
        <Lights
          intensity={celebrate ? 2 : 1}
          celebrate={celebrate}
        />

        {/* Particle system */}
        <Particles count={200} />

        {/* Floating hearts */}
        <Hearts
          count={heartCount}
          explode={celebrate}
          mousePosition={mousePosition}
        />

        {/* Post-processing effects */}
        <Effects bloomIntensity={celebrate ? 2 : 1} />
      </Suspense>
    </Canvas>
  );
}
