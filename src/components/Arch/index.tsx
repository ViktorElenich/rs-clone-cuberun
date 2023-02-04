import { CubePositionCoords } from '../../interface';

const RADIUS_ARCH = 40;
const TUBE_ARCH = 4;
const SEGMENTS_ARCH = 20;

const Arch = ({
  position,
}: {
  position: CubePositionCoords;
  color: string;
}) => {
  const { x, y, z } = position;
  return (
    <>
      <mesh position={[x, y, z]}>
        <torusGeometry
          args={[RADIUS_ARCH, TUBE_ARCH, SEGMENTS_ARCH, SEGMENTS_ARCH, Math.PI]}
        />
        <meshStandardMaterial metalness={0.8} color='blue' fog={true} />
      </mesh>
    </>
  );
};
export default Arch;
