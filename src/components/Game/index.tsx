import { Suspense } from 'react';
import Bike from '../Bike';
import LoadingGround from '../Loading/LoadingGround';
import Ground from '../Ground';
import { Canvas } from '@react-three/fiber';
import { useStore } from '../../state';
import CubeGenerationComponent from '../CubeGenerationComponent';
import { Environment } from '@react-three/drei';
import EnvironmentComponent from '../EnvironmentComponent';
import ArchGenerate from '../Arch/ArchGenerate';
import Speedometer from '../Speedometer';
import FinishGame from '../FinishGame';

const Index = () => {
  const directionalLight = useStore((state) => state.directionalLight);
  const gameFinish = useStore((state) => state.gameFinish);

  return (
    <Canvas
      gl={{ antialias: false, alpha: false }}
      dpr={[1, 1.5]}
      style={{ background: '#141622' }}
    >
      <color attach='background' args={['blue']} />
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
      <ArchGenerate start={true} />
      <ArchGenerate start={false} />
      <CubeGenerationComponent />
      <Environment background>
        <EnvironmentComponent />
      </Environment>
      <Speedometer />
      {gameFinish && <FinishGame />}
    </Canvas>
  );
};

export default Index;
