import { Stars, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RefObject, useRef } from 'react';
import { BackSide, Mesh, MirroredRepeatWrapping } from 'three';
import skyStars from '../../assets/stars.jpg';
import { useStore } from '../../state';

const EnvironmentComponent = () => {
  const sky = useRef() as RefObject<Mesh>;
  const stars = useRef() as RefObject<Mesh>;
  const bike = useStore((state) => state.bike);
  const texture = useTexture([skyStars]);
  texture[0].wrapS = MirroredRepeatWrapping;
  texture[0].wrapT = MirroredRepeatWrapping;
  texture[0].repeat.set(4, 4);
  texture[0].anisotropy = 16;

  useFrame(() => {
    if (sky.current) {
      sky.current.rotation.z += 3 * 10 ** -4;
    }

    if (stars.current) {
      stars.current.rotation.z += 3 * 10 ** -4;
    }

    if (bike.current && stars.current && sky.current) {
      sky.current.position.x = bike.current.position.x;
      stars.current.position.x = bike.current.position.x;
      sky.current.position.z = bike.current.position.z;
      stars.current.position.z = bike.current.position.z;
    }
  });

  return (
    <>
      <Stars
        ref={stars}
        radius={800}
        depth={50}
        count={1000}
        factor={50}
        fade
      />
      <mesh scale={10} ref={sky}>
        <sphereGeometry args={[200, 64, 64]} />
        <meshBasicMaterial side={BackSide} color={'#16265c'} map={texture[0]} />
      </mesh>
    </>
  );
};
export default EnvironmentComponent;
