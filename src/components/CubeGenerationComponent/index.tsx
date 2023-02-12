import { FC, useEffect, useRef, useState } from 'react';
import Cube from '../Cube';
import { cubeCoords } from '../../utils/generation';
import { DISTANCE_LEVEL, PLANE_SIZE } from '../../constants';
import { CubePositionCoords } from '../../interface';
import { useStore } from '../../state';
import { useFrame } from '@react-three/fiber';

const CubeGenerationComponent: FC<{ cubeColor: string }> = ({ cubeColor }) => {
  const ids = useRef(1);
  const [count, setCount] = useState(1);
  const [cubeCoordsGen, setCubeCoordsGen] = useState([350, 2200]);
  const bike = useStore((state) => state.bike);

  const [cubes, setCubes] = useState<CubePositionCoords[]>([]);

  // let cubes = cubeCoords(...cubeCoordsGen);

  useEffect(() => {
    setCubes(cubeCoords(...cubeCoordsGen));
  }, [cubeCoordsGen]);

  useFrame(() => {
    if (bike.current) {
      if (bike.current.position.z < (-DISTANCE_LEVEL) * count) {
        setCount((prev) => prev + 1);
        setCubeCoordsGen([350 + count * 2500, 2200 + count * 2500]);
      }
    }
  });

  return (
    <>
      {cubes.map((c, index) => (
        <Cube position={c} key={ids.current + index} cubeColor={cubeColor} />
      ))}
    </>
  );
};

export default CubeGenerationComponent;
