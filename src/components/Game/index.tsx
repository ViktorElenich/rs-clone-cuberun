import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { isMobile } from 'react-device-detect';
import { useStore } from '../../state';
import Bike from '../Bike';
import Speedometer from '../Speedometer';
import FinishGame from '../FinishGame';
import CityElements from '../CityElements';
import Loader from '../Loader';
import ArrowControls from '../ArrowControls';

const Game = () => {
  const directionalLight = useStore((state) => state.directionalLight);
  const gameStart = useStore((state) => state.gameStart);

  return (
    <>
      <Suspense fallback={<Loader />}>
        {isMobile && <ArrowControls />}
        <Canvas
          gl={{ antialias: false, alpha: false }}
          dpr={[1, 1.5]}
          style={{ background: '#141622' }}
        >
          <directionalLight
            ref={directionalLight}
            intensity={4}
            position={[0, Math.PI, 0]}
          />
          <ambientLight intensity={0.3} />

          <Bike>
            {directionalLight.current && (
              <primitive object={directionalLight.current.target} />
            )}
          </Bike>
          {gameStart && <CityElements />}
          <Speedometer />
          <FinishGame />
        </Canvas>
      </Suspense>
    </>
  );
};

export default Game;
