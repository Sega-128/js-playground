const fs = require('fs').promises;
const path = require('path');

const FILE_PATH = path.join(__dirname, 'users.json');

async function getUsers() {
    try {
        const data = await fs.readFile(FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function saveUsers(users) {
    await fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2));
}

async function addUser(user) {
    const users = await getUsers();
    users.push(user);
    await saveUsers(users);
}

async function findUserByUsername(username) {
    const users = await getUsers();
    return users.find(u => u.username === username);
}

async function findUserByCredentials(username) {
    const users = await getUsers();
    return users.find(u => u.username === username);
}

module.exports = {
    addUser,
    findUserByUsername,
    findUserByCredentials
};
