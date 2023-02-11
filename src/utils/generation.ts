import { randomInRange } from '.';
import { CUBE_AMOUNT, LEFT_BOUND, RIGHT_BOUND, PLANE_SIZE, SAVE_SPACE, WALL_THICKNESS, START_POSITION_ARCHES, CUBE_SIZE } from '../constants';
import { CornerData } from '../interface';

export const cubeCoords = (start: number = 0, end: number = PLANE_SIZE) => {
    const temp = [];
    let i = 0;

    while (i < CUBE_AMOUNT) {
        const x = randomInRange(LEFT_BOUND, RIGHT_BOUND);
        const y = 0;
        const z = randomInRange(start, end);
        if ((Math.abs(x) <= SAVE_SPACE.x && Math.abs(z) <= start + SAVE_SPACE.z) ||
            (Math.abs(x) >= PLANE_SIZE / 2 - WALL_THICKNESS - 20)
        ) continue;
        else {
            temp.push({ x, y, z });
            i++;
        }
    }
    return temp;
}


export function cornerCoords(data: CornerData) {
    const arr = []
    if (data.horizontal === "left" && data.vertical === "start") {
        for (let i = 0; i < PLANE_SIZE / 2 - 100; i += CUBE_SIZE + 2) {
            const x = -(SAVE_SPACE.x + i);
            const y = 0;
            const z = -(SAVE_SPACE.z + i)
            arr.push({ x, y, z })
        }
    } else if (data.horizontal === "right" && data.vertical === "start") {
        for (let i = 0; i < PLANE_SIZE / 2 - 100; i += CUBE_SIZE + 2) {
            const x = (SAVE_SPACE.x + i);
            const y = 0;
            const z = -(SAVE_SPACE.z + i)
            arr.push({ x, y, z })
        }
    }
    else if (data.horizontal === "right" && data.vertical === "finish") {
        for (let i = 0; i < PLANE_SIZE / 2 - 100; i += CUBE_SIZE + 2) {
            const x = (SAVE_SPACE.x + i);
            const y = 0;
            const z = (i)
            arr.push({ x, y, z })
        }
    }
    else if (data.horizontal === "left" && data.vertical === "finish") {
        for (let i = 0; i < PLANE_SIZE / 2 - 100; i += CUBE_SIZE + 2) {
            const x = -(SAVE_SPACE.x + i);
            const y = 0;
            const z = (i)
            arr.push({ x, y, z })
        }
    }
    return arr;
}