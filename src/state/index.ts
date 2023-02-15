import { createRef } from 'react';
import { create } from 'zustand';
import { MAIN_COLORS } from '../constants';
import { TronState, User } from '../interface';

const useStore = create<TronState>((set, get) => {
  return {
    set,
    get,
    name: null,
    gameStart: false,
    level: 0,
    score: 0,
    loseGame: false,
    sound: false,
    directionalLight: createRef(),
    bike: createRef(),
    camera: createRef(),
    mainColor: MAIN_COLORS.BLUE,
    stopGame: () => set({ gameStart: false, loseGame: true }),
    startGame: () => set(() => ({ gameStart: true, loseGame: false, level: 0, mainColor: MAIN_COLORS.BLUE })),
    newLevel: () => set((state) => ({ level: state.level + 1 })),
    changeColor: (color: string) => set(() => ({ mainColor: color })),
    setSound: (sound) => set(() => ({ sound: sound })),
    getUsers: async () => {
      const res = await fetch('https://cuberun-server.onrender.com/users', {
        method: "GET",
        headers: {
          'Content-type': "application/json"
        }
      }).catch();
      return await res.json();
    },
    addNewUser: async (name: string, password: string, score: number = 0) => {
      const res = await fetch('https://cuberun-server.onrender.com/auth/registration', {
        method: "POST",
        headers: {
          'Content-type': "application/json",
        },
        body: JSON.stringify({ name, password, score })
      }).catch()
      return res.ok;
    },
    authorizeUser: async (name: string, password: string) => {
      const res = await fetch('https://cuberun-server.onrender.com/auth/login', {
        method: "POST",
        headers: {
          'Content-type': "application/json",
        },
        body: JSON.stringify({ name, password })
      }).catch();
      return res.status;
    },
    checkExistentUser: async (name: string) => {
      const users = await get().getUsers();
      if (users.length === 0) {
        console.log("no users list received");
        return null;
      }
      const existent = users.filter((u: User) => u.name === name)
      if (existent.length === 0) {
        return null
      }
      else {
        return existent[0];
      }
    }
  };
});

export { useStore }