import { DirectionalLight, Group, PerspectiveCamera } from 'three';
import { ChangeEvent, ReactNode } from 'react';

export interface RefObject<T> {
  readonly current: T | null;
}

export interface TronState {
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