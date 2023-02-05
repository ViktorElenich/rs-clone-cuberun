import React, { FC, MutableRefObject, useEffect, useLayoutEffect, useRef } from "react";
import { PerspectiveCamera, Trail, useGLTF, useKeyboardControls } from "@react-three/drei";
import { GLTFResult } from "../../type";
import { useStore } from "../../state";
import { BikeProps, RefObject } from "../../interface";
import { Object3D, PointLight, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { gameVariables, INITIAL_GAME_SPEED } from "../../constants";
import { Controls } from "../../enums";

const vector = new Vector3();

const Bike: FC<BikeProps> = ({ children }) => {
  const bike = useStore((state) => state.bike);
  const camera = useStore((state) => state.camera);
  const gameStart = useStore((state) => state.gameStart);
  const pointLight = useRef() as RefObject<PointLight>;
  const bikeLine = useRef() as MutableRefObject<Object3D<Event>>;
  const [sub, get] = useKeyboardControls<Controls>();


  const { nodes, materials } = useGLTF('/bike/scene.gltf') as GLTFResult;

  useFrame((state, delta) => {
    const accelDelta = delta * 0.15;
    const accelDeltaIncline = delta * 1.8;
    const left = get().left;
    const right = get().right;

    bike.current!.position.z -= gameVariables.gameSpeed * delta * 165;
    bike.current!.position.x += gameVariables.velocity * delta * 165;

    bike.current!.rotation.z = gameVariables.velocity * 1.5;
    bike.current!.rotation.y = Math.PI - gameVariables.velocity * 0.4;
    bike.current!.rotation.x = -Math.abs(gameVariables.velocity) / 10;

    pointLight.current!.position.z = bike.current!.position.z + 1;
    pointLight.current!.position.x = bike.current!.position.x;

    camera.current!.position.z = bike.current!.position.z + 19.5;
    camera.current!.position.y = bike.current!.position.y + 5;
    camera.current!.position.x = bike.current!.position.x;

    camera.current!.rotation.y = Math.PI;

    if ((left && right) || (!left && !right)) {
      if (gameVariables.velocity < 0) {
        if (gameVariables.velocity + accelDeltaIncline > 0) {
          gameVariables.velocity = 0;
        } else {
          gameVariables.velocity += accelDeltaIncline;
        }
      }
      if (gameVariables.velocity > 0) {
        if (gameVariables.velocity - accelDeltaIncline < 0) {
          gameVariables.velocity = 0;
        } else {
          gameVariables.velocity -= accelDeltaIncline;
        }
      }
    }

    if (gameVariables.gameSpeed > 0) {
      if ((left && !right)) {
        gameVariables.velocity = Math.max(-0.7, gameVariables.velocity - accelDeltaIncline);
      }
      if ((!left && right)) {
        gameVariables.velocity = Math.min(0.7, gameVariables.velocity + accelDeltaIncline);
      }
    }

    if (gameStart) {
      if (gameVariables.gameSpeed < gameVariables.desiredSpeed) {
        if (gameVariables.gameSpeed + accelDelta > gameVariables.desiredSpeed) {
          gameVariables.gameSpeed = gameVariables.desiredSpeed;
        } else {
          gameVariables.gameSpeed += accelDelta;
        }
      }
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

  useEffect(() => {
    if (gameStart) {
      gameVariables.desiredSpeed = INITIAL_GAME_SPEED;
    }
  }, [gameStart]);

  return (
    <>
      <pointLight
        ref={pointLight}
        color='#0074cc'
        decay={10}
        distance={40}
        intensity={5}
        position={[0, 3, -5]}
      />
      <PerspectiveCamera
        makeDefault
        ref={camera}
        fov={75}
        rotation={[0, Math.PI, 0]}
        position={[0, 10, -10]}
      />
      <group
        ref={bike}
        dispose={null}
        position={[0, 3, -10]}
        rotation={[0, Math.PI, 0]}
      >
        {children}
        <Trail
          width={18}
          color={'#22BABB'}
          length={2}
          decay={1}
          local={false}
          stride={0}
          interval={1}
          target={bikeLine}
          attenuation={(width) => width}
        >
          <group rotation={[-Math.PI / 2, 0, 0]} scale={0.7}>
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
        </Trail>
      </group>
    </>
  );
};

useGLTF.preload('/scene.gltf');

export default Bike;
