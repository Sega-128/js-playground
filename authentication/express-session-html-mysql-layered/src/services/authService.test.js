const assert = require('node:assert/strict');
const { afterEach, beforeEach, describe, it, mock } = require('node:test');
const argon2 = require('argon2');

const { InvalidCredentialsError, UsernameTakenError } = require('../errors/AppError');
const userRepository = require('../repositories/userRepository');
const authService = require('./authService');

describe('authService', () => {
    const credentials = { username: 'igor', email: 'igor@test.dev', password: 'Secret123' };
    let users;

    // Replace the repository functions, so no database is needed.
    beforeEach(() => {
        users = [];
        mock.method(userRepository, 'findByUsername', async (username) => {
            return users.find((u) => u.username === username) ?? null;
        });
        mock.method(userRepository, 'create', async (user) => {
            users.push(user);
        });
    });

    afterEach(() => {
        mock.restoreAll();
    });

    it('stores a hash instead of the password', async () => {
        await authService.register(credentials);

        const [stored] = users;
        assert.match(stored.password, /^\$argon2id\$/);
        assert.equal(await argon2.verify(stored.password, credentials.password), true);
    });

    it('rejects a username that is already taken', async () => {
        await authService.register(credentials);

        await assert.rejects(authService.register(credentials), UsernameTakenError);
    });

    it('returns the user without the password on login', async () => {
        await authService.register(credentials);

        const user = await authService.login(credentials);

        assert.deepEqual(user, { username: credentials.username, email: credentials.email });
    });

    it('rejects a wrong password', async () => {
        await authService.register(credentials);

        await assert.rejects(
            authService.login({ username: credentials.username, password: 'wrong' }),
            InvalidCredentialsError,
        );
    });

    it('rejects an unknown user', async () => {
        await assert.rejects(authService.login(credentials), InvalidCredentialsError);
    });
});
