import { useMemo } from 'react';
import Arch from '..';

const ARCH_AMOUNT = 5;

const ArchGenerate = () => {
  const arches = useMemo(() => {
    const temp = [];
    for (let i = 0; i < ARCH_AMOUNT; i++) {
      const x = 0;
      const y = -5;
      const z = i * 30;

      temp.push({ x, y, z });
    }
    return temp;
  }, []);

  return (
    <>
      {arches.map((arch, index) => (
        <Arch key={index} position={arch} color={'blue'} />
      ))}
    </>
  );
};
export default ArchGenerate;
