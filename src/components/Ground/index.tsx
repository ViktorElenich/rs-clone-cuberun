import React, { MutableRefObject, useLayoutEffect, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import {
  BufferGeometry,
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
  RepeatWrapping,
} from 'three';
import { useStore } from '../../state';
import { PLANE_SIZE, TEXTURE_SIZE } from '../../constants';
import { RefObject } from '../../interface';

import gridRed from '../../textures/grid-red.png';
import gridOrange from '../../textures/grid-orange.png';
import gridGreen from '../../textures/grid-green.png';
import gridBlue from '../../textures/grid-blue.png';
import gridPurple from '../../textures/grid-purple.png';
import gridPink from '../../textures/grid-pink.png';
import gridRainbow from '../../textures/grid-rainbow.png';

const color = new Color(0x000000);

const Ground = () => {
  const bike = useStore((state) => state.bike);
  const ground = useRef() as MutableRefObject<Group>;
  const groundTwo = useRef() as MutableRefObject<Group>;
  const plane = useRef() as RefObject<
    Mesh<BufferGeometry, MeshStandardMaterial>
  >;
  const planeTwo = useRef() as RefObject<
    Mesh<BufferGeometry, MeshStandardMaterial>
  >;

  const textures = useTexture([
    gridBlue,
    gridPink,
    gridRed,
    gridOrange,
    gridGreen,
    gridPurple,
    gridRainbow,
  ]);

  useLayoutEffect(() => {
    textures.forEach((texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.repeat.set(TEXTURE_SIZE, TEXTURE_SIZE);
      texture.anisotropy = 16;
    });
  }, [textures]);

  return (
    <>
      <group ref={ground} position={[0, 0, -(PLANE_SIZE / 2)]}>
        <mesh ref={plane} receiveShadow visible rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry
            attach='geometry'
            args={[PLANE_SIZE, PLANE_SIZE, 1, 1]}
          />
          <meshBasicMaterial
            color={'#0074cc'}
            // emissiveMap={textures[1]}
            // emissive={'#0074cc'}
            // emissiveIntensity={0}
            attach='material'
            map={textures[0]}
            // roughness={1}
            // metalness={0}
          />
        </mesh>
      </group>
      <group ref={groundTwo} position={[0, 0, 0]}>
        <mesh
          ref={planeTwo}
          receiveShadow
          visible
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry
            attach='geometry'
            args={[PLANE_SIZE, PLANE_SIZE, 1, 1]}
          />
          <meshBasicMaterial
            color={'#0074cc'}
            //emissive={'#0074cc'}
            //emissiveMap={textures[1]}
            attach='material'
            map={textures[0]}
            // roughness={1}
            // metalness={0}
          />
        </mesh>
      </group>
    </>
  );
};

export default Ground;
