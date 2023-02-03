import { User } from '../interface';

export async function checkExistentUser(name: string) {

    const res = await fetch('https://cuberun-server.onrender.com/users', {
        method: "GET",
        headers: {
            'Content-type': "application/json"
        }
    }).catch();

    const users = await res.json().catch();
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
