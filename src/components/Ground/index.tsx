import React, { MutableRefObject, useLayoutEffect, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { BufferGeometry, Color, Group, Mesh, MeshStandardMaterial, RepeatWrapping } from "three";
import { useStore } from "../../state";
import { BIKE_SIZE, TEXTURE_SIZE } from "../../constants";
import { RefObject } from "../../interface";

import gridRed from "../../textures/grid-red.png";
import gridOrange from "../../textures/grid-orange.png";
import gridGreen from "../../textures/grid-green.png";
import gridBlue from "../../textures/grid-blue.png";
import gridPurple from "../../textures/grid-purple.png";
import gridPink from "../../textures/grid-pink.png";
import gridRainbow from "../../textures/grid-rainbow.png";


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
    gridPink,
    gridRed,
    gridOrange,
    gridGreen,
    gridBlue,
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
      <group ref={ground} position={[0, 0, -(BIKE_SIZE / 2)]}>
        <mesh ref={plane} receiveShadow visible rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry
            attach='geometry'
            args={[BIKE_SIZE, BIKE_SIZE, 1, 1]}
          />
          <meshStandardMaterial
            color={color.set(0xffffff)}
            emissiveMap={textures[1]}
            emissive={color.set(0xffffff)}
            emissiveIntensity={0}
            attach='material'
            map={textures[0]}
            roughness={1}
            metalness={0}
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
            args={[BIKE_SIZE, BIKE_SIZE, 1, 1]}
          />
          <meshStandardMaterial
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