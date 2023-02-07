import { createRef } from "react";
import { create } from "zustand";
import { TronState } from "../interface";

const useStore = create<TronState>((set, get) => {
  return {
    set,
    get,
    gameStart: true,
    gameStart: false,
    level: 0,
    score: 0,
    loseGame: false,
    directionalLight: createRef(),
    bike: createRef(),
    camera: createRef(),
    stopGame: () => set({ gameStart: false, loseGame: true }),
    startGame: () => set(() => ({ gameStart: true, loseGame: false }))
  };
});

export { useStore };
