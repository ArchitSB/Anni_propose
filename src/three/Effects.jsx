import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

/**
 * Post-processing effects for romantic glow
 */
export default function Effects({ bloomIntensity = 1 }) {
  return (
    <EffectComposer>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette
        offset={0.3}
        darkness={0.5}
      />
    </EffectComposer>
  );
}
