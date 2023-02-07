import { User } from '../interface';

export async function checkExistentUser(name: string) {
    const users = await getUsers();
    console.log(users);
    if (users.length === 0) {
        console.log("no users list recieved");
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
    return await res.json().catch();
}

export async function createUser(name: string, password: string, score: number = 0) {
    return await fetch('https://cuberun-server.onrender.com/users', {
        method: "POST",
        headers: {
            'Content-type': "application/json",
            body: JSON.stringify({ name, password, score })
        }
    }).catch();
}

export async function allScores() {
    const users = await getUsers();
    return users.map((u: User) => ({ userName: u.name, userScore: u.score }))

}