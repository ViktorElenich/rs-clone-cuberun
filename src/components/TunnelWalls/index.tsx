import { FC, useEffect } from 'react';

import {
  CUBE_SIZE,
  FINISH_POSITION_ARCHES,
  SAVE_SPACE,
  START_POSITION_ARCHES,
} from '../../constants';

import { useStore } from '../../state';
import { useFrame } from '@react-three/fiber';
import { ArchGenerateProps } from '../../interface';
import Cube from '../Cube';

const TunnelWalls: FC<ArchGenerateProps> = ({ start }) => {
  const bike = useStore((state) => state.bike);

  const tunnelColors = ['blue', 'red', 'red', 'red', 'purple', 'green', 'blue'];
  interface TunnelCubesData {
    x: number;
    y: number;
    z: number;
    col: string;
  }
  const coordsRight: TunnelCubesData[] = [];
  const coordsLeft: TunnelCubesData[] = [];
  for (let i = 0, cindex = 0; i <= SAVE_SPACE.z; i += CUBE_SIZE + 2, cindex++) {
    coordsRight.push({
      x: -SAVE_SPACE.x + 22,
      y: 0,
      z: start ? START_POSITION_ARCHES - 5 + i : FINISH_POSITION_ARCHES - 5 - i,
      col: tunnelColors[cindex],
    });
    coordsLeft.push({
      x: SAVE_SPACE.x - 22,
      y: 0,
      z: start ? START_POSITION_ARCHES - 5 + i : FINISH_POSITION_ARCHES - 5 - i,
      col: tunnelColors[cindex],
    });
  }

  return (
    <>
      {coordsLeft.map((c, index) => (
        <Cube
          key={index * 34}
          position={{ x: c.x, y: c.y, z: c.z }}
          cubeColor={c.col}
          tunnel
        />
      ))}
      {coordsRight.map((c, index) => (
        <Cube
          key={index * 24}
          position={{ x: c.x, y: c.y, z: c.z }}
          cubeColor={c.col}
          tunnel
        />
      ))}
    </>
  );
};

export default TunnelWalls;
