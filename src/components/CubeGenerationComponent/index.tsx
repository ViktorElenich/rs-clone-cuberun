import { FC, useRef, useState } from 'react';
import Cube from '../Cube';
import { cubeCoords } from '../../utils/generation';
import { PLANE_SIZE } from '../../constants';

const CubeGenerationComponent: FC<{ cubeColor: string }> = ({ cubeColor }) => {
  const ids = useRef(1);
  const [cubeCoordsGen, setCubeCoordsGen] = useState([0, PLANE_SIZE]);

  let cubes = cubeCoords(...cubeCoordsGen);

  return (
    <>
      {cubes.map((c, index) => (
        <Cube position={c} key={ids.current + index} cubeColor={cubeColor} />
      ))}
    </>
  );
};

export default CubeGenerationComponent;
