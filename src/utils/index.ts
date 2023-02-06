import { gameVariables } from "../constants";

export const angleToRadians = (angle: number) => angle * (Math.PI / 180);

export const randomInRange = (from: number, to: number) => Math.floor(Math.random() * (to - from + 1)) - to

export const getSpeed = () => `${(gameVariables.gameSpeed * 400).toFixed(0)}`;
export const getScore = () => `${gameVariables.score.toFixed(0)}`;

