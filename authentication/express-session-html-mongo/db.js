const User = require('./models/user');

async function addUser(user) {
    await User.create(user);
}

async function findUserByUsername(username) {
    return User.findOne({ username });
}

module.exports = {
    addUser,
    findUserByUsername
};