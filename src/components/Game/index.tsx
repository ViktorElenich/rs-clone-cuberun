import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import { useStore } from '../../state';
import Bike from '../Bike';
import Speedometer from '../Speedometer';
import FinishGame from '../FinishGame';
import CityElements from '../CityElements';
import Loader from '../Loader';
import ArrowControls from '../ArrowControls';
import { isMobile } from 'react-device-detect';

const Game = () => {
  const directionalLight = useStore((state) => state.directionalLight);
  const gameStart = useStore((state) => state.gameStart);
  const { active, progress } = useProgress();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (progress >= 100) {
      timer = setTimeout(() => setIsLoad(true), 300);
    }
    return () => {
      clearTimeout(timer);
    }
  }, [progress]);

  return (
    <>
      {isMobile && <ArrowControls />}
      <Canvas
        gl={{ antialias: false, alpha: false }}
        dpr={[1, 1.5]}
        style={{ background: '#141622' }}
      >
        <Suspense fallback={null}>
          <directionalLight
            ref={directionalLight}
            intensity={3}
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
        </Suspense>
      </Canvas>
      {!isLoad ? <Loader /> : null}
    </>
  );
};

export default Game;