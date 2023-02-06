import { FC } from 'react';
import { RADIUS_ARCH, SEGMENTS_ARCH, TUBE_ARCH } from '../../constants';
import { ArchProps } from '../../interface';

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
