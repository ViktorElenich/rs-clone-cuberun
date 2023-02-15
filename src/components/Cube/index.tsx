import { useTexture } from '@react-three/drei';
import { FC, RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Mesh, RepeatWrapping, Texture } from 'three';
import { useFrame } from '@react-three/fiber';
import { useSound } from 'use-sound';
import { CubeColorsType } from '../../type';
import { CubeProps } from '../../interface';
import colorBlueTexture from '../../textures/customCubeTextures/basecolor_blue.png';
import colorYellowTexture from '../../textures/customCubeTextures/basecolor_yellow.png';
import colorRedTexture from '../../textures/customCubeTextures/basecolor_red.png';
import colorPurpleTexture from '../../textures/customCubeTextures/basecolor_purple.png';
import colorGreenTexture from '../../textures/customCubeTextures/basecolor_green.png';
import roughTexture from '../../textures/customCubeTextures/roughness.png';

import bumpTexture from '../../textures/customCubeTextures/heights.png';
import emissiveTexture from '../../textures/customCubeTextures/emissive.png';
import { CUBE_SIZE } from '../../constants';
import { useStore } from '../../state';
import { randomInRange } from '../../utils';

const Cube: FC<CubeProps> = ({
  position,
  cubeColor,
  tunnel = false,
}) => {
  const bike = useStore((state) => state.bike);
  const sound = useStore((state) => state.sound);
  const stopGame = useStore((state) => state.stopGame);
  const cube = useRef() as RefObject<Mesh>;
  const { x, y, z } = position;
  const boxHeight: number = tunnel
    ? Math.floor(Math.random() * 15) + 45
    : Math.floor(Math.random() * 25) + 35;
  const [audio, { stop }] = useSound('/sound/bum.mp3', { volume: 0.5 });
  const [isPlay, setIsPlay] = useState(false);

  const txtrs = useTexture([
    colorBlueTexture,
    colorYellowTexture,
    colorRedTexture,
    colorPurpleTexture,
    colorGreenTexture,
  ]);

  const cubeColors: CubeColorsType = {
    blue: txtrs[0],
    yellow: txtrs[1],
    red: txtrs[2],
    purple: txtrs[3],
    green: txtrs[4],
  };
  const colorMap: Texture = cubeColors[cubeColor];
  const [roughMap, bumpMap, emissiveMap] = useTexture([
    roughTexture,
    bumpTexture,
    emissiveTexture,
  ]);

  useLayoutEffect(() => {
    [colorMap, roughMap, bumpMap, emissiveMap].forEach((texture) => {
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(1, 3);
      texture.anisotropy = 16;
    });
  }, []);

  useFrame((state, delta) => {
    if (bike.current) {
      if (
        bike.current.position.x >= x - CUBE_SIZE / 1.8 &&
        bike.current.position.x <= x + CUBE_SIZE / 1.8 &&
        bike.current.position.z >= z - CUBE_SIZE &&
        bike.current.position.z <= z + CUBE_SIZE
      ) {
        stopGame();
        setIsPlay(sound);
      }
    }
  });

  useFrame(() => {
    if (cube.current) {
      if (cube.current.position.y < boxHeight / 2) {
        cube.current.position.y += 0.5;
      }
    }
  });

  useEffect(() => {
    isPlay ? audio() : stop();
  }, [isPlay])

  return (
    <>
      <mesh
        position={[x, y - boxHeight / 2, z]}
        castShadow={true}
        visible={true}
        ref={cube}
      >
        <boxGeometry args={[CUBE_SIZE, boxHeight, CUBE_SIZE]} />
        <meshStandardMaterial
          metalness={0.8}
          map={colorMap}
          bumpMap={bumpMap}
          roughnessMap={roughMap}
          emissiveMap={emissiveMap}
          emissive={cubeColor}
          emissiveIntensity={2}
        />
      </mesh>
    </>
  );
};
export default Cube;
