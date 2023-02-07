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

export const createWallTunnel = (hasGap: boolean, gapSize: number) => {
  const wallCoordinates = [...Array(parts)].map((cube, index) => {
    return {
      x: minusBound + index * CUBE_SIZE,
      y: CUBE_SIZE / 2,
      z:
        index <= parts / 2
          ? -(index * CUBE_SIZE)
          : -(parts * CUBE_SIZE) + index * CUBE_SIZE,
    };
  });
  if (hasGap) {
    wallCoordinates.splice(parts / 2 - Math.floor(gapSize / 2), gapSize);
  }
  if (LEFT_BOUND < PLANE_SIZE / 2) {
    const spliceFactor = (PLANE_SIZE / 2 + LEFT_BOUND) / CUBE_SIZE - 1;
    wallCoordinates.splice(0, spliceFactor);
    wallCoordinates.splice(-spliceFactor, spliceFactor);
  }

  return wallCoordinates;
};

export const createTunnel = () => {
  const coords = [
    { x: 40, y: 10, z: -450 },
    { x: -40, y: 10, z: -450 },
    { x: 40, y: 10, z: -478 },
    { x: -40, y: 10, z: -478 },
    { x: 40, y: 10, z: -506 },
    { x: -40, y: 10, z: -506 },
    { x: 40, y: 10, z: -534 },
    { x: -40, y: 10, z: -534 },
    { x: 40, y: 10, z: -562 },
    { x: -40, y: 10, z: -562 },
    { x: 40, y: 10, z: -590 },
    { x: -40, y: 10, z: -590 },
    { x: 40, y: 10, z: -618 },
    { x: -40, y: 10, z: -618 },
    { x: 40, y: 10, z: -646 },
    { x: -40, y: 10, z: -646 },
    { x: 40, y: 10, z: -674 },
    { x: -40, y: 10, z: -674 },
    { x: 40, y: 10, z: -702 },
    { x: -40, y: 10, z: -702 },
  ];

  return coords;
};
export const createRhombus = (sizeRhombus: number, tunnelLength: number) => {
  const wallEndOffset = -((parts / 2 - 2) * CUBE_SIZE);
  const tunnelEndOffset = tunnelLength * CUBE_SIZE * 0.7;
  const outerLeftWall = [...Array(sizeRhombus)].map((cube, index) => {
    return {
      x:
        index === 0
          ? -70
          : index <= sizeRhombus / 2
          ? -CUBE_SIZE * 3 - index * CUBE_SIZE
          : -CUBE_SIZE * 3 - sizeRhombus * CUBE_SIZE + index * CUBE_SIZE,
      y: CUBE_SIZE / 2,
      z: wallEndOffset - tunnelEndOffset - index * CUBE_SIZE * 1.75,
    };
  });
  const outerRightWall = [...Array(sizeRhombus)].map((cube, index) => {
    return {
      x:
        index === 0
          ? 70
          : index <= sizeRhombus / 2
          ? CUBE_SIZE * 3 + index * CUBE_SIZE
          : CUBE_SIZE * 3 + sizeRhombus * CUBE_SIZE - index * CUBE_SIZE,
      y: CUBE_SIZE / 2,
      z: wallEndOffset - tunnelEndOffset - index * CUBE_SIZE * 1.75,
    };
  });
  const innerSize = Math.floor(sizeRhombus / 2) - 2;
  const innerLeftWall = [...Array(innerSize)].map((cube, index) => {
    return {
      x:
        index === 1
          ? -CUBE_SIZE / 2 - index * CUBE_SIZE * 1.1
          : index < innerSize / 2
          ? -CUBE_SIZE / 2 - index * CUBE_SIZE
          : -CUBE_SIZE / 2 - innerSize * CUBE_SIZE + index * CUBE_SIZE,
      y: CUBE_SIZE / 2,
      z:
        wallEndOffset -
        tunnelEndOffset -
        Math.floor(sizeRhombus / 1.5) * CUBE_SIZE -
        index * CUBE_SIZE * 1.75,
    };
  });
  const innerRightWall = [...Array(innerSize)].map((cube, index) => {
    return {
      x:
        index === 1
          ? CUBE_SIZE / 2 + index * CUBE_SIZE * 1.1
          : index < innerSize / 2
          ? CUBE_SIZE / 2 + index * CUBE_SIZE
          : CUBE_SIZE / 2 + innerSize * CUBE_SIZE - index * CUBE_SIZE,
      y: CUBE_SIZE / 2,
      z:
        wallEndOffset -
        tunnelEndOffset -
        Math.floor(sizeRhombus / 1.5) * CUBE_SIZE -
        index * CUBE_SIZE * 1.75,
    };
  });
  const middlePiece = {
    x: 0,
    y: CUBE_SIZE / 2,
    z:
      wallEndOffset -
      tunnelEndOffset -
      Math.floor(sizeRhombus / 1.5) * CUBE_SIZE +
      CUBE_SIZE,
  };
  const firstRhombus = [
    ...outerLeftWall,
    ...outerRightWall,
    middlePiece,
    ...innerLeftWall,
    ...innerRightWall,
  ];
  const secondRhombus = firstRhombus.map((coordinates, index) => ({
    ...coordinates,
    z:
      index >= 42
        ? coordinates.z - 700
        : coordinates.z - sizeRhombus * CUBE_SIZE * 1.75,
  }));
  const finalTunnel = [
    { x: 60, y: 10, z: -2045 },
    { x: -60, y: 10, z: -2045 },
    { x: 40, y: 10, z: -2065 },
    { x: -40, y: 10, z: -2065 },
    { x: 40, y: 10, z: -2085 },
    { x: -40, y: 10, z: -2085 },
    { x: 40, y: 10, z: -2105 },
    { x: -40, y: 10, z: -2105 },
    { x: 40, y: 10, z: -2125 },
    { x: -40, y: 10, z: -2125 },
    { x: 40, y: 10, z: -2145 },
    { x: -40, y: 10, z: -2145 },
    { x: 40, y: 10, z: -2165 },
    { x: -40, y: 10, z: -2165 },
    { x: 40, y: 10, z: -2185 },
    { x: -40, y: 10, z: -2185 },
    { x: 40, y: 10, z: -2205 },
    { x: -40, y: 10, z: -2205 },
    { x: 40, y: 10, z: -2225 },
    { x: -40, y: 10, z: -2225 },
    { x: 40, y: 10, z: -2245 },
    { x: -40, y: 10, z: -2245 },
    { x: 40, y: 10, z: -2265 },
    { x: -40, y: 10, z: -2265 },
  ];

  return [...firstRhombus, ...secondRhombus, ...finalTunnel];
};

export const generateRhombus = () => [
  ...createWallTunnel(HAS_GAP, GAP_SIZE),
  ...createTunnel(),
  ...createRhombus(SIZE_RHOMBUS, TUNNEL_LENGTH),
];

export const generateCubeTunnel = () => [
  ...createWallTunnel(HAS_GAP, GAP_SIZE),
  ...createTunnel()
];
export const distance2D = (p1x: number, p1y: number, p2x: number, p2y: number) => {
  const a = p2x - p1x;
  const b = p2y - p1y;

  return Math.sqrt(a * a + b * b);
}
