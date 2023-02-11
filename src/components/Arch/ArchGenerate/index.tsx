import { FC } from 'react';
import Arch from '..';
import {
  ARCH_AMOUNT,
  CURRENT_LEVEL,
  DISTANCE_ARCH,
  FINISH_POSITION_ARCHES,
  LEVEL_COLORS,
  START_POSITION_ARCHES,
} from '../../../constants';
import { Arches, ArchGenerateProps } from '../../../interface';
import TunnelWalls from '../../TunnelWalls';

const ArchGenerate: FC<ArchGenerateProps> = ({ start }) => {
  const arches: Arches[] = [];

  for (let i = 0; i < ARCH_AMOUNT; i++) {
    const x = 0;
    const y = 0;
    const z =
      i * DISTANCE_ARCH +
      (start ? START_POSITION_ARCHES : FINISH_POSITION_ARCHES);
    const color = start ? LEVEL_COLORS[i] : LEVEL_COLORS[CURRENT_LEVEL];

    arches.push({ x, y, z, color });
  }

  return (
    <>
      {arches.map((arch, index) => (
        <Arch key={index} position={arch} color={arch.color} />
      ))}
      <TunnelWalls start={start} />
    </>
  );
};
export default ArchGenerate;
