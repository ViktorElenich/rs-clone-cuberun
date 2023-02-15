import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Bike from '../Bike';
import LoadingGround from '../Loading/LoadingGround';
import { useStore } from '../../state';
import Ground from '../Ground';
import CubeGenerationComponent from '../CubeGenerationComponent';
import EnvironmentComponent from '../EnvironmentComponent';
import ArchGenerate from '../Arch/ArchGenerate';
import Speedometer from '../Speedometer';
import FinishGame from '../FinishGame';
import City from '../City';
import CustomEffects from '../Effects';
import Walls from '../Walls';
import { MAIN_COLORS } from '../../constants';
import Sound from '../Sound';

const Game = () => {
  const directionalLight = useStore((state) => state.directionalLight);

  return (
    <Canvas
      gl={{ antialias: false, alpha: false }}
      dpr={[1, 1.5]}
      style={{ background: '#141622' }}
    >
      <directionalLight
        ref={directionalLight}
        intensity={3}
        position={[0, Math.PI, 0]}
      />
      <ambientLight intensity={0.3} />

      <Suspense fallback={null}>
        <Bike>
          {directionalLight.current && (
            <primitive object={directionalLight.current.target} />
          )}
        </Bike>
      </Suspense>
      <Suspense fallback={<LoadingGround />}>
        <Ground />
      </Suspense>
      <ArchGenerate />
      <CubeGenerationComponent />
      <EnvironmentComponent />
      <Walls />
      <City />
      <CustomEffects />
      <Speedometer />
      <FinishGame />
      <Sound />
    </Canvas>
  );
};

export default Game;
