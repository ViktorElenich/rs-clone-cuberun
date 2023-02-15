import React, {
  FC,
  MutableRefObject,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {
  BufferGeometry,
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
  RepeatWrapping,
} from 'three';
import { useStore } from '../../state';
import { gameVariables, MOVE_DISTANCE, PLANE_SIZE, TEXTURE_SIZE } from '../../constants';
import { RefObject } from '../../interface';
import gridRed from '../../textures/grid-red.png';
import gridOrange from '../../textures/grid-orange.png';
import gridGreen from '../../textures/grid-green.png';
import gridBlue from '../../textures/grid-blue.png';
import gridPurple from '../../textures/grid-purple.png';
import gridPink from '../../textures/grid-pink.png';
import gridRainbow from '../../textures/grid-rainbow.png';
import groundTexture from '../../textures/metalBroken/basecolor.png';
import bumpTexture from '../../textures/metalBroken/height.png';
import normalTexture from '../../textures/metalBroken/normal.png';
import emissiveTexture from '../../textures/metalBroken/emissive.png';


const Ground = () => {
  const bike = useStore((state) => state.bike);
  const mainColor = useStore((state) => state.mainColor);
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

  const textures = useTexture([bumpTexture, normalTexture, emissiveTexture]);

  const groundColorMap = useTexture([groundTexture])[0];

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
          if (moveCounter.current % 2 === 0) {
            groundBack.current.position.z -= MOVE_DISTANCE;
            lastMove.current = groundBack.current.position.z;
            planeTwo.current!.material.color = new Color(mainColor);
            planeTwo.current!.material.emissive = new Color(mainColor);
          } else {
            ground.current.position.z -= MOVE_DISTANCE;
            lastMove.current = ground.current.position.z;
            plane.current!.material.color = new Color(mainColor);
            plane.current!.material.emissive = new Color(mainColor);
          }
        }
        moveCounter.current++;
      }
    }
  });
  useLayoutEffect(() => {}, []);
  [...textures, groundColorMap].forEach((mp) => {
    mp.wrapS = mp.wrapT = RepeatWrapping;
    mp.repeat.set(24, 24);
    mp.anisotropy = 16;
  });
  return (
    <>
      <group ref={ground} position={[0, 0, -(PLANE_SIZE / 2)]}>
        <mesh ref={plane} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry
            attach='geometry'
            args={[PLANE_SIZE, PLANE_SIZE, 1, 1]}
          />
          <meshStandardMaterial
            color={mainColor}
            emissiveMap={textures[2]}
            emissive={mainColor}
            emissiveIntensity={0.5}
            bumpMap={textures[0]}
            normalMap={textures[1]}
            attach='material'
            map={groundColorMap}
          />
        </mesh>
      </group>
      <group ref={groundBack} position={[0, 0, -PLANE_SIZE - PLANE_SIZE / 2]}>
        <mesh ref={planeTwo} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry
            attach='geometry'
            args={[PLANE_SIZE, PLANE_SIZE, 1, 1]}
          />
          <meshStandardMaterial
            color={mainColor}
            emissiveMap={textures[2]}
            emissive={mainColor}
            emissiveIntensity={0.5}
            bumpMap={textures[0]}
            normalMap={textures[1]}
            attach='material'
            map={groundColorMap}
          />
        </mesh>
      </group>
    </>
  );
};

export default Ground;
