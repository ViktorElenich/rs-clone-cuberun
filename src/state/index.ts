import { createRef } from "react";
import { create } from "zustand";
import { TronState } from "../interface";

const useStore = create<TronState>((set, get) => {
  return {
    set,
    get,
    gameStart: false,
    directionalLight: createRef(),
    bike: createRef(),
    camera: createRef(),
  };
});

const gameVarMutation = {
  gameSpeed: 0.0,
  colorLevel: 0,
}

export { useStore, gameVarMutation };
