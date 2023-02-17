import { createRef } from 'react';
import { create } from 'zustand';
import { TronState, User } from '../interface';
import { MAIN_COLORS } from '../constants';

const useStore = create<TronState>((set, get) => {
  return {
    set,
    get,
    name: null,
    password: null,
    gameStart: true,
    level: 0,
    score: 0,
    loseGame: false,
    directionalLight: createRef(),
    bike: createRef(),
    camera: createRef(),

    stopGame: () => set({ gameStart: false, loseGame: true }),
    startGame: () => set(() => ({ gameStart: true, loseGame: false, level: 0, mainColor: MAIN_COLORS.BLUE, score: 0 })),
    newLevel: () => set((state) => ({ level: state.level + 1 })),

    mainColor: MAIN_COLORS.BLUE,
    changeColor: (color: string) => set(() => ({ mainColor: color })),

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
      if (res.ok) { set({ name: name, password: password }) }
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
      if (res.ok) { set({ name: name, password: password }) }
      return res.status;
    },
    checkExistentUser: async (name: string) => {
      const users = await get().getUsers();

      console.log(users);
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
    },
    sendScoreToServer: async (scoreEarned: number) => {
      if (get().name) {
        const res = await fetch("https://cuberun-server.onrender.com/users").catch()
        const allUsers = await res.json()

        const users: User[] = allUsers.filter((u: User) => u.name === get().name);
        if (users.length === 0) return;
        const prevScore = users[0].score;
        if (prevScore < scoreEarned) {
          await fetch("https://cuberun-server.onrender.com/users", {
            method: "POST",
            headers: {
              'Content-type': "application/json",
            },
            body: JSON.stringify({ name: get().name, password: get().password, score: scoreEarned })
          }).catch()
        }
      }
    }
  };
});

export { useStore };
