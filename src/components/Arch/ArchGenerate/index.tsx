import { FC } from 'react';
import Arch from '..';
import { LEVEL_COLORS } from '../../../constants';
import { Arches, ArchGenerateProps } from '../../../interface';

const CURRENT_LEVEL = 1;
const DISTANCE_ARCH = 40;
const ARCH_AMOUNT = 5;
const START_POSITION_ARCHES = -300;
const FINISH_POSITION_ARCHES = -2000;

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
    </>
  );
};
export default ArchGenerate;
