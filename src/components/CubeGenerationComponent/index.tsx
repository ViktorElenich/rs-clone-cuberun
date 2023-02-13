import { FC, useEffect, useRef, useState } from 'react';
import Cube from '../Cube';
import { cubeCoords } from '../../utils/generation';
import { DISTANCE_LEVEL, MAIN_COLORS_ARR, PLANE_SIZE } from '../../constants';
import { CubePositionCoords } from '../../interface';
import { useStore } from '../../state';
import { useFrame } from '@react-three/fiber';

const CubeGenerationComponent = () => {
  const ids = useRef(1);
  const bike = useStore((state) => state.bike);
  const cubeColor = useStore((state) => state.mainColor);
  const changeColor = useStore((state) => state.changeColor);
  const [localLevel, setLocalLevel] = useState(1);
  const [cubeCoordsGen, setCubeCoordsGen] = useState([350, 2200]);

  const [cubes, setCubes] = useState<CubePositionCoords[]>([]);

  useFrame(() => {
    if (bike.current) {
      if (bike.current.position.z < -DISTANCE_LEVEL * localLevel) {
        setLocalLevel(localLevel + 1);
        changeColor(MAIN_COLORS_ARR[localLevel % 5]);
        setCubeCoordsGen([
          350 + localLevel * DISTANCE_LEVEL,
          2200 + localLevel * DISTANCE_LEVEL,
        ]);
      }
    }
  });

  useEffect(() => {
    setCubes(cubeCoords(...cubeCoordsGen));
  }, [cubeCoordsGen]);

  return (
    <>
      {cubes.map((c, index) => (
        <Cube position={c} key={ids.current + index} cubeColor={cubeColor} />
      ))}
    </>
  );
};

export default CubeGenerationComponent;
