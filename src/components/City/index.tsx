import { useTexture } from '@react-three/drei';
import { Mesh } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';

import city from '../../textures/city2.png';
import { useStore } from '../../state';
import { RefObject } from '../../interface';

const City = () => {
  const texture = useTexture([city]);
  const bike = useStore((state) => state.bike);
  const cityRef = useRef() as RefObject<Mesh>;
  const { clock } = useThree();

  useFrame((state, delta) => {
    if (bike.current) {
      cityRef.current!.position.z = bike.current.position.z - 2000;
      cityRef.current!.position.x = bike.current.position.x;
    }
  });

  return (
    <>
      <mesh ref={cityRef} position={[0, 200, -2000]}>
        <boxGeometry attach='geometry' args={[1000, 1000, 1000]} />
        <meshStandardMaterial
          flatShading={true}
          fog={true}
          metalness={0.2}
          map={texture[0]}
          emissiveIntensity={2}
          emissiveMap={texture[0]}
          emissive={'#16265c'}
        />
      </mesh>
    </>
  );
};

export default City;
