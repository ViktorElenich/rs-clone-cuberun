import { FC } from 'react';
import { ArchProps } from '../../interface';

const RADIUS_ARCH = 40;
const TUBE_ARCH = 4;
const SEGMENTS_ARCH = 20;

const Arch: FC<ArchProps> = ({ position, color }) => {
  const { x, y, z } = position;
  return (
    <>
      <mesh position={[x, y, z]}>
        <torusGeometry
          args={[RADIUS_ARCH, TUBE_ARCH, SEGMENTS_ARCH, SEGMENTS_ARCH, Math.PI]}
        />
        <meshStandardMaterial
          attach='material'
          metalness={0.8}
          color={color}
          fog={true}
        />
      </mesh>
    </>
  );
};
export default Arch;
