import { createRef } from "react";
import { create } from "zustand";
import { TronState } from "../interface";

const useStore = create<TronState>((set, get) => {
  return {
    set,
    get,
    gameStart: false,
    level: 0,
    score: 0,
    gameFinish: false,
    directionalLight: createRef(),
    bike: createRef(),
    camera: createRef(),
    stopGame: () => set((state) => ({ gameFinish: true }))
  };
});

export { useStore };
