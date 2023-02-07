import { useMemo, useRef } from 'react';
import { RefObject } from '../../interface';
import { InstancedMesh, MeshBasicMaterial, Object3D } from 'three';
import { distance2D, generateCubeTunnel, generateRhombus } from '../../utils';
import { useStore } from '../../state';
import { useFrame } from '@react-three/fiber';
import { gameVariables } from '../../constants';

const CubeTunnel = () => {
  const instanceMesh = useRef() as RefObject<InstancedMesh>;
  const meshMaterial = useRef() as RefObject<MeshBasicMaterial>;
  const bike = useStore((state) => state.bike);
  const level = useStore((state) => state.level);
  
  const rhombusCoordinate = useMemo(() => generateRhombus(), []);
  const tunnelCoords = useMemo(() => generateCubeTunnel(), []);
  const dummy = useMemo(() => new Object3D(), []);
  const cubes = useMemo(() => {
    const temp = []
    for (let i = 0; i < rhombusCoordinate.length; i++) {
      const x = tunnelCoords[i]?.x || 0
      const y = 0
      const z = 300 + tunnelCoords[i]?.z || 10

      temp.push({ x, y, z })
    }
    return temp
  }, [rhombusCoordinate, tunnelCoords]);

  useFrame((state, delta) => {
    cubes.forEach((cube, index) => {
      if (bike.current) {
        if (cube.z - bike.current.position.z > -15) {
          if (cube.x - bike.current.position.x > -15 || cube.x - bike.current.position.x < 15) {
            const distanceToShip = distance2D(bike.current.position.x, bike.current.position.z, cube.x, cube.z);
            if (distanceToShip < 12) {
              gameVariables.gameSpeed = 0;
              //mutation.gameOver = true
            }
          }
        }
      }
      dummy.position.set(
        cube.x,
        cube.y,
        cube.z
      )

      // apply changes to dummy and to the instanced matrix
      dummy.updateMatrix()
      instanceMesh.current!.setMatrixAt(index, dummy.matrix)
    })
  })

  return (
    <instancedMesh ref={instanceMesh} args={[undefined, undefined, rhombusCoordinate.length]}>
      <boxBufferGeometry args={[20, 40, 20]} />
      <meshBasicMaterial ref={meshMaterial} />
    </instancedMesh>
  )
};

export default CubeTunnel;