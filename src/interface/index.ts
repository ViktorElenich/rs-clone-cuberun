import { DirectionalLight, Group, PerspectiveCamera, Texture } from "three";
import { ChangeEvent, ReactNode } from "react";
import { DirectionType } from '../type';


export interface RefObject<T> {
  readonly current: T | null;
}

export interface TronState {
  name: string | null,
  password: string | null,
  gameStart: boolean;
  level: number;
  score: number;
  loseGame: boolean;
  directionalLight: RefObject<DirectionalLight>;
  bike: RefObject<Group>;
  camera: RefObject<PerspectiveCamera>;
  direction: 'left' | 'right' | null;
  setDirection: (dir: DirectionType) => void;
  stopGame: () => void;
  startGame: () => void;
  newLevel: () => void;
  mainColor: string;
  changeColor: (color: string) => void;

  getUsers: () => Promise<User[]>
  addNewUser: (name: string, password: string, score: number) => Promise<boolean>
  authorizeUser: (name: string, password: string) => Promise<number>
  checkExistentUser: (name: string) => Promise<User | null>
  sendScoreToServer: (scoreEarned: number) => void
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

export interface TunnelWallsProps {
  positionZ: number;
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
export interface ScoreMap {
  userName: string, userScore: number
}

export interface CubesData {
  x: number;
  y: number;
  z: number;
  col: string;
}
export interface CornerData {
  horizontal: "left" | "right",
  vertical: "finish" | "start"

}

