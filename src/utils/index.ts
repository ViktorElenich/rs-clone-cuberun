import {
  CUBE_SIZE,
  gameVariables,
  GAP_SIZE,
  HAS_GAP,
  LEFT_BOUND,
  minusBound,
  parts,
  PLANE_SIZE,
  SIZE_RHOMBUS,
  TUNNEL_LENGTH
} from '../constants';

export const angleToRadians = (angle: number) => angle * (Math.PI / 180);

export const randomInRange = (from: number, to: number) =>
  Math.floor(Math.random() * (to - from + 1)) - to;

export const getSpeed = () => `${(gameVariables.gameSpeed * 400).toFixed(0)}`;
export const getScore = () => `${gameVariables.score.toFixed(0)}`;

