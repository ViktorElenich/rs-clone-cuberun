export const PLANE_SIZE = 1000;
export const TEXTURE_SIZE = PLANE_SIZE * 0.05;
export const MOVE_DISTANCE = PLANE_SIZE * 2;
export const INITIAL_GAME_SPEED = 0.8;

export const LEFT_BOUND = (-PLANE_SIZE / 2) + 30
export const RIGHT_BOUND = (PLANE_SIZE / 2) - 30

export const CUBE_SIZE = 30;
export const CUBE_AMOUNT = 170;



export const gameVariables = {
  gameSpeed: 0.0,
  colorLevel: 0,
  desiredSpeed: 0.0,
  velocity: 0,
  score: 0
}

export const LEVEL_COLORS = ['#217aff', '#bd4902', '#ff2919', '#ff69b4', '#26a300'];

export const RADIUS_ARCH = 40;
export const TUBE_ARCH = 4;
export const SEGMENTS_ARCH = 20;

export const CURRENT_LEVEL = 1;
export const DISTANCE_ARCH = 40;
export const ARCH_AMOUNT = 5;
export const START_POSITION_ARCHES = -200;
export const FINISH_POSITION_ARCHES = -2000;
export const DISTANCE_LEVEL = 2500;



export const WALL_THICKNESS = 20;
export const WALL_THICKNESS_TUNNEL = 20;

export const WALL_HEIGHT = 50;
export const WALL_HEIGHT_TUNNEL = 20;

export const MAIN_COLORS = {
  BLUE: 'blue',
  RED: 'red',
  GREEN: 'green',
  YELLOW: 'yellow',
  PURPLE: 'purple',
}

export const MAIN_COLORS_ARR = Object.values(MAIN_COLORS);

export const SAVE_SPACE = {
  x: RADIUS_ARCH + TUBE_ARCH + 20,
  z: TUBE_ARCH * 5 + DISTANCE_ARCH * 4 + 30
}