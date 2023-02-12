import { useFrame } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import Arch from '..';
import {
  ARCH_AMOUNT,
  DISTANCE_ARCH,
  DISTANCE_LEVEL,
  LEVEL_COLORS,
  START_POSITION_ARCHES,
} from '../../../constants';
import { Arches, ArchGenerateProps } from '../../../interface';
import { useStore } from '../../../state';
import TunnelWalls from '../../TunnelWalls';

const ArchGenerate = () => {
  // const arches: Arches[] = [];
  const [arches, setArches] = useState<Arches[]>([]);
  const bike = useStore((state) => state.bike);
  const level = useStore((state) => state.level);
  const newLevel = useStore((state) => state.level);
  const [count, setCount] = useState(0);
  useEffect(() => {
    for (let i = 0; i < ARCH_AMOUNT; i++) {
      const x = 0;
      const y = 0;
      const z =
        i * DISTANCE_ARCH + START_POSITION_ARCHES - count * DISTANCE_LEVEL;
      const color = LEVEL_COLORS[i];
      setArches((prev) => [...prev, { x, y, z, color }]);
      // arches.push({ x, y, z, color });
    }
  }, [count]);

  useFrame(() => {
    if (bike.current && arches.length > 0) {
      if (bike.current.position.z < arches[0].z - 100) {
        setArches([]);
        setCount((prev) => prev + 1);
      }
    }
  });

  return (
    <>
      {arches.map((arch, index) => (
        <Arch key={index} position={arch} color={arch.color} />
      ))}
      <TunnelWalls position={START_POSITION_ARCHES - count * DISTANCE_LEVEL} />
    </>
  );
};
export default ArchGenerate;
