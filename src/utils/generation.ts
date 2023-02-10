import { randomInRange } from '.';
import { CUBE_AMOUNT, LEFT_BOUND, RIGHT_BOUND, PLANE_SIZE, SAVE_SPACE, WALL_THICKNESS, START_POSITION_ARCHES, CUBE_SIZE } from '../constants';

export const cubeCoords = (start: number = 0, end: number = PLANE_SIZE) => {
    const temp = [];

    let i = 0;

    /*  for (let i = 0; i < CUBE_AMOUNT; i++) */
    while (i < CUBE_AMOUNT) {
        const x = randomInRange(LEFT_BOUND, RIGHT_BOUND);

        const y = 0;
        const z = randomInRange(start, end);
        if ((Math.abs(x) <= start + SAVE_SPACE.x && Math.abs(z) <= start + SAVE_SPACE.z) || (Math.abs(x) >= PLANE_SIZE / 2 - WALL_THICKNESS - 20)) continue;
        else {
            temp.push({ x, y, z });
            i++;
        }
    }
    return temp;
}

export interface CORNER {
    horizontal: "left" | "right",
    vertical: "finish" | "start"

}

export function diagonal(data: CORNER) {
    const arr = []
    if (data.horizontal === "left" && data.vertical === "start") {
        for (let x = 0; x <= -(PLANE_SIZE / 2 - WALL_THICKNESS - 20); x--) {
            arr.push({ x, z: START_POSITION_ARCHES - x })
        }
    } else if (data.horizontal === "right" && data.vertical === "start") {
        for (let x = 0; x >= (PLANE_SIZE / 2 - WALL_THICKNESS - 20); x++) {
            arr.push({ x, z: START_POSITION_ARCHES - x })
        }
    }
    return arr;
}

export function cornerCoords(data: CORNER) {
    const arr = []
    if (data.horizontal === "left" && data.vertical === "start") {
        for (let x = 0; x <= -(PLANE_SIZE / 2 - WALL_THICKNESS - 20); x -= CUBE_SIZE - 2) {
            arr.push({ x, z: START_POSITION_ARCHES - x })
        }
    } else if (data.horizontal === "right" && data.vertical === "start") {
        for (let x = 0; x >= (PLANE_SIZE / 2 - WALL_THICKNESS - 20); x += CUBE_SIZE + 2) {
            arr.push({ x, z: START_POSITION_ARCHES - x })
        }
    }
    return arr;
}