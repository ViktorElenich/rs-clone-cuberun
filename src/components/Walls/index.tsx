import { Box, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Mesh, RepeatWrapping } from 'three';
import { FC, useLayoutEffect, useRef } from 'react';

import { LEFT_BOUND, PLANE_SIZE, RIGHT_BOUND, TEXTURE_SIZE, WALL_THICKNESS } from '../../constants';
import colorBlueTexture from '../../textures/customCubeTextures/basecolor_blue.png';
import colorRedTexture from '../../textures/customCubeTextures/basecolor_red.png';
import colorGreenTexture from '../../textures/customCubeTextures/basecolor_green.png';
import colorYellowTexture from '../../textures/customCubeTextures/basecolor_yellow.png';
import colorPurpleTexture from '../../textures/customCubeTextures/basecolor_purple.png';
import bumpTexture from '../../textures/customCubeTextures/heights.png';
import emissiveTexture from '../../textures/customCubeTextures/emissive.png';
import roughTexture from '../../textures/customCubeTextures/roughness.png';
import { CubeColorsType } from '../../type';
import { useStore } from '../../state';
import { RefObject } from '../../interface';

const Walls: FC<{ wallColor: string }> = ({ wallColor }) => {
  const bike = useStore((state) => state.bike);
  const wallHeight = 50;
  const rightWall = useRef() as RefObject<Mesh>;
  const leftWall = useRef() as RefObject<Mesh>;
  const colorTextures = useTexture([
    colorBlueTexture,
    colorRedTexture,
    colorGreenTexture,
    colorYellowTexture,
    colorPurpleTexture,
  ]);
  const colorMaps: CubeColorsType = {
    blue: colorTextures[0],
    red: colorTextures[1],
    green: colorTextures[2],
    yellow: colorTextures[3],
    purple: colorTextures[4],
  };
  const [bumpMap, emissiveMap, roughMap] = useTexture([
    bumpTexture,
    emissiveTexture,
    roughTexture,
  ]);
  const actualColorMap = colorMaps[wallColor];

  useFrame((state, delta) => {
    if (bike.current) {
      rightWall.current!.position.z = bike.current.position.z;
      leftWall.current!.position.z = bike.current.position.z;
    }
  })

  useLayoutEffect(() => {
    [actualColorMap, roughMap, bumpMap, emissiveMap].forEach((texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.repeat.set(TEXTURE_SIZE * 1, 1);
      texture.anisotropy = 16;
    });
  }, []);

  return (
    <>
      <Box
        ref={rightWall}
        args={[WALL_THICKNESS, wallHeight, PLANE_SIZE * 2]}
        position={[LEFT_BOUND, wallHeight / 2, 0]}
      >
        <meshStandardMaterial
          map={actualColorMap}
          metalness={0.8}
          emissiveMap={emissiveMap}
          emissive={wallColor}
          emissiveIntensity={0.5}
          bumpMap={bumpMap}
          roughnessMap={roughMap}
        />
      </Box>
      <Box
        ref={leftWall}
        args={[WALL_THICKNESS, wallHeight, PLANE_SIZE * 2]}
        position={[RIGHT_BOUND, wallHeight / 2, 0]}
      >
        <meshStandardMaterial
          map={actualColorMap}
          metalness={0.8}
          emissiveMap={emissiveMap}
          emissive={wallColor}
          emissiveIntensity={0.5}
          bumpMap={bumpMap}
          roughnessMap={roughMap}
        />
      </Box>
    </>
  );
};

export default Walls;
