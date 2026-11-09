const argon2 = require('argon2');

const { InvalidCredentialsError, UsernameTakenError } = require('../errors/AppError');
const userRepository = require('../repositories/userRepository');

// Business rules only. This layer knows nothing about req, res, sessions or SQL.
async function register({ username, email, password }) {
    if (await userRepository.findByUsername(username)) {
        throw new UsernameTakenError();
    }
    const hashedPassword = await argon2.hash(password);
    await userRepository.create({ username, email, password: hashedPassword });
}

async function login({ username, password }) {
    const user = await userRepository.findByUsername(username);
    if (!user) throw new InvalidCredentialsError();

    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) throw new InvalidCredentialsError();

    // Never return the password hash.
    return { username: user.username, email: user.email };
}

module.exports = { register, login };
