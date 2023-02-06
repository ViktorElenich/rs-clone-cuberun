import { useTexture } from "@react-three/drei";
import { FC, useLayoutEffect } from "react";
import { CubeProps } from "../../interface";
import colorBlueTexture from "../../textures/customCubeTextures/basecolor_blue.png";
import colorYellowTexture from "../../textures/customCubeTextures/basecolor_yellow.png";
import colorRedTexture from "../../textures/customCubeTextures/basecolor_red.png";
import colorPurpleTexture from "../../textures/customCubeTextures/basecolor_purple.png";
import colorGreenTexture from "../../textures/customCubeTextures/basecolor_green.png";
import roughTexture from "../../textures/customCubeTextures/roughness.png";
import bumpTexture from "../../textures/customCubeTextures/heights.png";
import emissiveTexture from "../../textures/customCubeTextures/emissive.png";

import { RepeatWrapping, Texture } from "three";
import { CUBE_SIZE } from "../../constants";
import { useStore } from "../../state";
import { cubeColorsType } from "../../type";
import { useFrame } from "@react-three/fiber";

const Cube: FC<CubeProps> = ({ position, cubeColor }) => {
  const bike = useStore((state) => state.bike);
  const stopGame = useStore((state) => state.stopGame);
  const { x, y, z } = position;
  const boxHeight: number = Math.floor(Math.random() * 20) + 25;
  const txtrs = useTexture([
    colorBlueTexture,
    colorYellowTexture,
    colorRedTexture,
    colorPurpleTexture,
    colorGreenTexture,
  ]);

  const cubeColors: cubeColorsType = {
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
        bike.current.position.x >= x - CUBE_SIZE / 1.5 &&
        bike.current.position.x <= x + CUBE_SIZE / 1.5 &&
        bike.current.position.z >= z - CUBE_SIZE &&
        bike.current.position.z <= z + CUBE_SIZE
      ) {
        stopGame();
      }
    }
  });

  return (
    <>
      <mesh
        position={[x, y + boxHeight / 2, z]}
        castShadow={true}
        visible={true}
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
