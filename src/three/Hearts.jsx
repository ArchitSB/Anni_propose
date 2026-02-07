import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Creates a heart shape geometry
 */
function createHeartShape() {
  const shape = new THREE.Shape();
  
  const x = 0, y = 0;
  shape.moveTo(x, y);
  shape.bezierCurveTo(x, y + 0.3, x - 0.5, y + 0.3, x - 0.5, y);
  shape.bezierCurveTo(x - 0.5, y - 0.3, x - 0.3, y - 0.5, x, y - 0.8);
  shape.bezierCurveTo(x + 0.3, y - 0.5, x + 0.5, y - 0.3, x + 0.5, y);
  shape.bezierCurveTo(x + 0.5, y + 0.3, x, y + 0.3, x, y);

  return shape;
}

/**
 * Floating Hearts Component - Instanced meshes for performance
 */
export default function Hearts({ count = 50, explode = false, mousePosition }) {
  const meshRef = useRef();
  const heartShape = useMemo(() => createHeartShape(), []);
  
  // Store initial positions and speeds
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        speed: 0.5 + Math.random() * 0.5,
        scale: 0.3 + Math.random() * 0.4,
        explosionVelocity: [
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
        ],
      });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    particles.forEach((particle, i) => {
      const { position, rotation, speed, scale, explosionVelocity } = particle;

      if (explode) {
        // Explosion animation
        particle.position[0] += explosionVelocity[0] * delta * 10;
        particle.position[1] += explosionVelocity[1] * delta * 10;
        particle.position[2] += explosionVelocity[2] * delta * 10;
        particle.scale *= 1.05;
      } else {
        // Normal floating animation
        particle.position[1] += Math.sin(state.clock.elapsedTime * speed + i) * delta * 0.5;
        particle.rotation[0] += delta * 0.2;
        particle.rotation[2] += delta * 0.3;

        // React to mouse position
        if (mousePosition) {
          const dx = mousePosition.x * 10 - position[0];
          const dy = mousePosition.y * 10 - position[1];
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 5) {
            particle.position[0] += (Math.random() - 0.5) * delta * 2;
            particle.position[1] += (Math.random() - 0.5) * delta * 2;
          }
        }
      }

      // Update instance matrix
      dummy.position.set(...particle.position);
      dummy.rotation.set(...particle.rotation);
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <extrudeGeometry
        args={[
          heartShape,
          {
            depth: 0.3,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: 0.1,
            bevelSegments: 5,
          },
        ]}
      />
      <meshStandardMaterial
        color="#ff1744"
        emissive="#ff1744"
        emissiveIntensity={0.5}
        metalness={0.3}
        roughness={0.4}
      />
    </instancedMesh>
  );
}
