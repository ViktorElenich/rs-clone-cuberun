import { DirectionalLight, Group, PerspectiveCamera } from "three";
import { ChangeEvent, ReactNode } from "react";


export interface RefObject<T> {
  readonly current: T | null;
}

export interface TronState {
  gameStart: boolean;
  directionalLight: RefObject<DirectionalLight>;
  bike: RefObject<Group>;
  camera: RefObject<PerspectiveCamera>;
}

export interface BikeProps {
  children: ReactNode;
}
export interface btnPropsType {
  btnText: string;
  onClickCallback: () => void;
};

export interface CubePositionCoords {
  x: number,
  y: number,
  z: number,
}

export interface CubeProps {
  position: CubePositionCoords;
  key: number;
  cubeColor: string;
}

export interface inputProps {
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface User {
  id: number,
  name: string,
  password: string,
  score: number
}

export type UserCreate = Omit<User, "id">
