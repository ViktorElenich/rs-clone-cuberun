import { useTexture } from '@react-three/drei';
import { FC, useEffect, useLayoutEffect, useRef } from 'react';
import { CubePositionCoords } from '../../interface';
import { angleToRadians } from '../../utils';
import colorBlueTexture from '../../textures/customCubeTextures/basecolor_blue.png';
import colorYellowTexture from '../../textures/customCubeTextures/basecolor_yellow.png';
import colorRedTexture from '../../textures/customCubeTextures/basecolor_red.png';
import colorPurpleTexture from '../../textures/customCubeTextures/basecolor_purple.png';
import colorGreenTexture from '../../textures/customCubeTextures/basecolor_green.png';
import roughTexture from '../../textures/customCubeTextures/roughness.png';
import bumpTexture from '../../textures/customCubeTextures/heights.png';
import emissiveTexture from '../../textures/customCubeTextures/emissive.png';

import { RepeatWrapping, Texture } from 'three';
import { CUBE_SIZE } from '../../constants';

const Cube: FC<{
  position: CubePositionCoords;
  key: number;
  cubeColor: string;
}> = (props) => {
  const { x, y, z } = props.position;
  const { cubeColor } = props;
  const boxHeight: number = Math.floor(Math.random() * 20) + 25;
  const txtrs = useTexture([
    colorBlueTexture,
    colorYellowTexture,
    colorRedTexture,
    colorPurpleTexture,
    colorGreenTexture,
  ]);
  console.log(txtrs);
  type cubeColorsType = {
    [key: string]: Texture;
  };

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

  return (
    <>
      <mesh position={[x, y + boxHeight / 2, z]} castShadow visible>
        <boxGeometry args={[CUBE_SIZE, boxHeight, CUBE_SIZE]} />
        <meshStandardMaterial
          metalness={0.8}
          map={colorMap}
          bumpMap={bumpMap}
          roughnessMap={roughMap}
          emissiveMap={emissiveMap}
          // emissive={'#0074cc'}
          emissive={cubeColor}
          emissiveIntensity={2}
        />
      </mesh>
    </>
  );
};
export default Cube;
