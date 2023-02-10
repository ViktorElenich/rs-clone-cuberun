import { FC, useEffect, useMemo, useRef, useState } from 'react';
import Cube from '../Cube';
import { useStore } from '../../state';
import { cubeCoords } from '../../utils/generation';
import { useFrame } from '@react-three/fiber';
import { PLANE_SIZE } from '../../constants';

const CubeGenerationComponent: FC<{ cubeColor: string }> = ({ cubeColor }) => {
  const bike = useStore((state) => state.bike);
  const gameStart = useStore((state) => state.gameStart);
  const ids = useRef(1);
  const [cubeCoordsGen, setCubeCoordsGen] = useState([0, PLANE_SIZE]);
  const [cubeCoordsGenNext, setCubeCoordsGenNext] = useState([
    PLANE_SIZE,
    PLANE_SIZE * 2,
  ]);
  const [cubeCoordsGenLast, setCubeCoordsGenLast] = useState([
    -PLANE_SIZE,
    PLANE_SIZE * 3,
  ]);

  let cubes = cubeCoords(...cubeCoordsGen);
  let cubesNext = cubeCoords(...cubeCoordsGenNext);
  let cubesLast = cubeCoords(...cubeCoordsGenLast);
  useFrame((state, delta) => {
    if (bike.current) {
      if (
        -Math.round(bike.current.position.z) ===
        Math.round(cubeCoordsGenNext[0] + 100)
      ) {
        console.log('yes1');
        setCubeCoordsGen([
          cubeCoordsGenLast[1],
          cubeCoordsGenLast[1] + PLANE_SIZE,
        ]);
        cubes = cubeCoords(...cubeCoordsGen);
      }
      if (
        -Math.round(bike.current.position.z) ===
        Math.round(cubeCoordsGenLast[0] + 100)
      ) {
        console.log('yes2');

        setCubeCoordsGenNext([cubeCoordsGen[1], cubeCoordsGen[1] + PLANE_SIZE]);
        cubesNext = cubeCoords(...cubeCoordsGenNext);
      }
      if (
        -Math.round(bike.current.position.z) ===
        Math.round(cubeCoordsGen[0] + 100)
      ) {
        console.log('yes3');

        setCubeCoordsGenLast([
          cubeCoordsGenNext[1],
          cubeCoordsGenNext[1] + PLANE_SIZE,
        ]);
        cubesLast = cubeCoords(...cubeCoordsGenLast);
      }
    }
  });
  /*     useEffect(() => {
    cubes = cubeCoords(...cubeCoordsGen);
  }, [cubeCoordsGen]);
  useEffect(() => {
    cubesNext = cubeCoords(...cubeCoordsGenNext);
  }, [cubeCoordsGenNext]);
  useEffect(() => {
    cubesLast = cubeCoords(...cubeCoordsGenLast);
  }, [cubeCoordsGenLast]); */

  useEffect(() => {
    console.log('gen >>> ', cubeCoordsGen);
    console.log('----------- ');
    console.log(cubes);
    console.log('----------- ');
    console.log('next >>> ', cubeCoordsGenNext);
  }, [cubeCoordsGen, cubeCoordsGenNext]);

  return (
    <>
      {cubes.map((c, index) => (
        <Cube position={c} key={ids.current + index} cubeColor={cubeColor} />
      ))}
      {cubesNext.map((c, index) => (
        <Cube position={c} key={ids.current + index} cubeColor={cubeColor} />
      ))}
      {cubesLast.map((c, index) => (
        <Cube position={c} key={ids.current + index} cubeColor={cubeColor} />
      ))}
    </>
  );
};

export default CubeGenerationComponent;
