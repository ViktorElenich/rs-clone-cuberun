import { FC, useMemo, useRef, useState } from 'react';
import Cube from '../Cube';
import { useStore } from '../../state';
import { cubeCoords } from '../../utils/generation';
import { useFrame } from '@react-three/fiber';
import { PLANE_SIZE } from '../../constants';

const CubeGenerationComponent: FC<{ cubeColor: string }> = ({ cubeColor }) => {
  const bike = useStore((state) => state.bike);
  const gameStart = useStore((state) => state.gameStart);
  const ids = useRef(1);
  const [cubeCoordsGen, setCubeCoordsGen] = useState([0, PLANE_SIZE / 2]);
  const [cubeCoordsGenNext, setCubeCoordsGenNext] = useState([
    PLANE_SIZE / 2,
    (PLANE_SIZE / 2) * 2,
  ]);
  const [cubeCoordsGenLast, setCubeCoordsGenLast] = useState([
    (PLANE_SIZE / 2) * 2,
    (PLANE_SIZE / 2) * 3,
  ]);

  let cubes = cubeCoords(...cubeCoordsGen);
  let cubesNext = cubeCoords(...cubeCoordsGen);
  useFrame((state, delta) => {
    if (bike.current) {
      console.log('not ===', -Math.round(bike.current.position.z));
      console.log('not ===', cubeCoordsGen);

      if (-Math.round(bike.current.position.z) >= cubeCoordsGen[1]) {
        console.log('yes');

        setCubeCoordsGen(cubeCoordsGenNext);
        setCubeCoordsGenLast((prev) => [
          prev[0] + PLANE_SIZE / 2,
          prev[1] + PLANE_SIZE / 2,
        ]);
        cubes = cubeCoords(...cubeCoordsGen);
        console.log('after ===', bike.current.position.z);
        console.log('after ===', cubeCoordsGen);
      }
    }
  });

  return (
    <>
      {cubes.map((c, index) => (
        <Cube position={c} key={ids.current + index} cubeColor={cubeColor} />
      ))}
      {cubesNext.map((c, index) => (
        <Cube position={c} key={ids.current + index} cubeColor={cubeColor} />
      ))}
      {cubesNext.map((c, index) => (
        <Cube
          position={c}
          key={ids.current + index}
          cubeColor={cubeColor}
          visible={false}
        />
      ))}
    </>
  );
};

export default CubeGenerationComponent;
