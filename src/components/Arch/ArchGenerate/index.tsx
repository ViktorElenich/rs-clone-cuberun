import { useFrame } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import Arch from '..';
import {
  ARCH_AMOUNT,
  DISTANCE_ARCH,
  DISTANCE_LEVEL,
  LEVEL_COLORS,
  START_POSITION_ARCHES,
} from '../../../constants';
import { Arches } from '../../../interface';
import { useStore } from '../../../state';
import TunnelWalls from '../../TunnelWalls';

const ArchGenerate = () => {
  const [arches, setArches] = useState<Arches[]>([]);
  const bike = useStore((state) => state.bike);
  const level = useStore((state) => state.level);
  const newLevel = useStore((state) => state.newLevel);
  const sound = useStore((state) => state.sound);
  const [localLevel, setLocalLevel] = useState(0);
  const [audio] = useSound('/sound/speedup.mp3', { volume: 0.75 });
  let positionArch = START_POSITION_ARCHES - localLevel * DISTANCE_LEVEL;

  useFrame(() => {
    if (bike.current && arches.length > 0) {
      if (bike.current.position.z < arches[0].z - 50) {
        setArches([]);
        setLocalLevel((prev) => prev + 1);
      }
    }
  });

  useEffect(() => {
    if (localLevel > level + 1) {
      newLevel();
      if (sound) audio();
    }

    positionArch = START_POSITION_ARCHES - localLevel * DISTANCE_LEVEL;
    for (let i = 0; i < ARCH_AMOUNT; i++) {
      const x = 0;
      const y = 0;
      const z =
        i * DISTANCE_ARCH + positionArch;
      const color = LEVEL_COLORS[i];
      setArches((prev) => [...prev, { x, y, z, color }]);
    }
  }, [localLevel]);

  return (
    <>
      {arches.map((arch, index) => (
        <Arch key={index} position={arch} color={arch.color} />
      ))}
      <TunnelWalls positionZ={positionArch} />
    </>
  );
};
export default ArchGenerate;
