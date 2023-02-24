import { Suspense, useEffect, useState } from 'react';
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

  return (
    <>
      {isMobile && isLoad && <ArrowControls />}
      <Canvas
        gl={{ antialias: false, alpha: false }}
        dpr={[1, 1.5]}
        style={{ background: '#141622' }}
      >
        <Suspense fallback={<Loader />}>
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
          <CityElements />
          <Speedometer />
          <FinishGame />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Game;
