import { Bloom, BrightnessContrast, EffectComposer } from "@react-three/postprocessing";

const CustomEffects = () => {
  return (
    <EffectComposer>
      <Bloom
        intensity={1.0}
        luminanceThreshold={0}
        luminanceSmoothing={0.9}
      />
      <BrightnessContrast brightness={-0.12} contrast={0.06} />
    </EffectComposer>
  );
};

export default CustomEffects;
