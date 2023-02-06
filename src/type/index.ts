import { Mesh, MeshStandardMaterial, Texture } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { User } from '../interface';

export type GLTFResult = GLTF & {
  nodes: Record<string, Mesh>;
  materials: Record<string, MeshStandardMaterial>;
};



export type UserCreate = Omit<User, "id">

export type CubeColorsType = {
  [key: string]: Texture;
};
