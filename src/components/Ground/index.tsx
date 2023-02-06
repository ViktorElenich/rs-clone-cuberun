import React, { FC, MutableRefObject, useLayoutEffect, useRef } from 'react';
import { Plane, useTexture } from '@react-three/drei';
import {
  BufferGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  RepeatWrapping,
} from 'three';
import { useStore } from '../../state';
import {
  gameVariables,
  MOVE_DISTANCE,
  PLANE_SIZE,
  TEXTURE_SIZE,
} from '../../constants';
import { RefObject } from '../../interface';

import gridRed from '../../textures/grid-red.png';
import gridOrange from '../../textures/grid-orange.png';
import gridGreen from '../../textures/grid-green.png';
import gridBlue from '../../textures/grid-blue.png';
import gridPurple from '../../textures/grid-purple.png';
import gridPink from '../../textures/grid-pink.png';
import gridRainbow from '../../textures/grid-rainbow.png';
import { useFrame } from '@react-three/fiber';

const Ground: FC<{ mainColor: string }> = ({ mainColor }) => {
  const bike = useStore((state) => state.bike);
  const ground = useRef() as MutableRefObject<Group>;
  const groundBack = useRef() as MutableRefObject<Group>;
  const plane = useRef() as RefObject<
    Mesh<BufferGeometry, MeshStandardMaterial>
  >;
  const planeTwo = useRef() as RefObject<
    Mesh<BufferGeometry, MeshStandardMaterial>
  >;
  const moveCounter = useRef(1);
  const lastMove = useRef(0);

  const textures = useTexture([
    gridBlue,
    gridPink,
    gridRed,
    gridOrange,
    gridGreen,
    gridPurple,
    gridRainbow,
  ]);

  useFrame((state, delta) => {
    if (bike.current) {
      if (
        Math.round(bike.current.position.z) + 1000 * moveCounter.current + 10 <
        0
      ) {
        if (
          moveCounter.current === 1 ||
          Math.abs(bike.current.position.z) - Math.abs(lastMove.current) < 0
        ) {
          if (moveCounter.current % 6 === 0) {
            gameVariables.colorLevel++;
            if (gameVariables.colorLevel >= textures.length) {
              gameVariables.colorLevel = 0;
            }
          }
          if (moveCounter.current % 2 === 0) {
            groundBack.current.position.z -= MOVE_DISTANCE;
            lastMove.current = groundBack.current.position.z;
            planeTwo.current!.material.map = textures[gameVariables.colorLevel];
          } else {
            ground.current.position.z -= MOVE_DISTANCE;
            lastMove.current = ground.current.position.z;
            plane.current!.material.map = textures[gameVariables.colorLevel];
          }
        }
        moveCounter.current++;
      }
    }
  });

  useLayoutEffect(() => {
    textures.forEach((texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.repeat.set(TEXTURE_SIZE, TEXTURE_SIZE);
      texture.anisotropy = 16;
    });
  }, [textures]);

  return (
    <>
      <group ref={ground} position={[0, 0, PLANE_SIZE / 2]}>
        <Plane
          args={[PLANE_SIZE, PLANE_SIZE]}
          ref={plane}
          receiveShadow
          visible
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <meshBasicMaterial color={mainColor} map={textures[0]} />
        </Plane>
      </group>
      <group ref={groundBack} position={[0, 0, -(PLANE_SIZE / 2)]}>
        <Plane
          args={[PLANE_SIZE, PLANE_SIZE]}
          ref={planeTwo}
          receiveShadow={true}
          visible={true}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <meshBasicMaterial color={mainColor} map={textures[0]} />
        </Plane>
      </group>
    </>
  );
};

export default Ground;
