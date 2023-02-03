import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Bike from './components/Bike';
import { useStore } from './state';
import Ground from './components/Ground';
import CubeGenerationComponent from './CubeGenerationComponent';
import { Environment, OrbitControls } from '@react-three/drei';
import EnvironmentComponent from './components/EnvironmentComponent';

function App() {
  const directionalLight = useStore((state) => state.directionalLight);

  return (
    <Canvas
      gl={{ antialias: false, alpha: false }}
      dpr={[1, 1.5]}
      style={{ background: '#141622' }}
    >
      <color attach='background' args={['blue']} />
      <directionalLight
        ref={directionalLight}
        intensity={0.5}
        position={[0, Math.PI, 0]}
      />
      <ambientLight intensity={0.3} />
      <Suspense fallback={null}>
        <OrbitControls />
        <Bike>
          {directionalLight.current && (
            <primitive object={directionalLight.current.target} />
          )}
        </Bike>
      </Suspense>
      <Suspense fallback={null}>
        <Ground />
      </Suspense>
      <CubeGenerationComponent />
      <Environment background>
        <EnvironmentComponent />
      </Environment>
    </Canvas>
  );
}

export default App;
