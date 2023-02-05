import { FC } from 'react';
import Arch from '..';

const CURRENT_LEVEL = 1;
const DISTANCE_ARCH = 40;
const ARCH_AMOUNT = 5;
const archColors = ['#217aff', '#bd4902', '#ff2919', '#ff69b4', '#26a300'];
interface ArchGenerateProps {
  start: boolean;
  positionZ?: number;
}

const ArchGenerate: FC<ArchGenerateProps> = ({ start, positionZ }) => {
  const arches: { x: number; y: number; z: number; color: string }[] = [];

  for (let i = 0; i < ARCH_AMOUNT; i++) {
    const x = 0;
    const y = 0;
    const z = i * DISTANCE_ARCH + (positionZ || 0);
    const color = start ? archColors[i] : archColors[CURRENT_LEVEL];

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
