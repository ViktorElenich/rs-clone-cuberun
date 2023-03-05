import { createRef } from 'react';
import { create } from 'zustand';
import { TronState, User } from '../interface';
import { MAIN_COLORS } from '../constants';
import { DirectionType } from '../type';


const useStore = create<TronState>((set, get) => {
  return {
    set,
    get,
    name: null,
    gameStart: true,
    level: 0,
    score: 0,
    loseGame: false,
    sound: false,
    directionalLight: createRef(),
    bike: createRef(),
    camera: createRef(),
    direction: null,
    mainColor: MAIN_COLORS.BLUE,
    quitGame: () => set({ name: null, score: 0 }),
    setDirection: (dir: DirectionType) => set(({ direction: dir })),
    stopGame: () => set({ gameStart: false, loseGame: true }),
    startGame: () => set(() => ({ gameStart: true, loseGame: false, level: 0, mainColor: MAIN_COLORS.BLUE, score: 0 })),
    newLevel: () => set((state) => ({ level: state.level + 1 })),
    changeColor: (color: string) => set(() => ({ mainColor: color })),
    changeName: (name: string | null) => set(() => ({ name })),
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
    addNewUser: async (name: string, password: string) => {
      const res = await fetch('https://cuberun-server.onrender.com/auth/registration', {
        method: "POST",
        headers: {
          'Content-type': "application/json",
        },
        body: JSON.stringify({ name, password })
      }).catch()
      if (res.ok) { 
        set({ name: name })
        const json = await res.json();
        localStorage.setItem('token', json.token);
        localStorage.setItem('username', name);
      }
      
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
      if (res.ok) { 
        set({ name: name })
        const json = await res.json();
        localStorage.setItem('token', json.token);
        localStorage.setItem('username', name);
      }
      return res.status;
    },
    checkExistentUser: async (name: string) => {
      const users = await get().getUsers();
      if (users.length === 0) {
        return null;
      }
      const existent = users.filter((u: User) => u.name === name)
      if (existent.length === 0) {
        return null
      }
      else {
        return existent[0];
      }
    },
    sendScoreToServer: async (scoreEarned: number) => {
      if (get().name) {
        await fetch("https://cuberun-server.onrender.com/auth/score", {
          method: "PATCH",
          headers: {
            'Content-type': "application/json",
          },
          body: JSON.stringify({ score: scoreEarned, token: localStorage.getItem('token') })
        }).catch()
      }
    }
  };
});

export { useStore }