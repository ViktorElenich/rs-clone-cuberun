import { FC, useMemo, useRef } from 'react';
import Cube from '../Cube';
import {
  CUBE_AMOUNT,
  CUBE_SIZE,
  LEFT_BOUND,
  PLANE_SIZE,
  RIGHT_BOUND,
} from '../../constants';
import { randomInRange } from '../../utils';

const CubeGenerationComponent: FC<{ cubeColor: string }> = ({ cubeColor }) => {
  const ids = useRef(1);

  const cubes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < CUBE_AMOUNT; i++) {
      const x = randomInRange(LEFT_BOUND, RIGHT_BOUND);
      const y = 0;
      const z = randomInRange(0, PLANE_SIZE / 2);

      temp.push({ x, y, z });
    }
    return temp;
  }, []);

  return (
    <>
      {cubes.map((c, index) => (
        <Cube position={c} key={ids.current + index} cubeColor={cubeColor} />
      ))}
    </>
  );
};

export default CubeGenerationComponent;
