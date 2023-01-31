import { createRef } from "react";
import { create } from "zustand";
import { TronState } from "../interface";

const useStore = create<TronState>((set, get) => {
  return {
    set,
    get,
    directionalLight: createRef(),
    bike: createRef(),
    camera: createRef(),
  }
})

export { useStore }