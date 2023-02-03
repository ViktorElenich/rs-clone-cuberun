import { User } from '../interface';

export async function checkExistentUser(name: string, password: string) {

    const res = await fetch('https://cuberun-server.onrender.com/users').catch();

    const users = await res.json().catch();
    console.log(users);
    if (users.length === 0) {
        console.log("no users list recieved");
        return null

    }
    const existent = users.users.filter((u: User) => u.name === name)
    if (existent.length === 0) {
        return null
    }
    else {
        if (existent[0].password === password) return existent[0];
        return null
    }

}
