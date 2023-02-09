import { useLayoutEffect, useMemo, useRef } from 'react';
import { InstancedMesh, MeshStandardMaterial, Object3D, RepeatWrapping, Texture } from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import ArchGenerate from '../Arch/ArchGenerate';
import { useStore } from '../../state';
import { gameVariables, MAIN_COLORS, PLANE_SIZE } from '../../constants';
import { distanceBetweenCubes, generateCubeTunnel, generateRhombus } from '../../utils';

import { RefObject } from '../../interface';
import colorBlueTexture from '../../textures/customCubeTextures/basecolor_blue.png';
import colorYellowTexture from '../../textures/customCubeTextures/basecolor_yellow.png';
import colorRedTexture from '../../textures/customCubeTextures/basecolor_red.png';
import colorPurpleTexture from '../../textures/customCubeTextures/basecolor_purple.png';
import colorGreenTexture from '../../textures/customCubeTextures/basecolor_green.png';
import roughTexture from '../../textures/customCubeTextures/roughness.png';
import bumpTexture from '../../textures/customCubeTextures/heights.png';
import emissiveTexture from '../../textures/customCubeTextures/emissive.png';
import { CubeColorsType } from '../../type';

const Tunnel = () => {
  const instanceMesh = useRef() as RefObject<InstancedMesh>;
  const meshMaterial = useRef() as RefObject<MeshStandardMaterial>;
  const bike = useStore((state) => state.bike);
  const level = useStore((state) => state.level);
  const stopGame = useStore((state) => state.stopGame);

  const rhombusCoordinate = useMemo(() => generateRhombus(), []);
  const tunnelCoords = useMemo(() => generateCubeTunnel(), []);
  const currentLevelMinusDiamondStart = useMemo(() => -(level * PLANE_SIZE * 6) - PLANE_SIZE * (6 - 2), [level])
  const model = useMemo(() => new Object3D(), []);
  const cubes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < rhombusCoordinate.length; i++) {
      const x = tunnelCoords[i]?.x || 0;
      const y = 0;
      const z = 300 + tunnelCoords[i]?.z || 10;

      temp.push({ x, y, z });
    }
    return temp;
  }, [rhombusCoordinate, tunnelCoords]);
  const txtrs = useTexture([
    colorBlueTexture,
    colorYellowTexture,
    colorRedTexture,
    colorPurpleTexture,
    colorGreenTexture,
  ]);

  const cubeColors: CubeColorsType = {
    blue: txtrs[0],
    yellow: txtrs[1],
    red: txtrs[2],
    purple: txtrs[3],
    green: txtrs[4],
  };
  const colorMap: Texture = cubeColors[MAIN_COLORS.BLUE];
  const [roughMap, bumpMap, emissiveMap] = useTexture([
    roughTexture,
    bumpTexture,
    emissiveTexture,
  ]);

  useLayoutEffect(() => {
    [colorMap, roughMap, bumpMap, emissiveMap].forEach((texture) => {
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(1, 3);
      texture.anisotropy = 16;
    });
  }, []);

  useFrame((state, delta) => {
    cubes.forEach((cube, index) => {
      if (bike.current) {
        if (cube.z - bike.current.position.z > -15) {
          if (
            cube.x - bike.current.position.x > -15 ||
            cube.x - bike.current.position.x < 15
          ) {
            const distanceToBike = distanceBetweenCubes(
              bike.current.position.x,
              bike.current.position.z,
              cube.x,
              cube.z,
            );
            if (distanceToBike < 12) {
              gameVariables.gameSpeed = 0;
              stopGame();
            }
          }
        }
        if (gameVariables.shouldShiftItems) { // 4
          cube.x = rhombusCoordinate[index].x
          cube.y = 10
          cube.z = currentLevelMinusDiamondStart + rhombusCoordinate[index].z
        }
      }
      model.position.set(cube.x, cube.y, cube.z);
      model.updateMatrix();
      instanceMesh.current!.setMatrixAt(index, model.matrix);
    });
    instanceMesh.current!.instanceMatrix.needsUpdate = true
  });

  return (
    <>
      <instancedMesh
        ref={instanceMesh}
        args={[undefined, undefined, rhombusCoordinate.length]}
      >
        <boxGeometry args={[20, 40, 20]} />
        <meshStandardMaterial
          ref={meshMaterial}
          metalness={0.8}
          map={colorMap}
          bumpMap={bumpMap}
          roughnessMap={roughMap}
          emissiveMap={emissiveMap}
          emissive={MAIN_COLORS.BLUE}
          emissiveIntensity={2}
        />
      </instancedMesh>
      <ArchGenerate start={true} />
    </>
  );
};

export default Tunnel;
