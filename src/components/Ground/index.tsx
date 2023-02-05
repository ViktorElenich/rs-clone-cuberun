import React, { MutableRefObject, useLayoutEffect, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { BufferGeometry, Group, Mesh, MeshStandardMaterial, RepeatWrapping } from "three";
import { useStore } from "../../state";
import { gameVariables, MOVE_DISTANCE, PLANE_SIZE, TEXTURE_SIZE } from "../../constants";
import { RefObject } from "../../interface";

import gridRed from "../../textures/grid-red.png";
import gridOrange from "../../textures/grid-orange.png";
import gridGreen from "../../textures/grid-green.png";
import gridBlue from "../../textures/grid-blue.png";
import gridPurple from "../../textures/grid-purple.png";
import gridPink from "../../textures/grid-pink.png";
import gridRainbow from "../../textures/grid-rainbow.png";
import { useFrame } from "@react-three/fiber";


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
      if (Math.round(bike.current.position.z) + 1000 * moveCounter.current + 10 < 0) {
        if (moveCounter.current === 1 || Math.abs(bike.current.position.z) - Math.abs(lastMove.current) < 0) {
          if (moveCounter.current % 6 === 0) {
            gameVariables.colorLevel++;
            if (gameVariables.colorLevel >= textures.length) {
              gameVariables.colorLevel = 0;
            }
          }
          if (moveCounter.current % 2 === 0) {
            groundTwo.current.position.z -= MOVE_DISTANCE;
            lastMove.current = groundTwo.current.position.z;
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
      <group ref={ground} position={[0, 0, -(PLANE_SIZE / 2)]}>
        <mesh
          ref={plane}
          receiveShadow={true}
          visible={true}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry
            attach='geometry'
            args={[PLANE_SIZE, PLANE_SIZE, 1, 1]}
          />
          <meshStandardMaterial
            color={'#0074cc'}
            emissiveMap={textures[1]}
            emissive={'#0074cc'}
            emissiveIntensity={0}
            attach='material'
            map={textures[0]}
            roughness={1}
            metalness={0}
          />
        </mesh>
      </group>
      <group ref={groundTwo} position={[0, 0, -PLANE_SIZE - PLANE_SIZE / 2]}>
        <mesh
          ref={planeTwo}
          receiveShadow={true}
          visible={true}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry
            attach='geometry'
            args={[PLANE_SIZE, PLANE_SIZE, 1, 1]}
          />
          <meshStandardMaterial
            color={'#0074cc'}
            emissive={'#0074cc'}
            emissiveMap={textures[1]}
            attach='material'
            map={textures[0]}
            roughness={1}
            metalness={0}
          />
        </mesh>
      </group>
    </>
  );
};

export default Ground;
