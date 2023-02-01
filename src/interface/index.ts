import { DirectionalLight, Group, PerspectiveCamera } from 'three';
import { ReactNode } from 'react';

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