import { FC, Suspense, useEffect, useState } from 'react';

import { CUBE_SIZE, MAIN_COLORS_ARR, SAVE_SPACE } from '../../constants';
import { useStore } from '../../state';
import { CubesData, TunnelWallsProps } from '../../interface';
import Cube from '../Cube';
import { cornerCoords } from '../../utils/generation';
import { Float, Text3D } from '@react-three/drei/core';
import { Text } from '@react-three/drei';
import { DoubleSide } from 'three';

const TunnelWalls: FC<TunnelWallsProps> = ({ positionZ }) => {
  const bike = useStore((state) => state.bike);
  const [mainColor, setMainColor] = useState(MAIN_COLORS_ARR[0]);
  const level = useStore((state) => state.level);

  const [textLevel, setTextLevel] = useState(1);

  const tunnelColors = ['blue', 'red', 'red', 'red', 'purple', 'green', 'blue'];
  const leftCornerCoords = cornerCoords({
    horizontal: 'left',
    vertical: 'start',
  }).map((coordZ) => ({
    ...coordZ,
    z: coordZ.z + positionZ + 300,
  }));
  const rightCornerCoords = cornerCoords({
    horizontal: 'right',
    vertical: 'start',
  }).map((coordZ) => ({
    ...coordZ,
    z: coordZ.z + positionZ + 300,
  }));
  const leftEndCornerCoords = cornerCoords({
    horizontal: 'left',
    vertical: 'finish',
  }).map((coordZ) => ({
    ...coordZ,
    z: coordZ.z + positionZ + SAVE_SPACE.z - 10,
  }));
  const rightEndCornerCoords = cornerCoords({
    horizontal: 'right',
    vertical: 'finish',
  }).map((coordZ) => ({
    ...coordZ,
    z: coordZ.z + positionZ + SAVE_SPACE.z - 10,
  }));

  const coordsRight: CubesData[] = [];
  const coordsLeft: CubesData[] = [];
  for (let i = 0, cindex = 0; i <= SAVE_SPACE.z; i += CUBE_SIZE + 2, cindex++) {
    const x = -SAVE_SPACE.x + 22;
    const z = positionZ - 5 + i;
    const col = tunnelColors[cindex];
    coordsRight.push({
      x,
      y: 0,
      z,
      col,
    });
    const x1 = SAVE_SPACE.x - 22;

    coordsLeft.push({
      x: x1,
      y: 0,
      z,
      col,
    });
  }

  useEffect(() => {
    setMainColor(MAIN_COLORS_ARR[level % 5]);
    setTextLevel((prev) => prev + 1);
  }, [level]);

  return (
    <>
      <Suspense fallback={null}>
        <Float
          speed={2}
          rotationIntensity={0}
          floatIntensity={1}
          floatingRange={[0, 6]}
        >
          <Text
            font={
              'https://fonts.gstatic.com/s/orbitron/v9/yMJRMIlzdpvBhQQL_Qq7dys.woff'
            }
            fontSize={8}
            position={[0, 10, positionZ + 50]}
            anchorX='center'
            outlineOffsetX={'10%'}
            outlineOffsetY={'10%'}
            outlineBlur={'30%'}
            outlineOpacity={0.4}
            outlineColor={'#0074cc'}
          >
            LEVEL {textLevel}
            <meshBasicMaterial
              color={'#42dcff'}
              side={DoubleSide}
              transparent
              opacity={0.75}
            />
          </Text>
        </Float>
      </Suspense>
      {leftCornerCoords.map((cubeData, index) => (
        <Cube position={cubeData} key={index} cubeColor={mainColor} />
      ))}
      {rightCornerCoords.map((cubeData, index) => (
        <Cube position={cubeData} key={index} cubeColor={mainColor} />
      ))}
      {leftEndCornerCoords.map((cubeData, index) => (
        <Cube position={cubeData} key={index} cubeColor={mainColor} />
      ))}
      {rightEndCornerCoords.map((cubeData, index) => (
        <Cube position={cubeData} key={index} cubeColor={mainColor} />
      ))}
      {coordsLeft.map((cube, index) => (
        <Cube
          key={index * 34}
          position={{ x: cube.x, y: cube.y, z: cube.z }}
          cubeColor={cube.col}
          tunnel
        />
      ))}
      {coordsRight.map((cube, index) => (
        <Cube
          key={index * 24}
          position={{ x: cube.x, y: cube.y, z: cube.z }}
          cubeColor={cube.col}
          tunnel
        />
      ))}
    </>
  );
};

export default TunnelWalls;
