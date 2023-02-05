import { Mesh, MeshStandardMaterial, Texture } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export type GLTFResult = GLTF & {
  nodes: Record<string, Mesh>;
  materials: Record<string, MeshStandardMaterial>;
};

export type cubeColorsType = {
  [key: string]: Texture;
};
