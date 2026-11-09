const bcrypt = require('bcryptjs');

const { InvalidCredentialsError, UsernameTakenError } = require('../errors/AppError');
const userRepository = require('../repositories/userRepository');

const SALT_ROUNDS = 12;

// Compared when a user does not exist, so that login takes the same time either way.
// Otherwise a fast response would reveal which usernames are registered.
const DUMMY_HASH = bcrypt.hashSync('dummy-password', SALT_ROUNDS);

// Business rules only. This layer knows nothing about req, res, sessions or SQL.
async function register({ username, email, password }) {
    if (await userRepository.findByUsername(username)) {
        throw new UsernameTakenError();
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await userRepository.create({ username, email, password: hashedPassword });
}

async function login({ username, password }) {
    const user = await userRepository.findByUsername(username);

    const passwordValid = await bcrypt.compare(password, user?.password ?? DUMMY_HASH);
    if (!user || !passwordValid) throw new InvalidCredentialsError();

    // Never return the password hash.
    return { username: user.username, email: user.email };
}

module.exports = { register, login };
