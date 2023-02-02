import React, { FC, useLayoutEffect, useRef } from "react";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import { GLTFResult } from "../../type";
import { gameVarMutation, useStore } from "../../state";
import { BikeProps, RefObject } from "../../interface";
import { Mesh, MeshBasicMaterial, PointLight, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

const vector = new Vector3();

const Bike: FC<BikeProps> = ({ children }) => {
  const bike = useStore((state) => state.bike);
  const camera = useStore((state) => state.camera);
  const pointLight = useRef() as RefObject<PointLight>;
  const bikeLine = useRef() as RefObject<Mesh>;

  const { nodes, materials } = useGLTF('/bike/scene.gltf') as GLTFResult;

  useFrame((state, delta) => {
    const accelDelta = 1 * delta * 0.15;

    bike.current!.position.z -= gameVarMutation.gameSpeed * delta * 165;

    pointLight.current!.position.z = bike.current!.position.z + 1;
    pointLight.current!.position.x = bike.current!.position.x;

    camera.current!.position.z = bike.current!.position.z - 15.5;
    camera.current!.position.y = bike.current!.position.y + 5;
    camera.current!.position.x = bike.current!.position.x;

    //camera.current!.rotation.y = Math.PI;

    if (true) {
      gameVarMutation.gameSpeed -= accelDelta;
    }
  });

  useLayoutEffect(() => {
    camera.current!.rotation.set(0, Math.PI, 0);
    camera.current!.position.set(0, 4, -9);
    camera.current!.lookAt(
      vector.set(
        bike.current!.position.x,
        bike.current!.position.y,
        bike.current!.position.z + 10,
      ),
    );
    camera.current!.rotation.z = Math.PI;
    bike.current!.position.y = Math.PI;
  }, [bike, camera]);

  useLayoutEffect(() => {
    if (true) {
      if (bikeLine.current!.material instanceof MeshBasicMaterial) {
        bikeLine.current!.material.visible = true;
      }
    }
  }, []);

  return (
    <>
      <pointLight
        ref={pointLight}
        color='#22BABB'
        decay={10}
        distance={40}
        intensity={10}
        position={[0, 3, -5]}
      />
      <PerspectiveCamera
        makeDefault
        ref={camera}
        fov={75}
        rotation={[0, Math.PI, 0]}
        position={[0, 10, -10]}
      />
      <group ref={bike} dispose={null} position={[0, 3, -10]}>
        {children}
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1.5, 1]}>
              <mesh
                geometry={nodes.corp001_carosserie_0.geometry}
                material={nodes.corp001_carosserie_0.material}
              />
              <mesh
                geometry={nodes.corp001_carosserie_0_1.geometry}
                material={nodes.corp001_carosserie_0_1.material}
              />
              <mesh
                geometry={nodes.corp001_carosserie_0_2.geometry}
                material={nodes.corp001_carosserie_0_2.material}
              />
              <mesh
                geometry={nodes.corp001_carosserie_0_3.geometry}
                material={nodes.corp001_carosserie_0_3.material}
              />
              <mesh
                geometry={nodes.corp001_carosserie_0_4.geometry}
                material={nodes.corp001_carosserie_0_4.material}
              />
              <mesh
                geometry={nodes.corp001_carosserie_0_5.geometry}
                material={nodes.corp001_carosserie_0_5.material}
              />
              <mesh
                geometry={nodes.corp001_carosserie_0_6.geometry}
                material={nodes.corp001_carosserie_0_6.material}
              />
              <mesh
                geometry={nodes.corp001_carosserie_0_7.geometry}
                material={nodes.corp001_carosserie_0_7.material}
              />
              <mesh
                geometry={nodes.corp001_carosserie_0_8.geometry}
                material={nodes.corp001_carosserie_0_8.material}
              />
              <mesh
                geometry={nodes.corp001_2_carosserie_0.geometry}
                material={nodes.corp001_2_carosserie_0.material}
              />
              <mesh
                geometry={nodes.corp001_2_carosserie_0_1.geometry}
                material={nodes.corp001_2_carosserie_0_1.material}
              />
              <mesh
                geometry={nodes.corp001_Material001_0.geometry}
                material={nodes.corp001_Material001_0.material}
              />
              <mesh
                geometry={nodes.corp001_Material001_0_1.geometry}
                material={nodes.corp001_Material001_0_1.material}
              />
              <mesh
                geometry={nodes.corp001_Material001_0_2.geometry}
                material={nodes.corp001_Material001_0_2.material}
              />
              <mesh
                geometry={nodes.corp001_Material001_0_3.geometry}
                material={nodes.corp001_Material001_0_3.material}
              />
              <mesh
                geometry={nodes.corp001_Material001_0_4.geometry}
                material={nodes.corp001_Material001_0_4.material}
              />
            </group>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 1]}>
              <mesh
                geometry={nodes.moteur001_2_carosserie_0.geometry}
                material={nodes.moteur001_2_carosserie_0.material}
              />
              <mesh
                geometry={nodes.moteur001_2_carosserie_0_1.geometry}
                material={nodes.moteur001_2_carosserie_0_1.material}
              />
              <mesh
                geometry={nodes.moteur001_2_carosserie_0_2.geometry}
                material={nodes.moteur001_2_carosserie_0_2.material}
              />
              <mesh
                geometry={nodes.moteur001_2_carosserie_0_3.geometry}
                material={nodes.moteur001_2_carosserie_0_3.material}
              />
              <mesh
                geometry={nodes.moteur001_2_carosserie_0_4.geometry}
                material={nodes.moteur001_2_carosserie_0_4.material}
              />
              <mesh
                geometry={nodes.moteur001_2_carosserie_0_5.geometry}
                material={nodes.moteur001_2_carosserie_0_5.material}
              />
              <mesh
                geometry={nodes.moteur001_2_carosserie_0_6.geometry}
                material={nodes.moteur001_2_carosserie_0_6.material}
              />
              <mesh
                geometry={nodes.moteur001_carosserie_0.geometry}
                material={nodes.moteur001_carosserie_0.material}
              />
              <mesh
                geometry={nodes.moteur001_carosserie_0_1.geometry}
                material={nodes.moteur001_carosserie_0_1.material}
              />
              <mesh
                geometry={nodes.moteur001_carosserie_0_2.geometry}
                material={nodes.moteur001_carosserie_0_2.material}
              />
              <mesh
                geometry={nodes.moteur001_carosserie_0_3.geometry}
                material={nodes.moteur001_carosserie_0_3.material}
              />
              <mesh
                geometry={nodes.moteur001_Material001_0.geometry}
                material={nodes.moteur001_Material001_0.material}
              />
              <mesh
                geometry={nodes.moteur001_fer_0.geometry}
                material={nodes.moteur001_fer_0.material}
              />
              <mesh
                geometry={nodes.moteur001_fer_0_1.geometry}
                material={nodes.moteur001_fer_0_1.material}
              />
            </group>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={[1.36, 1, 1]}>
              <mesh
                geometry={nodes.vitre001_2_carosserie_0.geometry}
                material={nodes.vitre001_2_carosserie_0.material}
              />
              <mesh
                geometry={nodes.vitre001_carosserie_0.geometry}
                material={nodes.vitre001_carosserie_0.material}
              />
              <mesh
                geometry={nodes.vitre001_Material001_0.geometry}
                material={nodes.vitre001_Material001_0.material}
              />
              <mesh
                geometry={nodes.vitre001_fer_0.geometry}
                material={nodes.vitre001_fer_0.material}
              />
            </group>
            <group rotation={[-1.88, 0, 0]} scale={[0.14, 0.08, 0.18]}>
              <mesh
                geometry={nodes.vitesse001_carosserie_0.geometry}
                material={nodes.vitesse001_carosserie_0.material}
              />
              <mesh
                geometry={nodes.vitesse001_carosserie_0_1.geometry}
                material={nodes.vitesse001_carosserie_0_1.material}
              />
              <mesh
                geometry={nodes.vitesse001_2_carosserie_0.geometry}
                material={nodes.vitesse001_2_carosserie_0.material}
              />
              <mesh
                geometry={nodes.vitesse001_2_carosserie_0_1.geometry}
                material={nodes.vitesse001_2_carosserie_0_1.material}
              />
              <mesh
                geometry={nodes.vitesse001_Material001_0.geometry}
                material={nodes.vitesse001_Material001_0.material}
              />
              <mesh
                geometry={nodes.vitesse001_fer_0.geometry}
                material={nodes.vitesse001_fer_0.material}
              />
              <mesh
                geometry={nodes.vitesse001_fer_0_1.geometry}
                material={nodes.vitesse001_fer_0_1.material}
              />
            </group>
          </group>
        </group>
        <mesh
          ref={bikeLine}
          scale={[0.3, 0.02, 3]}
          position={[0, 0.2, -14]}
          rotation={[0, 0, 1.57]}
        >
          <dodecahedronGeometry args={[5, 0]} />
          <meshBasicMaterial dithering={true} opacity={1} color='#22BABB' />
        </mesh>
      </group>
    </>
  );
};

useGLTF.preload('/scene.gltf');

export default Bike;
