import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import Bike from "./components/Bike";
import { useStore } from "./state";
import Ground from "./components/Ground";
import LoadingGround from "./components/Loading/LoadingGround";
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";
import { Controls } from "./enums";

function App() {
  const directionalLight = useStore((state) => state.directionalLight);

  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.left, keys: ['ArrowLeft', 'a', 'A'] },
      { name: Controls.right, keys: ['ArrowRight', 'd', 'D'] },
    ],
    [],
  );

  return (
    <KeyboardControls map={map}>
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
        <ambientLight intensity={0.1} />
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
      </Canvas>
    </KeyboardControls>
  );
}

export default App;
