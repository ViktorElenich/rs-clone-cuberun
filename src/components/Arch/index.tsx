import { useFrame } from '@react-three/fiber';
import { FC } from 'react';
import { gameVariables, PLANE_SIZE, RADIUS_ARCH, SEGMENTS_ARCH, TUBE_ARCH } from '../../constants';
import { ArchProps } from '../../interface';
import { useStore } from '../../state';

const Arch: FC<ArchProps> = ({ position, color }) => {
  const bike = useStore((state) => state.bike);
  const { x, y, z } = position;
  useFrame((state, delta) => {
    if (bike.current) {
      if (gameVariables.shouldShiftItems) {
        position.z = gameVariables.currentLevelLength - PLANE_SIZE * (6 - 2) - 300
      }
    }
  })
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
