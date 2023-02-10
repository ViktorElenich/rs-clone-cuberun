import { ScoreMap, User } from '../interface';

export async function checkExistentUser(name: string): Promise<User | null> {
    const users = await getUsers();
    console.log(users);
    if (users.length === 0) {
        console.log("no users list received");
        return null

    }
    const existent = users.filter((u: User) => u.name === name)
    if (existent.length === 0) {
        return null
    }
    else {
        return existent[0];
    }

}
export async function getUsers() {
    const res = await fetch('https://cuberun-server.onrender.com/users', {
        method: "GET",
        headers: {
            'Content-type': "application/json"
        }
    }).catch();
    return await res.json();
}


export async function addNewUser(name: string, password: string, score: number = 0) {
    const res = await fetch('https://cuberun-server.onrender.com/auth/registration', {
        method: "POST",
        headers: {
            'Content-type': "application/json",
        },
        body: JSON.stringify({ name, password, score })
    }).catch()
    console.log(res);
    return res.ok;
}

export async function authorizeUser(name: string, password: string) {
    const res = await fetch('https://cuberun-server.onrender.com/auth/login', {
        method: "POST",
        headers: {
            'Content-type': "application/json",
        },
        body: JSON.stringify({ name, password })
    }).catch();
    return res.status;
}

export async function allScores(): Promise<ScoreMap[]> {
    const users = await getUsers();
    return users.map((u: User) => ({ userName: u.name, userScore: u.score }))

}

