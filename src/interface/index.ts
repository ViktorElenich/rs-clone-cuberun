import { DirectionalLight, Group, PerspectiveCamera } from "three";
import { ChangeEvent, ReactNode } from "react";


export interface RefObject<T> {
  readonly current: T | null;
}

export interface TronState {
  gameStart: boolean;
  level: number;
  score: number;
  gameFinish: boolean;
  directionalLight: RefObject<DirectionalLight>;
  bike: RefObject<Group>;
  camera: RefObject<PerspectiveCamera>;
  stopGame: () => void;
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

export interface ArchProps {
  position: CubePositionCoords;
  color: string;
}

export interface Arches extends CubePositionCoords {
  color: string;
}

export interface ArchGenerateProps {
  start: boolean;
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

